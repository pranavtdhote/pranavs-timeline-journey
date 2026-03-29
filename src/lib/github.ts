const GITHUB_USERNAME = "pranavtdhote";
const CACHE_KEY_PREFIX = "portfolio_github_cache_";
const CACHE_EXPIRY_MS = 60 * 60 * 1000; // 1 hour

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
  homepage: string;
  fork: boolean;
}

export interface GitHubUser {
  login: string;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  bio: string;
}

/**
 * Smart Cache Wrapper
 * Stores API responses in localStorage to bypass GitHub's 60 req/hr limit for unauthenticated IPs.
 */
async function fetchWithCache<T>(cacheKey: string, fetcher: () => Promise<T>): Promise<T> {
  const fullKey = CACHE_KEY_PREFIX + cacheKey;
  const cached = localStorage.getItem(fullKey);

  if (cached) {
    try {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_EXPIRY_MS) {
        return data as T;
      }
    } catch (e) {
      console.error("Cache parsing error", e);
    }
  }

  // If missing or expired, fetch new data
  try {
    const data = await fetcher();
    localStorage.setItem(fullKey, JSON.stringify({ data, timestamp: Date.now() }));
    return data;
  } catch (error) {
    console.error(`Fetch failed for ${cacheKey}, falling back to stale cache if available.`, error);
    // Fallback to expired cache if API fails (e.g., rate limited)
    if (cached) {
      return JSON.parse(cached).data as T;
    }
    throw error;
  }
}

/**
 * Fetches all public repositories for the user.
 * Excludes forks and sorts by most recently updated.
 */
export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  return fetchWithCache('repos', async () => {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
    if (!res.ok) throw new Error("Failed to fetch GitHub repos");
    const repos: GitHubRepo[] = await res.json();
    return repos.filter(repo => !repo.fork); // exclude forks to show original work
  });
}

/**
 * Fetches the GitHub user profile for global stats (followers, total repos).
 */
export async function getGitHubUser(): Promise<GitHubUser> {
  return fetchWithCache('user', async () => {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
    if (!res.ok) throw new Error("Failed to fetch GitHub User");
    return res.json();
  });
}

/**
 * Fetches the RAW README.md text for a specific repository.
 */
export async function getRepoReadme(repoName: string): Promise<string> {
  return fetchWithCache(`readme_${repoName}`, async () => {
    // We use the raw accept header to get raw markdown directly
    const res = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/readme`, {
      headers: {
        Accept: "application/vnd.github.v3.raw"
      }
    });
    
    if (res.status === 404) return "### No README.md found for this project.";
    if (!res.ok) throw new Error("Failed to fetch README");
    
    return res.text();
  });
}

/**
 * Helper: Aggregates all languages used across all repos
 * Returns a sorted array of [language, count]
 */
export async function getAggregatedSkills(): Promise<{name: string, count: number}[]> {
  const repos = await getGitHubRepos();
  const languageCounts: Record<string, number> = {};
  
  repos.forEach(repo => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
    repo.topics?.forEach(topic => {
      // capitalize topic gracefully
      const formatted = topic.charAt(0).toUpperCase() + topic.slice(1);
      languageCounts[formatted] = (languageCounts[formatted] || 0) + 0.5; // topics count as half weight
    });
  });

  return Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));
}

/**
 * Helper: Parses relative time natively
 */
export function getRelativeTime(dateString: string): string {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const daysDifference = Math.round((new Date(dateString).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysDifference === 0) return "Today";
  
  if (Math.abs(daysDifference) < 30) {
    return rtf.format(daysDifference, 'day');
  } else if (Math.abs(daysDifference) < 365) {
    return rtf.format(Math.round(daysDifference / 30), 'month');
  }
  return rtf.format(Math.round(daysDifference / 365), 'year');
}

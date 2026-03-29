export interface ProjectData {
  slug: string;
  title: string;
  period: string;
  tech: string[];
  icon: string;
  shortDesc: string;
  description: string;
  features: string[];
  achievements: string[];
  github?: string;
  demo?: string;
}

export const projectsData: ProjectData[] = [
  {
    slug: "blockchain-charity-platform",
    title: "Blockchain-Based Charity Donation Platform (CharityConnect)",
    period: "March – April 2025",
    tech: ["Solidity", "Hardhat", "Ethers.js", "React.js", "Tailwind CSS"],
    icon: "⛓️",
    shortDesc: "Decentralized application for transparent, milestone-based charity donations.",
    description:
      "CharityConnect is a blockchain-powered DApp that ensures transparency and trust in charitable donations. Built with Solidity smart contracts on Ethereum, it enables milestone-based fund releases, real-time tracking, and decentralized storage of donation records. Donors can verify exactly how their contributions are used.",
    features: [
      "Milestone-based fund release system with smart contract enforcement",
      "Real-time fund tracking dashboard for donors and charities",
      "Decentralized storage for immutable donation records",
      "Automated reporting and analytics for transparency",
      "MetaMask wallet integration for secure transactions",
    ],
    achievements: [
      "Built DApp for milestone-based fund release ensuring transparency in donations",
      "Developed smart contracts with real-time fund tracking and decentralized storage",
      "Implemented secure, trustless donation system with automated milestone-based releases",
    ],
    github: "https://github.com/pranavtdhote",
  },
  {
    slug: "java-online-quiz",
    title: "Java Online Quiz Application",
    period: "March 2025",
    tech: ["Java", "JSP", "Servlets", "MySQL", "Firebase"],
    icon: "📝",
    shortDesc: "Full-featured quiz management system with leaderboard and analytics.",
    description:
      "A comprehensive online quiz platform built with Java web technologies. Features include session-based quiz management, real-time scoring, leaderboard tracking, and an admin dashboard with detailed analytics. The system uses a dual-database architecture with MySQL and Firebase for maximum reliability.",
    features: [
      "Dynamic quiz creation and management system",
      "Real-time scoring with automatic result calculation",
      "Session handling with secure authentication",
      "Leaderboard with historical performance tracking",
      "Admin dashboard with comprehensive analytics and reporting",
    ],
    achievements: [
      "Engineered quiz management system with session handling and result calculation",
      "Integrated Firebase + MySQL to store responses, leaderboard, and admin reports",
      "Implemented real-time leaderboard with comprehensive analytics dashboard",
    ],
    github: "https://github.com/pranavtdhote",
  },
  {
    slug: "garage-bill-generator",
    title: "Garage Bill Generator & Management System",
    period: "March 2025",
    tech: ["React.js", "Vite", "Tailwind CSS", "MongoDB"],
    icon: "🚗",
    shortDesc: "Automotive billing and customer management system with PDF export.",
    description:
      "A modern web application for automotive garages to manage billing, customers, and services. Features include automated invoice generation with customizable templates, PDF export, customer history tracking, and offline functionality through local storage. Built with React and Vite for blazing-fast performance.",
    features: [
      "Automated bill generation with customizable invoice templates",
      "PDF export for invoices and reports",
      "Customer & service management with full CRUD operations",
      "Offline functionality with local storage sync",
      "Dashboard with revenue analytics and service statistics",
    ],
    achievements: [
      "Developed bill generator with PDF export and invoice templates",
      "Implemented Customer & Service Management with CRUD operations",
      "Integrated local storage for offline functionality",
    ],
    github: "https://github.com/pranavtdhote",
  },
  {
    slug: "railway-reservation",
    title: "Railway Reservation System",
    period: "October 2024",
    tech: ["MySQL", "PL/SQL", "Lucidchart"],
    icon: "🚆",
    shortDesc: "Database-driven railway ticket booking with automated triggers and procedures.",
    description:
      "A comprehensive database project for railway ticket booking and management. Designed with a normalized relational schema, ER diagrams, and implemented using advanced SQL features including triggers, stored procedures, and PL/SQL blocks. Includes automated reporting for booking analytics.",
    features: [
      "Comprehensive ER diagram and normalized relational schema",
      "SQL triggers for automated booking validations",
      "PL/SQL procedures for reservation and cancellation workflows",
      "Automated reporting system for booking analytics",
      "Concurrency-safe transaction handling",
    ],
    achievements: [
      "Designed comprehensive ER diagram and relational schema for railway ticket booking",
      "Implemented SQL queries, triggers, and PL/SQL procedures for reservation and cancellation",
      "Created automated reporting system for booking analytics",
    ],
    github: "https://github.com/pranavtdhote",
  },
  {
    slug: "ticketing-system",
    title: "Ticketing System",
    period: "October 2024",
    tech: ["C++", "Priority Queue", "Linked List"],
    icon: "🎫",
    shortDesc: "Priority-based ticket booking using advanced data structures.",
    description:
      "A C++ console application implementing a priority-based ticketing system using advanced data structures. The system prioritizes elderly, differently-abled, and emergency passengers using a custom priority queue built on linked lists. Optimized for efficient O(log n) queue operations.",
    features: [
      "Priority queue with custom comparator for passenger categories",
      "Linked list implementation for dynamic queue management",
      "Special priority for elderly, differently-abled, and emergency cases",
      "Efficient O(log n) insert and extract operations",
      "Console-based UI with clear menu navigation",
    ],
    achievements: [
      "Developed priority-based ticket booking system using data structures",
      "Implemented logic to prioritize elderly, differently-abled, and emergency cases",
      "Optimized queue operations for efficient ticket allocation",
    ],
    github: "https://github.com/pranavtdhote",
  },
];

export const getProjectBySlug = (slug: string): ProjectData | undefined => {
  return projectsData.find((p) => p.slug === slug);
};

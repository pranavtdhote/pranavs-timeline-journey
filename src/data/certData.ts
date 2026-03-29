export interface Certification {
  id: string;
  title: string;
  organization: string;
  date: string;
  icon: string; // Emoji or image URL
  skills: string[];
  pdfUrl?: string;
  credentialId?: string;
}

export const certificationsData: Certification[] = [
  {
    id: "fullstack-bootcamp",
    title: "The Complete Full-Stack Web Development Bootcamp",
    organization: "Udemy",
    date: "April 2025",
    icon: "🌐",
    skills: ["HTML", "CSS", "JavaScript", "Node.js", "React", "Backend Development"],
    credentialId: "UC-56149a79-2c31-4005-a56a-345b5707215d",
    pdfUrl: "/UC-56149a79-2c31-4005-a56a-345b5707215d (2).pdf"
  },

  {
    id: "aws-architecting",
    title: "Architecting on AWS",
    organization: "AISSMS Institute of Information Technology",
    date: "August 2025",
    icon: "☁️",
    skills: ["AWS", "Cloud Architecture", "Cloud Computing", "Infrastructure Design", "Deployment"],
    pdfUrl: "/PranavAWS.pdf"
  },

  {
    id: "salesforce-admin",
    title: "Salesforce Administration",
    organization: "Net Gyani IT Services Private Limited",
    date: "February 2025",
    icon: "☁️",
    skills: ["Salesforce", "Cloud Computing", "Data Modeling", "Security", "Analytics"],
    pdfUrl: "/Net Gyani AISSMSIOIT Certificate v1.0  (1).pdf"
  },

  {
    id: "frontend-dev",
    title: "Introduction to Front End Development",
    organization: "Simplilearn SkillUp",
    date: "March 2025",
    icon: "💻",
    skills: ["HTML", "CSS", "JavaScript", "Frontend Development"],
    pdfUrl: "/introductiontofrontend_certificate (1).pdf"
  },

  {
    id: "aiml-workshop",
    title: "AI/ML Technology Workshop",
    organization: "Sumago Infotech Pvt. Ltd.",
    date: "August 2024",
    icon: "🤖",
    skills: ["Artificial Intelligence", "Machine Learning", "AI Fundamentals"],
    credentialId: "SIPL2024-65",
    pdfUrl: "/17-10-24, 939 AM Microsoft Lens.pdf"
  },

  {
    id: "data-analytics",
    title: "Data Analytics Bootcamp",
    organization: "Skill Academy (Testbook)",
    date: "June 2023",
    icon: "📊",
    skills: ["Data Analytics", "Data Visualization", "Statistics", "Data Processing"],
    pdfUrl: "/Pranav T Dhote.pdf"
  },

];

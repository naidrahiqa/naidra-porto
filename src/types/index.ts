/**
 * Project Type Definition
 * Represents a portfolio project with all its metadata
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: ProjectCategory;
  tags: string[];
  image: string;
  images?: string[]; // Additional images for the project
  liveDemoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status: ProjectStatus;
  completedDate?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Project Category
 */
export type ProjectCategory =
  | "Web Development"
  | "Mobile App"
  | "UI/UX Design"
  | "Data Science"
  | "Machine Learning"
  | "Other";

/**
 * Project Status
 */
export type ProjectStatus =
  | "In Progress"
  | "Completed"
  | "On Hold"
  | "Archived";

/**
 * Skill Category
 */
export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[]; // Simplification: just an array of strings for now
}

/**
 * Social Link
 */
export interface SocialLink {
  platform: string;
  url: string;
  color?: string; // Hex color for styling
}

/**
 * Portfolio Settings
 */
export interface PortfolioSettings {
  // Personal Info
  name: string;
  title: string;
  bio: string;
  
  // Contact Info
  email: string;
  phone?: string;
  location?: string;
  
  // URLs (Legacy/Quick access)
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  profileImage?: string;
  resumeUrl?: string;

  // Editable Content Sections
  greetings?: string[]; // Array of greetings for Hero
  aboutDescription?: string; // Detailed About Me text
  skills?: SkillCategory[]; // List of skill categories
  socialLinks?: SocialLink[]; // Dynamic social links
}

/**
 * Navigation Route
 */
export interface NavRoute {
  path: string;
  label: string;
  icon?: string;
}

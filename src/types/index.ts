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
 * Portfolio Settings
 */
export interface PortfolioSettings {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  profileImage?: string;
  resumeUrl?: string;
}

/**
 * Navigation Route
 */
export interface NavRoute {
  path: string;
  label: string;
  icon?: string;
}

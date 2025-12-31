import type { Project, PortfolioSettings } from '../types';

const PROJECTS_KEY = 'portfolio_projects';
const SETTINGS_KEY = 'portfolio_settings';

/**
 * Default portfolio settings
 */
const defaultSettings: PortfolioSettings = {
  name: 'Faqih Ardian Syah',
  title: 'TKJ Student & Aspiring Network Engineer',
  bio: 'Grade 11 vocational high school student majoring in Computer Network Engineering (TKJ). Passionate about networking, web development, and creating beautiful digital experiences with clean, minimalist design.',
  email: 'faqih.ardian@example.com', // Updated placeholder
  phone: '+62 8xx xxxx xxxx',
  location: 'Indonesia',
  github: 'https://github.com/naidra',
  linkedin: 'https://linkedin.com/in/naidra',
  twitter: 'https://twitter.com/naidra',
  website: 'https://naidra-portfolio.com',
};

const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'Network Topology Simulator',
    description: 'Interactive network topology design and simulation tool',
    longDescription: 'Developed a network topology simulator using Cisco Packet Tracer and GNS3. Implemented LAN/WAN configurations, routing protocols (RIP, OSPF), and VLANs for practical network design learning.',
    category: 'Other',
    tags: ['Cisco', 'Packet Tracer', 'GNS3', 'Networking', 'VLAN', 'Routing'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
    githubUrl: 'https://github.com/naidra/network-topology',
    featured: true,
    status: 'Completed',
    completedDate: '2024-12-15',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'School Website Redesign',
    description: 'Modern responsive website for SMK with clean design',
    longDescription: 'Redesigned school website using HTML, CSS, JavaScript, and Bootstrap. Features include announcements, gallery, student portal, and mobile-responsive design for better accessibility.',
    category: 'Web Development',
    tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Responsive Design'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
    liveDemoUrl: 'https://example.com',
    githubUrl: 'https://github.com/naidra/school-website',
    featured: true,
    status: 'Completed',
    completedDate: '2024-11-20',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Linux Server Configuration',
    description: 'Web & DNS server setup using Ubuntu Server',
    longDescription: 'Configured Ubuntu Server with Apache, MySQL, PHP (LAMP stack), DNS server (BIND9), and implemented security measures including firewall rules and SSH key authentication.',
    category: 'Other',
    tags: ['Linux', 'Ubuntu Server', 'Apache', 'MySQL', 'DNS', 'BIND9', 'Security'],
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=600&fit=crop',
    featured: false,
    status: 'Completed',
    completedDate: '2024-10-30',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Network Monitoring Dashboard',
    description: 'Real-time network monitoring with bandwidth tracking',
    longDescription: 'Built a network monitoring dashboard using Python and web technologies. Tracks bandwidth usage, device connectivity, and network performance metrics in real-time with visual graphs.',
    category: 'Web Development',
    tags: ['Python', 'JavaScript', 'Chart.js', 'Network Monitoring', 'Real-time'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    githubUrl: 'https://github.com/naidra/network-monitor',
    featured: false,
    status: 'In Progress',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// ============================================
// Projects Management
// ============================================

/**
 * Get all projects from localStorage
 */
export const getProjects = (): Project[] => {
  const stored = localStorage.getItem(PROJECTS_KEY);
  if (!stored) {
    // Initialize with sample projects
    setProjects(sampleProjects);
    return sampleProjects;
  }
  return JSON.parse(stored);
};

/**
 * Save projects to localStorage
 */
export const setProjects = (projects: Project[]): void => {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
};

/**
 * Get a single project by ID
 */
export const getProjectById = (id: string): Project | undefined => {
  const projects = getProjects();
  return projects.find(p => p.id === id);
};

/**
 * Add a new project
 */
export const addProject = (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project => {
  console.log('Storage: Adding project:', project);
  const projects = getProjects();
  const newProject: Project = {
    ...project,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  projects.push(newProject);
  setProjects(projects);
  console.log('Storage: Project added. Count:', projects.length);
  return newProject;
};

/**
 * Update an existing project
 */
export const updateProject = (id: string, updates: Partial<Project>): Project | null => {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === id);
  
  if (index === -1) return null;
  
  const updatedProject: Project = {
    ...projects[index],
    ...updates,
    id: projects[index].id, // Ensure ID doesn't change
    createdAt: projects[index].createdAt, // Preserve creation date
    updatedAt: new Date().toISOString(),
  };
  
  projects[index] = updatedProject;
  setProjects(projects);
  return updatedProject;
};

/**
 * Delete a project
 */
export const deleteProject = (id: string): boolean => {
  const projects = getProjects();
  const filtered = projects.filter(p => p.id !== id);
  
  if (filtered.length === projects.length) return false;
  
  setProjects(filtered);
  return true;
};

/**
 * Get featured projects
 */
export const getFeaturedProjects = (): Project[] => {
  return getProjects().filter(p => p.featured);
};

/**
 * Get projects by category
 */
export const getProjectsByCategory = (category: string): Project[] => {
  return getProjects().filter(p => p.category === category);
};

/**
 * Get projects by status
 */
export const getProjectsByStatus = (status: string): Project[] => {
  return getProjects().filter(p => p.status === status);
};

// ============================================
// Settings Management
// ============================================

/**
 * Get portfolio settings
 */
export const getSettings = (): PortfolioSettings => {
  const stored = localStorage.getItem(SETTINGS_KEY);
  if (!stored) {
    setSettings(defaultSettings);
    return defaultSettings;
  }
  return JSON.parse(stored);
};

/**
 * Save portfolio settings
 */
export const setSettings = (settings: PortfolioSettings): void => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

/**
 * Update portfolio settings
 */
export const updateSettings = (updates: Partial<PortfolioSettings>): PortfolioSettings => {
  console.log('Storage: Updating settings:', updates);
  const current = getSettings();
  const updated = { ...current, ...updates };
  setSettings(updated);
  return updated;
};

// ============================================
// Utility Functions
// ============================================

/**
 * Reset all data to defaults
 */
export const resetAllData = (): void => {
  setProjects(sampleProjects);
  setSettings(defaultSettings);
};

/**
 * Export all data as JSON
 */
export const exportData = (): string => {
  return JSON.stringify({
    projects: getProjects(),
    settings: getSettings(),
  }, null, 2);
};

/**
 * Import data from JSON
 */
export const importData = (jsonString: string): boolean => {
  try {
    const data = JSON.parse(jsonString);
    if (data.projects) setProjects(data.projects);
    if (data.settings) setSettings(data.settings);
    return true;
  } catch (error) {
    console.error('Failed to import data:', error);
    return false;
  }
};

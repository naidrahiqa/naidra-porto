import { supabase } from '../lib/supabase';
import type { Project, PortfolioSettings } from '../types';
import { getProjects as getLocalProjects, getSettings as getLocalSettings } from '../utils/storage';

// =======================
// PROJECTS SERVICE
// =======================

export const fetchProjects = async (): Promise<Project[]> => {


  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('Supabase fetch error (using local fallback):', error.message);
    return getLocalProjects(); // Fallback to local if fetch fails (or no internet/key)
  }

  // Use the helper to map properly
  return (data || []).map(mapProjectFromDB);
};

export const createProject = async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project | null> => {


  // Map to snake_case and sanitise (remove camelCase keys irrelevant to DB)
  const dbPayload = {
    title: project.title,
    description: project.description,
    long_description: project.longDescription,
    category: project.category,
    tags: project.tags,
    image: project.image,
    live_demo_url: project.liveDemoUrl,
    github_url: project.githubUrl,
    featured: project.featured,
    status: project.status,
    completed_date: project.completedDate
    // id, created_at, updated_at handled by DB defaults
  };

  const { data, error } = await supabase
    .from('projects')
    .insert([dbPayload])
    .select()
    .single();

  if (error) {
    console.error('Error creating project:', error);
    throw error;
  }

  return mapProjectFromDB(data);
};

export const updateProjectDB = async (id: string, updates: Partial<Project>): Promise<Project | null> => {


   const dbPayload: any = { updated_at: new Date().toISOString() };
   
   if (updates.title !== undefined) dbPayload.title = updates.title;
   if (updates.description !== undefined) dbPayload.description = updates.description;
   if (updates.longDescription !== undefined) dbPayload.long_description = updates.longDescription;
   if (updates.category !== undefined) dbPayload.category = updates.category;
   if (updates.tags !== undefined) dbPayload.tags = updates.tags;
   if (updates.image !== undefined) dbPayload.image = updates.image;
   if (updates.liveDemoUrl !== undefined) dbPayload.live_demo_url = updates.liveDemoUrl;
   if (updates.githubUrl !== undefined) dbPayload.github_url = updates.githubUrl;
   if (updates.featured !== undefined) dbPayload.featured = updates.featured;
   if (updates.status !== undefined) dbPayload.status = updates.status;
   if (updates.completedDate !== undefined) dbPayload.completed_date = updates.completedDate;

  const { data, error } = await supabase
    .from('projects')
    .update(dbPayload)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return mapProjectFromDB(data);
};

// Helper to map back to app types
const mapProjectFromDB = (p: any): Project => ({
  ...p,
  createdAt: p.created_at,
  updatedAt: p.updated_at,
  longDescription: p.long_description,
  liveDemoUrl: p.live_demo_url,
  githubUrl: p.github_url,
  completedDate: p.completed_date
});

export const deleteProjectDB = async (id: string): Promise<boolean> => {


  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting:', error);
    return false;
  }
  return true;
};

// =======================
// SETTINGS SERVICE
// =======================

export const fetchSettings = async (): Promise<PortfolioSettings> => {


  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .limit(1)
    .single();

  if (error) {
    console.warn('Supabase settings error (using local):', error.message);
    return getLocalSettings();
  }
  return data as PortfolioSettings;
};

export const saveSettingsDB = async (settings: PortfolioSettings): Promise<PortfolioSettings | null> => {


  // Check if settings row exists
  const { data: existing, error: checkError } = await supabase
    .from('settings')
    .select('id')
    .limit(1)
    .maybeSingle();

  if (checkError) {
    console.error("Error checking settings:", checkError);
    throw checkError;
  }

  // Sanitize payload
  const dbPayload = {
    name: settings.name,
    title: settings.title,
    bio: settings.bio,
    email: settings.email,
    phone: settings.phone,
    location: settings.location,
    github: settings.github,
    linkedin: settings.linkedin,
    twitter: settings.twitter,
    website: settings.website,
    // Content fields - DB must have these columns or JSONB 'content' column
    greetings: settings.greetings,
    about_description: settings.aboutDescription,
    skills: settings.skills,
    social_links: settings.socialLinks,
    updated_at: new Date().toISOString()
  };

  let result;
  if (existing) {
    // Update
    result = await supabase
      .from('settings')
      .update(dbPayload)
      .eq('id', existing.id)
      .select()
      .single();
  } else {
    // Insert
    result = await supabase
      .from('settings')
      .insert([dbPayload]) // let DB gen ID
      .select()
      .single();
  }

  if (result.error) throw result.error;
  return result.data;
};

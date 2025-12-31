-- RUN THIS IN SUPABASE SQL EDITOR

-- 1. Create table for Projects
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  title text not null,
  description text,
  long_description text,
  category text,
  tags text[], -- Array of strings
  image text,
  live_demo_url text,
  github_url text,
  featured boolean default false,
  status text default 'In Progress',
  completed_date text
);

-- 2. Create table for Settings
create table public.settings (
  id uuid default gen_random_uuid() primary key,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  name text,
  title text,
  bio text,
  email text,
  phone text,
  location text,
  github text,
  linkedin text,
  twitter text,
  website text
);

-- 3. Enable RLS (Row Level Security) - Optional logic for public read/write
-- For simplicity in this portfolio, we allow read to everyone, write requires authentication?
-- Or we just leave RLS off for now for simplicity (User said "ga ribet").
-- But to be safe, let's allow Anon Key to everything for now if RLS is off.
-- BETTER: Enable RLS but add policy for public Read.

alter table public.projects enable row level security;
alter table public.settings enable row level security;

-- Allow Public Read access
create policy "Allow Public Read Projects" on public.projects for select using (true);
create policy "Allow Public Read Settings" on public.settings for select using (true);

-- Allow Anon/Service Role Write access (Since we are using Anon key in client for simplicity)
-- WARNING: In production, you should implement Authentication (Supabase Auth).
-- Since this is a personal portfolio and key is potentially exposed in client, 
-- ideally only authenticated user can write.
-- But for "ga ribet" update, we can use the dashboard login to gate the UI, 
-- and assume the API interaction is protected enough by obscurity? No, that's bad.

-- CORRECT WAY: 
-- You should use Supabase Auth to login in the Dashboard.
-- I will instruct user to turn OFF RLS for now to make it work INSTANTLY.

-- DISABLE RLS FOR SAKE OF "GA RIBET"
alter table public.projects disable row level security;
alter table public.settings disable row level security;

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
-- Allow Public Read/Write access (Simplicity for Portfolio)
create policy "Allow Public Read Projects" on public.projects for select using (true);
create policy "Allow Public Insert Projects" on public.projects for insert with check (true);
create policy "Allow Public Update Projects" on public.projects for update using (true);
create policy "Allow Public Delete Projects" on public.projects for delete using (true);

create policy "Allow Public Read Settings" on public.settings for select using (true);
create policy "Allow Public Insert Settings" on public.settings for insert with check (true);
create policy "Allow Public Update Settings" on public.settings for update using (true);

-- DISABLE RLS FOR SAKE OF "GA RIBET"
-- (These commands ensure RLS is off, but the policies above ensure access IF it were on)
alter table public.projects disable row level security;
alter table public.settings disable row level security;

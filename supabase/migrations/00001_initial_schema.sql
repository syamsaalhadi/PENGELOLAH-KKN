-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create custom types
create type user_role as enum ('admin', 'member');

-- 1. PROFILES TABLE (Extension of auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name varchar(150) not null,
  avatar_url text,
  role user_role default 'member'::user_role not null,
  phone varchar(20),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;

-- 2. PROGRAMS TABLE
create table public.programs (
  id uuid default uuid_generate_v4() primary key,
  name varchar(200) not null,
  description text,
  purpose text,
  target_audience text,
  location varchar(150),
  scheduled_date date,
  status varchar(50) default 'Belum Dimulai' not null,
  pj_id uuid references public.profiles(id) on delete set null,
  category varchar(100),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable RLS for programs
alter table public.programs enable row level security;

-- 3. SCHEDULES TABLE
create table public.schedules (
  id uuid default uuid_generate_v4() primary key,
  schedule_date date not null,
  start_time time not null,
  end_time time not null,
  title varchar(200) not null,
  description text,
  location varchar(150),
  program_id uuid references public.programs(id) on delete set null,
  created_by uuid references public.profiles(id) on delete restrict,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable RLS for schedules
alter table public.schedules enable row level security;

-- 4. RUNDOWNS TABLE
create table public.rundowns (
  id uuid default uuid_generate_v4() primary key,
  program_id uuid references public.programs(id) on delete cascade,
  schedule_id uuid references public.schedules(id) on delete cascade,
  item_time time not null,
  activity_name varchar(250) not null,
  pic varchar(150),
  notes text,
  order_index integer default 0,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable RLS for rundowns
alter table public.rundowns enable row level security;

-- 5. ANNOUNCEMENTS TABLE
create table public.announcements (
  id uuid default uuid_generate_v4() primary key,
  title varchar(200) not null,
  content text not null,
  priority varchar(50) default 'normal',
  created_by uuid references public.profiles(id) on delete restrict,
  published_at timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable RLS for announcements
alter table public.announcements enable row level security;

-- 6. DOCUMENTS TABLE
create table public.documents (
  id uuid default uuid_generate_v4() primary key,
  title varchar(200) not null,
  file_type varchar(50) not null,
  file_url text not null,
  storage_path text not null,
  program_id uuid references public.programs(id) on delete set null,
  uploaded_by uuid references public.profiles(id) on delete restrict,
  created_at timestamptz default now() not null
);

-- Enable RLS for documents
alter table public.documents enable row level security;

-- 7. CHECKLISTS TABLE
create table public.checklists (
  id uuid default uuid_generate_v4() primary key,
  program_id uuid references public.programs(id) on delete cascade not null,
  item_name text not null,
  is_checked boolean default false not null,
  checked_by uuid references public.profiles(id) on delete set null,
  checked_at timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Enable RLS for checklists
alter table public.checklists enable row level security;

-- 8. SETTINGS TABLE
create table public.settings (
  id uuid default uuid_generate_v4() primary key,
  key varchar(100) unique not null,
  value text not null,
  updated_at timestamptz default now() not null
);

-- Enable RLS for settings
alter table public.settings enable row level security;

-----------------------------------------------------
-- CREATE HELPER FUNCTIONS
-----------------------------------------------------

create or replace function public.is_admin()
returns boolean as $$
declare
  is_adm boolean;
begin
  select (role = 'admin'::user_role) into is_adm
  from public.profiles
  where id = auth.uid();
  
  return coalesce(is_adm, false);
end;
$$ language plpgsql security definer;

-----------------------------------------------------
-- CREATE TRIGGERS (Auto-update updated_at)
-----------------------------------------------------

create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_profiles_updated
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger on_programs_updated
  before update on public.programs
  for each row execute procedure public.handle_updated_at();

create trigger on_schedules_updated
  before update on public.schedules
  for each row execute procedure public.handle_updated_at();

create trigger on_rundowns_updated
  before update on public.rundowns
  for each row execute procedure public.handle_updated_at();

create trigger on_announcements_updated
  before update on public.announcements
  for each row execute procedure public.handle_updated_at();

create trigger on_checklists_updated
  before update on public.checklists
  for each row execute procedure public.handle_updated_at();

create trigger on_settings_updated
  before update on public.settings
  for each row execute procedure public.handle_updated_at();

-----------------------------------------------------
-- CREATE TRIGGER FOR NEW USER SIGNUP
-----------------------------------------------------
-- This trigger automatically creates a profile row when a new user signs up

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', 'New User'),
    coalesce((new.raw_user_meta_data->>'role')::public.user_role, 'member'::public.user_role)
  );
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-----------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-----------------------------------------------------

-- Profiles: Anyone authenticated can read, users can update their own, only admin can delete or change roles
create policy "Users can view all profiles" on public.profiles
  for select using (auth.role() = 'authenticated');

create policy "Users can update their own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Admins can update all profiles" on public.profiles
  for update using (public.is_admin());

create policy "Admins can delete profiles" on public.profiles
  for delete using (public.is_admin());

-- Programs: Anyone can read, only admin can insert/update/delete
create policy "Anyone can view programs" on public.programs
  for select using (auth.role() = 'authenticated');

create policy "Admins can insert programs" on public.programs
  for insert with check (public.is_admin());

create policy "Admins can update programs" on public.programs
  for update using (public.is_admin());

create policy "Admins can delete programs" on public.programs
  for delete using (public.is_admin());

-- Schedules: Anyone can read, only admin can insert/update/delete
create policy "Anyone can view schedules" on public.schedules
  for select using (auth.role() = 'authenticated');

create policy "Admins can insert schedules" on public.schedules
  for insert with check (public.is_admin());

create policy "Admins can update schedules" on public.schedules
  for update using (public.is_admin());

create policy "Admins can delete schedules" on public.schedules
  for delete using (public.is_admin());

-- Rundowns: Anyone can read, only admin can insert/update/delete
create policy "Anyone can view rundowns" on public.rundowns
  for select using (auth.role() = 'authenticated');

create policy "Admins can insert rundowns" on public.rundowns
  for insert with check (public.is_admin());

create policy "Admins can update rundowns" on public.rundowns
  for update using (public.is_admin());

create policy "Admins can delete rundowns" on public.rundowns
  for delete using (public.is_admin());

-- Announcements: Anyone can read, only admin can insert/update/delete
create policy "Anyone can view announcements" on public.announcements
  for select using (auth.role() = 'authenticated');

create policy "Admins can insert announcements" on public.announcements
  for insert with check (public.is_admin());

create policy "Admins can update announcements" on public.announcements
  for update using (public.is_admin());

create policy "Admins can delete announcements" on public.announcements
  for delete using (public.is_admin());

-- Documents: Anyone can read, only admin can insert/update/delete
create policy "Anyone can view documents" on public.documents
  for select using (auth.role() = 'authenticated');

create policy "Admins can insert documents" on public.documents
  for insert with check (public.is_admin());

create policy "Admins can update documents" on public.documents
  for update using (public.is_admin());

create policy "Admins can delete documents" on public.documents
  for delete using (public.is_admin());

-- Checklists: Anyone can read, only admin can insert/update/delete
create policy "Anyone can view checklists" on public.checklists
  for select using (auth.role() = 'authenticated');

create policy "Admins can insert checklists" on public.checklists
  for insert with check (public.is_admin());

create policy "Admins can update checklists" on public.checklists
  for update using (public.is_admin());

create policy "Admins can delete checklists" on public.checklists
  for delete using (public.is_admin());

-- Settings: Anyone can read, only admin can insert/update/delete
create policy "Anyone can view settings" on public.settings
  for select using (auth.role() = 'authenticated');

create policy "Admins can insert settings" on public.settings
  for insert with check (public.is_admin());

create policy "Admins can update settings" on public.settings
  for update using (public.is_admin());

create policy "Admins can delete settings" on public.settings
  for delete using (public.is_admin());

-----------------------------------------------------
-- INITIAL DUMMY DATA FOR SETTINGS
-----------------------------------------------------
insert into public.settings (key, value) values
  ('group_name', 'Kelompok KKN 11'),
  ('location', 'Desa Bambang, Kec. Turi, Kab. Lamongan'),
  ('dpl_name', 'Diana Dwi Jayanti, S.Psi., M.Si.'),
  ('start_date', '2026-07-17'),
  ('end_date', '2026-08-16'),
  ('theme_description', 'Pemberdayaan Masyarakat Melalui Optimalisasi Potensi Desa di Era Digital')
on conflict (key) do nothing;

-----------------------------------------------------
-- SUPABASE STORAGE BUCKETS & POLICIES
-----------------------------------------------------
-- Insert the bucket (if it doesn't exist)
insert into storage.buckets (id, name, public)
values ('dokumentasi_kkn', 'dokumentasi_kkn', true)
on conflict (id) do nothing;

-- Storage Policies for 'dokumentasi_kkn' bucket
-- Note: 'dokumentasi_kkn' bucket is public so anyone can view
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'dokumentasi_kkn' );

create policy "Admins can upload files"
  on storage.objects for insert
  with check ( 
    bucket_id = 'dokumentasi_kkn' 
    and auth.role() = 'authenticated'
    and public.is_admin()
  );

create policy "Admins can update files"
  on storage.objects for update
  using ( 
    bucket_id = 'dokumentasi_kkn' 
    and auth.role() = 'authenticated'
    and public.is_admin()
  );

create policy "Admins can delete files"
  on storage.objects for delete
  using ( 
    bucket_id = 'dokumentasi_kkn' 
    and auth.role() = 'authenticated'
    and public.is_admin()
  );

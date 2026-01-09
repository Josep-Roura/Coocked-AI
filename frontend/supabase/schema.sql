-- Cooked-AI / PDEM database schema
-- --------------------------------
-- This script creates the core tables used by the application. It relies on
-- pgcrypto so that gen_random_uuid() is available for UUID defaults.

create extension if not exists "pgcrypto";

-- Table: users
create table if not exists public.users (
  id uuid primary key,
  email text,
  name text,
  language text default 'es',
  two_factor_enabled boolean default false,
  created_at timestamptz default now()
);

-- Table: plans
create table if not exists public.plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  title text not null,
  category text not null,
  full_day_plan jsonb not null,
  workout_type text,
  duration_min integer,
  goal text,
  weight_kg numeric,
  diet_prefs text,
  notes text,
  created_at timestamptz default now()
);

create index if not exists plans_user_id_created_at_idx on public.plans (user_id, created_at desc);

-- Table: adherence_logs
create table if not exists public.adherence_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  plan_id uuid references public.plans(id) on delete cascade,
  taken boolean not null,
  created_at timestamptz default now()
);

create index if not exists adherence_logs_user_id_created_at_idx on public.adherence_logs (user_id, created_at desc);
create index if not exists adherence_logs_plan_id_idx on public.adherence_logs (plan_id);

-- Table: weekly_workouts
create table if not exists public.weekly_workouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  day_index smallint not null,
  start_time text not null,
  end_time text not null,
  session_type text not null,
  intensity text,
  nutrition_json jsonb not null,
  created_at timestamptz default now()
);

create index if not exists weekly_workouts_user_day_idx on public.weekly_workouts (user_id, day_index, start_time);

-- Table: reminders
create table if not exists public.reminders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  enabled boolean default true,
  offset_minutes integer default 30,
  created_at timestamptz default now()
);

create unique index if not exists reminders_user_id_unique on public.reminders (user_id);

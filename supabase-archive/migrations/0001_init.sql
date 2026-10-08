-- Profiles (1:1 with auth.users)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'student' check (role in ('student', 'admin')),
  created_at timestamptz not null default now()
);

create table public.quiz_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  week_id text not null,
  score int,
  total int,
  started_at timestamptz not null default now(),
  finished_at timestamptz
);

-- Append-only attempt events; derive scores/streaks/weak topics from these.
create table public.question_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  session_id uuid references public.quiz_sessions(id) on delete set null,
  question_id text not null,
  week_id text not null,
  selected int not null,
  is_correct boolean not null,
  time_ms int,
  created_at timestamptz not null default now()
);
create index on public.question_attempts (user_id, week_id);
create index on public.question_attempts (user_id, question_id);

create table public.week_progress (
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  week_id text not null,
  sections_read text[] not null default '{}',
  last_position text,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, week_id)
);

create table public.bookmarks (
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  item_id text not null,
  note text,
  created_at timestamptz not null default now(),
  primary key (user_id, item_id)
);

-- Row-level security: users only touch their own rows.
alter table public.profiles enable row level security;
alter table public.quiz_sessions enable row level security;
alter table public.question_attempts enable row level security;
alter table public.week_progress enable row level security;
alter table public.bookmarks enable row level security;

create policy "own profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "own sessions" on public.quiz_sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own attempts" on public.question_attempts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own progress" on public.week_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own bookmarks" on public.bookmarks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Auto-create a profile on signup.
create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)));
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

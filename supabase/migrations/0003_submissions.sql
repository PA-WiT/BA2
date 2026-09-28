-- Homework submissions + admin review.

-- `email` on profiles so the admin list can show who submitted without querying `auth.users`
-- (not exposed to the anon/authenticated roles via PostgREST anyway).
alter table public.profiles add column email text;

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, display_name, email)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)), new.email);
  return new;
end $$;

-- Admins can see every profile (for the admin submissions list) and every submission.
create function public.is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

create policy "admin read all profiles" on public.profiles
  for select using (public.is_admin());

create table public.homework_submissions (
  id uuid primary key default gen_random_uuid(),
  -- References profiles (not auth.users) so PostgREST can embed profiles(email, display_name)
  -- in the admin list; profiles.id already 1:1 mirrors auth.users.id via its own FK.
  user_id uuid not null references public.profiles(id) on delete cascade default auth.uid(),
  week_id text not null,
  content text not null,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'rejected')),
  feedback text,
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id),
  unique (user_id, week_id)
);

alter table public.homework_submissions enable row level security;

-- No insert/update policy: all writes go through the two functions below (security definer,
-- bypass RLS internally), so a client can never set its own status/feedback directly.
create policy "read own submissions" on public.homework_submissions
  for select using (auth.uid() = user_id);
create policy "admin read all submissions" on public.homework_submissions
  for select using (public.is_admin());

-- Student writes: upsert your own submission, always re-entering the review queue as 'pending'.
create function public.submit_homework(p_week_id text, p_content text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.homework_submissions (user_id, week_id, content, status, feedback, reviewed_at, reviewed_by)
  values (auth.uid(), p_week_id, p_content, 'pending', null, null, null)
  on conflict (user_id, week_id) do update
    set content = excluded.content,
        status = 'pending',
        feedback = null,
        reviewed_at = null,
        reviewed_by = null,
        submitted_at = now();
end;
$$;
grant execute on function public.submit_homework(text, text) to authenticated;

-- Admin writes: the function itself gates on is_admin(), not a table policy.
create function public.review_submission(p_submission_id uuid, p_status text, p_feedback text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not public.is_admin() then
    raise exception 'not authorized';
  end if;
  if p_status not in ('pending', 'accepted', 'rejected') then
    raise exception 'invalid status';
  end if;
  update public.homework_submissions
    set status = p_status,
        feedback = p_feedback,
        reviewed_at = now(),
        reviewed_by = auth.uid()
    where id = p_submission_id;
end;
$$;
grant execute on function public.review_submission(uuid, text, text) to authenticated;

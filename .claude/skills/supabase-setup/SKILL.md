---
name: supabase-setup
description: Set up or repair the Supabase backend for this app (project, env vars, migrations, auth, RLS). Use when connecting the app to Supabase for the first time, when auth/DB calls fail, or when adding a table.
---

# Supabase setup

## First-time setup
1. User creates a project at supabase.com (free tier). Never create accounts or enter keys for them.
2. Copy `.env.example` to `.env.local`; user fills `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (Project Settings > API). Only the **anon** key goes in the frontend. Never use or commit the `service_role` key.
3. Apply `supabase/migrations/*.sql` in order: paste into the Dashboard SQL editor, or use the CLI:
   `npx supabase login && npx supabase link --project-ref <ref> && npx supabase db push`
4. Auth: Dashboard > Authentication > Providers. Enable Email. For dev, consider turning off "Confirm email". Add Site URL and Redirect URLs (`http://localhost:5173`, later the production URL).
5. Generate types: `npx supabase gen types typescript --project-id <ref> > src/lib/database.types.ts`, then pass `Database` to `createClient<Database>()` in `src/lib/supabase.ts`.

## Rules for schema changes
- New file per change: `supabase/migrations/000N_<name>.sql`. Never edit an applied migration.
- Every table gets `alter table ... enable row level security` AND a policy. A table with RLS on and no policy is unreadable; RLS off means public.
- User-owned tables have `user_id uuid not null default auth.uid()` and a policy `auth.uid() = user_id` for both `using` and `with check`.
- Attempts are append-only events; derive aggregates with views or queries.

## Checklist when something fails
- Empty results: RLS policy missing or user not logged in.
- 401/JWT errors: wrong env vars or stale dev server (restart after editing `.env.local`).
- Insert rejected: `with check` failing, usually a missing `user_id` default.

## Promoting a user to admin
There is no in-app "become admin" button — that would be a privilege-escalation hole. To let a
signed-up user access `/admin/submissions`, run this in the Supabase SQL editor (Dashboard):
```sql
update public.profiles set role = 'admin' where email = 'their@email.com';
```
Find their `email`/`id` first with `select id, email from public.profiles;` if needed.

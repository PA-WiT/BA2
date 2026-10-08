---
name: add-progress-feature
description: Add a new user-progress feature backed by Supabase (table + RLS + TanStack Query hook + UI). Use for things like bookmarks, notes, streaks, spaced repetition, or new tracked events.
---

# Add a progress feature

1. **Table**: new migration `supabase/migrations/000N_<feature>.sql` with `user_id uuid not null default auth.uid()`, RLS enabled, own-rows policy (see `supabase-setup`).
2. **Types**: regenerate `src/lib/database.types.ts`.
3. **Hooks**: in `src/features/<feature>/api.ts`, wrap calls in TanStack Query:
   - `useQuery({ queryKey: ['<feature>', userId, ...], queryFn })` for reads
   - `useMutation` + `queryClient.invalidateQueries` for writes
   Import the client only from `src/lib/supabase.ts`.
4. **UI**: components in `src/features/<feature>/`, routed from `src/app/router.tsx`. All strings via `useTranslation()` with EN and FA keys; layout must work in RTL (use logical CSS properties: `margin-inline-start`, etc.).
5. **Derived stats**: compute from append-only events (`question_attempts`) via a Postgres view or client-side, not stored counters.
6. **Check**: `npm run build && npm run lint`; test with two users to confirm RLS isolates data.

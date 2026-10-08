# Supabase archive

Auth, homework submissions and server-side progress tracking, removed from this app in favour of a fully open, static site (progress now lives in localStorage: `src/features/progress/localProgress.ts`). Kept here, outside `src/`, so it can be reused in another project. Nothing in this folder is built, type-checked or imported by the app.

## Contents
| Path | What it is |
| --- | --- |
| `migrations/0001–0005` | Postgres schema with RLS: `profiles` (role student/admin), `week_progress`, `quiz_sessions`, `question_attempts`, `submissions`, homework links + deadlines, `mark_section_read` RPC. Apply in order. |
| `lib/supabase.ts` | Client from `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` (anon key only in the frontend). |
| `lib/auth.ts` | Sign up / in / out, update email or password, password-reset email. |
| `features/auth/` | `AuthProvider` (session + profile context, `useAuth`), Login, Reset password, Settings, `RequireAuth` / `RequireAdmin` route guards. |
| `features/submissions/` | Student submissions page (report text + Google Drive link, deadlines) and admin review page (accept/reject + feedback). |
| `features/progress/api.ts`, `features/quiz/api.ts` | TanStack Query mutations: mark section read, record quiz attempt. |
| `components/LockedSection.tsx`, `components/locked-section.css`, `content/access.ts` | "First 2 sections free, sign up for the rest" gate (`week.preview` flag). |
| `skills/` | Claude Code skills `supabase-setup` and `add-progress-feature`; copy into `.claude/skills/` of the new project. |
| `i18n-keys.ts` | EN/AR/FA strings these components use; merge into the i18next resources. |
| `.env.example` | Env vars to fill in `.env.local`. |

## Reusing it
1. `npm install @supabase/supabase-js @tanstack/react-query react-router-dom react-i18next i18next`
2. Create a Supabase project, run the migrations in order, fill `.env.local` from `.env.example`.
3. Copy `lib/` and `features/` into `src/`. Imports are relative to their original locations (`src/lib`, `src/features/...`, `src/components/content/content.module.css`), so adjust paths to match the new layout.
4. Wrap the app in `<QueryClientProvider>` + `<AuthProvider>` and add routes for `login`, `reset-password`, `settings`, `submissions`, `admin/submissions` (guarded with `RequireAuth` / `RequireAdmin`).
5. Add the Supabase Site URL / redirect URLs for your domain (password reset links go to `/reset-password`).

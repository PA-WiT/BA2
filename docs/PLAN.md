# Roadmap

## 0. Done
Vite + React + TS scaffold, router placeholders, i18n (EN/FA + RTL), Supabase client, initial schema with RLS (`supabase/migrations/0001_init.sql`).

## 1. Supabase project — done ✅ (2026-09-27)
1. ~~Create a project at supabase.com.~~ Done — project `nlyossxxegkwuflgqcja`.
2. ~~`cp .env.example .env.local` and fill URL + anon key.~~ Done — `.env.local` has `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (project's publishable key).
3. ~~Run `0001_init.sql` in the SQL editor.~~ Done — tables + RLS live.
4. **Still open:** Auth > Providers — enable Email, add `http://localhost:5173` to redirect URLs.
5. **Still open:** generate types: `npx supabase gen types typescript --project-id nlyossxxegkwuflgqcja > src/lib/database.types.ts`, then `createClient<Database>(url, key)` in `src/lib/supabase.ts`. Needs `npx supabase login` first (personal access token from the Supabase dashboard).

## 2. Auth
Login/signup page, `AuthProvider` (session via `supabase.auth.onAuthStateChange`), `RequireAuth` route guard. Replaces `auth-gate.js` + `students.json`.

OAuth providers (Google/GitHub) intentionally left disabled for now — Email only.

**Later:** custom username + password login. Supabase Auth is email-based natively, so plan is a `usernames` table (`username` unique → `user_id`/`email`), RLS: publicly readable by username only (no other columns), or a `security definer` RPC that resolves `username → email` server-side. Client then calls `signInWithPassword({ email, password })` with the resolved email. Do this as its own step once email auth is proven out.

## 3. Layout and design — done ✅ (2026-09-27)
Ported from `../course/_shared/styles/week.css`/`week.js`:
- `src/styles/tokens.css` (color variables, light/dark via `data-theme`)
- `src/styles/global.css` (base typography, RTL font swap)
- `src/features/theme/useTheme.ts` (persisted theme, replaces the old `ba-theme` localStorage script)
- `src/components/TopBar.tsx` (EN/FA switch + theme toggle, wired to i18next; `fa` flips `<html dir>` via `src/i18n/index.ts`)
- `src/components/AppShell.tsx` + `AppShell.module.css` (sidebar/main shell, ported from `.shell`/`.sidebar`/`.main`), driven by `src/content/nav.ts` (placeholder nav — replace with real data once weeks are migrated)
- Wired as a layout route in `src/app/router.tsx`

Not ported yet (add when needed): contents-panel overlay, tabs, boxes (analogy/mistake/keypoint/example), code-block, diagram figure, exercise styles — these come with the quiz engine (step 5) and week-page rendering (step 4).

**Visual check not yet done** — run `npm run dev` and open `http://localhost:5173` to eyeball the shell, language toggle and dark mode before building on top of it.

## 4. Week page

## 4. Week page — done ✅ (2026-09-27), partially
Built the content model + renderer, and migrated **2 of week 1's 11 sections** (welcome, sampling) as proof:
- `src/content/types.ts`: `Week`/`Section`/`Block`/`Question`, all text as `Localized` (`{en, fa}`, fa falls back to en)
- `src/content/weeks/week-01.ts`: cover + 2 sections + **all 9** week-1 questions (converted from `../course/_shared/question-banks/week-01.questions.js`, letter answers → option index)
- `src/content/useLocalized.ts`: picks the active-language string via i18next
- `src/components/content/`: `Cover`, `SectionView`, `Blocks` (dispatches `html`/`objectives`/`box`/`code`/`diagram`/`exercise`), `CodeBlock` (with copy button), `content.module.css` (ported from `week.css`: sections, objectives, boxes, code blocks, diagrams, exercise, cover — all scoped under one class so they don't leak globally)
- `src/features/quiz/Exercise.tsx`: local-state graded multiple-choice, not yet persisted
- `src/features/weeks/WeekPage.tsx`: routed at `/week/:id`
- Diagram asset copied to `public/figures/week-01/diagram-01.svg`

**Visually verified** in the browser: dark mode, EN/FA + RTL flip (sidebar, box borders, text direction all correct), code block + copy button, diagram figure, exercise grading (correct/incorrect feedback) all work.

**Not done — remaining 9 sections of week 1** (avg-count-sum, stddev, groupby-freq, median, groupby-segment, ai-corner, worked-example, common-mistakes, homework, before-week-2): use the `migrate-week-content` skill. Arabic (`ar`) text exists in the source but isn't wired in (`Localized` only has `en`/`fa`) — add it if needed. `.formula`/`.steps`-specific CSS wasn't ported (not needed yet; the ordered-list and generic box styles cover what's used so far).

## 5. Quiz engine
Question component, scoring, results (local state first). Then persist: create `quiz_sessions` row, insert `question_attempts` per answer.

## 6. Progress and dashboard
Section-read tracking + resume position (`week_progress`). Dashboard: completion per week, accuracy, weak topics, streak.

## 7. Migrate remaining weeks
Use `migrate-week-content` skill per week (BA1 recap, weeks 0-2, ...).

## 8. Extra features
Review-missed mode, spaced repetition, timed exam mode, notes/bookmarks, admin cohort view (needs an admin RLS policy based on `profiles.role`).

## 9. Deploy
Vercel/Netlify with env vars set; add production URL to Supabase Site URL/Redirect URLs. Add a tests pass (Vitest) before launch.

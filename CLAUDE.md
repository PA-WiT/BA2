# Course React: working conventions

Vite + React + TypeScript study app with Supabase (auth + Postgres). Successor to the static site in `../course`, which remains the content source.

## Commands
- `npm run dev`: dev server
- `npm run build`: type-check + build
- `npm run lint`: oxlint

## Conventions
- Features live in `src/features/<name>/`; shared UI in `src/components/`.
- Supabase client only via `src/lib/supabase.ts`; frontend uses the anon key only.
- Every table has RLS. Schema changes = new migration file, never edit applied ones.
- Question IDs are stable (`wXX-qNNN`); progress rows reference them.
- All user-facing strings go through i18next (EN + FA); use logical CSS properties for RTL.
- Secrets in `.env.local` (git-ignored).

## Skills
`supabase-setup`, `migrate-week-content`, `add-progress-feature` in `.claude/skills/`.

Roadmap: `docs/PLAN.md`.

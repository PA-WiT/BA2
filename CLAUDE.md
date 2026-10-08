# Course React: working conventions

Vite + React + TypeScript study app, fully static (no accounts, no backend), deployed to GitHub Pages. Successor to the static site in `../course`, which remains the content source.

## Commands
- `npm run dev`: dev server
- `npm run build`: type-check + build
- `npm run lint`: oxlint

## Conventions
- Features live in `src/features/<name>/`; shared UI in `src/components/`.
- All content is open to everyone. Reading + quiz progress is stored in the browser via `src/features/progress/localProgress.ts` (wrap every storage access in try/catch).
- Question IDs are stable (`wXX-qNNN`); stored progress references them.
- All user-facing strings go through i18next (EN + FA, AR where present); use logical CSS properties for RTL.
- `supabase-archive/` holds the removed Supabase auth/submissions code for reuse elsewhere. Don't import it from `src/`.

## Skills
`migrate-week-content` in `.claude/skills/`.

Roadmap: `docs/PLAN.md`.

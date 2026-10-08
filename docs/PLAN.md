# Roadmap

## Status (2026-10-08)
- **Static site, no backend.** Supabase auth, homework submissions and server-side progress were removed. The code, migrations and skills are kept in `supabase-archive/` for reuse in another project (see its README). Homework is still handed in by sharing a Google Drive folder with the mentor (text in `src/content/weeks/homework/shared.ts`).
- **Content migrated:** BA1 recap, weeks 0–4 (with homework for weeks 1–4, original PDFs, print/save-as-PDF).
- **Progress:** quiz answers and sections read are saved in localStorage (`src/features/progress/localProgress.ts`, key `ba2-progress-v1`). The home page shows each week as a card with its % read, the sidebar ticks read sections, and the Course Contents list shows % per started week. The % counts sections read out of the week's section list, saved the first time the week is opened.
- **Shell:** sidebar with scroll-spy, Course Contents panel, EN/AR/FA + RTL, light/dark theme, code-split routes, GitHub Pages deploy (`.github/workflows/deploy.yml`).

## Next
1. **Progress dashboard** at `/dashboard` (currently a placeholder): sections read and quiz accuracy per week, "continue where you left off", reset button.
2. **Untranslated strings**: `Exercise.tsx` labels/feedback, theme toggle `aria-label`, sidebar brand.
3. **Migrate remaining weeks** with the `migrate-week-content` skill.
4. **Extras**: review-missed mode, progress export/import (JSON), spaced repetition, timed exam mode, notes/bookmarks.
5. **Tests** (Vitest): `localProgress`, `useLocalized` fallback, registry ↔ nav consistency, content checks (unique question IDs, exercise refs, diagram files exist).

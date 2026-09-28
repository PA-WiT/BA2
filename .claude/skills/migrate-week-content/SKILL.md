---
name: migrate-week-content
description: Convert a week from the old static course repo (question bank .js + i18n strings .js) into typed content modules in src/content. Use when porting a week (e.g. "migrate week 2").
---

# Migrate a week's content

Source repo: `/home/rami/Documents/Work/course`
- Questions: `_shared/question-banks/week-XX.questions.js`
- Translations (EN/Arabic/Persian): `_shared/i18n/week-XX.strings.js`
- Figures: `_shared/figures/week-XX/*.svg`
- Study guide HTML: `ba2/study-guides/week-XX/index.html`

## Steps
1. Read the source files; note their shape (they are plain JS globals, not modules).
2. Write `src/content/weeks/week-XX.ts` exporting a `Week` (see `src/content/types.ts`).
3. Assign **stable IDs**: `wXX-qNNN` (zero-padded, in source order). Never renumber later.
4. Populate `en`, `ar`, and `fa` directly on every `Localized` field (question prompts/options, section headings, block text, `Section.navLabel`, etc.) — all three languages live inline in `src/content/weeks/week-XX.ts`, there is no separate locales directory. `ar` is a first-class language now, not an optional extra — always pull it from the source alongside `en`/`fa`.
5. Reuse the existing `Block` variants (`html`, `objectives`, `box`, `code`, `diagram`, `exercise`, `formula`, `table`, `tabs`) before adding a new one. `formula` is for a standalone equation + note (e.g. `AVG(x) = SUM(x) / COUNT(x)`), `table` for a headers/rows table, `tabs` for the AI-corner-style weak/strong-prompt panels (recurses into more `Block`s).
6. Give every `Section` a short `navLabel` (sidebar text, e.g. "Choosing your sample") distinct from its fuller `headingHtml` — pull this from the old page's `sidebar.N` i18n entry's anchor text, one per section id. Sections without a per-section time estimate (e.g. reference/homework sections) can omit `timeEst`.
7. Copy SVGs to `public/figures/week-XX/*.svg` and reference them as `/figures/week-XX/diagram-NN.svg`.
8. Register the week in `src/content/index.ts`.
9. Run `npm run build` to type-check. Do not change the original repo.

## Notes
- Prefer a one-off Node script in `scripts/` for bulk conversion, then hand-check a sample.
- Keep answers as option indexes; verify each converted answer against the source.
- `src/content/access.ts`'s free-preview rule (`week.order <= 2 && sectionIndex < 2`) is data-driven — a newly migrated week needs no special handling, it's automatically free or gated based on its `order` and section position.

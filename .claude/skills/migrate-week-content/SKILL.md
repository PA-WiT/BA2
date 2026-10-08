---
name: migrate-week-content
description: Convert a week from the old static course repo (question bank .js + i18n strings .js) into typed content modules in src/content. Use when porting a week (e.g. "migrate week 2").
---

# Migrate a week's content

Source repo: `c:\Users\r.alkhateeb\Desktop\Rami\course` (older docs cite `/home/rami/Documents/Work/course`)
- Questions: `_shared/question-banks/week-XX.questions.js`
- Translations (EN/Arabic/Persian): `_shared/i18n/week-XX.strings.js`
- Figures: `_shared/figures/week-XX/*.svg`
- Study guide HTML: `ba2/study-guides/week-XX/index.html`
- Raw deck text and PDFs: `ba-source-materials/ba2-week-XX.md` and `ba-source-materials/Business Analytics 2/*.pdf` (filenames are irregular, don't derive them).

The static site only has pages, question banks and i18n for the recap and weeks 0–2. For any later week those files don't exist: author `src/content/weeks/week-XX.ts` fresh from the `ba2-week-XX.md` deck text (see `week-03.ts` for an example), and note in the file header where it departs from the deck.

## Steps
1. Read the source files; note their shape (they are plain JS globals, not modules).
2. Write `src/content/weeks/week-XX.ts` exporting a `Week` (see `src/content/types.ts`).
3. Assign **stable IDs**: `wXX-qNNN` (zero-padded, in source order). Never renumber later.
4. Populate `en`, `ar`, and `fa` directly on every `Localized` field (question prompts/options, section headings, block text, `Section.navLabel`, etc.) — all three languages live inline in `src/content/weeks/week-XX.ts`, there is no separate locales directory. `ar` is a first-class language now, not an optional extra — always pull it from the source alongside `en`/`fa`.
5. Reuse the existing `Block` variants (`html`, `objectives`, `takeaways`, `box`, `code`, `diagram`, `exercise`, `formula`, `table`, `tabs`, `homework`) before adding a new one. `tabs` no longer switches: every variant (e.g. Excel / Python / Power BI) is rendered stacked and labelled so it all shows on screen and in saved PDFs. For a week's homework section use one `homework` block (in `src/content/weeks/homework/week-NN.ts`, see weeks 1–3): 3–4 questions, each with a short `prompt`, an everyday `analogy`, an `include` checklist, and an `example` answer built from existing blocks and worked on a *smaller slice of the same data* (e.g. one region, one flavor, one month; recompute every number from the week's data). Add `objectives`, a `notice` (deadline and/or the shared `driveNotice`/`deadlineNotice` from `homework/shared.ts`), and `feedback: feedbackTask`. `formula` is for a standalone equation + note (e.g. `AVG(x) = SUM(x) / COUNT(x)`), `table` for a headers/rows table, `tabs` for the AI-corner-style weak/strong-prompt panels (recurses into more `Block`s).
6. Give every `Section` a short `navLabel` (sidebar text, e.g. "Choosing your sample") distinct from its fuller `headingHtml` — pull this from the old page's `sidebar.N` i18n entry's anchor text, one per section id. Sections without a per-section time estimate (e.g. reference/homework sections) can omit `timeEst`.
7. Copy SVGs to `public/figures/week-XX/*.svg` and reference them as `/figures/week-XX/diagram-NN.svg`.
8. Register the week in **both** `src/content/registry.ts` (add a lazy loader: `'week-NN': () => import('./weeks/week-NN').then((m) => m.weekNN)`, so each week stays its own chunk) and `src/content/nav.ts` (the BA2 `navGroups` entry, with EN/AR/FA titles). Without the `nav.ts` entry the week won't appear on the Home page, in the sidebar, or in prev/next navigation.
9. Original slides: copy the week's source PDF to `public/originals/week-NN.pdf` and set `originalPdf: '/originals/week-NN.pdf'` on the week object (it drives the "View original PDF" button). The week -> source filename table is in `../course/.claude/skills/ba2-week-tools/SKILL.md`; filenames are irregular, so look them up rather than deriving them. Weeks without a source deck omit `originalPdf` (the "Save as PDF" button always shows).
9. Run `npm run build` to type-check. Do not change the original repo.

## Notes
- Prefer a one-off Node script in `scripts/` for bulk conversion, then hand-check a sample.
- Keep answers as option indexes; verify each converted answer against the source.

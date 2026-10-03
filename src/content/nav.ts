import type { Localized } from './types'

// Full course nav, used by the Course Contents panel and the Home page (src/components/WeeksList.tsx).
// Weeks not yet migrated (no loader in src/content/registry.ts) show a "soon" badge automatically.
export interface NavGroup {
  label: Localized
  items: { id: string; title: Localized; href: string; /** Has a 'homework' section, so it appears on /submissions. */ homework?: true }[]
}

export const navGroups: NavGroup[] = [
  {
    label: { en: 'BA1 Recap', ar: 'مراجعة BA1', fa: 'مرور BA1' },
    items: [{ id: 'ba1-recap', title: { en: 'Recap', ar: 'مراجعة', fa: 'مرور' }, href: '/week/ba1-recap' }],
  },
  {
    label: { en: 'BA2', ar: 'BA2', fa: 'BA2' },
    items: [
      { id: 'week-00', title: { en: 'Week 0', ar: 'الأسبوع 0', fa: 'هفته ۰' }, href: '/week/week-00' },
      { id: 'week-01', title: { en: 'Week 1', ar: 'الأسبوع 1', fa: 'هفته ۱' }, href: '/week/week-01', homework: true },
      { id: 'week-02', title: { en: 'Week 2', ar: 'الأسبوع 2', fa: 'هفته ۲' }, href: '/week/week-02', homework: true },
      { id: 'week-03', title: { en: 'Week 3', ar: 'الأسبوع 3', fa: 'هفته ۳' }, href: '/week/week-03', homework: true },
    ],
  },
]

/** Flattened course sequence, in reading order — used to find a week's prev/next neighbor
 *  (see src/components/content/WeekNav.tsx). Not-yet-migrated weeks stay in this list so a
 *  "coming soon" nav button can still show their title. */
export const flatNav = navGroups.flatMap((g) => g.items)

/** Weeks that assign homework — the ones covered by /submissions. Flag them in `navGroups` above. */
export const homeworkNav = flatNav.filter((item) => item.homework)

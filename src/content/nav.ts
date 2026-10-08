import type { Localized } from './types'

// Full course nav, used by the Course Contents panel (src/components/WeeksList.tsx) and the Home page's
// week cards (src/components/WeekCards.tsx).
// Weeks not yet migrated (no loader in src/content/registry.ts) show a "soon" badge automatically.
export interface NavGroup {
  label: Localized
  items: {
    id: string
    title: Localized
    href: string
    /** Topic shown under the title on the home page's week cards (from the week's cover heading). */
    subtitle?: Localized
  }[]
}

export const navGroups: NavGroup[] = [
  {
    label: { en: 'BA1 Recap', ar: 'مراجعة BA1', fa: 'مرور BA1' },
    items: [
      {
        id: 'ba1-recap',
        title: { en: 'Recap', ar: 'مراجعة', fa: 'مرور' },
        href: '/week/ba1-recap',
        subtitle: { en: 'Your Analytics Field Guide', ar: 'دليلك الميداني في التحليلات', fa: 'راهنمای میدانی تحلیل تو' },
      },
    ],
  },
  {
    label: { en: 'BA2', ar: 'BA2', fa: 'BA2' },
    items: [
      {
        id: 'week-00',
        title: { en: 'Week 0', ar: 'الأسبوع 0', fa: 'هفته ۰' },
        href: '/week/week-00',
        subtitle: { en: 'Introduction to Business Analytics', ar: 'مقدمة في تحليلات الأعمال', fa: 'مقدمه‌ای بر تحلیل کسب‌وکار' },
      },
      {
        id: 'week-01',
        title: { en: 'Week 1', ar: 'الأسبوع 1', fa: 'هفته ۱' },
        href: '/week/week-01',
        subtitle: { en: 'Statistics at Scale', ar: 'الإحصاء على نطاق واسع', fa: 'آمار در مقیاس بزرگ' },
      },
      {
        id: 'week-02',
        title: { en: 'Week 2', ar: 'الأسبوع 2', fa: 'هفته ۲' },
        href: '/week/week-02',
        subtitle: { en: 'Calculating Metrics', ar: 'حساب المقاييس', fa: 'محاسبهٔ معیارها' },
      },
      {
        id: 'week-03',
        title: { en: 'Week 3', ar: 'الأسبوع 3', fa: 'هفته ۳' },
        href: '/week/week-03',
        subtitle: { en: 'Visualizing Data', ar: 'تصوير البيانات', fa: 'مصورسازی داده‌ها' },
      },
      {
        id: 'week-04',
        title: { en: 'Week 4', ar: 'الأسبوع 4', fa: 'هفته ۴' },
        href: '/week/week-04',
        subtitle: { en: 'Data Preparation', ar: 'تحضير البيانات', fa: 'آماده‌سازی داده' },
      },
    ],
  },
]

/** Flattened course sequence, in reading order — used to find a week's prev/next neighbor
 *  (see src/components/content/WeekNav.tsx). Not-yet-migrated weeks stay in this list so a
 *  "coming soon" nav button can still show their title. */
export const flatNav = navGroups.flatMap((g) => g.items)

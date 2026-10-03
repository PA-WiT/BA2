import type { Week } from './types'

// One dynamic import per week so each lands in its own chunk. Add a loader here (and a nav entry in
// nav.ts) when the migrate-week-content skill adds a week.
const weekLoaders: Record<string, () => Promise<Week>> = {
  'ba1-recap': () => import('./weeks/ba1-recap').then((m) => m.ba1Recap),
  'week-00': () => import('./weeks/week-00').then((m) => m.weekZero),
  'week-01': () => import('./weeks/week-01').then((m) => m.weekOne),
  'week-02': () => import('./weeks/week-02').then((m) => m.weekTwo),
  'week-03': () => import('./weeks/week-03').then((m) => m.weekThree),
}

export const hasWeek = (id: string) => id in weekLoaders

export const loadWeek = (id: string) => weekLoaders[id]()

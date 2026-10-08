import { useSyncExternalStore } from 'react'

/** Reading + quiz progress, kept in this browser's localStorage (there are no accounts).
 *  Every access is wrapped in try/catch: storage can be unavailable (private mode, blocked site data),
 *  and the app must keep working without it — progress then lasts only until the page reloads.
 *  Components read it through useProgress()/useWeekProgress(), which re-render on every change. */

const STORAGE_KEY = 'ba2-progress-v1'

export interface Attempt {
  selected: number
  isCorrect: boolean
  /** ISO timestamp of the answer */
  at: string
}

interface Progress {
  /** weekId → section ids the reader has scrolled to */
  sectionsRead: Record<string, string[]>
  /** weekId → the week's section ids, saved when the week is opened. Lets the home page show a
   *  percentage without downloading every week's content chunk. */
  weekSections: Record<string, string[]>
  /** questionId (stable `wXX-qNNN`) → last answer */
  attempts: Record<string, Attempt>
}

const empty = (): Progress => ({ sectionsRead: {}, weekSections: {}, attempts: {} })

function read(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return empty()
    const parsed = JSON.parse(raw) as Partial<Progress>
    return {
      sectionsRead: parsed.sectionsRead ?? {},
      weekSections: parsed.weekSections ?? {},
      attempts: parsed.attempts ?? {},
    }
  } catch {
    return empty()
  }
}

// One parsed snapshot shared by every reader; replaced (never mutated) on each write, as
// useSyncExternalStore requires a stable reference between changes.
let snapshot: Progress | null = null
const listeners = new Set<() => void>()

const getSnapshot = () => (snapshot ??= read())

function commit(next: Progress) {
  snapshot = next
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // Storage full or unavailable — progress lives in memory for this page load only.
  }
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

// Another tab changed progress: drop the cached snapshot and re-render.
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key !== null && e.key !== STORAGE_KEY) return
    snapshot = null
    listeners.forEach((l) => l())
  })
}

export function markSectionRead(weekId: string, sectionId: string) {
  const progress = getSnapshot()
  const done = progress.sectionsRead[weekId] ?? []
  if (done.includes(sectionId)) return
  commit({ ...progress, sectionsRead: { ...progress.sectionsRead, [weekId]: [...done, sectionId] } })
}

export function setWeekSections(weekId: string, sectionIds: string[]) {
  const progress = getSnapshot()
  if (progress.weekSections[weekId]?.join() === sectionIds.join()) return
  commit({ ...progress, weekSections: { ...progress.weekSections, [weekId]: sectionIds } })
}

export function recordAttempt(questionId: string, selected: number, isCorrect: boolean) {
  const progress = getSnapshot()
  commit({
    ...progress,
    attempts: { ...progress.attempts, [questionId]: { selected, isCorrect, at: new Date().toISOString() } },
  })
}

export const getAttempt = (questionId: string): Attempt | undefined => getSnapshot().attempts[questionId]

export function resetProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Storage unavailable — clearing the in-memory snapshot below is all there is to do.
  }
  snapshot = empty()
  listeners.forEach((l) => l())
}

export const useProgress = () => useSyncExternalStore(subscribe, getSnapshot)

export interface WeekProgress {
  readIds: Set<string>
  read: number
  /** 0 until the week has been opened once (its section list isn't known before that). */
  total: number
  percent: number
}

export function weekProgress(progress: Progress, weekId: string): WeekProgress {
  const ids = progress.weekSections[weekId] ?? []
  const done = new Set(progress.sectionsRead[weekId] ?? [])
  // Intersect with the current section list so ids of renamed/removed sections don't count.
  const readIds = new Set(ids.filter((id) => done.has(id)))
  const total = ids.length
  return { readIds, read: readIds.size, total, percent: total ? Math.round((readIds.size / total) * 100) : 0 }
}

export function useWeekProgress(weekId: string | undefined): WeekProgress {
  const progress = useProgress()
  return weekProgress(progress, weekId ?? '')
}

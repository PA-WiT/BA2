/** Reading + quiz progress, kept in this browser's localStorage (there are no accounts).
 *  Every access is wrapped in try/catch: storage can be unavailable (private mode, blocked site data),
 *  and the app must keep working without it — progress just isn't remembered then. */

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
  /** questionId (stable `wXX-qNNN`) → last answer */
  attempts: Record<string, Attempt>
}

const empty = (): Progress => ({ sectionsRead: {}, attempts: {} })

function load(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return empty()
    const parsed = JSON.parse(raw) as Partial<Progress>
    return { sectionsRead: parsed.sectionsRead ?? {}, attempts: parsed.attempts ?? {} }
  } catch {
    return empty()
  }
}

function save(progress: Progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // Storage full or unavailable — progress simply isn't persisted.
  }
}

export function markSectionRead(weekId: string, sectionId: string) {
  const progress = load()
  const read = progress.sectionsRead[weekId] ?? []
  if (read.includes(sectionId)) return
  progress.sectionsRead[weekId] = [...read, sectionId]
  save(progress)
}

export const getSectionsRead = (weekId: string): string[] => load().sectionsRead[weekId] ?? []

export function recordAttempt(questionId: string, selected: number, isCorrect: boolean) {
  const progress = load()
  progress.attempts[questionId] = { selected, isCorrect, at: new Date().toISOString() }
  save(progress)
}

export const getAttempt = (questionId: string): Attempt | undefined => load().attempts[questionId]

export function resetProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Nothing stored or storage unavailable — nothing to reset.
  }
}

import type { Week } from './types'

/** First two sections of week.preview weeks are free for anyone; everything else needs a session.
 *  Once signed in, everything is open — this only gates logged-out visitors. */
export function isSectionFree(week: Week, sectionIndex: number) {
  return Boolean(week.preview) && sectionIndex < 2
}

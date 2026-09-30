import type { Week } from './types'
import { ba1Recap } from './weeks/ba1-recap'
import { weekZero } from './weeks/week-00'
import { weekOne } from './weeks/week-01'
import { weekTwo } from './weeks/week-02'
import { weekThree } from './weeks/week-03'

// Filled by the migrate-week-content skill, one module per week.
export const weeks: Week[] = [ba1Recap, weekZero, weekOne, weekTwo, weekThree]

export const getWeek = (id: string) => weeks.find((w) => w.id === id)

export const getQuestion = (id: string) => weeks.flatMap((w) => w.questions).find((q) => q.id === id)

/** Weeks that assign homework (have a 'homework' section) — the ones covered by /submissions. */
export const getHomeworkWeeks = () => weeks.filter((w) => w.sections.some((s) => s.id === 'homework'))

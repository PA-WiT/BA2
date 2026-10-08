export type Lang = 'en' | 'ar' | 'fa'

/** Text with an English original and Arabic/Persian translations; ar/fa fall back to en. */
export interface Localized {
  en: string
  ar?: string
  fa?: string
}

export interface Question {
  /** Stable ID, e.g. "w01-q003". Never change once shipped: progress rows reference it. */
  id: string
  weekId: string
  topic?: string
  prompt: Localized
  options: Localized[]
  /** Index into `options` */
  answer: number
}

export type Block =
  | { type: 'html'; html: Localized }
  | { type: 'objectives'; label: Localized; items: Localized[] }
  | { type: 'takeaways'; label: Localized; items: Localized[] }
  | { type: 'box'; variant: 'analogy' | 'mistake' | 'keypoint' | 'example'; label: Localized; html: Localized }
  | { type: 'code'; code: string }
  | { type: 'diagram'; fig: Localized; title: Localized; src: string; alt: string; caption: Localized }
  | { type: 'exercise'; questionId: string }
  | { type: 'formula'; eq: string; note: Localized }
  | { type: 'table'; headers: Localized[]; rows: Localized[][] }
  | { type: 'tabs'; tabs: { label: Localized; blocks: Block[] }[] }
  | {
      type: 'homework'
      /** Shown first, e.g. deadline and how to hand in (HTML). */
      notice?: Localized
      objectives: Localized[]
      /** Which slice of the data the example answers use. */
      scenario: Localized
      tasks: HomeworkTask[]
      /** Un-numbered, ungraded last card (e.g. session feedback). */
      feedback?: HomeworkTask
    }

/** One homework question: what to do, an analogy, a checklist, and (optionally) an example answer worked
 *  on a smaller slice of the same data, so students see the format but still do the full analysis. */
export interface HomeworkTask {
  title: Localized
  prompt: Localized
  /** Everyday comparison that makes the idea click ("Think of it like…"). */
  analogy?: Localized
  include?: Localized[]
  example?: Block[]
}

export interface Section {
  id: string
  /** Short sidebar label, e.g. "Choosing your sample" (vs. the fuller <h2> text in headingHtml) */
  navLabel: Localized
  sectionLabel: Localized
  timeEst?: Localized
  /** Heading + standfirst markup, e.g. "<h2>...</h2><p class='standfirst'>...</p>" */
  headingHtml: Localized
  blocks: Block[]
}

export interface Week {
  id: string
  order: number
  /** Root-absolute path to the source slide deck in public/ (e.g. "/originals/week-03.pdf"); omit if none. */
  originalPdf?: string
  cover: {
    kicker: Localized
    titleHtml: Localized
    timeEstimate: Localized
  }
  sections: Section[]
  questions: Question[]
}

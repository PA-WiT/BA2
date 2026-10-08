import { useState } from 'react'
import { useLocalized } from '../../content/useLocalized'
import { getAttempt, recordAttempt } from '../progress/localProgress'
import { useQuestion } from './weekQuestions'
import styles from '../../components/content/content.module.css'

/** One multiple-choice exercise, graded locally. The answer is saved in this browser
 *  (src/features/progress/localProgress.ts), so a reload shows it as already checked. */
export function Exercise({ questionId }: { questionId: string }) {
  const question = useQuestion(questionId)
  const t = useLocalized()
  const [selected, setSelected] = useState<number | null>(() => getAttempt(questionId)?.selected ?? null)
  const [submitted, setSubmitted] = useState(() => getAttempt(questionId) !== undefined)

  if (!question) return null

  const isCorrect = submitted && selected === question.answer

  function handleSubmit() {
    setSubmitted(true)
    if (question && selected !== null) recordAttempt(question.id, selected, selected === question.answer)
  }

  return (
    <div className={styles.exercise}>
      <div className={styles.exerciseHead}>
        <span className={styles.boxLabel}>Quick check</span>
      </div>
      <p className={styles.exerciseQ}>{t(question.prompt)}</p>
      <div className={styles.exerciseOptions}>
        {question.options.map((option, i) => (
          <label key={i}>
            <input
              type="radio"
              name={question.id}
              checked={selected === i}
              disabled={submitted}
              onChange={() => setSelected(i)}
            />
            {t(option)}
          </label>
        ))}
      </div>
      <button
        type="button"
        className={styles.exerciseSubmit}
        disabled={selected === null || submitted}
        onClick={handleSubmit}
      >
        Check answer
      </button>
      {submitted && (
        <div className={`${styles.exerciseFeedback} ${isCorrect ? styles.correct : styles.incorrect}`}>
          {isCorrect ? '✓ Correct' : `✗ Not quite — the answer is "${t(question.options[question.answer])}"`}
        </div>
      )}
    </div>
  )
}

import { useState } from 'react'
import { getQuestion } from '../../content'
import { useLocalized } from '../../content/useLocalized'
import { useAuth } from '../auth/AuthProvider'
import { useRecordAttempt } from './api'
import styles from '../../components/content/content.module.css'

/** One multiple-choice exercise, graded locally. Answers are recorded to `question_attempts`
 *  for signed-in users (best-effort — a failed insert doesn't block the UI). */
export function Exercise({ questionId }: { questionId: string }) {
  const question = getQuestion(questionId)
  const t = useLocalized()
  const { user } = useAuth()
  const recordAttempt = useRecordAttempt()
  const [selected, setSelected] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  if (!question) return null

  const isCorrect = submitted && selected === question.answer

  function handleSubmit() {
    setSubmitted(true)
    if (user && question && selected !== null) {
      recordAttempt.mutate({
        questionId: question.id,
        weekId: question.weekId,
        selected,
        isCorrect: selected === question.answer,
      })
    }
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

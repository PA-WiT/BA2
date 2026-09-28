import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getHomeworkWeeks } from '../../content'
import { useLocalized } from '../../content/useLocalized'
import { useMySubmissions, useSubmitHomework, type Submission } from './api'
import styles from './submissions.module.css'

function WeekCard({ weekId, weekTitle, existing }: { weekId: string; weekTitle: string; existing?: Submission }) {
  const { t } = useTranslation()
  // Initial value only — remounted via `key` below once the submission finishes loading,
  // so this never needs to sync from a later-arriving `existing` inside an effect.
  const [content, setContent] = useState(existing?.content ?? '')
  const submit = useSubmitHomework()

  return (
    <div className={styles.card}>
      <div className={styles.cardHead}>
        <h2>{weekTitle}</h2>
        {existing && <span className={`${styles.status} ${styles[existing.status]}`}>{existing.status}</span>}
      </div>
      {existing?.feedback && <p className={styles.feedback}>{existing.feedback}</p>}
      <textarea
        className={styles.textarea}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your report here…"
      />
      <button
        type="button"
        className={styles.submit}
        disabled={!content.trim() || submit.isPending}
        onClick={() => submit.mutate({ weekId, content })}
      >
        {existing ? t('resubmit') : t('submit')}
      </button>
    </div>
  )
}

export function SubmissionsPage() {
  const { t } = useTranslation()
  const tLoc = useLocalized()
  const homeworkWeeks = getHomeworkWeeks()
  const { data: submissions } = useMySubmissions()

  return (
    <div>
      <h1>{t('mySubmissions')}</h1>
      {homeworkWeeks.map((week) => {
        const existing = submissions?.find((s) => s.week_id === week.id)
        return (
          <WeekCard
            key={existing?.id ?? week.id}
            weekId={week.id}
            weekTitle={`${tLoc(week.cover.kicker)} — ${t('homework')}`}
            existing={existing}
          />
        )
      })}
    </div>
  )
}

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getWeek } from '../../content'
import { useLocalized } from '../../content/useLocalized'
import { useAllSubmissions, useReviewSubmission, type AdminSubmission } from './api'
import styles from './submissions.module.css'

function ReviewRow({ submission }: { submission: AdminSubmission }) {
  const { t } = useTranslation()
  const [feedback, setFeedback] = useState(submission.feedback ?? '')
  const review = useReviewSubmission()

  return (
    <div className={styles.reviewRow}>
      <input
        type="text"
        placeholder={t('feedbackOptional')}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <button
        type="button"
        className={styles.accept}
        disabled={review.isPending}
        onClick={() => review.mutate({ submissionId: submission.id, status: 'accepted', feedback })}
      >
        {t('accept')}
      </button>
      <button
        type="button"
        className={styles.reject}
        disabled={review.isPending}
        onClick={() => review.mutate({ submissionId: submission.id, status: 'rejected', feedback })}
      >
        {t('reject')}
      </button>
    </div>
  )
}

export function AdminSubmissionsPage() {
  const { t } = useTranslation()
  const tLoc = useLocalized()
  const { data: submissions, isLoading } = useAllSubmissions()

  return (
    <div>
      <h1>{t('adminSubmissions')}</h1>
      {isLoading && <p>…</p>}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{t('student')}</th>
            <th>{t('week')}</th>
            <th>{t('status')}</th>
            <th>{t('content')}</th>
            <th>{t('review')}</th>
          </tr>
        </thead>
        <tbody>
          {submissions?.map((s) => {
            const week = getWeek(s.week_id)
            return (
              <tr key={s.id}>
                <td>{s.profiles?.display_name || s.profiles?.email || s.user_id}</td>
                <td>{week ? tLoc(week.cover.kicker) : s.week_id}</td>
                <td>
                  <span className={`${styles.status} ${styles[s.status]}`}>{s.status}</span>
                </td>
                <td className={styles.content}>{s.content}</td>
                <td>
                  <ReviewRow submission={s} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

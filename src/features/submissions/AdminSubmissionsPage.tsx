import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { homeworkNav } from '../../content/nav'
import { useLocalized } from '../../content/useLocalized'
import { isValidDriveLink } from './driveLink'
import { formatDateTime } from './formatDate'
import { useAllSubmissions, useDeadlines, useReviewSubmission, useSetDeadline, type AdminSubmission } from './api'
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

/** `datetime-local` wants local time without a zone: "YYYY-MM-DDTHH:mm". */
function toLocalInput(iso?: string) {
  if (!iso) return ''
  const d = new Date(iso)
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 16)
}

function DeadlineRow({ weekId, title, dueAt }: { weekId: string; title: string; dueAt?: string }) {
  const { t, i18n } = useTranslation()
  const [value, setValue] = useState(toLocalInput(dueAt))
  const setDeadline = useSetDeadline()

  return (
    <div className={styles.deadlineRow}>
      <strong>{title}</strong>
      <input type="datetime-local" value={value} onChange={(e) => setValue(e.target.value)} />
      <button
        type="button"
        className={styles.accept}
        disabled={!value || setDeadline.isPending}
        onClick={() => setDeadline.mutate({ weekId, dueAt: new Date(value).toISOString() })}
      >
        {t('setDeadline')}
      </button>
      {dueAt && (
        <button
          type="button"
          className={styles.linkBtn}
          disabled={setDeadline.isPending}
          onClick={() => {
            setValue('')
            setDeadline.mutate({ weekId, dueAt: null })
          }}
        >
          {t('clear')}
        </button>
      )}
      <span>{dueAt ? formatDateTime(dueAt, i18n.language) : t('noDeadline')}</span>
    </div>
  )
}

export function AdminSubmissionsPage() {
  const { t } = useTranslation()
  const tLoc = useLocalized()
  const { data: submissions, isLoading } = useAllSubmissions()
  const { data: deadlines } = useDeadlines()

  return (
    <div>
      <h1>{t('adminSubmissions')}</h1>
      <section className={styles.deadlines}>
        <h2>{t('deadlines')}</h2>
        {homeworkNav.map((week) => (
          // key includes the saved value so the input resets when the stored deadline changes
          <DeadlineRow
            key={`${week.id}:${deadlines?.[week.id] ?? ''}`}
            weekId={week.id}
            title={tLoc(week.title)}
            dueAt={deadlines?.[week.id]}
          />
        ))}
      </section>
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
            const week = homeworkNav.find((w) => w.id === s.week_id)
            return (
              <tr key={s.id}>
                <td>{s.profiles?.display_name || s.profiles?.email || s.user_id}</td>
                <td>{week ? tLoc(week.title) : s.week_id}</td>
                <td>
                  <span className={`${styles.status} ${styles[s.status]}`}>{s.status}</span>
                  {s.is_late && <span className={`${styles.status} ${styles.rejected}`}>{t('late')}</span>}
                </td>
                <td>
                  <div className={styles.content}>{s.content}</div>
                  {s.drive_link && isValidDriveLink(s.drive_link) && (
                    <a className={styles.driveLink} href={s.drive_link} target="_blank" rel="noopener noreferrer">
                      {t('driveLink')} ↗
                    </a>
                  )}
                </td>
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

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { homeworkNav } from '../../content/nav'
import { useLocalized } from '../../content/useLocalized'
import { formatDateTime } from './formatDate'
import { isValidDriveLink } from './driveLink'
import { useDeadlines, useMySubmissions, useSubmitHomework, type Submission } from './api'
import styles from './submissions.module.css'

function WeekCard({
  weekId,
  weekTitle,
  existing,
  dueAt,
}: {
  weekId: string
  weekTitle: string
  existing?: Submission
  dueAt?: string
}) {
  const { t, i18n } = useTranslation()
  // Initial values only — remounted via `key` below once the submission finishes loading,
  // so this never needs to sync from a later-arriving `existing` inside an effect.
  const [content, setContent] = useState(existing?.content ?? '')
  const [driveLink, setDriveLink] = useState(existing?.drive_link ?? '')
  const submit = useSubmitHomework()

  const linkInvalid = driveLink.trim() !== '' && !isValidDriveLink(driveLink)
  const canSubmit = (content.trim() !== '' || driveLink.trim() !== '') && !linkInvalid && !submit.isPending
  const overdue = !existing && dueAt !== undefined && new Date(dueAt) < new Date()

  return (
    <div className={styles.card}>
      <div className={styles.cardHead}>
        <h2>{weekTitle}</h2>
        <div className={styles.badges}>
          {existing?.is_late && <span className={`${styles.status} ${styles.rejected}`}>{t('late')}</span>}
          {existing && <span className={`${styles.status} ${styles[existing.status]}`}>{existing.status}</span>}
        </div>
      </div>
      <p className={styles.due}>
        {dueAt ? `${t('due')}: ${formatDateTime(dueAt, i18n.language)}` : t('noDeadline')}
        {overdue && <span className={styles.overdue}> · {t('overdue')}</span>}
      </p>
      {existing?.feedback && <p className={styles.feedback}>{existing.feedback}</p>}
      <textarea
        className={styles.textarea}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={t('reportPlaceholder')}
      />
      <label className={styles.linkField}>
        {t('driveLink')}
        <input
          type="url"
          inputMode="url"
          value={driveLink}
          onChange={(e) => setDriveLink(e.target.value)}
          placeholder="https://drive.google.com/drive/folders/…"
          aria-invalid={linkInvalid}
        />
      </label>
      <p className={linkInvalid ? styles.linkError : styles.hint}>
        {linkInvalid ? t('invalidDriveLink') : t('driveLinkHint')}
      </p>
      <button
        type="button"
        className={styles.submit}
        disabled={!canSubmit}
        onClick={() => submit.mutate({ weekId, content, driveLink })}
      >
        {existing ? t('resubmit') : t('submit')}
      </button>
    </div>
  )
}

export function SubmissionsPage() {
  const { t } = useTranslation()
  const tLoc = useLocalized()
  const { data: submissions } = useMySubmissions()
  const { data: deadlines } = useDeadlines()

  return (
    <div>
      <h1>{t('mySubmissions')}</h1>
      {homeworkNav.map((week) => {
        const existing = submissions?.find((s) => s.week_id === week.id)
        return (
          <WeekCard
            key={existing?.id ?? week.id}
            weekId={week.id}
            weekTitle={`${tLoc(week.title)} — ${t('homework')}`}
            existing={existing}
            dueAt={deadlines?.[week.id]}
          />
        )
      })}
    </div>
  )
}

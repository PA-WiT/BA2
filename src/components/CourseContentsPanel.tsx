import { useTranslation } from 'react-i18next'
import { WeeksList } from './WeeksList'
import styles from './CourseContentsPanel.module.css'

export function CourseContentsPanel({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation()
  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.panel}>
        <div className={styles.panelHead}>
          <span>{t('courseContents')}</span>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <WeeksList onNavigate={onClose} />
      </div>
    </>
  )
}

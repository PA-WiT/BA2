import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './TopbarStart.module.css'

export function TopbarStart({ onOpenContents }: { onOpenContents: () => void }) {
  const { t } = useTranslation()
  return (
    <div className={styles.topbarStart}>
      <Link className={styles.pillBtn} to="/">
        ← <span>{t('backToHub')}</span>
      </Link>
      <button type="button" className={styles.pillBtn} onClick={onOpenContents}>
        ☰ <span>{t('courseContents')}</span>
      </button>
    </div>
  )
}

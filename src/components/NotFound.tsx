import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { WeeksList } from './WeeksList'
import styles from './NotFound.module.css'

/** Shown inside the app shell for unknown URLs (router catch-all) and for /week/<id> ids
 *  that aren't part of the course at all. */
export function NotFound() {
  const { t } = useTranslation()
  return (
    <div>
      <header className={styles.hero}>
        <h1>{t('notFoundTitle')}</h1>
        <p>{t('notFoundBody')}</p>
        <Link to="/" className={styles.homeLink}>
          {t('backToHome')}
        </Link>
      </header>
      <div className={styles.weeks}>
        <WeeksList />
      </div>
    </div>
  )
}

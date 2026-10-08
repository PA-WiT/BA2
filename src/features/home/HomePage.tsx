import { useTranslation } from 'react-i18next'
import { WeeksList } from '../../components/WeeksList'
import styles from './HomePage.module.css'

export function HomePage() {
  const { t } = useTranslation()
  return (
    <div>
      <header className={styles.hero}>
        <h1>Business Analytics</h1>
        <p>{t('homeIntro')}</p>
      </header>
      <div className={styles.weeks}>
        <WeeksList />
      </div>
    </div>
  )
}

import { useTranslation } from 'react-i18next'
import { WeekCards } from '../../components/WeekCards'
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
        <WeekCards />
      </div>
    </div>
  )
}

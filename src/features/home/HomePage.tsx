import { WeeksList } from '../../components/WeeksList'
import styles from './HomePage.module.css'

export function HomePage() {
  return (
    <div>
      <header className={styles.hero}>
        <h1>Business Analytics</h1>
        <p>Pick a week below to start reading. The first two sections of weeks 1–2 are free — sign up to unlock the rest and track your progress.</p>
      </header>
      <div className={styles.weeks}>
        <WeeksList />
      </div>
    </div>
  )
}

import type { Week } from '../../content/types'
import { useLocalized } from '../../content/useLocalized'
import styles from './content.module.css'

export function Cover({ week }: { week: Week }) {
  const t = useLocalized()

  return (
    <header className={styles.cover}>
      <div className={styles.kicker}>{t(week.cover.kicker)}</div>
      <div dangerouslySetInnerHTML={{ __html: t(week.cover.titleHtml) }} />
      <span className={styles.totalTime}>⏱ {t(week.cover.timeEstimate)}</span>
    </header>
  )
}

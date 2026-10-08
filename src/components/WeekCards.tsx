import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { navGroups } from '../content/nav'
import { hasWeek } from '../content/registry'
import { useLocalized } from '../content/useLocalized'
import { useProgress, weekProgress } from '../features/progress/localProgress'
import { formatNumber, formatPercent } from '../i18n/format'
import styles from './WeekCards.module.css'

/** Home page grid: one card per week with this browser's reading progress. Weeks not migrated
 *  yet get a muted "soon" card. (The Course Contents panel uses the compact WeeksList instead.) */
export function WeekCards() {
  const t = useLocalized()
  const { t: tUi } = useTranslation()
  const progress = useProgress()

  return (
    <>
      {navGroups.map((group) => (
        <section key={group.label.en} className={styles.group}>
          <h2 className={styles.groupLabel}>{t(group.label)}</h2>
          <ul className={styles.grid}>
            {group.items.map((item) => {
              const title = t(item.title)
              const subtitle = item.subtitle && <span className={styles.subtitle}>{t(item.subtitle)}</span>

              if (!hasWeek(item.id)) {
                return (
                  <li key={item.id}>
                    <div className={`${styles.card} ${styles.soon}`}>
                      <span className={styles.titleRow}>
                        <span className={styles.title}>{title}</span>
                        <span className={styles.soonBadge}>{tUi('soon')}</span>
                      </span>
                      {subtitle}
                    </div>
                  </li>
                )
              }

              const { read, total, percent } = weekProgress(progress, item.id)
              const complete = total > 0 && read === total
              const status = complete
                ? tUi('completed')
                : read > 0
                  ? tUi('sectionsReadCount', { read: formatNumber(read), total: formatNumber(total) })
                  : tUi('notStarted')

              return (
                <li key={item.id}>
                  <Link to={item.href} className={`${styles.card} ${complete ? styles.complete : ''}`}>
                    <span className={styles.titleRow}>
                      <span className={styles.title}>{title}</span>
                      <span className={styles.percent}>{formatPercent(percent)}</span>
                    </span>
                    {subtitle}
                    <span
                      className={styles.bar}
                      role="progressbar"
                      aria-label={tUi('percentRead', { percent: formatPercent(percent) })}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={percent}
                    >
                      <span className={styles.fill} style={{ inlineSize: `${percent}%` }} />
                    </span>
                    <span className={styles.status}>{status}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </>
  )
}

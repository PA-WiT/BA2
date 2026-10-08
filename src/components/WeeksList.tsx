import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { navGroups } from '../content/nav'
import { hasWeek } from '../content/registry'
import { useLocalized } from '../content/useLocalized'
import { useProgress, weekProgress } from '../features/progress/localProgress'
import { formatPercent } from '../i18n/format'
import styles from './WeeksList.module.css'

/** Every week grouped by course, linking to `/week/:id`; weeks not yet migrated show a "soon" badge.
 *  Shared by the Home page and the Course Contents panel — one implementation, no duplicated markup. */
export function WeeksList({ onNavigate }: { onNavigate?: () => void }) {
  const t = useLocalized()
  const { t: tUi } = useTranslation()
  const progress = useProgress()

  return (
    <>
      {navGroups.map((group) => (
        <div key={t(group.label)}>
          <div className={styles.groupLabel}>{t(group.label)}</div>
          <ul className={styles.list}>
            {group.items.map((item) => {
              const migrated = hasWeek(item.id)
              const { read, total, percent } = weekProgress(progress, item.id)
              return (
                <li key={item.id}>
                  {migrated ? (
                    <Link to={item.href} onClick={onNavigate}>
                      {t(item.title)}
                      {read > 0 && (
                        <span className={styles.progress} aria-label={tUi('percentRead', { percent: formatPercent(percent) })}>
                          {read === total ? '✓' : formatPercent(percent)}
                        </span>
                      )}
                    </Link>
                  ) : (
                    <span className={styles.soon}>
                      {t(item.title)}
                      <span className={styles.soonBadge}>{tUi('soon')}</span>
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </>
  )
}

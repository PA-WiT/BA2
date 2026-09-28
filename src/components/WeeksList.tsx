import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { navGroups } from '../content/nav'
import { getWeek } from '../content'
import { useLocalized } from '../content/useLocalized'
import styles from './WeeksList.module.css'

/** Every week grouped by course, linking to `/week/:id`; weeks not yet migrated show a "soon" badge.
 *  Shared by the Home page and the Course Contents panel — one implementation, no duplicated markup. */
export function WeeksList({ onNavigate }: { onNavigate?: () => void }) {
  const t = useLocalized()
  const { t: tUi } = useTranslation()

  return (
    <>
      {navGroups.map((group) => (
        <div key={t(group.label)}>
          <div className={styles.groupLabel}>{t(group.label)}</div>
          <ul className={styles.list}>
            {group.items.map((item) => {
              const migrated = Boolean(getWeek(item.id))
              return (
                <li key={item.id}>
                  {migrated ? (
                    <Link to={item.href} onClick={onNavigate}>
                      {t(item.title)}
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

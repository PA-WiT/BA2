import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { flatNav } from '../../content/nav'
import { getWeek } from '../../content'
import { useLocalized } from '../../content/useLocalized'
import styles from './WeekNav.module.css'

/** Previous/next buttons at the bottom of a week page, ported from the old site's `.week-nav`.
 *  A neighbor that hasn't been migrated yet still shows its title, disabled ("soon"). */
export function WeekNav({ weekId }: { weekId: string }) {
  const { t } = useTranslation()
  const tLoc = useLocalized()
  const index = flatNav.findIndex((item) => item.id === weekId)
  if (index === -1) return null

  const prev = flatNav[index - 1]
  const next = flatNav[index + 1]

  return (
    <nav className={styles.weekNav}>
      {prev ? (
        getWeek(prev.id) ? (
          <Link to={prev.href} className={styles.btn}>
            <span className={styles.dir}>{t('previous')}</span>
            <span className={styles.label}>{tLoc(prev.title)}</span>
          </Link>
        ) : (
          <span className={`${styles.btn} ${styles.soon}`}>
            <span className={styles.dir}>{t('previous')}</span>
            <span className={styles.label}>{tLoc(prev.title)}</span>
          </span>
        )
      ) : (
        <span className={styles.spacer} />
      )}

      {next ? (
        getWeek(next.id) ? (
          <Link to={next.href} className={`${styles.btn} ${styles.next}`}>
            <span className={styles.dir}>{t('next')}</span>
            <span className={styles.label}>{tLoc(next.title)}</span>
          </Link>
        ) : (
          <span className={`${styles.btn} ${styles.next} ${styles.soon}`}>
            <span className={styles.dir}>{t('next')}</span>
            <span className={styles.label}>{tLoc(next.title)}</span>
          </span>
        )
      ) : (
        <span className={styles.spacer} />
      )}
    </nav>
  )
}

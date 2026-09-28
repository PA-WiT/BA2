import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './content.module.css'

/** Replaces a gated section's content for logged-out visitors (see src/content/access.ts).
 *  Note: this is a client-only gate — the section's data still ships in the JS bundle, so it
 *  deters casual access but isn't real content protection. */
export function LockedSection({ sectionId }: { sectionId: string }) {
  const { t } = useTranslation()
  return (
    <section id={sectionId} className={styles.locked}>
      <p className={styles.lockedTeaser}>{t('lockedTeaser')}</p>
      <Link className={styles.lockedCta} to="/login">
        {t('signUpToKeepReading')}
      </Link>
    </section>
  )
}

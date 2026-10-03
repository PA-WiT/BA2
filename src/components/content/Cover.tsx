import { useTranslation } from 'react-i18next'
import type { Week } from '../../content/types'
import { resolveAssetPath } from '../../content/resolveAssetPath'
import { useLocalized } from '../../content/useLocalized'
import styles from './content.module.css'

export function Cover({ week }: { week: Week }) {
  const t = useLocalized()
  const { t: tUi } = useTranslation()

  return (
    <header className={styles.cover}>
      <div className={styles.kicker}>{t(week.cover.kicker)}</div>
      <div dangerouslySetInnerHTML={{ __html: t(week.cover.titleHtml) }} />
      <div className={styles.coverTools}>
        {week.originalPdf && (
          <a className={styles.toolBtn} href={resolveAssetPath(week.originalPdf)} target="_blank" rel="noopener noreferrer">
            {tUi('viewOriginalPdf')}
          </a>
        )}
        <button type="button" className={styles.toolBtn} onClick={() => window.print()}>
          {tUi('saveAsPdf')}
        </button>
        <span className={styles.totalTime}>⏱ {t(week.cover.timeEstimate)}</span>
      </div>
    </header>
  )
}

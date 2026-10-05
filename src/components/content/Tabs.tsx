import type { Block, Localized } from '../../content/types'
import { useLocalized } from '../../content/useLocalized'
import { Blocks } from './Blocks'
import styles from './content.module.css'

/** Formerly a tab switcher; now every variant (e.g. Excel / Python / Power BI) is shown, stacked and
 *  labelled, so nothing is hidden on screen or lost in a saved PDF. */
export function Tabs({ tabs }: { tabs: { label: Localized; blocks: Block[] }[] }) {
  const t = useLocalized()

  return (
    <div className={styles.variants}>
      {tabs.map((tab, i) => (
        <div key={i} className={styles.variant}>
          <div className={styles.variantLabel}>{t(tab.label)}</div>
          <Blocks blocks={tab.blocks} />
        </div>
      ))}
    </div>
  )
}

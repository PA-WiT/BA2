import { useTranslation } from 'react-i18next'
import type { HomeworkTask, Localized } from '../../content/types'
import { useLocalized } from '../../content/useLocalized'
import { Blocks } from './Blocks'
import styles from './content.module.css'

export function HomeworkTasks({ scenario, tasks }: { scenario: Localized; tasks: HomeworkTask[] }) {
  const t = useLocalized()
  const { t: tUi } = useTranslation()

  return (
    <div className={styles.hw}>
      <p className={styles.hwScenario}>{t(scenario)}</p>
      <ol className={styles.hwList}>
        {tasks.map((task, i) => (
          <li key={i} className={styles.hwTask}>
            <div className={styles.hwHead}>
              <span className={styles.hwNum}>{tUi('question', { n: i + 1 })}</span>
              <h3>{t(task.title)}</h3>
            </div>
            <div dangerouslySetInnerHTML={{ __html: t(task.prompt) }} />
            {task.include && (
              <div className={styles.hwInclude}>
                <span className={styles.boxLabel}>{tUi('yourAnswerShouldInclude')}</span>
                <ul>
                  {task.include.map((item, j) => (
                    <li key={j}>{t(item)}</li>
                  ))}
                </ul>
              </div>
            )}
            {task.example && (
              <div className={styles.hwExample}>
                <span className={styles.boxLabel}>{tUi('exampleAnswer')}</span>
                <Blocks blocks={task.example} />
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

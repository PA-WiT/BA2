import { useTranslation } from 'react-i18next'
import type { Block, HomeworkTask } from '../../content/types'
import { useLocalized } from '../../content/useLocalized'
import { Blocks } from './Blocks'
import styles from './content.module.css'

type HomeworkBlock = Extract<Block, { type: 'homework' }>

function TaskCard({ task, label }: { task: HomeworkTask; label: string }) {
  const t = useLocalized()
  const { t: tUi } = useTranslation()

  return (
    <div className={styles.hwTask}>
      <div className={styles.hwHead}>
        <span className={styles.hwNum}>{label}</span>
        <h3>{t(task.title)}</h3>
      </div>
      <div dangerouslySetInnerHTML={{ __html: t(task.prompt) }} />
      {task.analogy && (
        <div className={`${styles.hwAnalogy} ${styles.analogy}`}>
          <span className={styles.boxLabel}>{tUi('thinkOfItLike')}</span>
          <div dangerouslySetInnerHTML={{ __html: t(task.analogy) }} />
        </div>
      )}
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
    </div>
  )
}

export function HomeworkTasks({ block }: { block: HomeworkBlock }) {
  const t = useLocalized()
  const { t: tUi } = useTranslation()

  return (
    <div className={styles.hw}>
      {block.notice && (
        <div className={`${styles.box} ${styles.keypoint}`}>
          <span className={styles.boxLabel}>{tUi('beforeYouStart')}</span>
          <div dangerouslySetInnerHTML={{ __html: t(block.notice) }} />
        </div>
      )}
      <div className={styles.objectives}>
        <div className={styles.objLabel}>{tUi('homeworkObjectives')}</div>
        <ul>
          {block.objectives.map((item, i) => (
            <li key={i}>{t(item)}</li>
          ))}
        </ul>
      </div>
      <p className={styles.hwScenario}>{t(block.scenario)}</p>
      <div className={styles.hwList}>
        {block.tasks.map((task, i) => (
          <TaskCard key={i} task={task} label={tUi('question', { n: i + 1 })} />
        ))}
        {block.feedback && <TaskCard task={block.feedback} label={tUi('feedbackNotGraded')} />}
      </div>
    </div>
  )
}

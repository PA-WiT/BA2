import { useMemo, useState } from 'react'
import { Outlet, useMatches } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useWeek } from '../content/useWeek'
import { useLocalized } from '../content/useLocalized'
import { useScrollSpy } from '../features/weeks/useScrollSpy'
import { TopBar } from './TopBar'
import { TopbarStart } from './TopbarStart'
import { CourseContentsPanel } from './CourseContentsPanel'
import styles from './AppShell.module.css'

function useActiveWeek() {
  const matches = useMatches()
  const weekId = matches.find((m) => (m.params as Record<string, string | undefined>).id)?.params.id as
    | string
    | undefined
  return useWeek(weekId).week
}

function Sidebar() {
  const { t: tUi } = useTranslation()
  const t = useLocalized()
  const week = useActiveWeek()
  const sectionIds = useMemo(() => week?.sections.map((s) => s.id) ?? [], [week])
  const activeId = useScrollSpy(sectionIds)

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>Course</div>
      <div className={styles.brandSub}>Business Analytics</div>
      {week ? (
        <nav>
          {week.sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={section.id === activeId ? styles.current : undefined}
            >
              {t(section.navLabel)}
            </a>
          ))}
        </nav>
      ) : (
        <p className={styles.sidebarHint}>{tUi('courseContents')}</p>
      )}
    </aside>
  )
}

/** App-wide layout: sidebar (current week's sections, or a hint) + main content, with the
 *  language/theme toggle and the Course Contents panel fixed top. */
export function AppShell() {
  const { t } = useTranslation()
  const [contentsOpen, setContentsOpen] = useState(false)

  return (
    <div className={styles.shell}>
      <TopBar />
      <TopbarStart onOpenContents={() => setContentsOpen(true)} />
      {contentsOpen && <CourseContentsPanel onClose={() => setContentsOpen(false)} />}
      <Sidebar />
      <main className={styles.main} aria-label={t('appName')}>
        <Outlet />
      </main>
    </div>
  )
}

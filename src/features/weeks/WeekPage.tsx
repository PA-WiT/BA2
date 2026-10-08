import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useWeek } from '../../content/useWeek'
import { Cover } from '../../components/content/Cover'
import { SectionView } from '../../components/content/SectionView'
import { WeekNav } from '../../components/content/WeekNav'
import contentStyles from '../../components/content/content.module.css'
import { markSectionRead } from '../progress/localProgress'
import { WeekQuestionsContext } from '../quiz/weekQuestions'
import { useScrollSpy } from './useScrollSpy'

export function WeekPage() {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation()
  const { week, loading, notFound } = useWeek(id)

  const sectionIds = useMemo(() => week?.sections.map((s) => s.id) ?? [], [week])
  const activeId = useScrollSpy(sectionIds)

  useEffect(() => {
    if (week && activeId) markSectionRead(week.id, activeId)
  }, [week, activeId])

  // Content loads asynchronously now, so a #section deep link can't be scrolled to by the browser on load.
  useEffect(() => {
    if (week && window.location.hash) {
      document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView()
    }
  }, [week])

  if (loading) return <p>{t('loading')}</p>
  if (notFound || !week) return <p>{t('weekNotFound')}</p>

  return (
    <WeekQuestionsContext.Provider value={week.questions}>
      <div className={contentStyles.content}>
        <Cover week={week} />
        {week.sections.map((section) => (
          <SectionView key={section.id} section={section} />
        ))}
        <WeekNav weekId={week.id} />
      </div>
    </WeekQuestionsContext.Provider>
  )
}

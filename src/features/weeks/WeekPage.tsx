import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { getWeek } from '../../content'
import { isSectionFree } from '../../content/access'
import { Cover } from '../../components/content/Cover'
import { SectionView } from '../../components/content/SectionView'
import { LockedSection } from '../../components/content/LockedSection'
import { WeekNav } from '../../components/content/WeekNav'
import contentStyles from '../../components/content/content.module.css'
import { useAuth } from '../auth/AuthProvider'
import { useMarkSectionRead } from '../progress/api'
import { useScrollSpy } from './useScrollSpy'

export function WeekPage() {
  const { id } = useParams<{ id: string }>()
  const week = id ? getWeek(id) : undefined
  const { user } = useAuth()
  const markSectionRead = useMarkSectionRead()

  const sectionIds = useMemo(() => week?.sections.map((s) => s.id) ?? [], [week])
  const activeId = useScrollSpy(sectionIds)

  useEffect(() => {
    if (user && week && activeId) {
      markSectionRead.mutate({ weekId: week.id, sectionId: activeId })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, week, activeId])

  if (!week) {
    return <p>This week hasn't been migrated yet. Use the migrate-week-content skill to add it.</p>
  }

  // Stop at the first gated section for a logged-out visitor — one clear CTA, not one per section.
  const firstLockedIndex = user ? -1 : week.sections.findIndex((_, i) => !isSectionFree(week, i))

  return (
    <div className={contentStyles.content}>
      <Cover week={week} />
      {week.sections.map((section, i) => {
        if (firstLockedIndex === -1 || i < firstLockedIndex) return <SectionView key={section.id} section={section} />
        if (i === firstLockedIndex) return <LockedSection key={section.id} sectionId={section.id} />
        return null
      })}
      <WeekNav weekId={week.id} />
    </div>
  )
}

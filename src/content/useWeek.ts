import { useQuery } from '@tanstack/react-query'
import { hasWeek, loadWeek } from './registry'

/** Loads a week's content chunk on demand. `week` is undefined while loading or for unknown ids. */
export function useWeek(id: string | undefined) {
  const known = id !== undefined && hasWeek(id)
  const { data, isLoading } = useQuery({
    queryKey: ['week', id],
    queryFn: () => loadWeek(id!),
    enabled: known,
    staleTime: Infinity,
  })
  return { week: data, loading: known && isLoading, notFound: !known }
}

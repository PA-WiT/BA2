import { useMutation } from '@tanstack/react-query'
import { supabase } from '../../lib/supabase'

/** Marks a section as read for the signed-in user, via the mark_section_read RPC
 *  (supabase/migrations/0002_progress_rpc.sql — race-safe append to week_progress.sections_read). */
export function useMarkSectionRead() {
  return useMutation({
    mutationFn: async ({ weekId, sectionId }: { weekId: string; sectionId: string }) => {
      const { error } = await supabase.rpc('mark_section_read', {
        p_week_id: weekId,
        p_section_id: sectionId,
      })
      if (error) throw error
    },
  })
}

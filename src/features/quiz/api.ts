import { useMutation } from '@tanstack/react-query'
import { supabase } from '../../lib/supabase'

interface RecordAttemptInput {
  questionId: string
  weekId: string
  selected: number
  isCorrect: boolean
}

/** Records a quiz answer for the signed-in user. Best-effort — a failed insert doesn't
 *  interrupt the exercise UI (see src/features/quiz/Exercise.tsx). */
export function useRecordAttempt() {
  return useMutation({
    mutationFn: async (input: RecordAttemptInput) => {
      const { error } = await supabase.from('question_attempts').insert({
        question_id: input.questionId,
        week_id: input.weekId,
        selected: input.selected,
        is_correct: input.isCorrect,
      })
      if (error) throw error
    },
  })
}

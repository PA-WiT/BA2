import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../auth/AuthProvider'

export interface Submission {
  id: string
  user_id: string
  week_id: string
  content: string
  drive_link: string | null
  is_late: boolean
  status: 'pending' | 'accepted' | 'rejected'
  feedback: string | null
  submitted_at: string
  reviewed_at: string | null
}

export interface AdminSubmission extends Submission {
  profiles: { email: string | null; display_name: string | null } | null
}

/** The signed-in user's own submissions (one per week, keyed by week_id). */
export function useMySubmissions() {
  const { user } = useAuth()
  return useQuery({
    queryKey: ['submissions', 'mine', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase.from('homework_submissions').select('*').eq('user_id', user!.id)
      if (error) throw error
      return data as Submission[]
    },
    enabled: Boolean(user),
  })
}

export function useSubmitHomework() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ weekId, content, driveLink }: { weekId: string; content: string; driveLink: string }) => {
      const { error } = await supabase.rpc('submit_homework', {
        p_week_id: weekId,
        p_content: content,
        p_drive_link: driveLink.trim() || null,
      })
      if (error) throw error
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['submissions'] }),
  })
}

/** Every student's submissions — admin-only via RLS (the query just fails/empties for non-admins). */
export function useAllSubmissions() {
  return useQuery({
    queryKey: ['submissions', 'all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('homework_submissions')
        .select('*, profiles(email, display_name)')
        .order('submitted_at', { ascending: false })
      if (error) throw error
      return data as AdminSubmission[]
    },
  })
}

export function useReviewSubmission() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      submissionId,
      status,
      feedback,
    }: {
      submissionId: string
      status: 'accepted' | 'rejected'
      feedback: string
    }) => {
      const { error } = await supabase.rpc('review_submission', {
        p_submission_id: submissionId,
        p_status: status,
        p_feedback: feedback || null,
      })
      if (error) throw error
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['submissions'] }),
  })
}

/** week_id -> due date (ISO string). Weeks without a deadline are absent. */
export function useDeadlines() {
  const { user } = useAuth()
  return useQuery({
    queryKey: ['deadlines'],
    queryFn: async () => {
      const { data, error } = await supabase.from('homework_deadlines').select('week_id, due_at')
      if (error) throw error
      return Object.fromEntries((data as { week_id: string; due_at: string }[]).map((d) => [d.week_id, d.due_at]))
    },
    enabled: Boolean(user),
  })
}

/** Admin-only (enforced in the RPC). Pass `dueAt: null` to clear a deadline. */
export function useSetDeadline() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ weekId, dueAt }: { weekId: string; dueAt: string | null }) => {
      const { error } = await supabase.rpc('set_homework_deadline', { p_week_id: weekId, p_due_at: dueAt })
      if (error) throw error
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['deadlines'] }),
  })
}

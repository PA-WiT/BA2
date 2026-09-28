-- Race-safe "mark this section read" upsert, called from the client as sections scroll into view
-- (see src/features/progress/api.ts). Avoids a read-then-write race on week_progress.sections_read.
create function public.mark_section_read(p_week_id text, p_section_id text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.week_progress (user_id, week_id, sections_read)
  values (auth.uid(), p_week_id, array[p_section_id])
  on conflict (user_id, week_id) do update
    set sections_read = (
          select array_agg(distinct s)
          from unnest(public.week_progress.sections_read || array[p_section_id]) as s
        ),
        updated_at = now()
    where not (public.week_progress.sections_read @> array[p_section_id]);
end;
$$;

grant execute on function public.mark_section_read(text, text) to authenticated;

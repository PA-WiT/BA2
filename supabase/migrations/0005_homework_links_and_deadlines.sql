-- Drive link per submission, admin-editable deadlines, and server-side late flagging.

alter table public.homework_submissions
  add column drive_link text,
  add column is_late boolean not null default false;

create table public.homework_deadlines (
  week_id text primary key,
  due_at timestamptz not null
);

alter table public.homework_deadlines enable row level security;

-- Anyone signed in can read deadlines; writes go through set_homework_deadline (admin-gated),
-- same pattern as review_submission in 0003.
create policy "read deadlines" on public.homework_deadlines
  for select to authenticated using (true);

create function public.set_homework_deadline(p_week_id text, p_due_at timestamptz) returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not public.is_admin() then
    raise exception 'not authorized';
  end if;
  if p_due_at is null then
    delete from public.homework_deadlines where week_id = p_week_id;
  else
    insert into public.homework_deadlines (week_id, due_at)
    values (p_week_id, p_due_at)
    on conflict (week_id) do update set due_at = excluded.due_at;
  end if;
end;
$$;
grant execute on function public.set_homework_deadline(text, timestamptz) to authenticated;

-- New signature (adds p_drive_link), so the old 2-arg function must go.
drop function public.submit_homework(text, text);

create function public.submit_homework(p_week_id text, p_content text, p_drive_link text default null) returns void
language plpgsql security definer set search_path = '' as $$
declare
  v_link text := nullif(btrim(p_drive_link), '');
  v_late boolean;
begin
  if btrim(coalesce(p_content, '')) = '' and v_link is null then
    raise exception 'submission is empty';
  end if;
  -- Guard so a stored link is always safe to render as an href.
  if v_link is not null and v_link !~ '^https://(drive|docs)\.google\.com/' then
    raise exception 'drive link must be a Google Drive or Docs URL';
  end if;

  -- Lateness is judged on the latest submit: a resubmit after the deadline counts as late.
  select coalesce(now() > d.due_at, false) into v_late
    from (select due_at from public.homework_deadlines where week_id = p_week_id) d;
  v_late := coalesce(v_late, false);

  insert into public.homework_submissions
    (user_id, week_id, content, drive_link, is_late, status, feedback, reviewed_at, reviewed_by)
  values (auth.uid(), p_week_id, coalesce(p_content, ''), v_link, v_late, 'pending', null, null, null)
  on conflict (user_id, week_id) do update
    set content = excluded.content,
        drive_link = excluded.drive_link,
        is_late = excluded.is_late,
        status = 'pending',
        feedback = null,
        reviewed_at = null,
        reviewed_by = null,
        submitted_at = now();
end;
$$;
grant execute on function public.submit_homework(text, text, text) to authenticated;

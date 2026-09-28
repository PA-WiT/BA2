-- 0003 added profiles.email and taught handle_new_user() to fill it on new sign-ups, but that
-- trigger only fires on INSERT into auth.users — it never ran for accounts created before 0003,
-- so their profiles.email is still null even though auth.users.email is correct. Backfill once.
update public.profiles p
set email = u.email
from auth.users u
where p.id = u.id
  and p.email is distinct from u.email;

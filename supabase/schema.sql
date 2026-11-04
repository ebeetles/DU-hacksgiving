-- Draft schema for the next stage. Not connected to the site yet.
-- Donations and credit are separate kinds of entry, so the leaderboard can
-- show real dollars apart from referral and tabling credit.

create table teams (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  referred_by uuid references teams (id),
  room text,
  created_at timestamptz not null default now()
);

create table members (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references teams (id) on delete cascade,
  name text not null,
  email text not null unique,
  wants_dinner boolean not null default false,
  dinner_paid boolean not null default false,
  merch_received boolean not null default false
);

create type entry_kind as enum ('donation', 'referral', 'tabling');
create type entry_status as enum ('pending', 'approved', 'rejected');

create table fundraising_entries (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references teams (id) on delete cascade,
  kind entry_kind not null,
  amount_cents integer not null check (amount_cents > 0),
  status entry_status not null default 'pending',
  proof_path text,            -- private storage, never public
  reviewed_by text,
  created_at timestamptz not null default now()
);

-- The only fundraising data the public site should read.
create view leaderboard as
select
  t.id as team_id,
  t.name as team_name,
  coalesce(sum(e.amount_cents) filter (where e.kind = 'donation'), 0) as donated_cents,
  coalesce(sum(e.amount_cents) filter (where e.kind <> 'donation'), 0) as credit_cents
from teams t
left join fundraising_entries e on e.team_id = t.id and e.status = 'approved'
group by t.id, t.name;

-- Before going live: turn on row-level security for these tables, and allow
-- public reads on the leaderboard view only.

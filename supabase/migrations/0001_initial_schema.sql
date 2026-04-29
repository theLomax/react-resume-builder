-- ============================================================
-- 0001_initial_schema.sql
-- ============================================================

-- ------------------------------------------------------------
-- Profile
-- ------------------------------------------------------------
create table profiles (
  id          uuid primary key default gen_random_uuid(),
  first_name  text not null,
  last_name   text not null,
  email       text not null,
  phone       text,
  site        text,
  linkedin    text,
  location    text,
  created_at  timestamptz default now()
);

create table profile_summary (
  id          uuid primary key default gen_random_uuid(),
  profile_id  uuid not null references profiles(id) on delete cascade,
  text        text not null,
  "order"     integer not null,
  unique (profile_id, "order")
);

create table education (
  id          uuid primary key default gen_random_uuid(),
  profile_id  uuid not null references profiles(id) on delete cascade,
  institution text not null,
  degree      text not null,
  field       text,
  year        text
);

-- ------------------------------------------------------------
-- Tags (normalised vocabulary)
-- ------------------------------------------------------------
create table tags (
  id    uuid primary key default gen_random_uuid(),
  name  text not null unique
);

-- ------------------------------------------------------------
-- Roles
-- ------------------------------------------------------------
create table roles (
  id              text primary key,  -- human-readable slug e.g. "example-agency"
  profile_id      uuid not null references profiles(id) on delete cascade,
  company         text not null,
  company_em      text,              -- parenthetical e.g. "(Razorfish)"
  title           text not null,
  title_em        text,
  start_year      text not null,
  start_month     text,
  end_year        text not null,
  end_month       text,
  city            text,
  state           text,
  industry        text,
  display_order   integer not null,
  unique (profile_id, display_order)
);

create table role_key_tech (
  id              uuid primary key default gen_random_uuid(),
  role_id         text not null references roles(id) on delete cascade,
  name            text not null,
  display_order   integer not null,
  unique (role_id, display_order)
);

-- ------------------------------------------------------------
-- Action items
-- ------------------------------------------------------------
create table action_items (
  id                  text primary key,  -- human-readable slug e.g. "example-agency-1"
  role_id             text not null references roles(id) on delete cascade,
  default_text        text not null,
  key_experience_text text,
  is_key_experience   boolean not null default false,
  weight              numeric(3,2) not null default 0.5 check (weight >= 0 and weight <= 1),
  display_order       integer not null,
  unique (role_id, display_order)
);

create table action_item_variants (
  id              uuid primary key default gen_random_uuid(),
  action_item_id  text not null references action_items(id) on delete cascade,
  audience        text not null,  -- e.g. "engineering", "marketing", "product"
  text            text not null,
  unique (action_item_id, audience)
);

create table action_item_tags (
  action_item_id  text not null references action_items(id) on delete cascade,
  tag_id          uuid not null references tags(id) on delete cascade,
  primary key (action_item_id, tag_id)
);

-- ------------------------------------------------------------
-- Skills
-- ------------------------------------------------------------
create table skill_groups (
  id              uuid primary key default gen_random_uuid(),
  label           text not null,
  display_order   integer not null unique
);

create table skills (
  id              uuid primary key default gen_random_uuid(),
  skill_group_id  uuid not null references skill_groups(id) on delete cascade,
  label           text not null,
  display_order   integer not null,
  unique (skill_group_id, display_order)
);

create table skill_tags (
  skill_id  uuid not null references skills(id) on delete cascade,
  tag_id    uuid not null references tags(id) on delete cascade,
  primary key (skill_id, tag_id)
);

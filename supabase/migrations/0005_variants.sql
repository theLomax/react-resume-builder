-- ============================================================
-- 0005_variants.sql
-- Variant system — per-application resume customisation
--
-- Variant ID convention: <company-slug>--<role-slug>
--   e.g. flock-safety--swe-fullstack
--
-- The top-level `variants` table is metadata only; the hook
-- queries the child tables directly by variant_id text.
-- ============================================================

-- ------------------------------------------------------------
-- Top-level variant registry (metadata / label)
-- ------------------------------------------------------------
create table if not exists variants (
  id          text primary key,           -- e.g. 'flock-safety--swe-fullstack'
  created_at  timestamptz default now()
);

-- Add columns if they were not present in an earlier ad-hoc creation
alter table variants
  add column if not exists label     text,
  add column if not exists company   text,
  add column if not exists role_slug text;

-- ------------------------------------------------------------
-- Profile overrides
-- ------------------------------------------------------------
create table if not exists variant_profile (
  id          uuid primary key default gen_random_uuid(),
  variant_id  text not null references variants(id) on delete cascade,
  title       text,
  subtitle    text[],
  summary     text[],
  unique (variant_id)
);

-- ------------------------------------------------------------
-- Role selection + per-role overrides
-- ------------------------------------------------------------
create table if not exists variant_roles (
  id              uuid primary key default gen_random_uuid(),
  variant_id      text not null references variants(id) on delete cascade,
  role_id         text not null references roles(id) on delete cascade,
  display_order   integer not null,
  title_override  text,
  show_key_tech   boolean,           -- null = use default rule (first 2 roles)
  unique (variant_id, display_order)
);

-- ------------------------------------------------------------
-- Action items (replaces base action_items for this variant+role)
-- ------------------------------------------------------------
create table if not exists variant_action_items (
  id            uuid primary key default gen_random_uuid(),
  variant_id    text not null references variants(id) on delete cascade,
  role_id       text not null references roles(id) on delete cascade,
  text          text not null,
  display_order integer not null,
  unique (variant_id, role_id, display_order)
);

-- ------------------------------------------------------------
-- Key tech (replaces base role_key_tech for this variant+role)
-- ------------------------------------------------------------
create table if not exists variant_key_tech (
  id            uuid primary key default gen_random_uuid(),
  variant_id    text not null references variants(id) on delete cascade,
  role_id       text not null references roles(id) on delete cascade,
  name          text not null,
  display_order integer not null,
  unique (variant_id, role_id, display_order)
);

-- ------------------------------------------------------------
-- Skill group selection + ordering
-- ------------------------------------------------------------
create table if not exists variant_skill_groups (
  id              uuid primary key default gen_random_uuid(),
  variant_id      text not null references variants(id) on delete cascade,
  skill_group_id  uuid not null references skill_groups(id) on delete cascade,
  display_order   integer not null,
  unique (variant_id, display_order)
);

-- ------------------------------------------------------------
-- Skill selection + optional label override
-- ------------------------------------------------------------
create table if not exists variant_skills (
  id              uuid primary key default gen_random_uuid(),
  variant_id      text not null references variants(id) on delete cascade,
  skill_id        uuid not null references skills(id) on delete cascade,
  display_order   integer not null,
  label_override  text,
  unique (variant_id, skill_id)
);

-- ------------------------------------------------------------
-- RLS — anon read-only (public portfolio)
-- ------------------------------------------------------------
alter table variants              enable row level security;
alter table variant_profile       enable row level security;
alter table variant_roles         enable row level security;
alter table variant_action_items  enable row level security;
alter table variant_key_tech      enable row level security;
alter table variant_skill_groups  enable row level security;
alter table variant_skills        enable row level security;

create policy "public read" on variants             for select using (true);
create policy "public read" on variant_profile      for select using (true);
create policy "public read" on variant_roles        for select using (true);
create policy "public read" on variant_action_items for select using (true);
create policy "public read" on variant_key_tech     for select using (true);
create policy "public read" on variant_skill_groups for select using (true);
create policy "public read" on variant_skills       for select using (true);

-- Grant service_role write access (required for seed scripts)
grant all on all tables    in schema public to service_role;
grant all on all sequences in schema public to service_role;

-- Grant anon read access (required for frontend queries)
grant select on variants             to anon;
grant select on variant_profile      to anon;
grant select on variant_roles        to anon;
grant select on variant_action_items to anon;
grant select on variant_key_tech     to anon;
grant select on variant_skill_groups to anon;
grant select on variant_skills       to anon;

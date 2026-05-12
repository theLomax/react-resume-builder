-- ============================================================
-- 0002_rls.sql
-- Row-level security — all tables are read-only for anon,
-- write access requires the service role key (server-side only).
-- ============================================================

alter table profiles            enable row level security;
alter table profile_summary     enable row level security;
alter table education           enable row level security;
alter table tags                enable row level security;
alter table roles               enable row level security;
alter table role_key_tech       enable row level security;
alter table action_items        enable row level security;
alter table action_item_variants enable row level security;
alter table action_item_tags    enable row level security;
alter table skill_groups        enable row level security;
alter table skills              enable row level security;
alter table skill_tags          enable row level security;

-- Anon can read everything — this is a public portfolio
create policy "public read" on profiles            for select using (true);
create policy "public read" on profile_summary     for select using (true);
create policy "public read" on education           for select using (true);
create policy "public read" on tags                for select using (true);
create policy "public read" on roles               for select using (true);
create policy "public read" on role_key_tech       for select using (true);
create policy "public read" on action_items        for select using (true);
create policy "public read" on action_item_variants for select using (true);
create policy "public read" on action_item_tags    for select using (true);
create policy "public read" on skill_groups        for select using (true);
create policy "public read" on skills              for select using (true);
create policy "public read" on skill_tags          for select using (true);

-- Grant service_role write access (required for seed scripts)
grant all on all tables    in schema public to service_role;
grant all on all sequences in schema public to service_role;

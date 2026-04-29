-- ============================================================
-- 0003_grants.sql
-- Grant table and sequence privileges to service_role
-- Required for seeding via the private seed script
-- ============================================================

grant all on all tables in schema public to service_role;
grant all on all sequences in schema public to service_role;

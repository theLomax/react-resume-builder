-- ============================================================
-- 0004_profile_email_unique.sql
-- Add unique constraint on profiles.email
-- Required for upsert conflict resolution in the seed script
-- ============================================================

alter table profiles add constraint profiles_email_unique unique (email);

-- ============================================================
-- seed.sql — example data (mirrors data/example/*.json)
-- Run after migrations. Uses example/ data only.
-- Replace with real data via the Supabase dashboard or a
-- separate private seed script in react-resume-data.
-- ============================================================

-- Tags
insert into tags (id, name) values
  ('00000000-0000-0000-0000-000000000001', 'design-system'),
  ('00000000-0000-0000-0000-000000000002', 'component-library'),
  ('00000000-0000-0000-0000-000000000003', 'api'),
  ('00000000-0000-0000-0000-000000000004', 'rest'),
  ('00000000-0000-0000-0000-000000000005', 'scale'),
  ('00000000-0000-0000-0000-000000000006', 'performance'),
  ('00000000-0000-0000-0000-000000000007', 'accessibility'),
  ('00000000-0000-0000-0000-000000000008', 'react'),
  ('00000000-0000-0000-0000-000000000009', 'typescript'),
  ('00000000-0000-0000-0000-000000000010', 'scss'),
  ('00000000-0000-0000-0000-000000000011', 'tailwind'),
  ('00000000-0000-0000-0000-000000000012', 'node'),
  ('00000000-0000-0000-0000-000000000013', 'leadership'),
  ('00000000-0000-0000-0000-000000000014', 'mentoring'),
  ('00000000-0000-0000-0000-000000000015', 'ci-cd'),
  ('00000000-0000-0000-0000-000000000016', 'testing'),
  ('00000000-0000-0000-0000-000000000017', 'agile'),
  ('00000000-0000-0000-0000-000000000018', 'data-viz'),
  ('00000000-0000-0000-0000-000000000019', 'mobile'),
  ('00000000-0000-0000-0000-000000000020', 'monorepo'),
  ('00000000-0000-0000-0000-000000000021', 'ecommerce'),
  ('00000000-0000-0000-0000-000000000022', 'cms'),
  ('00000000-0000-0000-0000-000000000023', 'email'),
  ('00000000-0000-0000-0000-000000000024', 'animation'),
  ('00000000-0000-0000-0000-000000000025', 'build-tools'),
  ('00000000-0000-0000-0000-000000000026', 'automation'),
  ('00000000-0000-0000-0000-000000000027', 'integration'),
  ('00000000-0000-0000-0000-000000000028', 'theming'),
  ('00000000-0000-0000-0000-000000000029', 'vue'),
  ('00000000-0000-0000-0000-000000000030', 'spa'),
  ('00000000-0000-0000-0000-000000000031', 'docker');

-- Profile
insert into profiles (id, first_name, last_name, email, phone, site, linkedin, location)
values (
  '10000000-0000-0000-0000-000000000001',
  'Jane', 'Smith',
  'jane@example.com', '555-000-0000',
  'https://janesmith.dev',
  'https://linkedin.com/in/janesmith',
  'Austin, TX'
);

insert into profile_summary (profile_id, text, "order") values
  ('10000000-0000-0000-0000-000000000001', 'A senior frontend engineer focused on building data-driven applications using React and modern JavaScript frameworks.', 1),
  ('10000000-0000-0000-0000-000000000001', 'Experienced across enterprise and agency environments with an emphasis on performance, accessibility, and long-term maintainability.', 2);

insert into education (profile_id, institution, degree, field, year) values
  ('10000000-0000-0000-0000-000000000001', 'Example University', 'Bachelor of Science', 'Computer Science', '2012');

-- Roles
insert into roles (id, profile_id, company, title, start_year, start_month, end_year, end_month, city, state, industry, display_order)
values
  ('example-agency',  '10000000-0000-0000-0000-000000000001', 'Example Agency',      'Senior Frontend Engineer', '2023', 'march',  '2025', 'june',     'Chicago', 'IL', 'Digital Marketing', 1),
  ('example-product', '10000000-0000-0000-0000-000000000001', 'Example Product Co',  'Frontend Engineer',        '2018', 'april',  '2023', 'february', 'Dallas',  'TX', 'SaaS',              2);

insert into role_key_tech (role_id, name, display_order) values
  ('example-agency',  'React',       1),
  ('example-agency',  'TypeScript',  2),
  ('example-agency',  'SCSS',        3),
  ('example-agency',  'Node.js',     4),
  ('example-product', 'Vue.js',      1),
  ('example-product', 'JavaScript',  2),
  ('example-product', 'SCSS',        3),
  ('example-product', 'Docker',      4);

-- Action items
insert into action_items (id, role_id, default_text, key_experience_text, is_key_experience, weight, display_order) values
  ('example-agency-1',  'example-agency',  'Architected a component-based design system enabling full theme changes via a single variable across multiple client builds.', 'Architected a component-based design system enabling scalable multi-client theming from a single source of truth.', true,  1.00, 1),
  ('example-agency-2',  'example-agency',  'Designed and implemented REST API-driven campaigns integrating external data sources into workflow logic.',                   'Designed REST API-driven campaigns integrating external data into automated, personalized user workflows.',           true,  0.85, 2),
  ('example-agency-3',  'example-agency',  'Mentored junior developers and contributed to Agile sprint planning and code reviews.',                                       null,                                                                                                                false, 0.50, 3),
  ('example-product-1', 'example-product', 'Built a component-driven Vue.js SPA, delivering scalable, reusable UI patterns within a Docker/Kubernetes environment.',     null,                                                                                                                false, 0.90, 1),
  ('example-product-2', 'example-product', 'Reduced campaign development time by 80% through reusable template architecture and automated workflow tooling.',             'Reduced campaign development time by 80% through reusable templates and automated workflow tooling.',                true,  1.00, 2);

-- Variants
insert into action_item_variants (action_item_id, audience, text) values
  ('example-agency-1', 'engineering', 'Architected a component-based design system with a single-variable theming contract, consumed across 6 client builds.'),
  ('example-agency-1', 'marketing',   'Delivered a scalable design system that reduced per-client build time by 60% across campaigns.'),
  ('example-agency-2', 'engineering', 'Built REST API-driven campaign pipelines connecting external data sources to workflow automation logic.'),
  ('example-agency-2', 'product',     'Integrated external data sources into campaign workflows, enabling personalized automated user experiences at scale.');

-- Action item tags
insert into action_item_tags (action_item_id, tag_id) values
  ('example-agency-1', '00000000-0000-0000-0000-000000000001'),  -- design-system
  ('example-agency-1', '00000000-0000-0000-0000-000000000002'),  -- component-library
  ('example-agency-1', '00000000-0000-0000-0000-000000000005'),  -- scale
  ('example-agency-1', '00000000-0000-0000-0000-000000000028'),  -- theming
  ('example-agency-1', '00000000-0000-0000-0000-000000000013'),  -- leadership
  ('example-agency-2', '00000000-0000-0000-0000-000000000003'),  -- api
  ('example-agency-2', '00000000-0000-0000-0000-000000000004'),  -- rest
  ('example-agency-2', '00000000-0000-0000-0000-000000000026'),  -- automation
  ('example-agency-2', '00000000-0000-0000-0000-000000000005'),  -- scale
  ('example-agency-2', '00000000-0000-0000-0000-000000000027'),  -- integration
  ('example-agency-3', '00000000-0000-0000-0000-000000000014'),  -- mentoring
  ('example-agency-3', '00000000-0000-0000-0000-000000000017'),  -- agile
  ('example-agency-3', '00000000-0000-0000-0000-000000000013'),  -- leadership
  ('example-product-1', '00000000-0000-0000-0000-000000000029'), -- vue
  ('example-product-1', '00000000-0000-0000-0000-000000000030'), -- spa
  ('example-product-1', '00000000-0000-0000-0000-000000000031'), -- docker
  ('example-product-1', '00000000-0000-0000-0000-000000000002'), -- component-library
  ('example-product-1', '00000000-0000-0000-0000-000000000005'), -- scale
  ('example-product-2', '00000000-0000-0000-0000-000000000026'), -- automation
  ('example-product-2', '00000000-0000-0000-0000-000000000005'), -- scale
  ('example-product-2', '00000000-0000-0000-0000-000000000006'), -- performance
  ('example-product-2', '00000000-0000-0000-0000-000000000025'); -- build-tools

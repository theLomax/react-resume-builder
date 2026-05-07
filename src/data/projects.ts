import type { Project } from '../types/project'

export const projects: Project[] = [
	{
		slug: 'custom-presentations',
		title: 'Multi-Client Presentation Builder',
		subtitle: 'Agency tooling: modular SCSS architecture and Gulp build platform',
		summary: 'A Gulp/Node build tool for Veeva CRM sales presentations: refactored from a brittle one-off into a reusable platform. Separated brand overrides from shared infrastructure, built a modular SCSS variable system, and migrated a complex codebase to the Dart Sass 3.0 @use/@forward module system.',
		tags: ['Gulp', 'Node', 'SCSS', 'Pug', 'GSAP', 'Sortable.js', 'Puppeteer', 'Veeva CRM'],
		sections: [
			{
				type: 'text',
				heading: 'Overview',
				content: 'Veeva CRM presentations are delivered as self-contained web bundles deployed through Salesforce. The legacy tool was a single-client Gulp setup: shared SCSS lived mixed in with client-specific overrides, @import chained everything implicitly, and adapting it for a new client meant forking the whole project. The goal was to redesign the source structure so the shared infrastructure could stay untouched while each client\'s brand overrides lived in isolation.',
			},
			{
				type: 'text',
				heading: 'Before: legacy @import structure',
				content: 'The original codebase used deprecated @import statements and a function-based color system slated for removal in Dart Sass 3.0.0. Brand colors and shared defaults were co-mingled, with no clear boundary between what was client-specific and what was infrastructure.',
			},
			{
				type: 'code',
				heading: 'Legacy SCSS structure',
				lang: 'text',
				content: `src/
├── sass/
│   ├── _vars.scss        // @import project and defaults
│   ├── _defaults.scss    // @import mixins
│   └── _builder.scss     // @import vars and project
└── slides/
    ├── shared/css/
    │   └── global.scss   // @import vars and fonts
    ├── Z05/css/
    │   └── slide.scss
    └── Z10/css/
        └── slide.scss`,
			},
			{
				type: 'text',
				heading: 'After: @use / @forward module architecture',
				content: 'Each client\'s brand overrides now live in their own _sourceDeck/ directory. The shared SCSS infrastructure never needs to change to accommodate a new project: a new client gets a new source deck and overrides only what differs.',
			},
			{
				type: 'code',
				heading: 'New modular structure',
				lang: 'text',
				content: `src/
├── sass/
│   ├── _vars.scss        // @forward defaults and project
│   ├── _defaults.scss    // @use mixins with defaults
│   ├── _mixins.scss      // flexible font-family mixin (new)
│   └── _builder.scss     // @use vars with namespacing
├── slides/
│   ├── shared/css/
│   │   └── global.scss   // @use vars and fonts
│   ├── Z05/css/
│   │   └── slide.scss
│   └── Z10/css/
│       └── slide.scss
└── _sourceDeck/styles/   // new: per-client brand layer
    └── project.scss      // @use mixins, brand overrides`,
			},
			{
				type: 'section',
				heading: 'Variable system with !default',
				blocks: [
					{
						type: 'text',
						className: 'full',
						content: '<code>@use</code> replaces implicit global state with explicit import graphs -- every file declares what it depends on, namespace collisions across partials are impossible by default, and the dependency chain is traceable. Centralized defaults with !default flags mean client project files override only what they need; the cascade stays intact and shared defaults require no modification.',
					},
					{
						type: 'div',
						className: 'flex-half',
						blocks: [
					{
						type: 'code',
						heading: 'Before: brittle static defaults',
						lang: 'scss',
						content: `// src/sass/_defaults.scss | static, not overridable
body {
  font-family: Poppins;
}

element {
  background-color: #0049bf;
}`,
					},
					{
						type: 'code',
						heading: 'After: client overrides via !default',
						lang: 'scss',
						content: `// _sourceDeck/styles/project.scss
@use '../../src/sass/mixins' as mixins;

$fontFamily:    Poppins !default;
$brandColor1:   #0053e2 !default;
$brandColor2:   #001E60 !default;
$primaryColor:  $branrColor1 !default;

// Client-specific overrides go here
// only what differs from shared defaults.`,
					}
				]
			}
		]},

			{
				type: 'section',
				className: ['flex-5ths', 'flip'],
				blocks: [
					{
						type: 'text',
						heading: 'Builder walkthrough',
						content: 'Creating a new presentation starts with a title composed from a selection of configurable strings <em>(injected per-project from </em><code>_sourceDeck/</code><em>)</em>. The combination is checked against saved projects. Duplicates prompt an option to change the title or add an iteration suffix.',
					},
					{
						type: 'image',
						src: '/img/portfolio/iva-001.png',
						alt: 'Presentation title builder: string selection UI',
					}
				]
			},
			{
				type: 'section',
				blocks: [
					{
						type: 'text',
						className: 'full',
						heading: 'Slide selection and ordering',
						content: 'After title selection, the user picks and reorders slides within the presentation. Grouped slides, indicated with a lock icon, are fixed in relative position and sequence. This constraint was implemented with Sortable.js, custom JavaScript event logic, and SCSS state classes to meet specific requirements from creative and UX stakeholders.',
					},
					{
						type: 'div',
						className: ['stacked'],
						blocks: [
							{
								type: 'image',
								src: '/img/portfolio/iva-004.png',
								alt: 'Slide selection and reorder interface',
							},
							{
								type: 'image',
								src: '/img/portfolio/iva-006.png',
								alt: 'Grouped slides with lock constraint applied',
							}
						]
					}
				]
			},
			{
				type: 'section',
				className: ['flex-5ths', 'flip', 'rev-r'],
				blocks: [
					{
						type: 'text',
						heading: 'Persistence: delta storage',
						content: 'Saved presentations are mapped to localStorage. Default slide definitions are referenced by key rather than duplicated, so most custom presentation data stays under 2kB regardless of presentation count -- store the delta, not the full state.',
					},
					{
						type: 'image',
						src: '/img/portfolio/iva-008.png',
						alt: 'Saved presentations list view',
					}
				]
			},
			
			{
				type: 'section',
				className: ['flex-5ths', 'flip'],
				blocks: [
					{
						type: 'text',
						heading: 'Grid and list view',
						content: 'The presentation builder supports grid and list view toggling. Project-specific style overrides and content are inherited from the source deck, making it fast to replicate and customize across multiple clients and brands without forking core logic.',
					},
					{
						type: 'image',
						src: '/img/portfolio/iva-005.png',
						alt: 'Builder in grid view mode',
					}
				]
			},
			{
				type: 'text',
				heading: 'Multi-client deployment',
				content: 'Project-specific style overrides and content are inherited from the source deck, so replicating the tool for a new client means creating a new <code>_sourceDeck/</code> directory with brand variables - the shared infrastructure is untouched. The same build pipeline, slide library, and builder UI serve every deployment.',
			},
		],
	},
	{
		slug: 'yeoman-refactor',
		title: 'Scalable Ad Generator Build System',
		subtitle: 'Agency tooling: Yeoman scaffolding, modular SCSS, and Gulp variable injection',
		summary: 'A Node.js/Yeoman scaffolding tool for HTML5 display ad campaigns - redesigned the SCSS architecture to support size-scoped style modules, replaced static dimension overrides with dynamic Gulp variable injection, and migrated the codebase to the Dart Sass <code>@use</code> module system.',
		tags: ['Node', 'Yeoman', 'Gulp', 'SCSS', 'Pug', 'Rollup', 'Babel', 'PostCSS', 'Puppeteer'],
		sections: [
			{
				type: 'text',
				heading: 'The problem',
				content: 'HTML5 display ad campaigns run across many banner sizes simultaneously. The legacy scaffolding gave designers three style layers, global, campaign, and local - but no shared layer for size-specific rules. Any size-specific adjustment meant redundant one-off overrides scattered across individual banner stylesheets, with no shared layer to absorb common patterns. The goal was to give designers size-scoped control without duplicating per-banner stylesheets, while keeping the build pipeline maintainable as project complexity scaled.',
			},
			{
				type: 'section',
				blocks: [
					
					{
						type: 'text',
						heading: 'Refactor: size-scoped style modules',
						content: 'The refactor added a fourth layer: size-scoped global partials. Any campaign that includes a <code>300x600</code> banner automatically inherits the <code>300x600</code> style rules: no per-banner duplication, no per-campaign knowledge of other sizes required.',
					},
					{ type: 'div',
						className: 'flex-half',
						blocks: [
			{
				type: 'code',
				heading: 'Before: three-layer structure',
				lang: 'text',
				content: `├─ campaigns/
│   ├─ campaign-1/
│   │   ├─ banners/  // ↓ local overrides only
│   │   │   ├─ 160x600/
│   │   │   │   └─ styles.scss
│   │   │   ├─ 300x250/
│   │   │   ├─ 300x600/
│   │   │   └─ 728x90/
│   │   ├─ js/
│   │   ├─ pug/
│   │   └─ sass/   // ↓ campaign-level styles
│   │       └─ campaign.scss 
│   └─ campaign-2/ (same structure)
├─ js/
├─ pug/
└─ sass/
    └─ _base.scss  // global styles`,
			},
			{
				type: 'code',
				heading: 'After: size-scoped modules added to global sass layer',
				lang: 'text',
				content: `├─ campaigns/ (unchanged)
│   ├─ campaign-1/
│   │   └─ banners/
│   │       └─ 160x600/
│   │           └─ styles.scss
│   └─ campaign-2/
├─ js/
├─ pug/
└─ sass/
    ├─ _base.scss
    │ // ↓ ↓ ↓ ↓ New Modular styles
    ├─ _global-160x600.scss
    ├─ _global-300x250.scss
    ├─ _global-300x600.scss
    ├─ _global-728x90.scss 
    ├─ _isi.scss
    └─ _vars.scss`,
			}
		]}
		]},
			{
				type: 'text',
				heading: 'Gulp dimension injection',
				content: 'Rather than hardcoding banner dimensions in each stylesheet, Gulp reads the folder name <em>(e.g. "300x600")</em>, splits it into width and height, and prepends them as SCSS variables before compilation. Each banner gets the right dimensions automatically, while still allowing manual overrides at the size, campaign, or individual banner level.',
			},
			{
				type: 'code',
				heading: 'Gulp: prepending SCSS variables at build time',
				lang: 'javascript',
				content: `.pipe($.tap((file) => {
  const folderName = path.basename(path.dirname(file.path));
  const sizes = folderName.split('x');
  file.contents = Buffer.from(
    (
      \`$gulp-environment: \${development() ? 'development' : 'production'};\\n\` +
      \`$gulp-width: \${sizes[0]}px;\\n\` +
      \`$gulp-height: \${sizes[1]}px;\\n\\n\`
    ).concat(String(file.contents))
  );
}))`,
			},
			{
				type: 'code',
				heading: 'Consuming injected dimensions in the style template',
				lang: 'scss',
				content: `// template/sass/styles.scss
// Dimensions are consumed via <code>@use</code> with - no hardcoding required
@use '<%= globalSassPath %>vars' as * with (
  $environment: $gulp-environment,
  $adWidth:     $gulp-width,
  $adHeight:    $gulp-height
);

@use '<%= globalSassPath %>base';
@use '<%= globalSassPath %>isi';
@use '<%= globalSassPath %>global-<%= size %>';`,
			},
			{
				type: 'text',
				heading: 'ISI: proportional dimensions via SCSS math',
				content: 'Pharmaceutical ads often require a scrolling ISI <em>(Important Safety Information)</em> panel. Its height is computed proportionally from the injected ad height using Sass math --> the content window takes the remaining space automatically.',
			},
			{
				type: 'code',
				heading: 'Size-scoped ISI layout: _global-300x600.scss',
				lang: 'scss',
				content: `@use 'vars' as *;
@use 'sass:math';

@if $showISI {
  $contentHeight:    math.floor($adHeight * .66);
  $isiHeaderHeight:  2rem;

  #isi {
    width:  $adWidth;
    height: calc($adHeight - $contentHeight);
  }

  #isi-header {
    height: $isiHeaderHeight;
  }

  #isi-wrapper {
    width:  inherit;
    height: calc($adHeight - $contentHeight - $isiHeaderHeight);
  }
}`,
			},
			{
				type: 'text',
				heading: 'Dart Sass @use migration',
				content: '<code>@import</code> creates implicit global state: any partial can collide with any other, and dependencies are invisible until something breaks. <code>@use</code> replaces that with explicit, namespaced imports: each file declares exactly what it depends on, and the full dependency graph is traceable. The migration also unlocked Dart Sass 3.0.0 compatibility and allowed variables to be passed directly rather than wrapped in functions.',
			},
			{
				type: 'code',
				heading: 'Before and after: campaign partial',
				lang: 'scss',
				content: `// Before: implicit global import
@import '../../../sass/_base';

// After: explicit, namespaced
@use '../../../sass/vars' as *;`,
			},
		],
	},
	{
		slug: 'react-resume-builder',
		title: 'Adaptive Resume Builder',
		subtitle: 'Solo project: end-to-end architecture, design, and delivery',
		summary: 'A variant-driven resume system that applies audience-specific content deltas at query time - one base record, many tailored outputs, no duplication.',
		tags: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Claude API', 'GitHub Actions', 'SCSS'],
		liveUrl: 'https://lomax.dev',
		repoUrl: 'https://github.com/thelomax/react-resume-builder',
		sections: [
			{
				type: 'text',
				heading: 'Overview',
				content: 'Built to solve a real problem: maintaining multiple tailored resumes without the copy-paste maintenance burden. The system stores a single canonical record per role and applies sparse variant overrides at query time. A role-specific resume is a delta, not a duplicate.',
			},
			{
				type: 'text',
				heading: 'Data model',
				content: 'A 10+ table relational schema in PostgreSQL <em>(via Supabase)</em> with Row Level Security and role-based grants. The variant layer stores only what changes: profile overrides, action item rewrites, key tech selection, and skill group ordering. Base records fall through wherever no variant override exists.',
			},
			{
				type: 'code',
				heading: 'Variant override pattern',
				lang: 'sql',
				content: `-- Base action items fall through when no variant override exists
SELECT
  COALESCE(vai.text, ai.default_text) AS text
FROM variant_roles vr
LEFT JOIN variant_action_items vai
  ON vai.role_id = vr.role_id AND vai.variant_id = $1
LEFT JOIN action_items ai
  ON ai.role_id = vr.role_id
WHERE vr.variant_id = $1
ORDER BY vr.display_order,
  COALESCE(vai.display_order, ai.display_order)`,
			},
			{
				type: 'text',
				heading: 'Frontend',
				content: 'A React 19 SPA built with Vite, TypeScript, and SCSS Modules. A single TanStack Query hook composes the variant and base layers into a typed ResumeData object. The same component tree renders to both screen and print, with a central icon theme config handling asset swaps per context.',
			},
			{
				type: 'text',
				heading: 'Static build pipeline',
				content: 'The published site has no runtime dependency on Supabase. A Node.js prebuild script runs before the Vite build: it queries the target variant, assembles the full ResumeData object from base records and overrides, and writes it to a static JSON file that the built SPA imports directly.',
			},
			{
				type: 'code',
				heading: 'Prebuild fetch: scripts/fetch-cv.mjs',
				lang: 'javascript',
				content: `// Queries Supabase, assembles the variant + base merge,
// writes to src/data/cv-static.json before vite build.

const { data: roles } = await supabase
  .from('variant_roles')
  .select(\`
    role_id, display_order, title_override, show_key_tech,
    roles ( company, title, start_year, end_year ),
    variant_action_items ( text, display_order ),
    variant_key_tech    ( name, display_order )
  \`)
  .eq('variant_id', variantId)
  .order('display_order')

// Base action items fall through when no variant override exists
const assembled = mergeVariantWithBase({ profile, roles, skills })
fs.writeFileSync('src/data/cv-static.json', JSON.stringify(assembled, null, 2))`,
			},
			{
				type: 'text',
				heading: 'AI integration',
				content: 'A Claude API integration takes the base role content and a target job description and generates audience-specific action items and summary variants. The output is structured JSON that feeds directly into the variant SQL, enabling an AI-assisted authoring workflow alongside the manual content pipeline.',
			},
			{
				type: 'code',
				heading: 'Variant generation: prompt shape',
				lang: 'typescript',
				content: `const response = await anthropic.messages.create({
  model: 'claude-opus-4-5',
  max_tokens: 1024,
  messages: [{
    role: 'user',
    content: buildVariantPrompt({
      baseActionItems,   // canonical role content
      jobDescription,    // target JD text
      variantLabel,      // audience context
    }),
  }],
})

// Output: structured JSON → inserted into variant_action_items
const items = JSON.parse(response.content[0].text) as VariantActionItem[]`,
			},
		],
	},
	{
		slug: 'react-native-compliance',
		title: 'Compliance Route Planner',
		subtitle: 'Solo project: domain modeling, mobile UX, and full-stack delivery',
		summary: 'A React Native app that computes multi-route alternatives for interstate transport of regulated cargo: scoring each route for legal compliance across overlapping state and local jurisdictions, with severity-ranked alerts and statutory citations surfaced inline.',
		tags: ['React Native', 'Expo', 'TypeScript', 'Fastify', 'PostgreSQL', 'PNPM monorepo'],
		repoUrl: 'https://github.com/theLomax/ReguRoute',
		sections: [
			{
				type: 'text',
				heading: 'The domain problem',
				content: 'Interstate transport of regulated cargo involves a patchwork of state and local laws: quantity limits by item category, feature-based prohibitions, permit reciprocity rules, and federal preemption statutes. A route that is legal at origin and destination may still cross multiple jurisdictions with conflicting requirements. The app makes that complexity invisible: select your cargo, enter a start and end point, and get a routable path that flags every jurisdiction-level conflict with a severity level and a legal citation.',
			},
			{
				type: 'text',
				heading: 'Shared types monorepo',
				content: 'The project is structured as a pnpm monorepo with three packages: apps/mobile, apps/backend, and packages/types. The types package does more than define interfaces. It also exports <code>buildCargoProfile()</code>, a pure utility that aggregates one or more loadouts and active permits into a compliance-ready profile object. Both the mobile app and the backend consume the same package, so the profile sent to the API is always the same shape the backend was designed to receive.',
			},
			{
				type: 'code',
				heading: 'Shared profile type and derivation',
				lang: 'typescript',
				content: `// packages/types/src/index.ts
// Aggregated cargo state passed to the
// compliance engine at route analysis time.
export interface CargoProfile {
  has_regulated_items: boolean;
  item_categories: ItemCategory[];
  max_quantity_by_category: Record<ItemCategory, number>;
  has_restricted_class_items: boolean;
  has_transport_permit: boolean;
  permit_states: string[];
}

// apps/mobile/src/screens/RoutePlanScreen.tsx
// Profile is derived in the component, never stored as-is.
const activeCargoProfile = useMemo(() => {
  return buildCargoProfile(selectedLoadouts, permits);
}, [selectedLoadouts, permits]);`,
			},
			{
				type: 'text',
				heading: 'Sparse restriction data model',
				content: 'Jurisdiction restrictions are modeled as a sparse dataset: only rules that prohibit or limit something are stored -- absence of a record means the item is allowed. This avoids a combinatorial table of "allowed" entries for every jurisdiction and equipment combination. Each restriction record carries a typed restriction_type, a typed rule object, a severity level, and an optional statutory citation. The compliance checker runs the active cargo profile against each jurisdiction\'s restrictions and produces severity-ranked alerts.',
			},
			{
				type: 'code',
				heading: 'Jurisdiction restriction type',
				lang: 'typescript',
				content: `// Sparse model: only store what IS restricted.
// Absence of a record = allowed.
export interface JurisdictionRestriction {
  jurisdiction_code: string; // 'NY', 'NJ', 'CA'
  restriction_type: RestrictionRuleType;
  applies_to: {
    categories?: ItemCategory[];
    restricted_classes?: RestrictedClass[];
    item_features?: ItemFeature[];
  };
  rule: {
    max_value?: number;
    prohibited?: string[];
    max_features?: number;
  };
  severity: 'prohibited' | 'restricted' | 'regulated';
  citation?: string; // Statutory reference
}`,
			},
			{
				type: 'text',
				heading: 'Multi-route scoring',
				content: 'Route planning is structured as a four-step wizard: equipment selection → location entry → endpoint compliance validation → route preview. The compliance check at step three validates the selected cargo against regulations at the origin and destination before routing, so the user knows about endpoint conflicts before committing to a route calculation. The route calculation calls an alternatives endpoint that returns multiple candidate routes scored across three dimensions: compliance (how many restricted jurisdictions the route crosses), efficiency (distance and duration), and an overall weighted score. Routes that avoid restricted jurisdictions entirely carry a higher compliance score than routes that pass through them and rely on federal preemption provisions.',
			},
			{
				type: 'code',
				heading: 'Route alternatives response shape',
				lang: 'typescript',
				content: `{
  routes: [{
    metadata: {
      route_type: 'direct' | 'compliant' | 'scenic',
      detour_minutes: 14,
      restricted_states_avoided: ['NJ', 'MD'],
    },
    scores: {
      compliance_score: 95,
      efficiency_score: 78,
      overall_score: 87,
    },
    analysis: {
      jurisdictions_crossed: ['NY', 'PA', 'VA'],
      alerts: [...]
    }
  }],
  recommendation: {
    recommended_route_index: 1,
    reason: 'Best compliance with minimal detour',
    compliance_summary: 'No critical alerts'
  }
}`,
			},
			{
				type: 'text',
				heading: 'State management',
				content: 'The app uses four typed React contexts - Auth, Cargo, Routes, and Preferences - each backed by a custom hook that throws if called outside its provider boundary. Sensitive cargo profile data is persisted to device secure storage via Expo SecureStore rather than AsyncStorage, which stores data unencrypted. Each context exposes a typed interface and encapsulates its own loading and error state.',
			},
		],
	},
]

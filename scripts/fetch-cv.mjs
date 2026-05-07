/**
 * Fetch the default CV variant from Supabase and write it to
 * src/data/cv-static.json for use in the production build.
 *
 * Run automatically via: pnpm build
 * Run manually:          node scripts/fetch-cv.mjs
 *
 * Reads credentials from .env.local (falling back to .env.production).
 * The output file is committed to the repo — it represents the current
 * published state of the CV. Update it by running pnpm build locally.
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root      = resolve(__dirname, '..')

// ── Load env ─────────────────────────────────────────────────────────────────

function parseEnvFile(path) {
	try {
		return Object.fromEntries(
			readFileSync(path, 'utf8')
				.split('\n')
				.map(l => l.trim())
				.filter(l => l && !l.startsWith('#') && l.includes('='))
				.map(l => {
					const eq  = l.indexOf('=')
					const key = l.slice(0, eq).trim()
					const val = l.slice(eq + 1).trim()
					return [key, val]
				})
		)
	} catch { return {} }
}

// .env.local takes precedence over .env.production
const env = {
	...parseEnvFile(resolve(root, '.env.production')),
	...parseEnvFile(resolve(root, '.env.local')),
}

const supabaseUrl  = process.env.VITE_SUPABASE_URL  ?? env.VITE_SUPABASE_URL
const supabaseKey  = process.env.VITE_SUPABASE_ANON_KEY ?? env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
	console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env.local / .env.production')
	process.exit(1)
}

const supabase   = createClient(supabaseUrl, supabaseKey)
const VARIANT_ID = 'default'

// ── Fetch ─────────────────────────────────────────────────────────────────────

console.log(`Fetching variant "${VARIANT_ID}" from Supabase…`)

// Profile
const { data: profile, error: profileError } = await supabase
	.from('profiles').select('*').single()
if (profileError) { console.error(profileError); process.exit(1) }

// Education
const { data: educationRows } = await supabase
	.from('education').select('*').eq('profile_id', profile.id).order('year')

// Variant profile overrides
const { data: variantProfile } = await supabase
	.from('variant_profile').select('*').eq('variant_id', VARIANT_ID).maybeSingle()

// Variant roles (ordered)
const { data: variantRoles, error: vrError } = await supabase
	.from('variant_roles').select('*').eq('variant_id', VARIANT_ID).order('display_order')
if (vrError || !variantRoles?.length) {
	console.error('No roles found for variant:', vrError ?? 'empty result')
	process.exit(1)
}

const roleIds = variantRoles.map(r => r.role_id)

// Base role records
const { data: rolesRows } = await supabase
	.from('roles').select('*').in('id', roleIds)

// Variant action items
const { data: actionItemRows } = await supabase
	.from('variant_action_items').select('*')
	.eq('variant_id', VARIANT_ID).order('display_order')

// Base action items fallback (roles with no variant override)
const rolesWithVariantItems    = new Set((actionItemRows ?? []).map(r => r.role_id))
const rolesNeedingFallback     = roleIds.filter(id => !rolesWithVariantItems.has(id))
const { data: baseActionItems } = rolesNeedingFallback.length
	? await supabase.from('action_items').select('*')
		.in('role_id', rolesNeedingFallback).order('display_order')
	: { data: [] }

// Variant key tech
const { data: keyTechRows } = await supabase
	.from('variant_key_tech').select('*')
	.eq('variant_id', VARIANT_ID).order('display_order')

// Base key tech fallback
const rolesWithVariantKeyTech   = new Set((keyTechRows ?? []).map(r => r.role_id))
const rolesNeedingKTFallback    = roleIds.filter(id => !rolesWithVariantKeyTech.has(id))
const { data: baseKeyTechRows } = rolesNeedingKTFallback.length
	? await supabase.from('role_key_tech').select('*')
		.in('role_id', rolesNeedingKTFallback).order('display_order')
	: { data: [] }

// Variant skill groups
const { data: variantSkillGroups } = await supabase
	.from('variant_skill_groups').select('*')
	.eq('variant_id', VARIANT_ID).order('display_order')

const skillGroupIds = variantSkillGroups?.map(g => g.skill_group_id) ?? []

const { data: skillGroupRows } = await supabase
	.from('skill_groups').select('*').in('id', skillGroupIds)

// Variant skills
const { data: variantSkills } = await supabase
	.from('variant_skills').select('*')
	.eq('variant_id', VARIANT_ID).order('display_order')

const skillIds = variantSkills?.map(s => s.skill_id) ?? []

const { data: skillRows } = await supabase
	.from('skills').select('*').in('id', skillIds)

// ── Assemble (mirrors useResumeData variant path) ─────────────────────────────

const data = {
	profile: {
		firstName: profile.first_name,
		lastName:  profile.last_name,
		email:     profile.email,
		phone:     profile.phone     ?? undefined,
		linkedin:  profile.linkedin  ?? undefined,
		location:  profile.location  ?? undefined,
		site:      profile.site      ?? undefined,
		title:     variantProfile?.title    ?? undefined,
		subtitle:  variantProfile?.subtitle ?? undefined,
	},
	summary:       variantProfile?.summary        ?? [],
	hideEducation: variantProfile?.hide_education ?? false,
	roles: variantRoles.map(vr => {
		const role = rolesRows?.find(r => r.id === vr.role_id)
		return {
			id:          role.id,
			company:     role.company,
			company_em:  role.company_em  ?? undefined,
			title:       vr.title_override ?? role.title,
			title_em:    role.title_em     ?? undefined,
			start_year:  role.start_year,
			start_month: role.start_month  ?? undefined,
			end_year:    role.end_year,
			end_month:   role.end_month    ?? undefined,
			city:        role.city         ?? undefined,
			state:       role.state        ?? undefined,
			industry:    role.industry     ?? undefined,
			keyTech: (keyTechRows ?? []).some(kt => kt.role_id === role.id)
				? (keyTechRows ?? []).filter(kt => kt.role_id === role.id).map(kt => kt.name)
				: (baseKeyTechRows ?? []).filter(kt => kt.role_id === role.id).map(kt => kt.name),
			actionItems: (actionItemRows ?? []).some(item => item.role_id === role.id)
				? (actionItemRows ?? []).filter(item => item.role_id === role.id).map(item => item.text)
				: (baseActionItems ?? []).filter(item => item.role_id === role.id).map(item => item.default_text),
			showKeyTech: vr.show_key_tech ?? undefined,
		}
	}),
	education: (educationRows ?? []).map(row => ({
		id:          row.id,
		institution: row.institution,
		degree:      row.degree,
		field:       row.field ?? undefined,
		year:        row.year  ?? undefined,
	})),
	skillGroups: (variantSkillGroups ?? []).map(vsg => {
		const group = skillGroupRows?.find(g => g.id === vsg.skill_group_id)
		return {
			label: group.label,
			skills: (variantSkills ?? [])
				.filter(vs => {
					const skill = skillRows?.find(s => s.id === vs.skill_id)
					return skill?.skill_group_id === group.id
				})
				.map(vs => {
					const skill = skillRows?.find(s => s.id === vs.skill_id)
					return vs.label_override ?? skill.label
				}),
		}
	}),
}

// ── Write ─────────────────────────────────────────────────────────────────────

const outPath = resolve(root, 'src/data/cv-static.json')
writeFileSync(outPath, JSON.stringify(data, null, '\t'))
console.log(`Written → src/data/cv-static.json`)

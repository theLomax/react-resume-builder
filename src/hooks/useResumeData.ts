import { useQuery } from "@tanstack/react-query"
import { supabase } from "../lib/supabase"
import type { ResumeData } from "../types/resume"

export function useResumeData(variantId?: string) {
	return useQuery<ResumeData>({
		queryKey: ['resume', variantId ?? 'base'],
		staleTime: 0,
		queryFn: async () => {

			// fetch profile —————————————————————————————————————————————
			const { data: profile, error: profileError } = await supabase
				.from('profiles')
				.select('*')
				.single()

			if (profileError) throw profileError
			if (!profile) throw new Error('No profile found')

			// fetch education (always from base) ————————————————————————
			const { data: educationRows, error: educationError } = await supabase
				.from('education')
				.select('*')
				.eq('profile_id', profile.id)
				.order('year')

			if (educationError) throw educationError
			if (!educationRows) throw Error('No education found')

			// ── VARIANT PATH ─────────────────────────────────────────────
			if (variantId) {

				// fetch variant profile overrides ————————————————————————
				const { data: variantProfile } = await supabase
					.from('variant_profile')
					.select('*')
					.eq('variant_id', variantId)
					.single()

				// fetch variant roles ————————————————————————————————————
				const { data: variantRoles, error: vrError } = await supabase
					.from('variant_roles')
					.select('*')
					.eq('variant_id', variantId)
					.order('display_order')

				if (vrError) throw vrError
				if (!variantRoles?.length) throw Error('No roles found for variant')

				const roleIds = variantRoles.map(r => r.role_id)

				// fetch base role data for the selected roles —————————————
				const { data: rolesRows, error: rolesError } = await supabase
					.from('roles')
					.select('*')
					.in('id', roleIds)

				if (rolesError) throw rolesError

				// fetch variant action items ——————————————————————————————
				const { data: actionItemRows, error: aiError } = await supabase
					.from('variant_action_items')
					.select('*')
					.eq('variant_id', variantId)
					.order('display_order')

				if (aiError) throw aiError

				// fetch variant key tech ——————————————————————————————————
				const { data: keyTechRows, error: ktError } = await supabase
					.from('variant_key_tech')
					.select('*')
					.eq('variant_id', variantId)
					.order('display_order')

				if (ktError) throw ktError

				// fetch variant skill groups ——————————————————————————————
				const { data: variantSkillGroups, error: vsgError } = await supabase
					.from('variant_skill_groups')
					.select('*')
					.eq('variant_id', variantId)
					.order('display_order')

				if (vsgError) throw vsgError

				const skillGroupIds = variantSkillGroups?.map(g => g.skill_group_id) ?? []

				// fetch base skill group data —————————————————————————————
				const { data: skillGroupRows, error: sgError } = await supabase
					.from('skill_groups')
					.select('*')
					.in('id', skillGroupIds)

				if (sgError) throw sgError

				// fetch variant skills ————————————————————————————————————
				const { data: variantSkills, error: vsError } = await supabase
					.from('variant_skills')
					.select('*')
					.eq('variant_id', variantId)
					.order('display_order')

				if (vsError) throw vsError

				const skillIds = variantSkills?.map(s => s.skill_id) ?? []

				// fetch base skill data ———————————————————————————————————
				const { data: skillRows, error: skillError } = await supabase
					.from('skills')
					.select('*')
					.in('id', skillIds)

				if (skillError) throw skillError

				return {
					profile: {
						firstName: profile.first_name,
						lastName: profile.last_name,
						email: profile.email,
						phone: profile.phone ?? undefined,
						linkedin: profile.linkedin ?? undefined,
						location: profile.location,
						site: profile.site,
						title: variantProfile?.title ?? undefined,
						subtitle: variantProfile?.subtitle ?? undefined,
					},
					summary: variantProfile?.summary ?? [],
					roles: variantRoles.map(vr => {
						const role = rolesRows?.find(r => r.id === vr.role_id)!
						return {
							id: role.id,
							company: role.company,
							company_em: role.company_em ?? undefined,
							title: vr.title_override ?? role.title,
							title_em: role.title_em ?? undefined,
							start_year: role.start_year,
							start_month: role.start_month ?? undefined,
							end_year: role.end_year,
							end_month: role.end_month ?? undefined,
							city: role.city ?? undefined,
							state: role.state ?? undefined,
							industry: role.industry ?? undefined,
							keyTech: (keyTechRows ?? [])
								.filter(kt => kt.role_id === role.id)
								.map(kt => kt.name),
							actionItems: (actionItemRows ?? [])
								.filter(item => item.role_id === role.id)
								.map(item => item.text),
							showKeyTech: vr.show_key_tech ?? undefined,
						}
					}),
					education: educationRows.map(row => ({
						id: row.id,
						institution: row.institution,
						degree: row.degree,
						field: row.field ?? undefined,
						year: row.year ?? undefined,
					})),
					skillGroups: (variantSkillGroups ?? []).map(vsg => {
						const group = skillGroupRows?.find(g => g.id === vsg.skill_group_id)!
						return {
							label: group.label,
							skills: (variantSkills ?? [])
								.filter(vs => {
									const skill = skillRows?.find(s => s.id === vs.skill_id)
									return skill?.skill_group_id === group.id
								})
								.map(vs => {
									const skill = skillRows?.find(s => s.id === vs.skill_id)!
									return vs.label_override ?? skill.label
								}),
						}
					}),
				}
			}

			// ── BASE PATH ────────────────────────────────────────────────

			// fetch summary ——————————————————————————————————————————————
			const { data: summaryRows, error: summaryError } = await supabase
				.from('profile_summary')
				.select('*')
				.eq('profile_id', profile.id)
				.order('order')

			if (summaryError) throw summaryError
			if (!summaryRows) throw Error('No summary found')

			// fetch roles ————————————————————————————————————————————————
			const { data: rolesRows, error: rolesError } = await supabase
				.from('roles')
				.select('*')
				.eq('profile_id', profile.id)
				.order('display_order')

			if (rolesError) throw rolesError
			if (!rolesRows) throw Error('No roles found')

			// fetch key tech —————————————————————————————————————————————
			const { data: keyTechRows, error: keyTechError } = await supabase
				.from('role_key_tech')
				.select('*')
				.in('role_id', rolesRows.map(row => row.id))
				.order('display_order')

			if (keyTechError) throw keyTechError
			if (!keyTechRows) throw Error('No key tech found')

			// fetch action items ——————————————————————————————————————————
			const { data: actionItemRows, error: actionItemError } = await supabase
				.from('action_items')
				.select('*')
				.in('role_id', rolesRows.map(row => row.id))
				.order('display_order')

			if (actionItemError) throw actionItemError
			if (!actionItemRows) throw Error('No action items found')

			// fetch skill groups ——————————————————————————————————————————
			const { data: skillGroupRows, error: skillGroupError } = await supabase
				.from('skill_groups')
				.select('*')
				.order('display_order')

			if (skillGroupError) throw skillGroupError
			if (!skillGroupRows) throw Error('No skill groups found')

			// fetch skills ———————————————————————————————————————————————
			const { data: skillRows, error: skillError } = await supabase
				.from('skills')
				.select('*')
				.in('skill_group_id', skillGroupRows.map(row => row.id))
				.order('display_order')

			if (skillError) throw skillError
			if (!skillRows) throw Error('No skills found')

			return {
				profile: {
					firstName: profile.first_name,
					lastName: profile.last_name,
					email: profile.email,
					phone: profile.phone ?? undefined,
					linkedin: profile.linkedin ?? undefined,
					location: profile.location,
					site: profile.site,
				},
				summary: summaryRows.map(row => row.text),
				roles: rolesRows.map(row => ({
					id: row.id,
					company: row.company,
					company_em: row.company_em ?? undefined,
					title: row.title,
					title_em: row.title_em ?? undefined,
					start_year: row.start_year,
					start_month: row.start_month ?? undefined,
					end_year: row.end_year,
					end_month: row.end_month ?? undefined,
					city: row.city ?? undefined,
					state: row.state ?? undefined,
					industry: row.industry ?? undefined,
					keyTech: keyTechRows
						.filter(kt => kt.role_id === row.id)
						.map(kt => kt.name),
					actionItems: actionItemRows
						.filter(item => item.role_id === row.id)
						.map(item => item.default_text),
				})),
				education: educationRows.map(row => ({
					id: row.id,
					institution: row.institution,
					degree: row.degree,
					field: row.field ?? undefined,
					year: row.year ?? undefined,
				})),
				skillGroups: skillGroupRows.map(row => ({
					label: row.label,
					skills: skillRows
						.filter(skill => skill.skill_group_id === row.id)
						.map(item => item.label),
				})),
			}
		},
	})
}

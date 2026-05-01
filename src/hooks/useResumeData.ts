import { useQuery } from "@tanstack/react-query"
import { supabase } from "../lib/supabase"
import type { ResumeData } from "../types/resume"

export function useResumeData() {
	return useQuery<ResumeData>({
		queryKey: ['resume'],
  staleTime: 0,
		queryFn: async () => {

			const { data: { session } } = await supabase.auth.getSession()
console.log('session', session)

			// fetch profile —————————————————————————————————————————————
			const { data: profile, error: profileError } = await supabase
				.from('profiles')
				.select('*')
				.single()

				if (profileError) throw profileError
				if (!profile) throw new Error('No profile found')

			// fetch summary —————————————————————————————————————————————
			const { data: summaryRows, error: summaryError } = await supabase
				.from('profile_summary')
				.select('*')
				.eq('profile_id', profile.id)
				.order('order')

			if (summaryError) throw summaryError
			if (!summaryRows) throw Error('No Summary Found')

			// fetch roles —————————————————————————————————————————————
			const { data: rolesRows, error:rolesError } = await supabase
				.from('roles')
				.select('*')
				.eq('profile_id', profile.id)
				.order('display_order')

			if (rolesError) throw rolesError
			if (!rolesRows) throw Error('No role found')

			// fetch key tech —————————————————————————————————————————————
			const { data:keyTechRows, error:keyTechError } = await supabase
				.from('role_key_tech')
				.select('*')
				.in('role_id', rolesRows.map(row => row.id))
				.order('display_order')

			if (keyTechError) throw keyTechError
			if (!keyTechRows) throw Error('No key tech found')

			// fetch action items —————————————————————————————————————————————
			const { data:actionItemRows, error:actionItemError } = await supabase
				.from('action_items')
				.select('*')
				.in('role_id', rolesRows.map(row => row.id))
				.order('display_order')

			if (actionItemError) throw actionItemError
			if (!actionItemRows) throw Error('No action items found')

			// fetch education —————————————————————————————————————————————
			const { data: educationRows, error:educationError } = await supabase
				.from('education')
				.select('*')
				.eq('profile_id', profile.id)
				.order('year')

			if (educationError) throw educationError
			if (!educationRows) throw Error('No education found')

			// fetch skillGroups —————————————————————————————————————————————
			const { data: skillGroupRows, error:skillGroupError } = await supabase
				.from('skill_groups')
				.select('*')


			console.log('skillGroupRows', skillGroupRows, 'error', skillGroupError)

			if (skillGroupError) throw skillGroupError
			if (!skillGroupRows) throw Error('No skill groups found')

			// fetch skills —————————————————————————————————————————————
			const { data:skillRows, error:skillError } = await supabase
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
					site: profile.site
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
						.map(item => item.default_text)
				})),
				education: educationRows.map(row => ({
					id: row.id,
					institution: row.institution,
					degree: row.degree,
					field: row.field ?? undefined,
					year: row. year ?? undefined,
				})),
				skillGroups:	skillGroupRows.map(row => ({
					skills: skillRows
						.filter(skill => skill.skill_group_id === row.id)
						.map(item => item.label),
					label: row.label
				})),
			}
		},
	})
}
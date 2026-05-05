export interface ResumeProfile {
	firstName: string
	lastName: string
	title?: string
	subtitle?: string[]
	email: string
	phone?: string
	linkedin?: string
	location?: string
	site?: string
}

export interface ResumeRole {
	id: string
	company: string
	company_em?: string
	title: string
	title_em?: string
	start_year: string
	start_month?: string
	end_year: string
	end_month?: string
	city?: string
	state?: string
	industry?: string
	keyTech: string[]
	actionItems: string[]
	showKeyTech?: boolean
}

export interface ResumeEducation {
	id: string
	institution: string
	degree: string
	field?: string
	year: string
}

export interface ResumeSkillGroup {
	label: string
	skills: string[]
}

export interface ResumeData {
	profile: ResumeProfile
	summary: string[]
	roles: ResumeRole[]
	education: ResumeEducation[]
	skillGroups: ResumeSkillGroup[]
	hideEducation?: boolean
}

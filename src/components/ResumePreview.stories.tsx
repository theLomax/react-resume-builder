import type { Meta, StoryObj } from '@storybook/react-vite'
import { ResumePreview } from './ResumePreview'
import cvStatic from '../data/cv-static.json'
import type { ResumeData } from '../types/resume'

const base = cvStatic as unknown as ResumeData

const meta: Meta<typeof ResumePreview> = {
	title: 'Resume/ResumePreview',
	component: ResumePreview,
	parameters: { router: false, layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof ResumePreview>

export const Default: Story = {
	args: { data: base },
}

export const HideEducation: Story = {
	args: { data: { ...base, hideEducation: true } },
}

export const SoloOnly: Story = {
	args: {
		data: {
			...base,
			roles: base.roles.filter(r => r.company === 'Solo Engineering'),
		},
	},
}

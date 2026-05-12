import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProjectCard } from './ProjectCard'
import type { Project } from '../types/project'

const fullProject: Project = {
	slug: 'example-project',
	title: 'Example Project',
	subtitle: 'A demonstration project for Storybook',
	summary: 'A short summary shown on the project card — describes what this project does and why it matters.',
	tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
	liveUrl: 'https://example.com',
	repoUrl: 'https://github.com/example/repo',
	thumbnail: 'https://placehold.co/600x400',
	sections: [],
}

const meta: Meta<typeof ProjectCard> = {
	title: 'Portfolio/ProjectCard',
	component: ProjectCard,
	parameters: { router: false, layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof ProjectCard>

export const Full: Story = {
	args: { project: fullProject },
}

export const Minimal: Story = {
	args: {
		project: {
			slug: 'minimal',
			title: 'Minimal Project',
			summary: 'Only the required fields — no subtitle, thumbnail, or links.',
			tags: ['JavaScript'],
			sections: [],
		},
	},
}

export const NoThumbnail: Story = {
	args: {
		project: {
			...fullProject,
			thumbnail: undefined,
		},
	},
}

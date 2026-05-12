import type { Meta, StoryObj } from '@storybook/react-vite'
import { CodeBlock } from './CodeBlock'

const meta: Meta<typeof CodeBlock> = {
	title: 'Portfolio/CodeBlock',
	component: CodeBlock,
	parameters: { router: false, layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof CodeBlock>

export const JavaScript: Story = {
	args: {
		lang: 'javascript',
		children: `function greet(name) {\n  return \`Hello, \${name}!\`\n}\n\nconsole.log(greet('World'))`,
	},
}

export const TypeScript: Story = {
	args: {
		lang: 'typescript',
		children: `interface User {\n  id: string\n  name: string\n  role: 'admin' | 'viewer'\n}\n\nfunction getDisplayName(user: User): string {\n  return \`\${user.name} (\${user.role})\`\n}`,
	},
}

export const NoLanguage: Story = {
	args: {
		children: `src/\n├── components/\n│   ├── ResumePreview.tsx\n│   └── ProjectCard.tsx\n└── styles/\n    └── index.scss`,
	},
}

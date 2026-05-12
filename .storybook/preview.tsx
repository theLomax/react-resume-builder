import type { Preview } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import '../src/styles/index.scss'

const preview: Preview = {
	decorators: [
		(Story, context) => {
			if (context.parameters.router === false) return <Story />
			return (
				<MemoryRouter initialEntries={context.parameters.routerEntries ?? ['/']}>
					<Story />
				</MemoryRouter>
			)
		},
	],
}

export default preview

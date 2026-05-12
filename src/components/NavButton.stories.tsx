import type { Meta, StoryObj } from '@storybook/react-vite'
import { NavButton } from './NavButton'

// NavButton uses useLocation — each story supplies its own MemoryRouter
// via the routerEntries parameter picked up by the global decorator.

const meta: Meta<typeof NavButton> = {
	title: 'UI/NavButton',
	component: NavButton,
	parameters: { layout: 'padded' },
}

export default meta
type Story = StoryObj<typeof NavButton>

export const OnResumePage: Story = {
	parameters: { routerEntries: ['/'] },
}

export const OnPortfolioMain: Story = {
	parameters: { routerEntries: ['/portfolio'] },
}

export const OnPortfolioChild: Story = {
	parameters: { routerEntries: ['/portfolio/some-project'] },
}

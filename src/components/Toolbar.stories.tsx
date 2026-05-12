import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import { Toolbar } from './Toolbar'

const meta: Meta<typeof Toolbar> = {
	title: 'UI/Toolbar',
	component: Toolbar,
	parameters: { router: false, layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof Toolbar>

export const WithButtons: Story = {
	args: {
		children: React.createElement(React.Fragment, null,
			React.createElement('button', null, 'Back'),
			React.createElement('button', null, 'Download PDF'),
		),
	},
}

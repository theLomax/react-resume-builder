import type { ReactNode } from 'react'
import { NavButton } from '../components/NavButton'
import { Toolbar } from '../components/Toolbar'
import styles from './PortfolioLayout.module.scss'

interface Props {
	children:    ReactNode
	className?:  string   // page-specific override hook
}

export function PortfolioLayout({ children, className }: Props) {
	return (
		<div className={['portfolio-page', styles.layout, className].filter(Boolean).join(' ')}>
			<Toolbar>
				<NavButton />
			</Toolbar>
			{children}
		</div>
	)
}

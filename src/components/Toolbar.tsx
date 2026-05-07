import type { ReactNode } from 'react'
import styles from './Toolbar.module.scss'

interface Props {
	children: ReactNode
}

export function Toolbar({ children }: Props) {
	return (
		<div className={styles.toolbar}>
			{children}
		</div>
	)
}

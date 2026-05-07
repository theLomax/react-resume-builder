import { useState, useEffect } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism'
import styles from './CodeBlock.module.scss'

function useDarkMode() {
	const mq = () => window.matchMedia('(prefers-color-scheme: dark)')
	const [dark, setDark] = useState(() => mq().matches)
	useEffect(() => {
		const handler = (e: MediaQueryListEvent) => setDark(e.matches)
		const media   = mq()
		media.addEventListener('change', handler)
		return () => media.removeEventListener('change', handler)
	}, [])
	return dark
}

interface Props {
	lang?:      string
	children:   string
	className?: string
}

export function CodeBlock({ lang = 'text', children, className }: Props) {
	const dark  = useDarkMode()
	const theme = dark ? vscDarkPlus : coldarkCold

	return (
		<div className={[styles.codeBlock, className].filter(Boolean).join(' ')}>
			{lang !== 'text' && <span className={styles.lang}>{lang}</span>}
			<SyntaxHighlighter
				language={lang}
				style={theme}
				customStyle={{
					margin:     0,
					padding:    '1.25rem',
					background: 'transparent',
					fontSize:   '0.85rem',
				}}
				codeTagProps={{ style: { fontFamily: 'inherit' } }}
			>
				{children}
			</SyntaxHighlighter>
		</div>
	)
}

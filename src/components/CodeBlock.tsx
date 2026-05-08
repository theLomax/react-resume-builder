import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useDarkMode } from '../hooks/useDarkMode'
import styles from './CodeBlock.module.scss'

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

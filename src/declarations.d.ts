declare module 'react-syntax-highlighter/dist/esm/prism'
declare module 'react-syntax-highlighter/dist/esm/styles/prism'

declare module '*.svg?react' {
	import type { FC, SVGProps } from 'react'
	const ReactComponent: FC<SVGProps<SVGSVGElement>>
	export default ReactComponent
}

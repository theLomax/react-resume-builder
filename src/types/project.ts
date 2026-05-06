export type ClassName = string | string[]

import type { CSSProperties } from 'react'

export type ProjectBlock =
	| { type: 'text';  heading?: string; content: string;  className?: ClassName; style?: CSSProperties }
	| { type: 'code';  heading?: string; lang: string; content: string; className?: ClassName; style?: CSSProperties }
	| { type: 'image'; heading?: string; src: string; alt: string; caption?: string; className?: ClassName; style?: CSSProperties }
	| { type: 'div';   className?: ClassName; style?: CSSProperties; blocks: ProjectBlock[] }

// A section groups related blocks under an optional heading.
// Standalone blocks (outside a section) render as plain divs.
export type ProjectSection =
	| ProjectBlock
	| { type: 'section'; heading?: string; className?: ClassName; blocks: ProjectBlock[] }

export interface Project {
	slug:        string
	title:       string
	subtitle?:   string
	summary:     string          // short — shown on project card
	tags:        string[]
	liveUrl?:    string
	repoUrl?:    string
	thumbnail?:  string
	sections:    ProjectSection[]
	themeClass?: string          // hook for page-specific CSS override
}

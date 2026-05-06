import { Link, useParams, Navigate } from 'react-router-dom'
import { RiArrowLeftLine, RiGithubLine, RiExternalLinkLine } from 'react-icons/ri'
import { PortfolioLayout } from '../layouts/PortfolioLayout'
import { CodeBlock } from '../components/CodeBlock'
import { projects } from '../data/projects'
import type { ProjectBlock, ClassName } from '../types/project'
import styles from './ProjectPage.module.scss'

// Maps className (string, string[], or undefined) to scoped CSS module classes.
function moduleClasses(...args: (ClassName | undefined)[]) {
	return args
		.flatMap(c => (c ? ([] as string[]).concat(c) : []))
		.map(c => styles[c])
		.filter(Boolean)
		.join(' ')
}

// Standalone blocks render as divs; heading level depends on context.
function renderBlock(block: ProjectBlock, i: number, inSection = false) {
	const Heading = inSection ? 'h3' : 'h2'
	switch (block.type) {
		case 'text':
			return (
				<div key={i} className={moduleClasses('textBlock', block.className)} style={block.style}>
					{block.heading && <Heading>{block.heading}</Heading>}
					<p dangerouslySetInnerHTML={{ __html: block.content }} />
				</div>
			)
		case 'code':
			return (
				<div key={i} className={moduleClasses('codeBlock', block.className)} style={block.style}>
					{block.heading && <Heading>{block.heading}</Heading>}
					<CodeBlock lang={block.lang}>{block.content}</CodeBlock>
				</div>
			)
		case 'image':
			return (
				<div key={i} className={moduleClasses('imageBlock', block.className)} style={block.style}>
					{block.heading && <Heading>{block.heading}</Heading>}
					<figure className={styles.figure}>
						<img src={block.src} alt={block.alt} />
						{block.caption && <figcaption>{block.caption}</figcaption>}
					</figure>
				</div>
			)
		case 'div':
			return (
				<div key={i} className={moduleClasses(block.className)} style={block.style}>
					{block.blocks.map((child, j) => renderBlock(child, j, inSection))}
				</div>
			)
	}
}

export function ProjectPage() {
	const { slug } = useParams<{ slug: string }>()
	const project = projects.find(p => p.slug === slug)

	// if (!project) return <Navigate to="/portfolio" replace />

	return (
		<PortfolioLayout className={project.themeClass}>

			<header className={styles.header}>
				<h1 className={styles.title}>{project.title}</h1>
				{project.subtitle && <p className={styles.subtitle}>{project.subtitle}</p>}

				<ul className={styles.tags}>
					{project.tags.map(tag => (
						<li key={tag}>{tag}</li>
					))}
				</ul>

				<div className={styles.links}>
					{project.liveUrl && (
						<a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
							<RiExternalLinkLine aria-hidden /> Live site
						</a>
					)}
					{project.repoUrl && (
						<a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
							<RiGithubLine aria-hidden /> Repository
						</a>
					)}
				</div>
			</header>

			<article className={styles.content}>
				{project.sections.map((item, i) => {
					if (item.type === 'section') {
						return (
							<section key={i} className={moduleClasses('group', item.className)}>
								{item.heading && <h2>{item.heading}</h2>}
								{item.blocks.map((block, j) => renderBlock(block, j, true))}
							</section>
						)
					}
					return renderBlock(item, i)
				})}
			</article>
		</PortfolioLayout>
	)
}

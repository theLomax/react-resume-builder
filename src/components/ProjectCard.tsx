import { Link } from 'react-router-dom'
import { RiArrowRightLine, RiGithubLine, RiExternalLinkLine } from 'react-icons/ri'
import type { Project } from '../types/project'
import styles from './ProjectCard.module.scss'

interface Props {
	project: Project
}

export function ProjectCard({ project }: Props) {
	return (
		<article className={styles.card}>
			{project.thumbnail && (
				<div className={styles.thumbnail}>
					<img src={project.thumbnail} alt={project.title} />
				</div>
			)}

			<div className={styles.body}>
				<header className={styles.header}>
					<h3 className={styles.title}>{project.title}</h3>
					{project.subtitle && <p className={styles.subtitle}>{project.subtitle}</p>}
				</header>

				<p className={styles.summary}>{project.summary}</p>

				<ul className={styles.tags}>
					{project.tags.map(tag => (
						<li key={tag}>{tag}</li>
					))}
				</ul>

				<footer className={styles.footer}>
					<Link to={`/portfolio/${project.slug}`} className={styles.cta}>
						View project <RiArrowRightLine aria-hidden />
					</Link>
					<div className={styles.links}>
						{project.repoUrl && (
							<a href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub repository">
								<RiGithubLine aria-hidden />
							</a>
						)}
						{project.liveUrl && (
							<a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live site">
								<RiExternalLinkLine aria-hidden />
							</a>
						)}
					</div>
				</footer>
			</div>
		</article>
	)
}

import { PortfolioLayout } from '../layouts/PortfolioLayout'
import { ProjectCard } from '../components/ProjectCard'
import { projects } from '../data/projects'
import styles from './PortfolioPage.module.scss'

export function PortfolioPage() {
	return (
		<PortfolioLayout>
			<header className={styles.header}>
				<h1>Portfolio</h1>
				<p className={styles.intro}>Selected projects — design systems, fullstack apps, <span>and internal tooling.</span></p>
			</header>

			<div className={styles.grid}>
				{projects.map(project => (
					<ProjectCard key={project.slug} project={project} />
				))}
			</div>
		</PortfolioLayout>
	)
}

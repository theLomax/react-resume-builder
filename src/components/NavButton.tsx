import { Link, useLocation } from 'react-router-dom'
import { RiArrowRightLine, RiArrowLeftLine } from 'react-icons/ri'
import styles from './NavButton.module.scss'

export function NavButton() {
	const { pathname } = useLocation()

	// Hide on internal test routes
	if (pathname.startsWith('/test')) return null

	const isPortfolioMain = pathname === '/portfolio'
	const isPortfolioChild = pathname.startsWith('/portfolio/')

	return (
		<Link
			to={isPortfolioMain ? '/' : '/portfolio'}
			className={styles.navButton}
			aria-label={isPortfolioMain ? 'Back to resume' : 'View portfolio'}
		>
			{isPortfolioMain
				? <><RiArrowLeftLine aria-hidden /> Resume</>
				: isPortfolioChild 
					? <><RiArrowLeftLine aria-hidden /> Portfolio</>
					: <>Portfolio <RiArrowRightLine aria-hidden /></>
			}   
		</Link>
	)
}   

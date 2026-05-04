import { skillIcons, skillColors, skillInvert } from '../lib/skillIcons'
import { companyLogos, companyIcons } from '../lib/companyLogos'
import styles from './SkillsTestPage.module.scss'

const cell: React.CSSProperties = {
	display: 'flex', flexDirection: 'column', alignItems: 'center',
	gap: '0.25rem', width: '5rem', textAlign: 'center',
}

const label: React.CSSProperties = { fontSize: '0.65rem' }

export function SkillsTestPage() {
	return (
		<div style={{ padding: '2rem' }}>

			<h2>Skills</h2>
			<div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
				{Object.entries(skillIcons).map(([key, Icon]) => {
					const color = skillColors[key]
					const invert = skillInvert.has(key)
					return (
						<div key={key} style={cell}>
							<span className={invert ? styles.invertDark : undefined}>
								<Icon color={color} size={32} />
							</span>
							<span style={label}>{key}</span>
						</div>
					)
				})}
			</div>

			<h2>Company Logos</h2>
			<div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
				{Object.entries(companyLogos).map(([key, src]) => (
					<div key={key} style={cell}>
						<img src={src} alt={key} style={{ width: 48, height: 48, objectFit: 'contain' }} />
						<span style={label}>{key}</span>
					</div>
				))}
				{Object.entries(companyIcons).map(([key, Icon]) => (
					<div key={key} style={cell}>
						<Icon style={{ color: 'var(--text-h)', width: 48, height: 48 }} />
						<span style={label}>{key}</span>
					</div>
				))}
			</div>

		</div>
	)
}

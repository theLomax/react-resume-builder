import { skillIcons, skillColors, skillInvert } from '../lib/skillIcons'
import styles from './SkillsTestPage.module.scss'

export function SkillsTestPage() {
	return (
		<div style={{ padding: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
			{Object.entries(skillIcons).map(([key, Icon]) => {
				const color = skillColors[key]
				const invert = skillInvert.has(key)
				return (
					<div key={key} style={{
						display: 'flex', flexDirection: 'column', alignItems: 'center',
						gap: '0.25rem', width: '5rem', textAlign: 'center',
					}}>
						<span className={invert ? styles.invertDark : undefined}>
							<Icon color={color} size={32} />
						</span>
						<span style={{ fontSize: '0.65rem' }}>{key}</span>
					</div>
				)
			})}
		</div>
	)
}

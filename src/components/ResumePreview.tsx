import type { ResumeData } from '../types/resume'
import styles from './ResumePreview.module.scss'

import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import LanguageIcon from '@mui/icons-material/Language'
import { skillIcons, skillColors } from '../lib/skillIcons'
import { companyLogos, companyIcons } from '../lib/companyLogos'
import { iconThemeConfig, getIconThemeClass } from '../lib/iconThemeConfig'
import { Fragment } from 'react'

function CompanyLogo({ company }: { company: string }) {
	const key     = company.toLowerCase()
	const Icon    = companyIcons[key]
	const cfg     = iconThemeConfig[key]
	const classes = [styles.companyIcon, getIconThemeClass(key, styles)].filter(Boolean).join(' ')

	if (Icon) {
		// If a print asset is defined, render both — the grid's img/svg rule
		// places them in the same cell; screenOnly/printOnly toggles which shows.
		if (cfg?.srcPrint) {
			return (
				<>
					<Icon className={[classes, styles.screenOnly].join(' ')} role="img" aria-label={company} />
					<img src={cfg.srcPrint} alt={company} className={[styles.companyIcon, styles.printOnly].join(' ')} />
				</>
			)
		}
		return <Icon className={classes} role="img" aria-label={company} />
	}

	const src = companyLogos[key]
	if (cfg?.srcDark || cfg?.srcLight || cfg?.srcPrint) {
		return (
			<picture>
				{cfg.srcPrint && <source media="print"                        srcSet={cfg.srcPrint} />}
				{cfg.srcDark  && <source media="(prefers-color-scheme: dark)" srcSet={cfg.srcDark}  />}
				{cfg.srcLight && <source media="(prefers-color-scheme: light)"srcSet={cfg.srcLight} />}
				<img src={src} alt={company} className={classes} />
			</picture>
		)
	}

	return <img src={src} alt={company} className={classes} />
}

function computeLastKeytechIndex(roles: ResumeData['roles']) {
	return roles.reduce((max, role, i) => {
		const shows = role.showKeyTech === true || (role.showKeyTech !== false && i < 2)
		return shows ? i : max
	}, -1)
}

interface Props {
	data: ResumeData
	isPrint?: boolean
}

export function ResumePreview({ data, isPrint = true }: Props) {

	const condensedUrl = (url: string) =>
		url.replace(/^https?:\/\/(www\.)?/, '')

	// Split roles into employed (Experience section) and solo (Solo Engineering section)
	const employedRoles = data.roles.filter(r => r.company !== 'Solo Engineering')
	const soloRoles     = data.roles.filter(r => r.company === 'Solo Engineering')

	// Each section gets its own watermark so gaps don't bleed across sections
	const lastEmployedKT = computeLastKeytechIndex(employedRoles)
	const lastSoloKT     = computeLastKeytechIndex(soloRoles)

	return (
		<>
			{/* HEADER ——————————————————————————————————————— */}
			<header>
				<h1>
					{data.profile.firstName} {data.profile.lastName}
				</h1>
				<hgroup>
					<p>
						<span>
							{data.profile.title ?? "title"}
						</span>
						{data.profile.subtitle?.length
						? <>
								<span className='hide-mobile'>  ·  </span>
								{data.profile.subtitle.map((row, i) => (
									<span key={i}>{row}</span>
								))}
							</>
						: <><span>  |  subtitle</span><span>subtitle  |  subtitle  |  subtitle</span></>
					}
					</p>
				</hgroup>
			</header>

			<main>

				{/* CONTACT ——————————————————————————————————————— */}
				{isPrint && (
					<section id="contact" className={styles.contact}>
						<h2>Contact Information</h2>
						<ul>
							{/* {
								data.profile.location && <li className={styles.location}><LocationOnIcon />{data.profile.location}</li>
							} */}
							{data.profile.email && (
								<li className={styles.email}>
									<EmailIcon />
									<a href={`mailto:${data.profile.email}`}>{data.profile.email}
									</a>
								</li>
							)}
							{data.profile.phone && (
								<li className={styles.phone}>
									<PhoneIcon />
									<a href={`tel:${data.profile.phone}`}>{data.profile.phone}
									</a>
								</li>
							)}
							{data.profile.site && (
								<li className={styles.site}>
									<LanguageIcon />
									<a href={data.profile.site} target="blank" rel="noopener noreferrer">{condensedUrl(data.profile.site)}
									</a>
								</li>
							)}
							{data.profile.linkedin && (
								<li className={styles.linkedin}>
									<LinkedInIcon />
									<a href={data.profile.linkedin} target="blank" rel="noopener noreferrer">{condensedUrl(data.profile.linkedin)}
									</a>
								</li>
							)}
						</ul>
					</section>
				)}

				<div className={styles.sections}>

					{/* SUMMARY ——————————————————————————————————————— */}
					<section id="summary" className={styles.summary}>
						<h2>Summary</h2>
						{data.summary.map((item, i) => (
							<p key={i}>{item}</p>
						))}
					</section>

					{/* EXPERIENCE ——————————————————————————————————————— */}
					<section id="experience" className={styles.experience}>
						<h2>Experience</h2>
						<div className={styles.wrapper}>
							{employedRoles.map((role, i) => {
								const prevRole = employedRoles[i - 1]
								const sameCompany = i > 0 && role.company === prevRole.company
								const showKeyTech = role.showKeyTech !== false && i <= lastEmployedKT
								return (
									<Fragment key={i}>
										{i > 0 && <hr className={sameCompany ? styles.hrSameCompany : undefined} />}
										<div className={[styles.entry, sameCompany && styles.sameCompany].filter(Boolean).join(' ')}>
											{!sameCompany && <CompanyLogo company={role.company} />}
											<div className={styles.entryContent}>
												{!sameCompany && <h3>{role.company}{role.company_em && <em> ({role.company_em})</em>}</h3>}
												{role.title_em && <p className={styles.titleEm}>{role.title_em}</p>}
												<p className={styles.title}>{role.title}</p>
												{role.start_year && (
													<p className={styles.dates}>
														<span className={styles.start_year}>{role.start_year}</span>
														{role.end_year !== role.start_year && <>
															<span> – </span>
															<span className={styles.end_year}>{role.end_year}</span>
														</>}
													</p>
												)}
												{(role.city || role.state) && (
													<p className={styles.location}><span>Location: </span>{[role.city, role.state].filter(Boolean).join(', ')}</p>
												)}
												{role.industry && <p className={styles.industry}><span>Industry: </span>{role.industry}</p>}
											</div>
											{showKeyTech && (
												<ul className={[styles.keytech, !role.keyTech?.length && styles.empty].filter(Boolean).join(' ')}>
													{role.keyTech.map((tech, j) => (
														<li key={j}>{tech}</li>
													))}
												</ul>
											)}
											<ul className={styles.desc}>
												{role.actionItems.map((item, j) => (
													<li key={j}>{item}</li>
												))}
											</ul>
										</div>
									</Fragment>
								)
							})}
						</div>
					</section>

					{/* SOLO ENGINEERING ——————————————————————————————————————— */}
					{soloRoles.length > 0 && (
						<section id="solo-engineering" className={styles.experience}>
							<h2>Solo Engineering</h2>
							<div className={styles.wrapper}>
								{soloRoles.map((role, i) => {
									const showKeyTech = role.showKeyTech !== false && i <= lastSoloKT
									return (
										<Fragment key={i}>
											{i > 0 && <hr />}
											<div className={[styles.entry, styles.sameCompany].join(' ')}>
												<div className={styles.entryContent}>
													<h3>{role.title}</h3>
												</div>
												{showKeyTech && (
													<ul className={[styles.keytech, !role.keyTech?.length && styles.empty].filter(Boolean).join(' ')}>
														{role.keyTech.map((tech, j) => (
															<li key={j}>{tech}</li>
														))}
													</ul>
												)}
												<ul className={styles.desc}>
													{role.actionItems.map((item, j) => (
														<li key={j}>{item}</li>
													))}
												</ul>
											</div>
										</Fragment>
									)
								})}
							</div>
						</section>
					)}

					{/* EDUCATION ——————————————————————————————————————— */}
					{!data.hideEducation && (
						<section id="education" className={styles.education}>
							<h2>Education</h2>
							<div className={styles.wrapper}>
								{data.education.map((edu, i) => (
									<div className={styles.entry} key={i}>
										<CompanyLogo company={edu.institution} />
										<div className={styles.entryContent}>
											<h3>{edu.institution}</h3>
											<p className={styles.degree}>{edu.degree}</p>
											{edu.field && <p className={styles.field}>{edu.field}</p>}
											{edu.year && <p className={styles.year}>{edu.year}</p>}
										</div>
									</div>
								))}
							</div>
						</section>
					)}

				</div>

				{/* SKILLS ——————————————————————————————————————— */}
				<aside className={styles.skills}>
					<h2>Skills</h2>
					{data.skillGroups.map((group, i) => {
						const hasIcons = group.skills.some(skill => skillIcons[skill.toLowerCase()])
						return (
							<section className={[styles.skillGroup, hasIcons && styles.hasIcons].filter(Boolean).join(' ')} key={i}>
								<h4>{group.label}</h4>
								<ul>
									{group.skills.map((skill, j) => {
										const key   = skill.toLowerCase()
										const Icon  = skillIcons[key]
										const color = skillColors[key]
										const themeClass = getIconThemeClass(key, styles)
										return (
											<li key={j}>
												<span className={themeClass || undefined}>{Icon && <Icon color={color} size={27} />}</span>
												<span>{skill}</span>
											</li>
										)
									})}
								</ul>
							</section>
						)
					})}
				</aside>

			</main>

		</>
	)
}

import type { ResumeData } from '../types/resume'
import styles from './ResumePreview.module.scss'

import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import LanguageIcon from '@mui/icons-material/Language'
import { skillIcons, skillColors, skillInvert } from '../lib/skillIcons'
import { companyLogos, companyIcons } from '../lib/companyLogos'
import { Fragment, type SVGProps } from 'react'

function CompanyLogo({ company }: { company: string }) {
	const key = company.toLowerCase()
	const Icon = companyIcons[key]
	return Icon
		? <Icon className={styles.companyIcon} role="img" aria-label={company} />
		: <img src={companyLogos[key]} alt={company} />
}

interface Props {
	data: ResumeData
	isPrint?: boolean
}

export function ResumePreview({ data, isPrint = true }: Props) {

	const condensedUrl = (url: string) =>
		url.replace(/^https?:\/\/(www\.)?/, '')

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
								<span>  ·  </span>
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

					{/* EDUCATION ——————————————————————————————————————— */}
					<section id="education" className={styles.education}>
						<h2>Education</h2>
						<div className={styles.wrapper}>
							{data.education.map((edu, i) => (
								<div className={styles.entry} key={i}>
									<CompanyLogo company={edu.institution} />
									<h3>{edu.institution}</h3>
									<p className="degree">{edu.degree}</p>
									{edu.year && <p className="year">{edu.year}</p>}
								</div>
							))}
						</div>
					</section>
					

					{/* EXPERIENCE ——————————————————————————————————————— */}
					<section id="experience" className={styles.experience}>
						<h2>Experience</h2>
						<div className={styles.wrapper}>
							{data.roles.map((role, i) => (
								<Fragment key={i}>
									{i > 0 && <hr />}
									<div className={styles.entry} key={i}>
										<CompanyLogo company={role.company} />
										<h3>{role.company}{role.company_em && <span> ({role.company_em})</span>}</h3>
										<p className={styles.title}>{role.title}</p>
										<p><span className={styles.start_year}>{role.start_year}</span><span> - </span><span className={styles.end_year}>{role.end_year}</span></p>
										{(role.showKeyTech ?? i < 2) && (
										<ul className={[styles.keytech, !role.keyTech?.length && styles.empty].filter(Boolean).join(' ')}>
											{role.keyTech.map((tech, j) => (
												<li key={j}>{tech}</li>
											))}
										</ul>
									)}
										<ul className={styles.desc}>
											{role.actionItems.map((item, i) => (
												<li key={i}>{item}</li>
											))}
										</ul>
									</div>
								</Fragment>
							))}
						</div>
					</section>
				</div>

				<aside className={styles.skills}>
					<h2>Skills</h2>
					{data.skillGroups.map((group, i) => {
						const hasIcons = group.skills.some(skill => skillIcons[skill.toLowerCase()])
						return (
							<section className={[styles.skillGroup, hasIcons && styles.hasIcons].filter(Boolean).join(' ')} key={i}>
								<h4>{group.label}</h4>
								<ul>
									{group.skills.map((skill, j) => {
										const key = skill.toLowerCase()
										const Icon = skillIcons[key]
										const color = skillColors[key]
										const invert = skillInvert.has(key)
										return (
											<li key={j}>
												<span className={invert ? styles.invertDark : undefined}>{Icon && <Icon color={color} size={27} />}</span>
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
import type { ResumeData } from "../types/resume"
import styles from './ResumePreview.module.scss'

import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import LanguageIcon from '@mui/icons-material/Language'

interface Props {
	data: ResumeData
	isPrint?: boolean
}

export function ResumePreview({ data, isPrint = true }: Props) {

	const condensedUrl  = (url: string) =>
		url.replace(/^https?:\/\/(www\.)?/, '')

	return (
		<>
			<header>
				<h1>
					{data.profile.firstName} {data.profile.lastName}
				</h1>
				<hgroup>
					<p>
						<span>
							{data.profile.title ?? "title"}
						</span>
						{data.profile.subtitle?.map((row, i) => (
							<span key={i}>{row}</span>
						)) ?? (
							<>
								<span>  |  subtitle</span><span>subtitle  |  subtitle  |  subtitle</span>
							</>
						)}
					</p>
				</hgroup>
			</header>
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
		</>
	)
}
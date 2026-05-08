import { useSearchParams } from "react-router-dom";
import { RiDownloadLine } from 'react-icons/ri';
import { useResumeData } from "../hooks/useResumeData";
import { useIsPrint } from "../hooks/useIsPrint";
import { ResumePreview } from "./ResumePreview";
import { NavButton } from "./NavButton";
import { Toolbar } from "./Toolbar";
import styles from "./ResumePage.module.scss";

interface Props {
	variantId?: string
}

export function ResumePage({ variantId: propVariantId }: Props = {}) {
	const [searchParams] = useSearchParams()
	const variantId = propVariantId ?? searchParams.get('variant') ?? undefined
	const isPrint = useIsPrint()
	const { data, isLoading, error } = useResumeData(variantId)

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>Error loading resume: {(error as Error).message}</div>
	if (!data) return null

	return (
		<>
			{!isPrint && (
				<Toolbar>
					<NavButton />
					<a href="/cv.pdf" download={`${data.profile.firstName}-${data.profile.lastName}${data.profile.title ? `--${data.profile.title.replace(/\s+/g, '-')}` : '--cv'}.pdf`} className={styles.downloadBtn}>
						<RiDownloadLine aria-hidden /> Download PDF
					</a>
				</Toolbar>
			)}
			<ResumePreview data={data} />
		</>
	)
}
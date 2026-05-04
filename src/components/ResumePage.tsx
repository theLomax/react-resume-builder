import { useSearchParams } from "react-router-dom";
import { useResumeData } from "../hooks/useResumeData";
import { useIsPrint } from "../hooks/useIsPrint";
import { ResumePreview } from "./ResumePreview";

export function ResumePage() {
	const [searchParams] = useSearchParams()
	const variantId = searchParams.get('variant') ?? undefined
	const isPrint = useIsPrint()
	const { data, isLoading, error } = useResumeData(variantId)

	if(isLoading) return <div>Loading...</div>
	if (error) return <div>Error loading resume</div>
	if (!data) return null

	return <ResumePreview data={data} isPrint={isPrint} />
}
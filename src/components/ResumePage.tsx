import { useResumeData } from "../hooks/useResumeData";
import { useIsPrint } from "../hooks/useIsPrint";
import { ResumePreview } from "./ResumePreview";

export function ResumePage() {
	const { data, isLoading, error } = useResumeData()

	if(isLoading) return <div>Loading...</div>
	if (error) return <div>Error loading resume</div>
	if (!data) return null
	const isPrint = useIsPrint()
	return <ResumePreview data={data} isPrint={isPrint} />
}
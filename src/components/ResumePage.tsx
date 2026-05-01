import { useResumeData } from "../hooks/useResumeData";
import { useIsPrint } from "../hooks/useIsPrint";
import { ResumePreview } from "./ResumePreview";

export function ResumePage() {
	const isPrint = useIsPrint()
	const { data, isLoading, error } = useResumeData()

	if(isLoading) return <div>Loading...</div>
  console.warn(error)
	if (error) return <div>Error loading resume</div>
	if (!data) return null

	return <ResumePreview data={data} isPrint={isPrint} />
}
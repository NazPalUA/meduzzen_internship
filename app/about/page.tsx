import { ABOUT_PAGE_TEXT } from "@/src/shared/constants/texts"
import { PageContainer } from "@/src/shared/ui/PageContainer"

export default function About() {
	return (
		<PageContainer>
			<h2>{ABOUT_PAGE_TEXT.TITLE}</h2>
			<p>{ABOUT_PAGE_TEXT.DESCRIPTION}</p>
		</PageContainer>
	)
}

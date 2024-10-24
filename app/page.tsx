import { HOME_PAGE_TEXT } from "@/src/shared/constants/texts"
import { PageContainer } from "@/src/shared/ui/PageContainer"
import LearnMore from "./_lib/LearnMore"

export default function Home() {
	return (
		<PageContainer>
			<h1>{HOME_PAGE_TEXT.TITLE}</h1>
			<p>{HOME_PAGE_TEXT.WELCOME_MESSAGE}</p>
			<LearnMore />
		</PageContainer>
	)
}

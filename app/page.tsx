import { HOME_PAGE_TEXT } from "@/src/shared/constants/texts"
import { PageContainer } from "@/src/shared/ui/PageContainer"
import { Typography } from "@mui/material"
import LearnMore from "./_lib/LearnMore"

export default function Home() {
	return (
		<PageContainer>
			<Typography variant="h2" component="h1" gutterBottom>
				{HOME_PAGE_TEXT.TITLE}
			</Typography>
			<Typography variant="h5" component="p" gutterBottom>
				{HOME_PAGE_TEXT.WELCOME_MESSAGE}
			</Typography>
			<LearnMore />
		</PageContainer>
	)
}

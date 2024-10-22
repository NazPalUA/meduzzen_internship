import { ABOUT_PAGE_TEXT } from "@/src/shared/constants/texts"
import { PageContainer } from "@/src/shared/ui/PageContainer"
import { Typography } from "@mui/material"

export default function About() {
	return (
		<PageContainer>
			<Typography variant="h4" component="h1" gutterBottom>
				{ABOUT_PAGE_TEXT.TITLE}
			</Typography>
			<Typography variant="body1">{ABOUT_PAGE_TEXT.DESCRIPTION}</Typography>
		</PageContainer>
	)
}

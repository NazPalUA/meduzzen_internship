import { ABOUT_PAGE_TEXT } from "@/src/shared/constants/texts"
import { Container, Typography } from "@mui/material"

export default function About() {
	return (
		<Container
			maxWidth="sm"
			style={{ textAlign: "center", paddingTop: "50px" }}
		>
			<Typography variant="h4" component="h1" gutterBottom>
				{ABOUT_PAGE_TEXT.TITLE}
			</Typography>
			<Typography variant="body1">{ABOUT_PAGE_TEXT.DESCRIPTION}</Typography>
		</Container>
	)
}

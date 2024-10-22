import { Routes } from "@/src/shared/constants/routes"
import { HOME_PAGE_TEXT } from "@/src/shared/constants/texts"
import { Button, Container, Typography } from "@mui/material"

export default function Home() {
	return (
		<Container
			maxWidth="sm"
			style={{ textAlign: "center", paddingTop: "50px" }}
		>
			<Typography variant="h2" component="h1" gutterBottom>
				{HOME_PAGE_TEXT.TITLE}
			</Typography>
			<Typography variant="h5" component="p" gutterBottom>
				{HOME_PAGE_TEXT.WELCOME_MESSAGE}
			</Typography>
			<Button variant="contained" color="primary" href={Routes.ABOUT}>
				{HOME_PAGE_TEXT.LEARN_MORE_BUTTON}
			</Button>
		</Container>
	)
}

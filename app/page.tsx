import { Button, Container, Typography } from "@mui/material"

export default function Home() {
	return (
		<Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
			<Typography variant="h2" component="h1" gutterBottom>
				Meduzzen Intership
			</Typography>
			<Typography variant="h5" component="p" gutterBottom>
				Welcome to our project!
			</Typography>
			<Button variant="contained" color="primary" href="/about">
				Learn More
			</Button>
		</Container>
	)
}

import { Container, Typography } from "@mui/material"

export default function About() {
	return (
		<Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
			<Typography variant="h4" component="h1" gutterBottom>
				About This Project
			</Typography>
			<Typography variant="body1">
				This project is part of the Meduzzen internship program.
			</Typography>
		</Container>
	)
}

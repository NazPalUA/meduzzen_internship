import { type CompanyEntity } from "@/src/entities/company"
import { Card, CardContent, Stack, Typography } from "@mui/material"

export function CompanyCard({ company }: { company: CompanyEntity }) {
	const { name, description } = company
	return (
		<Card
			elevation={3}
			sx={{
				cursor: "pointer",
				transition: "transform 0.2s",
				"&:hover": { transform: "scale(1.05)" },
			}}
		>
			<CardContent>
				<Stack spacing={2}>
					<Typography variant="h6">{name}</Typography>
					<Typography variant="body2" color="textSecondary">
						{description}
					</Typography>
				</Stack>
			</CardContent>
		</Card>
	)
}

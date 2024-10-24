import { type CompanyEntity } from "@/src/entities/company"
import { Card, CardContent, Stack, Typography } from "@mui/material"
import styles from "./CompanyCard.module.scss"

export function CompanyCard({ company }: { company: CompanyEntity }) {
	const { name, description } = company
	return (
		<Card elevation={3} className={styles.card}>
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

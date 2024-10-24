import { type CompanyEntity } from "@/src/entities/company"
import { Card, CardContent, Typography } from "@mui/material"
import styles from "./CompanyCard.module.scss"

export function CompanyCard({ company }: { company: CompanyEntity }) {
	const { name, description } = company
	return (
		<Card elevation={3} className={styles.card}>
			<CardContent>
				<Typography variant="h6" className={styles.title}>
					{name}{" "}
				</Typography>
				<Typography variant="body2" color="textSecondary">
					{description}
				</Typography>
			</CardContent>
		</Card>
	)
}

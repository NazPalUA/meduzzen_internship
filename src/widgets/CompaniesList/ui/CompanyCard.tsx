import { type CompanyEntity } from "@entities/company"
import { Card, CardContent } from "@mui/material"
import styles from "./CompanyCard.module.scss"

export function CompanyCard({ company }: { company: CompanyEntity }) {
	const { name, description } = company
	return (
		<Card elevation={3} className={styles.card}>
			<CardContent>
				<strong className={styles.title}>{name}</strong>
				<p>{description}</p>
			</CardContent>
		</Card>
	)
}

import { type UserEntity } from "@/src/entities/user"
import { Avatar, Card, CardContent, Typography } from "@mui/material"
import styles from "./UserCard.module.scss"

export function UserCard({ user }: { user: UserEntity }) {
	const { name, email } = user
	return (
		<Card elevation={3} className={styles.card}>
			<CardContent>
				<div className={styles.container}>
					<Avatar>{name[0]}</Avatar>
					<div className={styles.details}>
						<Typography variant="h6">{name}</Typography>
						<Typography variant="body2" color="textSecondary">
							{email}
						</Typography>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

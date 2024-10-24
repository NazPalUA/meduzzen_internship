import { type UserEntity } from "@/src/entities/user"
import { Avatar, Card, CardContent } from "@mui/material"
import styles from "./UserCard.module.scss"

export function UserCard({ user }: { user: UserEntity }) {
	const { name, email } = user
	return (
		<Card elevation={3} className={styles.card}>
			<CardContent>
				<div className={styles.container}>
					<Avatar>{name[0]}</Avatar>
					<div className={styles.details}>
						<strong>{name}</strong>
						<p color="textSecondary">{email}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

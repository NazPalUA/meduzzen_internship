import { type UserEntity } from "@/src/entities/user"
import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material"
import styles from "./UserCard.module.scss"

export function UserCard({ user }: { user: UserEntity }) {
	const { name, email } = user
	return (
		<Card
			elevation={3}
			className={styles.card}
			sx={{
				transition: "transform 0.2s",
				"&:hover": { transform: "scale(1.05)" },
			}}
		>
			<CardContent>
				<Stack className={styles.stack}>
					<Avatar>{name[0]}</Avatar>
					<Stack className={styles.stackInner}>
						<Typography variant="h6">{name}</Typography>
						<Typography variant="body2" color="textSecondary">
							{email}
						</Typography>
					</Stack>
				</Stack>
			</CardContent>
		</Card>
	)
}

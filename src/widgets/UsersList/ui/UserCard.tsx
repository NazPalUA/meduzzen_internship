import { type UserEntity } from "@/src/entities/user"
import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material"

export function UserCard({ user }: { user: UserEntity }) {
	const { name, email } = user
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
				<Stack direction="row" spacing={2} alignItems="center">
					<Avatar>{name[0]}</Avatar>
					<Stack alignItems="flex-start">
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

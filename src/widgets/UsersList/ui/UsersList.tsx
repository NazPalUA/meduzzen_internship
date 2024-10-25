import { type UserEntity } from "@/src/entities/user"
import { Routes } from "@/src/shared/constants/routes"
import Grid from "@mui/material/Grid2"
import Link from "next/link"
import { UserCard } from "./UserCard"

export function UsersList({ users }: { users: UserEntity[] }) {
	return (
		<Grid container spacing={2} justifyContent="center">
			{users.map(user => (
				<Grid key={user.id} display="flex" justifyContent="center">
					<Link href={`${Routes.USERS}/${user.id}`} passHref>
						<UserCard user={user} />
					</Link>
				</Grid>
			))}
		</Grid>
	)
}

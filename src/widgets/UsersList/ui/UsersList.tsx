import { type UserEntity } from "@entities/user"
import Grid from "@mui/material/Grid2"
import { Link } from "@navigation"
import { Routes } from "@routes"
import { UserCard } from "./UserCard"

export function UsersList({ users }: { users: UserEntity[] }) {
  return (
    <Grid container spacing={2} justifyContent="center">
      {users.map((user) => (
        <Grid key={user.id} display="flex" justifyContent="center">
          <Link href={`${Routes.USERS}/${user.id}`} passHref>
            <UserCard user={user} />
          </Link>
        </Grid>
      ))}
    </Grid>
  )
}

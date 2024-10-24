import { PROFILE_PAGE_TEXT } from "@/src/shared/constants/texts"
import { PageContainer } from "@/src/shared/ui/PageContainer"
import { Typography } from "@mui/material"

type Params = {
	userId: string
}

function getUserData(userId: string) {
	return {
		email: `user${userId}@example.com`,
		about: `About ${userId.toUpperCase()}`,
	}
}

export default function UserProfile({ params }: { params: Params }) {
	const { userId } = params

	const { email, about } = getUserData(userId)

	return (
		<PageContainer>
			<Typography variant="h4" component="h2" gutterBottom>
				{PROFILE_PAGE_TEXT.TITLE} {userId}
			</Typography>
			<Typography variant="body1">
				{PROFILE_PAGE_TEXT.EMAIL}: {email}
			</Typography>
			<Typography variant="body1">
				{PROFILE_PAGE_TEXT.ABOUT}: {about}
			</Typography>
		</PageContainer>
	)
}

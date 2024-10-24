import { PROFILE_PAGE_TEXT } from "@/src/shared/constants/texts"
import { PageContainer } from "@/src/shared/ui/PageContainer"

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
			<h2>
				{PROFILE_PAGE_TEXT.TITLE} {userId}
			</h2>
			<p>
				{PROFILE_PAGE_TEXT.EMAIL}: {email}
			</p>
			<p>
				{PROFILE_PAGE_TEXT.ABOUT}: {about}
			</p>
		</PageContainer>
	)
}

import { PageContainer } from "@shared/ui/PageContainer"
import { useTranslations } from "next-intl"

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
	const t = useTranslations("ProfilePage")
	return (
		<PageContainer>
			<h2>
				{t("title")} {userId}
			</h2>
			<p>
				{t("email")}: {email}
			</p>
			<p>
				{t("about")}: {about}
			</p>
		</PageContainer>
	)
}

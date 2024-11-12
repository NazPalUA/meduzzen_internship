import { Container } from "@shared/components/ui"
import { UserCompanies } from "@widgets/UserCompanies"
import { UserProfile as UserProfileWidget } from "@widgets/UserProfile"
import { useTranslations } from "next-intl"

type Params = {
  userId: string
}

export default function UserProfile({ params }: { params: Params }) {
  const { userId } = params

  const t = useTranslations("ProfilePage")
  return (
    <Container>
      <h2>{t("title")}</h2>
      <UserProfileWidget userId={userId} />
      <UserCompanies userId={userId} />
    </Container>
  )
}

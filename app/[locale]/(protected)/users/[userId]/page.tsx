import { Container } from "@shared/components/ui"
import { User } from "@widgets/User"
import { useTranslations } from "next-intl"

type Params = {
  userId: string
}

export default function UserProfile({ params }: { params: Params }) {
  const { userId } = params

  const t = useTranslations("UserPage")
  return (
    <Container>
      <h2>{t("title")}</h2>
      <User userId={userId} />
    </Container>
  )
}

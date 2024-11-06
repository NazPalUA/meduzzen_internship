import { Container } from "@/src/shared/ui/Container"
import { UsersList } from "@widgets/UsersList"
import { useTranslations } from "next-intl"
import { setRequestLocale } from "next-intl/server"

type Props = {
  params: { locale: string }
}

export default function Users({ params: { locale } }: Props) {
  setRequestLocale(locale)

  const t = useTranslations("UsersPage")
  return (
    <Container>
      <h2>{t("title")}</h2>
      <p>{t("description")}</p>
      <UsersList />
    </Container>
  )
}

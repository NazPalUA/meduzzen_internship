import { Container } from "@/src/shared/ui/Container"
import { Dashboard as DashboardComponent } from "@widgets/Dashboard"
import { useTranslations } from "next-intl"
import { setRequestLocale } from "next-intl/server"

type Props = {
  params: { locale: string }
}

export default function Dashboard({ params: { locale } }: Props) {
  setRequestLocale(locale)

  const t = useTranslations("DashboardPage")

  return (
    <Container>
      <h2>{t("title")}</h2>
      <DashboardComponent />
    </Container>
  )
}

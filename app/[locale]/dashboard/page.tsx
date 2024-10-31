import { PageContainer } from "@shared/ui/PageContainer"
import { Dashboard as DashboardComponent } from "@widgets/Dashboard"
import { useTranslations } from "next-intl"
import { setRequestLocale } from "next-intl/server"

type Props = {
  params: { locale: string }
}

export default function Dashboard({ params: { locale } }: Props) {
  setRequestLocale(locale) // Enable static rendering

  const t = useTranslations("DashboardPage")

  return (
    <PageContainer>
      <h2>{t("title")}</h2>
      <DashboardComponent />
    </PageContainer>
  )
}

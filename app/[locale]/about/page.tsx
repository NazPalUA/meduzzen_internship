import { PageContainer } from "@shared/ui/PageContainer"
import { useTranslations } from "next-intl"
import { setRequestLocale } from "next-intl/server"

type Props = {
  params: { locale: string }
}

export default function About({ params: { locale } }: Props) {
  // Enable static rendering
  setRequestLocale(locale)

  const t = useTranslations("AboutPage")
  return (
    <PageContainer>
      <h2>{t("title")}</h2>
      <p>{t("description")}</p>
    </PageContainer>
  )
}

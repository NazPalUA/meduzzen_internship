import { Container } from "@/src/shared/ui/Container"
import { useTranslations } from "next-intl"
import { setRequestLocale } from "next-intl/server"

type Props = {
  params: { locale: string }
}

export default function About({ params: { locale } }: Props) {
  setRequestLocale(locale)

  const t = useTranslations("AboutPage")
  return (
    <Container>
      <h2>{t("title")}</h2>
      <p>{t("description")}</p>
    </Container>
  )
}

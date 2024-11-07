import { Container } from "@shared/ui/Container"
import { CompaniesList } from "@widgets/CompaniesList"
import { useTranslations } from "next-intl"
import { setRequestLocale } from "next-intl/server"

type Props = {
  params: { locale: string }
}

export default function Companies({ params: { locale } }: Props) {
  setRequestLocale(locale)

  const t = useTranslations("CompaniesPage")
  return (
    <Container>
      <h2>{t("title")}</h2>
      <p>{t("description")}</p>
      <CompaniesList />
    </Container>
  )
}

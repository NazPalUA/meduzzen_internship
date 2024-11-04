import { Container } from "@/src/shared/ui/Container"
import { CompaniesList } from "@widgets/CompaniesList"
import { useTranslations } from "next-intl"
import { setRequestLocale } from "next-intl/server"

const mockCompanies = [
  { id: "a", name: "Company A", description: "Description A" },
  { id: "b", name: "Company B", description: "Description B" },
  { id: "c", name: "Company C", description: "Description C" },
  { id: "d", name: "Company D", description: "Description D" },
  { id: "e", name: "Company E", description: "Description E" },
  { id: "f", name: "Company F", description: "Description F" },
  { id: "g", name: "Company G", description: "Description G" },
  { id: "h", name: "Company H", description: "Description H" },
  { id: "i", name: "Company I", description: "Description I" },
  { id: "j", name: "Company J", description: "Description J" },
]

type Props = {
  params: { locale: string }
}

export default function Companies({ params: { locale } }: Props) {
  setRequestLocale(locale)

  const t = useTranslations("CompaniesPage")
  return (
    <Container>
      <strong>{t("title")}</strong>
      <CompaniesList companies={mockCompanies} />
    </Container>
  )
}

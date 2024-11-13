import { Container } from "@shared/components/ui"
import { Company } from "@widgets/Company"
import { useTranslations } from "next-intl"

type Params = {
  companyId: string
}

export default function CompanyProfile({ params }: { params: Params }) {
  const { companyId } = params

  const t = useTranslations("CompanyPage")
  return (
    <Container>
      <h2>{t("title")}</h2>
      <Company companyId={companyId} />
    </Container>
  )
}

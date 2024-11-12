import { Container } from "@shared/components/ui"
import { CompanyDashboard } from "@widgets/CompanyDashboard"
import { useTranslations } from "next-intl"

type Params = {
  companyId: string
}

export default function CompanyProfile({ params }: { params: Params }) {
  const { companyId } = params

  const t = useTranslations("CompanyDashboardPage")
  return (
    <Container>
      <h2>{t("title")}</h2>
      <CompanyDashboard companyId={companyId} />
    </Container>
  )
}

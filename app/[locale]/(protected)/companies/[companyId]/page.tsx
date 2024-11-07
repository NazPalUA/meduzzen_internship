import { Container } from "@/src/shared/ui/Container"
import { CompanyProfile as CompanyProfileWidget } from "@widgets/CompanyProfile"
import { useTranslations } from "next-intl"

type Params = {
  companyId: string
}

export default function CompanyProfile({ params }: { params: Params }) {
  const { companyId } = params

  const t = useTranslations("CompanyProfilePage")
  return (
    <Container>
      <h2>{t("title")}</h2>
      <CompanyProfileWidget companyId={companyId} />
    </Container>
  )
}

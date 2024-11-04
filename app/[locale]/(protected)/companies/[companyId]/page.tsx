import { Container } from "@/src/shared/ui/Container"
import { useTranslations } from "next-intl"

type Params = {
  companyId: string
}

function getCompanyData(companyId: string) {
  return {
    name: `Company ${companyId.toUpperCase()}`,
    description: `Description ${companyId.toUpperCase()}`,
  }
}

export default function CompanyProfile({ params }: { params: Params }) {
  const { companyId } = params

  const { name, description } = getCompanyData(companyId)
  const t = useTranslations("CompanyProfilePage")

  return (
    <Container>
      <h2>
        {t("title")}: {name}
      </h2>
      <p>
        {t("description")}: {description}
      </p>
    </Container>
  )
}

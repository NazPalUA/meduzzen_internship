import { Container } from "@shared/components/ui"
import { Company } from "@widgets/Company"

type Params = {
  companyId: string
}

export default function CompanyProfile({ params }: { params: Params }) {
  const { companyId } = params

  return (
    <Container>
      <Company companyId={companyId} />
    </Container>
  )
}

import { COMPANY_PROFILE_PAGE_TEXT } from "@/src/shared/constants/texts"
import { PageContainer } from "@/src/shared/ui/PageContainer"

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

	return (
		<PageContainer>
			<h2>
				{COMPANY_PROFILE_PAGE_TEXT.TITLE}: {name}
			</h2>
			<p>
				{COMPANY_PROFILE_PAGE_TEXT.DESCRIPTION}: {description}
			</p>
		</PageContainer>
	)
}

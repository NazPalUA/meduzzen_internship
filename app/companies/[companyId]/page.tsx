import { COMPANY_PROFILE_PAGE_TEXT } from "@/src/shared/constants/texts"
import { PageContainer } from "@/src/shared/ui/PageContainer"
import { Typography } from "@mui/material"

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
			<Typography variant="h4" component="h2" gutterBottom>
				{COMPANY_PROFILE_PAGE_TEXT.TITLE}: {name}
			</Typography>
			<Typography variant="body1">
				{COMPANY_PROFILE_PAGE_TEXT.DESCRIPTION}: {description}
			</Typography>
		</PageContainer>
	)
}

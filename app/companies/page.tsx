import { COMPANIES_PAGE_TEXT } from "@/src/shared/constants/texts"
import { PageContainer } from "@/src/shared/ui/PageContainer"
import { CompaniesList } from "@/src/widgets/CompaniesList"

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

export default function Companies() {
	return (
		<PageContainer>
			<strong>{COMPANIES_PAGE_TEXT.TITLE}</strong>
			<CompaniesList companies={mockCompanies} />
		</PageContainer>
	)
}

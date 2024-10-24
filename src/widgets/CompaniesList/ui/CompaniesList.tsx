import { type CompanyEntity } from "@/src/entities/company"
import { Routes } from "@/src/shared/constants/routes"
import Grid from "@mui/material/Grid2"
import Link from "next/link"
import { CompanyCard } from "./CompanyCard"

export function CompaniesList({ companies }: { companies: CompanyEntity[] }) {
	return (
		<Grid container spacing={2} justifyContent="center">
			{companies.map(company => (
				<Grid key={company.id} display="flex" justifyContent="center">
					<Link href={`${Routes.COMPANIES}/${company.id}`}>
						<CompanyCard company={company} />
					</Link>
				</Grid>
			))}
		</Grid>
	)
}

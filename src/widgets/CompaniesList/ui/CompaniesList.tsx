import { type CompanyEntity } from "@entities/company"
import Grid from "@mui/material/Grid2"
import { Link } from "@navigation"
import { Routes } from "@routes"
import { CompanyCard } from "./CompanyCard"

export function CompaniesList({ companies }: { companies: CompanyEntity[] }) {
  return (
    <Grid container spacing={2} justifyContent="center">
      {companies.map((company) => (
        <Grid key={company.id} display="flex" justifyContent="center">
          <Link href={`${Routes.COMPANIES}/${company.id}`}>
            <CompanyCard company={company} />
          </Link>
        </Grid>
      ))}
    </Grid>
  )
}

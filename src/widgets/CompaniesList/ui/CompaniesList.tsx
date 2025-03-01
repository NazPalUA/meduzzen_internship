"use client"

import { useGetAllCompaniesQuery } from "@entities/company"
import { useRouter } from "@navigation"
import { Pagination } from "@shared/components/Pagination"
import { ErrorMessage, GridContainer, ListCardSkeleton, NoData } from "@shared/components/ui"
import { getCurrentPage } from "@shared/utils"
import { useSearchParams } from "next/navigation"
import { CompanyCard } from "./CompanyCard"

const PAGE_SIZE = 15

export function CompaniesList() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const currentPage = getCurrentPage(searchParams)

  const { data, isLoading, isError } = useGetAllCompaniesQuery({
    page: currentPage,
    page_size: PAGE_SIZE,
  })

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()))
    params.set("page", page.toString())
    router.push(`?${params.toString()}`)
  }

  if (isLoading)
    return (
      <GridContainer>
        {Array.from({ length: PAGE_SIZE > 24 ? 24 : PAGE_SIZE }).map((_, index) => (
          <ListCardSkeleton key={index} />
        ))}
      </GridContainer>
    )

  if (isError || !data) return <ErrorMessage />

  const { companies, pagination } = data

  return (
    <div>
      {companies?.length ? (
        <GridContainer>
          {companies.map((company) => (
            <CompanyCard key={company.company_id} company={company} />
          ))}
        </GridContainer>
      ) : (
        <NoData />
      )}
      <Pagination
        totalPages={pagination.total_page}
        currentPage={currentPage}
        setPage={handlePageChange}
      />
    </div>
  )
}

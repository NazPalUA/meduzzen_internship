"use client"

import { useGetAllUsersQuery } from "@entities/user"
import { useRouter } from "@navigation"
import { Pagination } from "@shared/components/Pagination"
import { ErrorMessage, GridContainer, ListCardSkeleton, NoData } from "@shared/components/ui"
import { getCurrentPage } from "@shared/utils"
import { useSearchParams } from "next/navigation"
import { UserCard } from "./UserCard"

const PAGE_SIZE = 15

export function UsersList() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const currentPage = getCurrentPage(searchParams)

  const { data, isLoading, isError } = useGetAllUsersQuery({
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

  const { users, pagination } = data

  return (
    <div>
      {users?.length ? (
        <GridContainer>
          {users.map((user) => (
            <UserCard key={user.user_id} user={user} />
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

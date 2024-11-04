"use client"

import { useGetAllUsersQuery } from "@entities/user"
import { ErrorMessage } from "@shared/ui/ErrorMessage"
import { GridContainer } from "@shared/ui/GridContainer"
import { NoData } from "@shared/ui/NoData"
import { Pagination } from "@shared/ui/Pagination"
import { useSearchParams } from "next/navigation"
import { CardSkeleton } from "./CardSkeleton"
import { UserCard } from "./UserCard"

const PAGE_SIZE = 15

export function UsersList() {
  const searchParams = useSearchParams()
  const currentPageParam = searchParams.get("page")
  const currentPage = currentPageParam ? parseInt(currentPageParam) : 1
  const { data, isLoading, isError } = useGetAllUsersQuery({
    page: currentPage,
    page_size: PAGE_SIZE,
  })

  const users = data?.result.users

  if (isLoading)
    return (
      <GridContainer>
        {Array.from({ length: PAGE_SIZE > 24 ? 24 : PAGE_SIZE }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </GridContainer>
    )

  if (isError) return <ErrorMessage />

  if (!users) return <NoData />

  return (
    <div>
      <GridContainer>
        {users.map((user) => (
          <UserCard key={user.user_id} user={user} />
        ))}
      </GridContainer>
      <Pagination totalPages={data.result.pagination.total_page} />
    </div>
  )
}

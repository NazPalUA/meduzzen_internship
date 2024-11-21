"use client"

import { UserCompanies } from "@widgets/UserCompanies"

type Params = {
  userId: string
}

export default function UserCompaniesPage({ params }: { params: Params }) {
  const userId = Number(params.userId)

  return <UserCompanies user_id={userId} />
}

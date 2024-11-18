"use client"

import { useGetUserGlobalRatingQuery } from "@features/user-data"
import { Rating } from "@mui/material"
import { ErrorMessage, LoadingSpinner } from "@shared/components/ui"

export function GlobalRating({ userId }: { userId: number }) {
  const { data: rating, isLoading, isError } = useGetUserGlobalRatingQuery(userId)

  if (isLoading) return <LoadingSpinner />

  if (isError) return <ErrorMessage />

  if (!rating) return null

  // Convert rating from 1-100 scale to 0-5 scale
  const starRating = rating / 20

  return <Rating value={starRating} precision={0.25} readOnly />
}

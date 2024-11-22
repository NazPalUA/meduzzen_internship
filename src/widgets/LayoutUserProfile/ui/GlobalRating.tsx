"use client"

import { useGetUserGlobalRatingQuery } from "@features/user-data"
import { Rating } from "@mui/material"
import { keyframes, styled } from "@mui/system"
import { ErrorMessage } from "@shared/components/ui"

const blink = keyframes`
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
`

const BlinkingRating = styled(Rating)({
  animation: `${blink} 1.5s infinite`,
})

export function GlobalRating({ userId }: { userId: number }) {
  const { data: rating, isLoading, isError } = useGetUserGlobalRatingQuery(userId)

  if (isLoading) {
    return <BlinkingRating value={null} readOnly />
  }

  if (isError) return <ErrorMessage />

  if (!rating) return null

  // Convert rating from 1-100 scale to 0-5 scale
  const starRating = rating / 20

  return <Rating value={starRating} precision={0.25} readOnly />
}

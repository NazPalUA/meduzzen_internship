"use client"

import { FC } from "react"
import { useRedirectIfNotOwner } from "../hooks/useRedirectIfNotOwner"

type Props = {
  user_id: number
  isOwner: boolean
  Component: FC<{ user_id: number }>
}

export function TabPrivate({ user_id, isOwner, Component }: Props) {
  useRedirectIfNotOwner(isOwner, user_id)
  if (!isOwner) return null

  return <Component user_id={user_id} />
}

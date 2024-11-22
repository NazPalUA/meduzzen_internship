"use client"

import { UserDetails } from "@entities/user"
import { Settings } from "@features/manage-user-profile"
import { AdminPanelSettings as SuperuserIcon } from "@mui/icons-material"
import { CardHeader } from "@mui/material"
import { Avatar } from "@shared/components/ui"
import { GlobalRating } from "./GlobalRating"
import { NavBar } from "./NavBar"

export function LayoutUserProfile({
  user,
  isOwner,
  children,
}: {
  user: UserDetails
  isOwner: boolean
  children: React.ReactNode
}) {
  const { user_id, user_firstname, user_lastname, user_avatar, is_superuser } = user

  const currentTime = new Date().getTime()

  return (
    <>
      <CardHeader
        avatar={<Avatar cacheKey={currentTime} src={user_avatar} alt={user_firstname} />}
        title={<h3>{`${user_firstname} ${user_lastname}`}</h3>}
        subheader={
          <>
            <GlobalRating userId={user_id} />
            {is_superuser ? <SuperuserIcon color="primary" /> : null}
          </>
        }
        action={isOwner && <Settings />}
      />

      <NavBar userId={user_id} isOwner={isOwner} />
      {children}
    </>
  )
}

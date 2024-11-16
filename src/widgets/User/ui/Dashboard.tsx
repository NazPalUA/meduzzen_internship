"use client"

import { UserDetails } from "@entities/user"
import { Settings } from "@features/manage-user-profile"
import { AdminPanelSettings as SuperuserIcon } from "@mui/icons-material"
import { Card, CardContent, CardHeader } from "@mui/material"
import { Avatar } from "@shared/components/ui"
import { useSearchParams } from "next/navigation"
import { Tab as TabEnum } from "../constants/Tabs"
import { CompaniesList } from "./CompaniesList"
import { InvitesList } from "./InvitesList"
import { RequestsList } from "./RequestsList"
import { TabInfo } from "./TabInfo"
import { TabPrivate } from "./TabPrivate"
import { TabsBar } from "./TabsBar"

export function Dashboard({ user, isOwner }: { user: UserDetails; isOwner: boolean }) {
  const { user_id, user_firstname, user_lastname, user_avatar, is_superuser } = user

  const searchParams = useSearchParams()

  const currentTab = searchParams.get("tab") || TabEnum.INFO

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={user_avatar} alt={user_firstname} />}
        title={<h3>{`${user_firstname} ${user_lastname}`}</h3>}
        subheader={is_superuser ? <SuperuserIcon color="primary" /> : null}
        action={isOwner && <Settings />}
      />

      <CardContent>
        <TabsBar isOwner={isOwner} />
        {currentTab === TabEnum.INFO && <TabInfo user={user} />}
        {currentTab === TabEnum.COMPANIES && (
          <TabPrivate user_id={user_id} isOwner={isOwner} Component={CompaniesList} />
        )}
        {currentTab === TabEnum.INVITES && (
          <TabPrivate user_id={user_id} isOwner={isOwner} Component={InvitesList} />
        )}
        {currentTab === TabEnum.REQUESTS && (
          <TabPrivate user_id={user_id} isOwner={isOwner} Component={RequestsList} />
        )}
      </CardContent>
    </Card>
  )
}

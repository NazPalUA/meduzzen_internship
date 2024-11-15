"use client"

import { CompanyDetails } from "@entities/company"
import { CurrentUser } from "@entities/session"
import { Card, CardContent, CardHeader } from "@mui/material"
import { Avatar } from "@shared/components/ui"
import { useSearchParams } from "next/navigation"
import { Tab } from "../lib/constants/Tabs"
import { Permission } from "../lib/model/Permission"
import { HeaderAction } from "./HeaderAction"
import { SubHeader } from "./SubHeader"
import { TabInfo } from "./TabInfo"
import { TabInvites } from "./TabInvites"
import { TabMembers } from "./TabMembers"
import { TabRequests } from "./TabRequests"
import { TabsBar } from "./TabsBar"

export function Dashboard({
  company,
  currentUser,
  permission,
}: {
  company: CompanyDetails
  currentUser: CurrentUser
  permission: Permission
}) {
  const { company_name, company_title, company_avatar, is_visible } = company

  const searchParams = useSearchParams()

  const currentTab = searchParams.get("tab") || Tab.INFO

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={company_avatar} alt={company_name} size="lg" />}
        title={<h3>{company_name}</h3>}
        subheader={<SubHeader title={company_title} isVisible={is_visible} />}
        action={
          <HeaderAction company={company} currentUser={currentUser} permission={permission} />
        }
      />

      <CardContent>
        <TabsBar permission={permission} />
        {currentTab === Tab.INFO && <TabInfo company={company} />}
        {currentTab === Tab.MEMBERS && <TabMembers company={company} permission={permission} />}
        {currentTab === Tab.INVITES && <TabInvites company={company} permission={permission} />}
        {currentTab === Tab.REQUESTS && <TabRequests company={company} permission={permission} />}
      </CardContent>
    </Card>
  )
}

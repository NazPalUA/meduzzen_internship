"use client"

import { UserDetails } from "@entities/user"
import { Settings } from "@features/manage-user-profile"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import BadgeIcon from "@mui/icons-material/Badge"
import BusinessIcon from "@mui/icons-material/Business"
import ContactPageIcon from "@mui/icons-material/ContactPage"
import MailIcon from "@mui/icons-material/Mail"
import { Card, CardContent, CardHeader } from "@mui/material"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import { useRouter } from "@navigation"
import { Avatar } from "@shared/components/ui"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { SyntheticEvent } from "react"
import { Info } from "./Info"
import { Invites } from "./Invites"
import { Participation } from "./Participation"
import { Requests } from "./Requests"

export function Dashboard({ user, isOwner }: { user: UserDetails; isOwner: boolean }) {
  const { user_id, user_firstname, user_lastname, user_avatar, is_superuser } = user

  const searchParams = useSearchParams()
  const router = useRouter()
  const t = useTranslations("UserPage.nav")

  const currentTab = searchParams.get("tab") || "info"

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    router.push(`?tab=${newValue}`)
  }

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={user_avatar} alt={user_firstname} />}
        title={<h3>{`${user_firstname} ${user_lastname}`}</h3>}
        subheader={is_superuser ? <AdminPanelSettingsIcon color="primary" /> : null}
        action={isOwner && <Settings />}
      />

      <CardContent>
        {isOwner && (
          <Tabs value={currentTab} onChange={handleChange}>
            <Tab icon={<BadgeIcon />} value="info" iconPosition="start" label={t("info")} />
            <Tab
              icon={<BusinessIcon />}
              value="participation"
              iconPosition="start"
              label={t("participation")}
            />
            <Tab icon={<MailIcon />} value="invites" iconPosition="start" label={t("invites")} />
            <Tab
              icon={<ContactPageIcon />}
              value="requests"
              iconPosition="start"
              label={t("requests")}
            />
          </Tabs>
        )}

        {currentTab === "info" && <Info user={user} />}
        {currentTab === "participation" && <Participation user_id={user_id} />}
        {currentTab === "invites" && <Invites user_id={user_id} />}
        {currentTab === "requests" && <Requests user_id={user_id} />}
      </CardContent>
    </Card>
  )
}

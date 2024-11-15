"use client"

import {
  Business as InfoIcon,
  GroupAdd as InvitesIcon,
  Group as MembersIcon,
  HowToReg as RequestsIcon,
} from "@mui/icons-material"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import { useRouter } from "@navigation"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { SyntheticEvent } from "react"
import { Tab as TabEnum } from "../lib/constants/Tabs"
import { Permission } from "../lib/model/Permission"

export function TabsBar({ permission: { isOutsider, isOwner } }: { permission: Permission }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const t = useTranslations("CompanyPage.nav")

  const currentTab = searchParams.get("tab") || "info"

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    router.push(`?tab=${newValue}`)
  }

  return isOutsider ? null : (
    <Tabs value={currentTab} onChange={handleChange}>
      <Tab icon={<InfoIcon />} value={TabEnum.INFO} iconPosition="start" label={t("info")} />
      <Tab
        icon={<MembersIcon />}
        value={TabEnum.MEMBERS}
        iconPosition="start"
        label={t("members")}
      />
      {isOwner && (
        <Tab
          icon={<InvitesIcon />}
          value={TabEnum.INVITES}
          iconPosition="start"
          label={t("invites")}
        />
      )}
      {isOwner && (
        <Tab
          icon={<RequestsIcon />}
          value={TabEnum.REQUESTS}
          iconPosition="start"
          label={t("requests")}
        />
      )}
    </Tabs>
  )
}

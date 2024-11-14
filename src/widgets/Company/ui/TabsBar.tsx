"use client"

import BusinessIcon from "@mui/icons-material/Business"
import GroupIcon from "@mui/icons-material/Group"
import GroupAddIcon from "@mui/icons-material/GroupAdd"
import HowToRegIcon from "@mui/icons-material/HowToReg"
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
      <Tab icon={<BusinessIcon />} value={TabEnum.INFO} iconPosition="start" label={t("info")} />
      <Tab icon={<GroupIcon />} value={TabEnum.MEMBERS} iconPosition="start" label={t("members")} />
      {isOwner && (
        <Tab
          icon={<GroupAddIcon />}
          value={TabEnum.INVITES}
          iconPosition="start"
          label={t("invites")}
        />
      )}
      {isOwner && (
        <Tab
          icon={<HowToRegIcon />}
          value={TabEnum.REQUESTS}
          iconPosition="start"
          label={t("requests")}
        />
      )}
    </Tabs>
  )
}

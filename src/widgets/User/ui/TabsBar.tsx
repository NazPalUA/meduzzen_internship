"use client"

import {
  Business as CompaniesIcon,
  Badge as InfoIcon,
  Mail as InvitesIcon,
  ContactPage as RequestsIcon,
} from "@mui/icons-material"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import { useRouter } from "@navigation"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { SyntheticEvent } from "react"
import { Tab as TabEnum } from "../constants/Tabs"

export function TabsBar({ isOwner }: { isOwner: boolean }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const t = useTranslations("UserPage.nav")

  const currentTab = searchParams.get("tab") || TabEnum.INFO

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    router.push(`?tab=${newValue}`)
  }

  return isOwner ? (
    <Tabs value={currentTab} onChange={handleChange}>
      <Tab icon={<InfoIcon />} value={TabEnum.INFO} iconPosition="start" label={t("info")} />
      <Tab
        icon={<CompaniesIcon />}
        value={TabEnum.COMPANIES}
        iconPosition="start"
        label={t("companies")}
      />
      <Tab
        icon={<InvitesIcon />}
        value={TabEnum.INVITES}
        iconPosition="start"
        label={t("invites")}
      />
      <Tab
        icon={<RequestsIcon />}
        value={TabEnum.REQUESTS}
        iconPosition="start"
        label={t("requests")}
      />
    </Tabs>
  ) : null
}

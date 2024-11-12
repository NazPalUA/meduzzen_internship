"use client"

import { CompanyDetails } from "@entities/company"
import GroupIcon from "@mui/icons-material/Group"
import GroupAddIcon from "@mui/icons-material/GroupAdd"
import HowToRegIcon from "@mui/icons-material/HowToReg"
import { Card, CardContent, CardHeader } from "@mui/material"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import { useRouter } from "@navigation"
import { Avatar } from "@shared/components/ui"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { SyntheticEvent } from "react"
import { Invites } from "./Invites"
import { Members } from "./Members"
import { Requests } from "./Requests"

export function Dashboard({ company }: { company: CompanyDetails }) {
  const { company_id, company_name, company_title, company_avatar } = company

  const searchParams = useSearchParams()
  const router = useRouter()
  const t = useTranslations("CompanyDashboardPage.nav")

  const currentTab = searchParams.get("tab") || "members"

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    router.push(`?tab=${newValue}`)
  }

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={company_avatar} alt={company_name} size="md" />}
        title={<h3>{company_name}</h3>}
        subheader={<strong>{company_title}</strong>}
      />

      <CardContent>
        <Tabs value={currentTab} onChange={handleChange}>
          <Tab icon={<GroupIcon />} value="members" iconPosition="start" label={t("members")} />
          <Tab icon={<GroupAddIcon />} value="invites" iconPosition="start" label={t("invites")} />
          <Tab
            icon={<HowToRegIcon />}
            value="requests"
            iconPosition="start"
            label={t("requests")}
          />
        </Tabs>

        {currentTab === "members" && <Members companyId={company_id} />}
        {currentTab === "invites" && <Invites companyId={company_id} />}
        {currentTab === "requests" && <Requests companyId={company_id} />}
      </CardContent>
    </Card>
  )
}

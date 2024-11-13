"use client"

import { CompanyDetails } from "@entities/company"
import { InviteFromCompany, RequestFromUser } from "@features/action"
import { Settings } from "@features/manage-company"
import BusinessIcon from "@mui/icons-material/Business"
import GroupIcon from "@mui/icons-material/Group"
import GroupAddIcon from "@mui/icons-material/GroupAdd"
import HowToRegIcon from "@mui/icons-material/HowToReg"
import { Card, CardContent, CardHeader, Chip } from "@mui/material"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import { useRouter } from "@navigation"
import { Avatar } from "@shared/components/ui"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { SyntheticEvent } from "react"
import { Info } from "./Info"
import { Invites } from "./Invites"
import { Members } from "./Members"
import { Requests } from "./Requests"
import styles from "./Styles.module.scss"

export function Dashboard({ company, admin }: { company: CompanyDetails; admin: boolean }) {
  const { company_id, company_name, company_title, company_avatar, is_visible } = company

  const searchParams = useSearchParams()
  const router = useRouter()
  const t = useTranslations("CompanyPage.nav")

  const currentTab = searchParams.get("tab") || "info"

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    router.push(`?tab=${newValue}`)
  }

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={company_avatar} alt={company_name} size="lg" />}
        title={<h3>{company_name}</h3>}
        subheader={
          <>
            <strong className={styles.headerSubTitle}>{company_title}</strong>
            <Chip
              size="small"
              label={is_visible ? "Visible" : "Hidden"}
              color={is_visible ? "success" : "warning"}
            />
          </>
        }
        action={admin ? <Settings /> : <RequestFromUser companyId={company_id} />}
      />

      <CardContent>
        {admin && (
          <Tabs value={currentTab} onChange={handleChange}>
            <Tab icon={<BusinessIcon />} value="info" iconPosition="start" label={t("info")} />
            <Tab icon={<GroupIcon />} value="members" iconPosition="start" label={t("members")} />
            <Tab
              icon={<GroupAddIcon />}
              value="invites"
              iconPosition="start"
              label={t("invites")}
            />
            <Tab
              icon={<HowToRegIcon />}
              value="requests"
              iconPosition="start"
              label={t("requests")}
            />
          </Tabs>
        )}

        {currentTab === "info" && <Info company={company} />}
        {currentTab === "members" && <Members companyId={company_id} />}
        {currentTab === "invites" && (
          <div>
            <InviteFromCompany companyId={company_id} />
            <Invites companyId={company_id} />
          </div>
        )}
        {currentTab === "requests" && <Requests companyId={company_id} />}
      </CardContent>
    </Card>
  )
}

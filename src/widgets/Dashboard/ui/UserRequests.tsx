"use client"

import { ConfirmActionModal } from "@/src/shared/components/ConfirmActionModal"
import { CurrentUser } from "@entities/session"
import { UserCompany } from "@features/user-data"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import { Card, CardContent, CardHeader } from "@mui/material"
import { Link } from "@navigation"
import { MenuItem, SettingsMenu } from "@shared/components/SettingsMenu"
import { Avatar, ErrorMessage, LoadingSpinner } from "@shared/components/ui"
import { Action } from "@shared/constants"
import { useTranslations } from "next-intl"
import styles from "./UserRequests.module.scss"

export function UserRequests({ user }: { user: CurrentUser }) {
  const t = useTranslations("DashboardPage.userRequests")

  return (
    <Card sx={{ flex: 1 }}>
      <CardHeader title={<h3>{t("title")}</h3>} avatar={<PersonAddIcon />} />
      <CardContent className={styles.contentContainer}>
        <List userId={user.user_id.toString()} />
      </CardContent>
    </Card>
  )
}

function List({ userId }: { userId: string }) {
  console.log(userId)
  const data: UserCompany[] = [
    {
      company_id: 1,
      company_avatar: null,
      company_name: "Company 1",
      company_title: "Title 1",
      is_visible: true,
      action_id: 1,
      action: Action.OWNER,
    },

    {
      company_id: 2,
      company_avatar: null,
      company_name: "Company 2",
      company_title: "Title 2",
      is_visible: true,
      action_id: 2,
      action: Action.OWNER,
    },
  ]

  const t = useTranslations("DashboardPage.userRequests")

  const isLoading = false
  const isError = false

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorMessage />
  if (!data?.length) return <p>{t("noRequests")}</p>

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {data?.map((company) => <CompanyCard key={company.company_id} company={company} />)}
    </div>
  )
}

function CompanyCard({ company }: { company: UserCompany }) {
  async function cancelRequest() {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Request canceled")
  }

  const t = useTranslations("DashboardPage.userRequests")

  const menuItems: MenuItem[] = [
    {
      icon: <HighlightOffIcon />,
      text: t("cancel"),

      content: (
        <ConfirmActionModal
          confirmAction={{
            onAction: () => cancelRequest(),
            buttonProps: {
              children: t("cancel"),
            },
          }}
          message={t("confirmCancel")}
          title={t("modalCancelTitle")}
        />
      ),
    },
  ]

  return (
    <CardHeader
      avatar={<Avatar src={company.company_avatar} alt={company.company_name} size="sm" />}
      title={
        <Link href={`/companies/${company.company_id}`} className={styles.link}>
          <h4>{company.company_name}</h4>
        </Link>
      }
      subheader={<span>{company.company_title}</span>}
      action={<SettingsMenu menuItems={menuItems} />}
    />
  )
}

"use client"

import { ConfirmActionModal } from "@/src/shared/components/ConfirmActionModal"
import { CurrentUser } from "@entities/session"
import { UserCompany } from "@features/user-data"
import MailIcon from "@mui/icons-material/Mail"
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt"
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt"
import { Card, CardContent, CardHeader } from "@mui/material"
import { Link } from "@navigation"
import { MenuItem, SettingsMenu } from "@shared/components/SettingsMenu"
import { Avatar, ErrorMessage, LoadingSpinner } from "@shared/components/ui"
import { Action } from "@shared/constants"
import { useTranslations } from "next-intl"
import styles from "./UserInvites.module.scss"

export function UserInvites({ user }: { user: CurrentUser }) {
  const t = useTranslations("DashboardPage.userInvites")

  return (
    <Card sx={{ flex: 1 }}>
      <CardHeader title={<h3>{t("title")}</h3>} avatar={<MailIcon />} />
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

  const t = useTranslations("DashboardPage.userInvites")

  const isLoading = false
  const isError = false

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorMessage />
  if (!data?.length) return <p>{t("noInvites")}</p>

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {data?.map((company) => <CompanyCard key={company.company_id} company={company} />)}
    </div>
  )
}

function CompanyCard({ company }: { company: UserCompany }) {
  async function acceptInvite() {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Invite accepted")
  }

  async function rejectInvite() {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Invite rejected")
  }

  const t = useTranslations("DashboardPage.userInvites")

  const menuItems: MenuItem[] = [
    {
      icon: <ThumbUpOffAltIcon />,
      text: t("accept"),

      content: (
        <ConfirmActionModal
          confirmAction={{
            onAction: () => acceptInvite(),
            buttonProps: {
              children: t("accept"),
            },
          }}
          message={t("confirmAccept")}
          title={t("modalAcceptTitle")}
        />
      ),
    },
    {
      icon: <ThumbDownOffAltIcon />,
      text: t("reject"),

      content: (
        <ConfirmActionModal
          confirmAction={{
            onAction: () => rejectInvite(),
            buttonProps: {
              children: t("reject"),
            },
          }}
          message={t("confirmReject")}
          title={t("modalRejectTitle")}
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

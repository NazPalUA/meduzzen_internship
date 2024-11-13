"use client"

import { SingleCompany } from "@entities/company"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import PersonOffIcon from "@mui/icons-material/PersonOff"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemText from "@mui/material/ListItemText"
import { Link } from "@navigation"
import { ConfirmActionModal } from "@shared/components/ConfirmActionModal"
import { MenuItem, SettingsMenu } from "@shared/components/SettingsMenu"
import { Avatar, ErrorMessage, LoadingSpinner } from "@shared/components/ui"
import { useTranslations } from "next-intl"
import { fakeCompanies } from "../lib/fakeCompanies"
import styles from "./Styles.module.scss"

export function Invites({ user_id }: { user_id: number }) {
  const companies = fakeCompanies("invites", user_id)
  const t = useTranslations("UserPage.invites")

  const isLoading = false
  const isError = false

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorMessage />
  if (!companies.length) return <p>{t("noInvites")}</p>

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {companies.map((company) => (
        <Invite key={company.company_id} company={company} />
      ))}
    </List>
  )
}

function Invite({ company }: { company: SingleCompany }) {
  const t = useTranslations("UserPage.invites")

  async function acceptInvite() {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Invite accepted")
  }

  async function rejectInvite() {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Invite rejected")
  }
  const menuItems: MenuItem[] = [
    {
      icon: <PersonAddIcon />,
      text: t("acceptInvite"),
      content: (
        <ConfirmActionModal
          title={t("modalAcceptInviteTitle")}
          message={t("confirmAcceptInvite")}
          confirmAction={{
            onAction: () => acceptInvite(),
            buttonProps: {
              children: t("submitAcceptInvite"),
              color: "success",
            },
          }}
          cancelAction={{
            buttonProps: {
              children: t("cancelAcceptInvite"),
              color: "primary",
            },
          }}
        />
      ),
    },
    {
      icon: <PersonOffIcon />,
      text: t("rejectInvite"),
      content: (
        <ConfirmActionModal
          title={t("modalRejectInviteTitle")}
          message={t("confirmRejectInvite")}
          confirmAction={{
            onAction: () => rejectInvite(),
            buttonProps: {
              children: t("submitRejectInvite"),
              color: "error",
            },
          }}
          cancelAction={{
            buttonProps: {
              children: t("cancelRejectInvite"),
              color: "primary",
            },
          }}
        />
      ),
    },
  ]

  return (
    <ListItem secondaryAction={<SettingsMenu menuItems={menuItems} />}>
      <ListItemAvatar>
        <Avatar src={company.company_avatar} alt={company.company_name} size="sm" />
      </ListItemAvatar>

      <ListItemText
        primary={
          <Link href={`/companies/${company.company_id}`} className={styles.link}>
            {company.company_name}
          </Link>
        }
        secondary={company.company_title}
        secondaryTypographyProps={{ style: { margin: 0 } }}
      />
    </ListItem>
  )
}

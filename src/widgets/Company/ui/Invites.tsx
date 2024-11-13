"use client"

import { SingleUser } from "@entities/user"
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemText from "@mui/material/ListItemText"
import { Link } from "@navigation"
import { ConfirmActionModal } from "@shared/components/ConfirmActionModal"
import { MenuItem, SettingsMenu } from "@shared/components/SettingsMenu"
import { Avatar, ErrorMessage, LoadingSpinner } from "@shared/components/ui"
import { useTranslations } from "next-intl"
import { fakeUsers } from "../lib/fakeUsers"
import styles from "./Styles.module.scss"

export function Invites({ companyId }: { companyId: number }) {
  const users = fakeUsers("invites", companyId)
  const t = useTranslations("CompanyPage.invites")

  const isLoading = false
  const isError = false

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorMessage />
  if (!users.length) return <p>{t("noInvites")}</p>

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {users.map((user) => (
        <Invite key={user.user_id} user={user} />
      ))}
    </List>
  )
}

function Invite({ user }: { user: SingleUser }) {
  const t = useTranslations("CompanyPage.invites")

  async function cancelInvite() {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("invite canceled")
  }

  const menuItems: MenuItem[] = [
    {
      icon: <PersonAddDisabledIcon />,
      text: t("cancelInvite"),
      content: (
        <ConfirmActionModal
          title={t("modalCancelInviteTitle")}
          message={t("confirmCancelInvite")}
          confirmAction={{
            onAction: () => cancelInvite(),
            buttonProps: {
              children: t("submitCancelInvite"),
              color: "error",
            },
          }}
          cancelAction={{
            buttonProps: {
              children: t("cancelCancelInvite"),
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
        <Avatar src={user.user_avatar} alt={user.user_firstname} size="sm" />
      </ListItemAvatar>

      <ListItemText
        primary={
          <Link href={`/users/${user.user_id}`} className={styles.link}>
            {`${user.user_firstname} ${user.user_lastname}`}
          </Link>
        }
        secondary={user.user_email}
        secondaryTypographyProps={{ style: { margin: 0 } }}
      />
    </ListItem>
  )
}

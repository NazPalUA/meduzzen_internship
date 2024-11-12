"use client"

import { ConfirmActionModal } from "@/src/shared/components/ConfirmActionModal"
import { SingleUser } from "@entities/user"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import PersonOffIcon from "@mui/icons-material/PersonOff"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemText from "@mui/material/ListItemText"
import { MenuItem, SettingsMenu } from "@shared/components/SettingsMenu"
import { Avatar, ErrorMessage, LoadingSpinner } from "@shared/components/ui"
import { useTranslations } from "next-intl"
import { fakeUsers } from "../lib/fakeUsers"

export function Requests({ companyId }: { companyId: number }) {
  const users = fakeUsers("requests", companyId)
  const t = useTranslations("CompanyDashboardPage.requests")

  const isLoading = false
  const isError = false

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorMessage />
  if (!users.length) return <p>{t("noRequests")}</p>

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {users.map((user) => (
        <Request key={user.user_id} user={user} />
      ))}
    </List>
  )
}

function Request({ user }: { user: SingleUser }) {
  const t = useTranslations("CompanyDashboardPage.requests")

  async function acceptRequest() {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Request accepted")
  }

  async function rejectRequest() {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Request rejected")
  }
  const menuItems: MenuItem[] = [
    {
      icon: <PersonAddIcon />,
      text: t("acceptRequest"),
      content: (
        <ConfirmActionModal
          title={t("modalAcceptRequestTitle")}
          message={t("confirmAcceptRequest")}
          confirmAction={{
            onAction: () => acceptRequest(),
            buttonProps: {
              children: t("submitAcceptRequest"),
              color: "success",
            },
          }}
          cancelAction={{
            buttonProps: {
              children: t("cancelAcceptRequest"),
              color: "primary",
            },
          }}
        />
      ),
    },
    {
      icon: <PersonOffIcon />,
      text: t("rejectRequest"),
      content: (
        <ConfirmActionModal
          title={t("modalRejectRequestTitle")}
          message={t("confirmRejectRequest")}
          confirmAction={{
            onAction: () => rejectRequest(),
            buttonProps: {
              children: t("submitRejectRequest"),
              color: "error",
            },
          }}
          cancelAction={{
            buttonProps: {
              children: t("cancelRejectRequest"),
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
        primary={`${user.user_firstname} ${user.user_lastname}`}
        secondary={user.user_email}
        secondaryTypographyProps={{ style: { margin: 0 } }}
      />
    </ListItem>
  )
}

"use client"

import { ConfirmActionModal } from "@/src/shared/components/ConfirmActionModal"
import { SingleUser } from "@entities/user"
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemText from "@mui/material/ListItemText"
import { MenuItem, SettingsMenu } from "@shared/components/SettingsMenu"
import { Avatar, ErrorMessage, LoadingSpinner } from "@shared/components/ui"
import { useTranslations } from "next-intl"
import { fakeUsers } from "../lib/fakeUsers"

export function Members({ companyId }: { companyId: number }) {
  const users = fakeUsers("members", companyId)
  const t = useTranslations("CompanyDashboardPage.members")

  const isLoading = false
  const isError = false

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorMessage />
  if (!users.length) return <p>{t("noMembers")}</p>

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {users.map((user) => (
        <Member key={user.user_id} user={user} />
      ))}
    </List>
  )
}

function Member({ user }: { user: SingleUser }) {
  const t = useTranslations("CompanyDashboardPage.members")

  async function excludeMember() {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Member excluded")
  }

  const menuItems: MenuItem[] = [
    {
      icon: <PersonRemoveIcon />,
      text: t("exclude"),
      content: (
        <ConfirmActionModal
          title={t("modalExcludeTitle")}
          message={t("confirmExclude")}
          confirmAction={{
            onAction: () => excludeMember(),
            buttonProps: {
              children: t("submitExclude"),
              color: "error",
            },
          }}
          cancelAction={{
            buttonProps: {
              children: t("cancelExclude"),
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

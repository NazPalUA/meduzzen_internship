"use client"

import { useDeclineActionMutation } from "@features/action"
import { type CompanyDataUser, useGetCompanyInvitesListQuery } from "@features/company-data"
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
import styles from "./Styles.module.scss"

export function Invites({ companyId }: { companyId: number }) {
  const { data: users, isLoading, isError } = useGetCompanyInvitesListQuery(companyId.toString())
  const t = useTranslations("CompanyPage.invites")

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorMessage />
  if (!users?.length) return <p>{t("noInvites")}</p>

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {users.map((user) => (
        <Invite key={user.user_id} user={user} />
      ))}
    </List>
  )
}

function Invite({ user }: { user: CompanyDataUser }) {
  const t = useTranslations("CompanyPage.invites")

  const [cancelInvite] = useDeclineActionMutation()

  const menuItems: MenuItem[] = [
    {
      icon: <PersonAddDisabledIcon />,
      text: t("cancelInvite"),
      content: (
        <ConfirmActionModal
          title={t("modalCancelInviteTitle")}
          message={t("confirmCancelInvite")}
          confirmAction={{
            onAction: () => cancelInvite(user.action_id.toString()).unwrap(),
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
      />
    </ListItem>
  )
}

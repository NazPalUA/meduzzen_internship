"use client"

import { Action } from "@/src/shared/constants"
import {
  useAddToAdminMutation,
  useLeaveCompanyMutation,
  useRemoveFromAdminMutation,
} from "@features/action"
import { useGetCompanyMembersListQuery, type CompanyDataUser } from "@features/company-data"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"
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

export function Members({
  companyId,
  showAdminOnly,
}: {
  companyId: number
  showAdminOnly: boolean
}) {
  const { data: users, isLoading, isError } = useGetCompanyMembersListQuery(companyId.toString())
  const t = useTranslations("CompanyPage.members")

  const filteredUsers = users?.filter((user) => (showAdminOnly ? user.action === "admin" : true))

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorMessage />
  if (!filteredUsers?.length) return <p>{showAdminOnly ? t("noAdmins") : t("noMembers")}</p>

  return (
    <>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {filteredUsers.map((user) => (
          <Member key={user.user_id} user={user} />
        ))}
      </List>
    </>
  )
}

function Member({ user }: { user: CompanyDataUser }) {
  const t = useTranslations("CompanyPage.members")

  const [excludeMember] = useLeaveCompanyMutation()
  const [addToAdmin] = useAddToAdminMutation()
  const [removeFromAdmin] = useRemoveFromAdminMutation()

  const menuItems: MenuItem[] = [
    {
      icon: <PersonRemoveIcon />,
      text: t("exclude"),
      content: (
        <ConfirmActionModal
          title={t("modalExcludeTitle")}
          message={t("confirmExclude")}
          confirmAction={{
            onAction: () => excludeMember(user.action_id.toString()).unwrap(),
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

    {
      icon: <AdminPanelSettingsIcon />,
      text: user.action !== Action.ADMIN ? t("addToAdmin") : t("removeFromAdmin"),
      content: (
        <ConfirmActionModal
          title={
            user.action !== Action.ADMIN
              ? t("modalAddToAdminTitle")
              : t("modalRemoveFromAdminTitle")
          }
          message={
            user.action !== Action.ADMIN ? t("confirmAddToAdmin") : t("confirmRemoveFromAdmin")
          }
          confirmAction={{
            onAction: () =>
              user.action !== Action.ADMIN
                ? addToAdmin(user.action_id.toString()).unwrap()
                : removeFromAdmin(user.action_id.toString()).unwrap(),
            buttonProps: {
              children:
                user.action !== Action.ADMIN ? t("submitAddToAdmin") : t("submitRemoveFromAdmin"),
              color: "primary",
            },
          }}
          cancelAction={{
            buttonProps: {
              children:
                user.action !== Action.ADMIN ? t("cancelAddToAdmin") : t("cancelRemoveFromAdmin"),
              color: "primary",
            },
          }}
        />
      ),
    },
  ]

  return (
    <ListItem
      secondaryAction={user.action !== Action.OWNER ? <SettingsMenu menuItems={menuItems} /> : null}
    >
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

"use client"

import { useAcceptActionInviteMutation, useDeclineActionMutation } from "@features/action"
import { useGetUserInvitesListQuery, type UserDataCompany } from "@features/user-data"
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
import styles from "./Styles.module.scss"

export function Invites({ user_id }: { user_id: number }) {
  const { data: companies, isLoading, isError } = useGetUserInvitesListQuery(user_id.toString())
  const t = useTranslations("UserPage.invites")

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorMessage />
  if (!companies?.length) return <p>{t("noInvites")}</p>

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {companies.map((company) => (
        <Invite key={company.company_id} company={company} />
      ))}
    </List>
  )
}

function Invite({ company }: { company: UserDataCompany }) {
  const t = useTranslations("UserPage.invites")

  const [acceptInvite] = useAcceptActionInviteMutation()
  const [rejectInvite] = useDeclineActionMutation()

  const menuItems: MenuItem[] = [
    {
      icon: <PersonAddIcon />,
      text: t("acceptInvite"),
      content: (
        <ConfirmActionModal
          title={t("modalAcceptInviteTitle")}
          message={t("confirmAcceptInvite")}
          confirmAction={{
            onAction: () => acceptInvite(company.action_id.toString()).unwrap(),
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
            onAction: () => rejectInvite(company.action_id.toString()).unwrap(),
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
      />
    </ListItem>
  )
}

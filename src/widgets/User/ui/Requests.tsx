"use client"

import { useGetUserRequestsListQuery, type UserDataCompany } from "@features/user-data"
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

export function Requests({ user_id }: { user_id: number }) {
  const { data: companies, isLoading, isError } = useGetUserRequestsListQuery(user_id.toString())
  const t = useTranslations("UserPage.requests")

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorMessage />
  if (!companies?.length) return <p>{t("noRequests")}</p>

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {companies.map((company) => (
        <Request key={company.company_id} company={company} />
      ))}
    </List>
  )
}

function Request({ company }: { company: UserDataCompany }) {
  const t = useTranslations("UserPage.requests")

  async function cancelRequest() {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("request canceled")
  }

  const menuItems: MenuItem[] = [
    {
      icon: <PersonAddDisabledIcon />,
      text: t("cancelRequest"),
      content: (
        <ConfirmActionModal
          title={t("modalCancelRequestTitle")}
          message={t("confirmCancelRequest")}
          confirmAction={{
            onAction: () => cancelRequest(),
            buttonProps: {
              children: t("submitCancelRequest"),
              color: "error",
            },
          }}
          cancelAction={{
            buttonProps: {
              children: t("cancelCancelRequest"),
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

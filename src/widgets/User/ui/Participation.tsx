"use client"

import { useLeaveCompanyMutation } from "@features/action"
import { useGetUserCompaniesListQuery, type UserDataCompany } from "@features/user-data"
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

export function Participation({ user_id }: { user_id: number }) {
  const { data: companies, isLoading, isError } = useGetUserCompaniesListQuery(user_id.toString())
  const t = useTranslations("UserPage.participation")

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorMessage />
  if (!companies?.length) return <p>{t("noCompanies")}</p>

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {companies.map((company) => (
        <Company key={company.company_id} company={company} />
      ))}
    </List>
  )
}

function Company({ company }: { company: UserDataCompany }) {
  const t = useTranslations("UserPage.participation")

  const [leaveCompany] = useLeaveCompanyMutation()

  const menuItems: MenuItem[] = [
    {
      icon: <PersonRemoveIcon />,
      text: t("leave"),
      content: (
        <ConfirmActionModal
          title={t("modalLeaveTitle")}
          message={t("confirmLeave")}
          confirmAction={{
            onAction: () => leaveCompany(company.action_id.toString()).unwrap(),
            buttonProps: {
              children: t("submitLeave"),
              color: "error",
            },
          }}
          cancelAction={{
            buttonProps: {
              children: t("cancelLeave"),
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

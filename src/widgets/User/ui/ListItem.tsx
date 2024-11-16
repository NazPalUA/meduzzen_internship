"use client"

import { type UserDataCompany } from "@features/user-data"
import MuiListItem from "@mui/material/ListItem"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemText from "@mui/material/ListItemText"
import { Link } from "@navigation"
import { MenuItem, SettingsMenu } from "@shared/components/SettingsMenu"
import { Avatar } from "@shared/components/ui"
import { Routes } from "@shared/constants"
import styles from "./Styles.module.scss"

export function ListItem({
  company,
  menuItems,
}: {
  company: UserDataCompany
  menuItems: MenuItem[]
}) {
  return (
    <MuiListItem secondaryAction={<SettingsMenu menuItems={menuItems} />}>
      <ListItemAvatar>
        <Avatar src={company.company_avatar} alt={company.company_name} size="sm" />
      </ListItemAvatar>

      <ListItemText
        primary={
          <Link href={`${Routes.COMPANIES}/${company.company_id}`} className={styles.link}>
            {company.company_name}
          </Link>
        }
        secondary={company.company_title}
      />
    </MuiListItem>
  )
}

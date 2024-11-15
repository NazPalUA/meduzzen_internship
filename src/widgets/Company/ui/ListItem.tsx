import { type CompanyDataUser } from "@features/company-data"
import { Chip } from "@mui/material"
import MuiListItem from "@mui/material/ListItem"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemText from "@mui/material/ListItemText"
import { Link } from "@navigation"
import { MenuItem, SettingsMenu } from "@shared/components/SettingsMenu"
import { Avatar } from "@shared/components/ui"
import { Action, Routes } from "@shared/constants"
import styles from "./Styles.module.scss"

export function ListItem({
  user: { action, user_avatar, user_firstname, user_lastname, user_email, user_id },
  menuItems,
  showSettingsMenu = true,
}: {
  user: CompanyDataUser
  menuItems: MenuItem[]
  showSettingsMenu?: boolean
}) {
  const isOwner = action === Action.OWNER
  const isAdmin = action === Action.ADMIN

  return (
    <MuiListItem secondaryAction={showSettingsMenu ? <SettingsMenu menuItems={menuItems} /> : null}>
      <ListItemAvatar>
        <Avatar src={user_avatar} alt={user_firstname} size="sm" />
      </ListItemAvatar>

      <ListItemText
        primary={
          <Link href={`${Routes.USERS}/${user_id}`} className={styles.link}>
            <span>{`${user_firstname} ${user_lastname}`}</span>
            {(isOwner || isAdmin) && (
              <Chip
                size="small"
                label={action}
                color={isOwner ? "secondary" : "info"}
                className={styles.members_role}
              />
            )}
          </Link>
        }
        secondary={user_email}
      />
    </MuiListItem>
  )
}

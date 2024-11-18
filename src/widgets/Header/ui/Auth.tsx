"use client"

import { useSession } from "@entities/session"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import BusinessIcon from "@mui/icons-material/Business"
import LoginIcon from "@mui/icons-material/Login"
import LogoutIcon from "@mui/icons-material/Logout"
import PersonIcon from "@mui/icons-material/Person"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import { IconButton, Menu, MenuItem } from "@mui/material"
import { Link } from "@navigation"
import { Avatar } from "@shared/components/ui"
import { Routes } from "@shared/constants"
import { useTranslations } from "next-intl"
import { useState } from "react"

const AuthIcon = ({ user, isLoggedIn }: { user: any; isLoggedIn: boolean }) => {
  if (!isLoggedIn) return <LoginIcon />

  if (user?.user_avatar) {
    return <Avatar size="xs" alt={user?.user_firstname} src={user?.user_avatar} />
  }

  return <PersonIcon />
}

export function Auth() {
  const t = useTranslations("Navigation")
  const { isLoggedIn, user } = useSession()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton onClick={handleMenuOpen} color="primary">
        <AuthIcon user={user} isLoggedIn={isLoggedIn} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {isLoggedIn && user
          ? [
              <MenuItem
                component={Link}
                href={Routes.LOGOUT}
                onClick={handleMenuClose}
                key="logout"
              >
                <LogoutIcon sx={{ mr: 1 }} />
                {t("logout")}
              </MenuItem>,
              <MenuItem
                component={Link}
                href={`${Routes.USERS}/${user.user_id}`}
                onClick={handleMenuClose}
                key="myProfile"
              >
                <AccountCircleIcon sx={{ mr: 1 }} />
                {t("myProfile")}
              </MenuItem>,
              <MenuItem
                component={Link}
                href={`${Routes.USERS}/${user.user_id}?tab=companies`}
                onClick={handleMenuClose}
                key="myCompanies"
              >
                <BusinessIcon sx={{ mr: 1 }} />
                {t("myCompanies")}
              </MenuItem>,
            ]
          : [
              <MenuItem component={Link} href={Routes.LOGIN} onClick={handleMenuClose} key="login">
                <LoginIcon sx={{ mr: 1 }} />
                {t("login")}
              </MenuItem>,
              <MenuItem
                component={Link}
                href={Routes.SIGN_UP}
                onClick={handleMenuClose}
                key="signUp"
              >
                <PersonAddIcon sx={{ mr: 1 }} />
                {t("signUp")}
              </MenuItem>,
            ]}
      </Menu>
    </div>
  )
}

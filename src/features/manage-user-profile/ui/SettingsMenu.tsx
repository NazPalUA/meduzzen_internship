"use client"

import { useAppDispatch } from "@/src/shared/store"
import { useSession } from "@entities/session"
import {
  AccountCircle as AccountCircleIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material"
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { MouseEvent, useState } from "react"
import { openModal } from "../store/settingsSlice"

export function SettingsMenu() {
  const t = useTranslations("Settings")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)

  const { user: currentUser } = useSession()
  const params = useParams()
  const profileUserId = params.userId as string

  const dispatch = useAppDispatch()

  if (!currentUser || String(currentUser.user_id) !== profileUserId) {
    return null
  }

  const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => setAnchorEl(null)

  const openDialogWindow = (modalType: "password" | "info" | "avatar" | "delete") => {
    dispatch(openModal(modalType))
    handleMenuClose()
  }

  const menuItems = [
    {
      text: t("updateInfo"),
      icon: <EditIcon fontSize="small" />,
      onClick: () => openDialogWindow("info"),
    },
    {
      text: t("updateAvatar"),
      icon: <AccountCircleIcon fontSize="small" />,
      onClick: () => openDialogWindow("avatar"),
    },
    {
      text: t("changePassword"),
      icon: <LockIcon fontSize="small" />,
      onClick: () => openDialogWindow("password"),
    },
    {
      text: t("deleteAccount"),
      icon: <DeleteIcon fontSize="small" />,
      onClick: () => openDialogWindow("delete"),
    },
  ]

  return (
    <>
      <IconButton onClick={handleMenuClick} size="small">
        <SettingsIcon />
      </IconButton>

      <Menu
        id="settings-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={item.onClick}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.text}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

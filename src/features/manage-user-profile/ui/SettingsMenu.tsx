"use client"

import {
  AccountCircle as AccountCircleIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material"
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material"
import { ModalType, useOverlays } from "@shared/overlays"
import { useTranslations } from "next-intl"
import { MouseEvent, useState } from "react"

export function SettingsMenu() {
  const t = useTranslations("Settings")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)

  const { openModal } = useOverlays()

  const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => setAnchorEl(null)

  const openDialogWindow = (modalType: ModalType) => {
    openModal(modalType)
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

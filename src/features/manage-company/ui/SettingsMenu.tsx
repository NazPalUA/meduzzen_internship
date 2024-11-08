"use client"

import {
  AccountCircle as AccountCircleIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material"
import VisibilityIcon from "@mui/icons-material/Visibility"
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
      onClick: () => openDialogWindow("updateCompanyInfo"),
    },
    {
      text: t("updateAvatar"),
      icon: <AccountCircleIcon fontSize="small" />,
      onClick: () => openDialogWindow("updateCompanyAvatar"),
    },
    {
      text: t("updateVisible"),
      icon: <VisibilityIcon fontSize="small" />,
      onClick: () => openDialogWindow("updateCompanyVisible"),
    },
    {
      text: t("deleteCompany"),
      icon: <DeleteIcon fontSize="small" />,
      onClick: () => openDialogWindow("deleteCompany"),
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
        {menuItems.map((item) => (
          <MenuItem key={item.text} onClick={item.onClick}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.text}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

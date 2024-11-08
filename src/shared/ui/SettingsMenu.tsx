"use client"

import { Settings as SettingsIcon } from "@mui/icons-material"
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem as MuiMenuItem,
} from "@mui/material"
import { ModalType, useOverlays } from "@shared/overlays"
import { useCallback, useState } from "react"

type BaseMenuItem = {
  text: string
  icon: React.ReactNode
}

type ModalMenuItem = BaseMenuItem & {
  modalWindow: ModalType
  onClick?: never
}

type ClickMenuItem = BaseMenuItem & {
  modalWindow?: never
  onClick: () => void
}

export type MenuItem = ModalMenuItem | ClickMenuItem

type SettingsMenuProps = {
  menuItems: MenuItem[]
  icon?: React.ReactNode
}

export function SettingsMenu({ menuItems, icon = <SettingsIcon /> }: SettingsMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)
  const { openModal } = useOverlays()

  const handleItemClick = useCallback(
    (item: MenuItem) => {
      if ("modalWindow" in item && item.modalWindow) {
        openModal(item.modalWindow)
      } else if ("onClick" in item && item.onClick) {
        item.onClick()
      }
      setAnchorEl(null)
    },
    [openModal],
  )

  return (
    <>
      <IconButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        size="small"
        aria-controls={menuOpen ? "settings-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? "true" : undefined}
        aria-label="settings"
      >
        {icon}
      </IconButton>

      <Menu
        id="settings-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={() => setAnchorEl(null)}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        MenuListProps={{
          "aria-labelledby": "settings-button",
        }}
      >
        {menuItems.map((item, index) => (
          <MuiMenuItem key={`${item.text}-${index}`} onClick={() => handleItemClick(item)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </MuiMenuItem>
        ))}
      </Menu>
    </>
  )
}

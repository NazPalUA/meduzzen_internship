"use client"

import { Settings as SettingsIcon } from "@mui/icons-material"
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem as MuiMenuItem,
} from "@mui/material"

import { ModalWindow, useOverlays, type ModalType } from "@shared/overlays/"
import { MouseEvent, ReactNode, useCallback, useState } from "react"

type BaseMenuItem = {
  text: string
  icon: React.ReactNode
}

type ModalMenuItem = BaseMenuItem & {
  modalWindow: ModalType
  content: ReactNode
  modalTitle?: string
  onClick?: never
}

type ClickMenuItem = BaseMenuItem & {
  modalWindow?: never
  onClick: () => void
  content?: never
  modalTitle?: never
}

export type MenuItem = ModalMenuItem | ClickMenuItem

type SettingsMenuProps = {
  menuItems: MenuItem[]
  icon?: React.ReactNode
}

export function SettingsMenu({ menuItems, icon = <SettingsIcon /> }: SettingsMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)

  const openMenu = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const closeMenu = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const { openModal } = useOverlays()

  const handleItemClick = useCallback(
    (item: MenuItem) => {
      if ("modalWindow" in item && item.modalWindow) {
        openModal(item.modalWindow)
      } else if ("onClick" in item && item.onClick) {
        item.onClick()
      }
      closeMenu()
    },
    [closeMenu, openModal],
  )

  return (
    <>
      <IconButton
        onClick={openMenu}
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
        onClose={closeMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        MenuListProps={{
          "aria-labelledby": "settings-button",
        }}
      >
        {menuItems.map((item, index) => (
          <MuiMenuItem
            key={item.modalWindow || `${item.text}-${index}`}
            onClick={() => handleItemClick(item)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </MuiMenuItem>
        ))}
      </Menu>

      {menuItems
        .filter((item) => "modalWindow" in item && item.modalWindow !== undefined)
        .map((item) => (
          <ModalWindow title={item.modalTitle} modal={item.modalWindow} key={item.modalWindow}>
            {item.content}
          </ModalWindow>
        ))}
    </>
  )
}

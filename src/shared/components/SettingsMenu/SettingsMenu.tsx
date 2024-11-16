"use client"

import { Settings as SettingsIcon } from "@mui/icons-material"
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem as MuiMenuItem,
} from "@mui/material"
import { useDialog } from "@shared/hooks"
import { MouseEvent, ReactNode, useCallback, useState } from "react"

export type MenuItem = {
  text: string
  icon: ReactNode
  disabled?: boolean
  content: ReactNode
}

type SettingsMenuProps = {
  menuItems: MenuItem[]
  icon?: ReactNode
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

  const { openDialog } = useDialog()

  const handleItemClick = useCallback(
    (item: MenuItem) => {
      openDialog(item.content)
      closeMenu()
    },
    [closeMenu, openDialog],
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
            key={`${item.text}-${index}`}
            onClick={() => handleItemClick(item)}
            disabled={item.disabled}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </MuiMenuItem>
        ))}
      </Menu>
    </>
  )
}

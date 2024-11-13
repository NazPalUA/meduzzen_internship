"use client"

import Dialog, { DialogProps } from "@mui/material/Dialog"
import { DialogContext } from "@shared/context"
import React, { ReactNode, useState } from "react"

type DialogProviderProps = {
  children: ReactNode
}

export function DialogProvider({ children }: DialogProviderProps) {
  const [dialogBody, setDialogBody] = useState<React.ReactNode>(null)
  const [open, setOpen] = useState(false)
  const [dialogProps, setDialogProps] = useState<Partial<DialogProps>>({})

  const openDialog = (body: React.ReactNode, props: Partial<DialogProps> = {}) => {
    setDialogBody(body)
    setDialogProps(props)
    setOpen(true)
  }

  const closeDialog = () => {
    setOpen(false)
    setDialogBody(null)
    setDialogProps({})
  }

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <Dialog open={open} onClose={closeDialog} maxWidth="sm" fullWidth {...dialogProps}>
        {dialogBody}
      </Dialog>
    </DialogContext.Provider>
  )
}

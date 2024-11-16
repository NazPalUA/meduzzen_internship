"use client"

import { DialogProps } from "@mui/material/Dialog"
import React, { createContext } from "react"

type DialogContextType = {
  openDialog: (body: React.ReactNode, dialogProps?: Partial<DialogProps>) => void
  closeDialog: () => void
}

export const DialogContext = createContext<DialogContextType | undefined>(undefined)

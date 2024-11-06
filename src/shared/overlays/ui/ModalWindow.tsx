"use client"

import { Dialog, DialogContent, DialogTitle } from "@mui/material"
import { ReactNode } from "react"
import { useOverlays } from "../hooks/useOverlays"
import { ModalType } from "../store/overlaysSlice"

type Props = {
  title?: string
  modal: ModalType
  children: ReactNode
}

export function ModalWindow({ title, modal, children }: Props) {
  const { activeModal, closeModal } = useOverlays()

  return (
    <Dialog open={activeModal === modal} onClose={closeModal} maxWidth="sm" fullWidth>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}

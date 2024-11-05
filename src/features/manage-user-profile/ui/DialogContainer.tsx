"use client"

import { useAppDispatch, useAppSelector } from "@/src/shared/store"
import { Dialog, DialogContent, DialogTitle } from "@mui/material"
import { closeModal, selectModalOpen } from "../store/settingsSlice"

type Props = {
  title: string
  modal: "info" | "password" | "avatar" | "delete"
  children: React.ReactNode
}

export function DialogContainer({ title, modal, children }: Props) {
  const dispatch = useAppDispatch()
  const modalOpen = useAppSelector(selectModalOpen)

  return (
    <Dialog
      open={modalOpen === modal}
      onClose={() => dispatch(closeModal())}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}

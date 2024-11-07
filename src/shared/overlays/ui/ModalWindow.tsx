"use client"

import CloseIcon from "@mui/icons-material/Close"
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material"
import clsx from "clsx"
import { ReactNode } from "react"
import { useOverlays } from "../hooks/useOverlays"
import { ModalType } from "../store/overlaysSlice"
import styles from "./Overlays.module.scss"

type Props = {
  title?: string
  modal: ModalType
  children: ReactNode
}

export function ModalWindow({ title, modal, children }: Props) {
  const { activeModal, closeModal } = useOverlays()

  return (
    <Dialog
      open={activeModal === modal}
      onClose={closeModal}
      maxWidth="sm"
      fullWidth
      className={styles["modal-window"]}
    >
      <IconButton aria-label="close" onClick={closeModal} className={styles["modal-window__close"]}>
        <CloseIcon />
      </IconButton>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent
        className={clsx(styles["modal-window__content"], !title && styles["no-title"])}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}

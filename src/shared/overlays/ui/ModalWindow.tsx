"use client"

import CloseIcon from "@mui/icons-material/Close"
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material"
import clsx from "clsx"
import { ReactNode } from "react"
import { useOverlays } from "../hooks/useOverlays"
import { ModalType } from "../store/overlaysSlice"
import styles from "./Overlays.module.scss"

type CommonProps = {
  title?: string
  children: ReactNode
}

type Controls = {
  open: boolean
  onClose: () => void
}

type LocalControlledProps = CommonProps & {
  modal?: never
  controls: Controls
}

type GloballyControlledProps = CommonProps & {
  modal: ModalType
  controls?: never
}

type Props = LocalControlledProps | GloballyControlledProps

export function ModalWindow(props: Props) {
  const { activeModal, closeModal } = useOverlays()

  const isOpen =
    "controls" in props && props.controls ? props.controls.open : activeModal === props.modal

  const handleClose = "controls" in props && props.controls ? props.controls.onClose : closeModal

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      className={styles["modal-window"]}
    >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        className={styles["modal-window__close"]}
      >
        <CloseIcon />
      </IconButton>
      {props.title && <DialogTitle>{props.title}</DialogTitle>}
      <DialogContent
        className={clsx(styles["modal-window__content"], !props.title && styles["no-title"])}
      >
        {props.children}
      </DialogContent>
    </Dialog>
  )
}

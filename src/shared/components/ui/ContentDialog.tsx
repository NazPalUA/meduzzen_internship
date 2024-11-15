import { DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { useDialog } from "@shared/hooks"
import { ReactNode } from "react"
import { CloseIconButton } from "./CloseIconButton"

type Props = {
  children: ReactNode
  title?: string
  actions?: ReactNode
}

export function ContentDialog({ children, title, actions }: Props) {
  const { closeDialog } = useDialog()
  return (
    <>
      <CloseIconButton aria-label="close" onClick={closeDialog} />
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </>
  )
}

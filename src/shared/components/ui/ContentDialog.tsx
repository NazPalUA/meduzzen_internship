import CloseIcon from "@mui/icons-material/Close"
import { DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material"
import { useDialog } from "@shared/hooks"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
  title?: string
  actions?: ReactNode
}

export function ContentDialog({ children, title, actions }: Props) {
  const { closeDialog } = useDialog()
  return (
    <>
      <IconButton
        aria-label="close"
        onClick={closeDialog}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </>
  )
}

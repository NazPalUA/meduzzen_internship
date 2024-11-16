import CloseIcon from "@mui/icons-material/Close"
import { IconButton, IconButtonProps } from "@mui/material"
import clsx from "clsx"
import styles from "./CloseIconButton.module.scss"

type CloseIconButtonProps = IconButtonProps & {
  className?: string
}

export function CloseIconButton({ className, ...props }: CloseIconButtonProps) {
  return (
    <IconButton {...props} className={clsx(styles.closeButton, className)}>
      <CloseIcon />
    </IconButton>
  )
}

import { Button, Modal as MuiModal } from "@mui/material"
import { useTranslations } from "next-intl"
import styles from "./Modal.module.scss"

type Colors = "primary" | "warning" | "error" | "info" | "success" | "inherit" | "secondary"

type Props = {
  open: boolean
  onClose: () => void
  onSubmit?: () => void
  submitButtonText?: string
  closeButtonText?: string
  closeButtonColor?: Colors
  submitButtonColor?: Colors
  title: React.ReactNode
  children?: React.ReactNode
}

export function Modal({
  open,
  onClose,
  onSubmit,
  title,
  children,
  submitButtonText,
  closeButtonText,
  submitButtonColor,
  closeButtonColor,
}: Props) {
  const t = useTranslations("Modal")
  return (
    <MuiModal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className={styles.container}>
        <strong id="modal-title">{title}</strong>
        <div id="modal-description" className={styles.content}>
          {children}
        </div>
        <div className={styles.buttons}>
          {onSubmit && (
            <Button
              onClick={onSubmit}
              variant="contained"
              color={submitButtonColor || "success"}
              className={styles.submitButton}
            >
              {submitButtonText || t("submitButton")}
            </Button>
          )}
          <Button
            onClick={onClose}
            variant="contained"
            color={closeButtonColor || "primary"}
            className={styles.closeButton}
          >
            {closeButtonText || t("closeButton")}
          </Button>
        </div>
      </div>
    </MuiModal>
  )
}

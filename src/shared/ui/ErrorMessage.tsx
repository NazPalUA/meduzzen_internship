"use client"

import { Alert, Button } from "@mui/material"
import { useTranslations } from "next-intl"
import styles from "./ErrorMessage.module.scss"

interface ErrorMessageProps {
  message?: string
  retry?: () => void
}

export function ErrorMessage({ message, retry }: ErrorMessageProps) {
  const t = useTranslations("Common")

  return (
    <div className={styles.container}>
      <Alert severity="error" className={styles.alert}>
        {message || t("defaultErrorMessage")}
      </Alert>
      {retry && (
        <Button variant="contained" onClick={retry} className={styles.retryButton}>
          {t("retryButton")}
        </Button>
      )}
    </div>
  )
}

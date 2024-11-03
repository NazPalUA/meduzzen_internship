"use client"

import { Alert } from "@mui/material"
import { useTranslations } from "next-intl"
import styles from "./NoData.module.scss"

interface NoDataProps {
  message?: string
}

export function NoData({ message }: NoDataProps) {
  const t = useTranslations("Common")

  return (
    <div className={styles.container}>
      <Alert severity="warning" className={styles.alert}>
        {message || t("defaultNoData")}
      </Alert>
    </div>
  )
}

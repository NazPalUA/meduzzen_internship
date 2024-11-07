"use client"

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import clsx from "clsx"
import { useTranslations } from "next-intl"
import styles from "./Form.module.scss"

export type ErrorMessageProps = {
  text?: string | null
  className?: string
}

export function ErrorMessage({ text, className }: ErrorMessageProps) {
  const t = useTranslations("Error")

  if (!text) {
    return null
  }

  return (
    <div className={clsx(styles.message, className)}>
      <ErrorOutlineIcon />
      <span>{text || t("default")}</span>
    </div>
  )
}

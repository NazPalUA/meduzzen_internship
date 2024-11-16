"use client"

import { Alert, Button, CircularProgress } from "@mui/material"
import { useTranslations } from "next-intl"
import { useCheckHealthQuery } from "../store/healthApiSlice"
import styles from "./ApiHealthCheck.module.scss"

export const ApiHealthCheck = () => {
  const { isLoading, error, refetch, isFetching, isSuccess } = useCheckHealthQuery()
  const t = useTranslations("ApiHealthCheck")
  return (
    <div className={styles.container}>
      <Button variant="contained" onClick={() => refetch()} disabled={isLoading}>
        {t("checkButton")}
      </Button>

      <div className={styles.status}>
        {isFetching && <CircularProgress />}

        {error && !isFetching && (
          <Alert severity="error">
            {error instanceof Error ? error.message : t("errorMessage")}
          </Alert>
        )}

        {isSuccess && !isFetching && <Alert severity="success">{t("successMessage")}</Alert>}
      </div>
    </div>
  )
}

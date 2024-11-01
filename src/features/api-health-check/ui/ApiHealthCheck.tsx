"use client"

import { Alert, Button, CircularProgress } from "@mui/material"
import { useCheckHealthQuery } from "../store/healthApiSlice"
import styles from "./ApiHealthCheck.module.scss"

export const ApiHealthCheck = () => {
  const { isLoading, error, refetch, isFetching, isSuccess } = useCheckHealthQuery()

  return (
    <div className={styles.container}>
      <Button variant="contained" onClick={() => refetch()} disabled={isLoading}>
        Check API Health
      </Button>

      <div className={styles.status}>
        {isFetching && <CircularProgress />}

        {error && !isFetching && (
          <Alert severity="error">{error instanceof Error ? error.message : "Unknown error"}</Alert>
        )}

        {isSuccess && !isFetching && <Alert severity="success">API is healthy!</Alert>}
      </div>
    </div>
  )
}

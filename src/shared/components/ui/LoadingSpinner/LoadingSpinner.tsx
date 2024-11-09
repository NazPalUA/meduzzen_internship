"use client"

import { CircularProgress } from "@mui/material"
import styles from "./LoadingSpinner.module.scss"

export const LoadingSpinner = () => (
  <div className={styles.container}>
    <CircularProgress />
  </div>
)

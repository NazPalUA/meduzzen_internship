"use client"

import { useAppDispatch, useAppSelector } from "@/src/shared/store"
import { Alert, Snackbar } from "@mui/material"
import { closeSnackbar, selectSnackbar } from "../store/settingsSlice"

export function Feedback() {
  const dispatch = useAppDispatch()
  const snackbar = useAppSelector(selectSnackbar)

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={5000}
      onClose={() => dispatch(closeSnackbar())}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={() => dispatch(closeSnackbar())}
        severity={snackbar.error ? "error" : "success"}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  )
}

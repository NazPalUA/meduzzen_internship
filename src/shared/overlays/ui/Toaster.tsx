"use client"

import { Alert, Snackbar } from "@mui/material"
import { useOverlays } from "../hooks/useOverlays"

export function Toaster() {
  const { closeToast, toast } = useOverlays()

  return (
    <Snackbar
      open={toast.isOpen}
      autoHideDuration={5000}
      onClose={closeToast}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert onClose={closeToast} severity={toast.variant} variant="filled" sx={{ width: "100%" }}>
        {toast.message}
      </Alert>
    </Snackbar>
  )
}

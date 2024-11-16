"use client"

import { Alert, Snackbar } from "@mui/material"
import { useToaster } from "@shared/hooks"

export function Toaster() {
  const { closeToast, toast } = useToaster()

  return (
    <Snackbar
      open={toast.isOpen}
      autoHideDuration={5000}
      onClose={closeToast}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert onClose={closeToast} severity={toast.variant} variant="filled">
        {toast.message}
      </Alert>
    </Snackbar>
  )
}

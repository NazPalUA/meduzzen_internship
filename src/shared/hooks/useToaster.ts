"use client"

import { useAppDispatch, useAppSelector } from "@shared/store/hooks"
import type { ToastVariant } from "../lib/toasterSlice"
import { closeToast, selectToast, showToast } from "../lib/toasterSlice"

export const useToaster = () => {
  const dispatch = useAppDispatch()

  const handleShowToast = (message: string, variant: ToastVariant) => {
    dispatch(showToast({ message, variant }))
  }

  const handleCloseToast = () => {
    dispatch(closeToast())
  }

  const toastSuccess = (message?: string) => {
    dispatch(showToast({ message: message ?? "Success", variant: "success" }))
  }

  const toastError = (message?: string) => {
    dispatch(showToast({ message: message ?? "Error occurred", variant: "error" }))
  }

  const toast = useAppSelector(selectToast)

  return {
    showToast: handleShowToast,
    closeToast: handleCloseToast,
    toastSuccess,
    toastError,
    toast,
  }
}

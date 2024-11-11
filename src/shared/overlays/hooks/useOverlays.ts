"use client"

import { useAppDispatch, useAppSelector } from "@shared/store/hooks"
import type { ToastVariant } from "../store/overlaysSlice"
import {
  closeModal,
  closeToast,
  ModalType,
  openModal,
  selectActiveModal,
  selectToast,
  showToast,
} from "../store/overlaysSlice"

export const useOverlays = () => {
  const dispatch = useAppDispatch()

  const handleOpenModal = (modal: ModalType) => {
    dispatch(openModal(modal))
  }

  const handleCloseModal = () => {
    dispatch(closeModal())
  }

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

  const activeModal = useAppSelector(selectActiveModal)
  const toast = useAppSelector(selectToast)

  return {
    openModal: handleOpenModal,
    closeModal: handleCloseModal,
    showToast: handleShowToast,
    closeToast: handleCloseToast,
    toastSuccess,
    toastError,
    activeModal,
    toast,
  }
}

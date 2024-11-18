"use client"

import {
  Button,
  ButtonProps,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material"
import { CloseIconButton } from "@shared/components/ui"
import { useDialog, useToaster } from "@shared/hooks"
import { useTranslations } from "next-intl"
import { ReactNode, useState } from "react"

type WithMessage = {
  children?: never
  message?: string
}

type WithChildren = {
  children: ReactNode
  message?: never
}

type ActionConfig = {
  onAction?: () => Promise<any>
  successMessage?: string
  errorMessage?: string
  buttonProps?: ButtonProps
  onSuccess?: () => void
  onError?: (error: any) => void
}

export type ConfirmActionModalProps = (WithMessage | WithChildren) & {
  title?: string
  closeIcon?: boolean
  confirmAction: ActionConfig & {
    onAction: () => Promise<any>
  }
  cancelAction?: ActionConfig
}

export function ConfirmActionModal({
  children,
  message,
  title,
  closeIcon = false,
  confirmAction,
  cancelAction,
}: ConfirmActionModalProps) {
  const { closeDialog } = useDialog()
  const { toastSuccess, toastError } = useToaster()
  const [loadingConfirm, setLoadingConfirm] = useState(false)
  const [loadingCancel, setLoadingCancel] = useState(false)

  const t = useTranslations("ConfirmActionModal")

  const handleConfirm = async () => {
    try {
      setLoadingConfirm(true)
      await confirmAction.onAction()
      toastSuccess(confirmAction.successMessage || t("successMessage"))
      if (confirmAction.onSuccess) confirmAction.onSuccess()
      closeDialog()
    } catch (error: unknown) {
      toastError(confirmAction.errorMessage || t("errorMessage"))
      if (confirmAction.onError) confirmAction.onError(error)
    } finally {
      setLoadingConfirm(false)
    }
  }

  const handleCancel = async () => {
    if (!cancelAction?.onAction) {
      closeDialog()
      return
    }

    try {
      setLoadingCancel(true)
      await cancelAction.onAction()
      toastSuccess(cancelAction.successMessage || t("cancelSuccessMessage"))
      if (cancelAction.onSuccess) cancelAction.onSuccess()
      closeDialog()
    } catch (error: unknown) {
      toastError(cancelAction.errorMessage || t("errorMessage"))
      if (cancelAction.onError) cancelAction.onError(error)
    } finally {
      setLoadingCancel(false)
    }
  }

  const defaultConfirmButtonProps: ButtonProps = {
    children: t("confirm"),
    color: "primary",
    variant: "contained",
  }

  const defaultCancelButtonProps: ButtonProps = {
    children: t("cancel"),
    color: "secondary",
    variant: "outlined",
  }

  const confirmButtonProps: ButtonProps = {
    ...defaultConfirmButtonProps,
    ...confirmAction.buttonProps,
    disabled: loadingConfirm || loadingCancel || confirmAction.buttonProps?.disabled,
    startIcon:
      loadingConfirm && !confirmAction.buttonProps?.startIcon ? (
        <CircularProgress size={20} />
      ) : (
        confirmAction.buttonProps?.startIcon
      ),
    onClick: handleConfirm,
  }

  const cancelButtonProps: ButtonProps | null = cancelAction
    ? {
        ...defaultCancelButtonProps,
        ...cancelAction.buttonProps,
        disabled: loadingCancel || loadingConfirm || cancelAction.buttonProps?.disabled,
        startIcon:
          loadingCancel && !cancelAction.buttonProps?.startIcon ? (
            <CircularProgress size={20} />
          ) : (
            cancelAction.buttonProps?.startIcon
          ),
        onClick: handleCancel,
      }
    : null

  return (
    <>
      {closeIcon && (
        <CloseIconButton
          aria-label={t("close")}
          onClick={closeDialog}
          disabled={loadingConfirm || loadingCancel}
        />
      )}
      <DialogTitle>{title || t("title")}</DialogTitle>
      <DialogContent>{children || message || t("message")}</DialogContent>
      <DialogActions>
        {cancelButtonProps && <Button {...cancelButtonProps} />}
        <Button {...confirmButtonProps} />
      </DialogActions>
    </>
  )
}

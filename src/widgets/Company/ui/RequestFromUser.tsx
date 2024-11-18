"use client"

import { useCreateActionFromUserMutation, useDeclineActionMutation } from "@features/action"
import { useGetUserRequestsListQuery } from "@features/user-data"
import { Close as CloseIcon, Telegram as TelegramIcon } from "@mui/icons-material"
import { Button, CircularProgress } from "@mui/material"
import { useToaster } from "@shared/hooks"
import { useTranslations } from "next-intl"
import { getCurrentUserRequest } from "../lib/utils/getCurrentUserRequest"

export function RequestFromUser({ companyId, userId }: { companyId: number; userId: number }) {
  const [sendRequest, { isLoading: isSending }] = useCreateActionFromUserMutation()
  const [cancelRequest, { isLoading: isCancelling }] = useDeclineActionMutation()
  const {
    data: userRequests,
    isLoading: isDataLoading,
    isFetching: isDataFetching,
    isError,
  } = useGetUserRequestsListQuery(userId)

  const { toastError, toastSuccess } = useToaster()
  const t = useTranslations("CompanyPage.request")

  const currentRequest = userRequests ? getCurrentUserRequest(companyId, userRequests) : null

  const icon = currentRequest ? <CloseIcon /> : <TelegramIcon />

  async function handleSendRequest() {
    try {
      await sendRequest(companyId).unwrap()
      toastSuccess(t("send.success"))
    } catch {
      toastError(t("send.error"))
    }
  }

  async function handleCancelRequest() {
    try {
      await cancelRequest(currentRequest!.action_id).unwrap()
      toastSuccess(t("cancel.success"))
    } catch {
      toastError(t("cancel.error"))
    }
  }

  if (isDataLoading) return <CircularProgress />
  if (isError) return null

  return (
    <Button
      onClick={currentRequest ? handleCancelRequest : handleSendRequest}
      variant={currentRequest ? "outlined" : "contained"}
      disabled={isDataLoading || isSending || isCancelling || isDataFetching}
      color={currentRequest ? "error" : "success"}
      size="small"
      startIcon={isSending || isCancelling ? <CircularProgress size={16} /> : icon}
    >
      {currentRequest ? t("cancel.label") : t("send.label")}
    </Button>
  )
}

"use client"

import { useCreateActionFromUserMutation, useDeclineActionMutation } from "@features/action"
import { useGetUserRequestsListQuery } from "@features/user-data"
import { Close as CloseIcon, Telegram as TelegramIcon } from "@mui/icons-material"
import { Button, CircularProgress } from "@mui/material"
import { useToaster } from "@shared/hooks"
import { useTranslations } from "next-intl"
import { getCurrentUserRequest } from "../utils/getCurrentUserRequest"

export function RequestFromUser({ companyId, userId }: { companyId: number; userId: number }) {
  const [sendRequest, { isLoading: isSending }] = useCreateActionFromUserMutation()
  const [cancelRequest, { isLoading: isCancelling }] = useDeclineActionMutation()
  const {
    data: userRequests,
    isLoading: isDataLoading,
    isFetching: isDataFetching,
    isError,
  } = useGetUserRequestsListQuery(userId.toString())

  const { toastError, toastSuccess } = useToaster()
  const t = useTranslations("CompanyPage.request")

  const currentRequest = getCurrentUserRequest(companyId, userRequests)

  const icon = currentRequest ? <CloseIcon /> : <TelegramIcon />

  async function handleSendRequest() {
    try {
      await sendRequest(companyId.toString()).unwrap()
      toastSuccess(t("send.success"))
    } catch (error) {
      console.error(error)
      toastError(t("send.error"))
    }
  }

  async function handleCancelRequest() {
    if (currentRequest) {
      try {
        await cancelRequest(currentRequest.action_id.toString()).unwrap()
        toastSuccess(t("cancel.success"))
      } catch (error) {
        console.error(error)
        toastError(t("cancel.error"))
      }
    } else return
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

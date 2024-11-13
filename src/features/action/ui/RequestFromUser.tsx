"use client"

import { Button } from "@mui/material"
import { useToaster } from "@shared/hooks"
import { useTranslations } from "next-intl"
import { useCreateActionFromUserMutation } from "../store/actionApiSlice"

export function RequestFromUser({ companyId }: { companyId: string | number }) {
  const [sendRequest] = useCreateActionFromUserMutation()

  const { toastError, toastSuccess } = useToaster()
  const t = useTranslations("CompanyPage")

  async function handleSendRequest() {
    try {
      await sendRequest(companyId.toString()).unwrap()
      toastSuccess()
    } catch (error) {
      console.error(error)
      toastError()
    }
  }

  return (
    <Button onClick={handleSendRequest} variant="outlined" color="primary" size="small">
      {t("sendRequest")}
    </Button>
  )
}

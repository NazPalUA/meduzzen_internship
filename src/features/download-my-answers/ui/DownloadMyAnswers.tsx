"use client"

import { Download } from "@mui/icons-material"
import { Button, CircularProgress } from "@mui/material"
import { ErrorMessage } from "@shared/components/ui"
import { transformCsvToJSONandDownload } from "@shared/utils"
import { useTranslations } from "next-intl"
import { useCallback } from "react"
import { useLazyGetLastAnswersCsvForUserQuery } from "../api/getLastAnswersCsvForUser"

export function DownloadMyAnswers({ userId }: { userId: number }) {
  const t = useTranslations("UserPage.quizzes")
  const [trigger, { isLoading, isError }] = useLazyGetLastAnswersCsvForUserQuery()

  const handleDownload = useCallback(async () => {
    const csvData = await trigger({ userId }).unwrap()
    if (!csvData) return

    const filename = `user_${userId}_answers.json`
    transformCsvToJSONandDownload(csvData, filename)
  }, [trigger, userId])

  return (
    <div>
      <Button
        onClick={handleDownload}
        disabled={isLoading}
        startIcon={<Download />}
        endIcon={isLoading ? <CircularProgress size={16} /> : undefined}
      >
        {t("downloadLastAnswers")}
      </Button>
      {isError && <ErrorMessage message={t("downloadError")} />}
    </div>
  )
}

"use client"

import { Download } from "@mui/icons-material"
import { Button, CircularProgress } from "@mui/material"
import { ErrorMessage } from "@shared/components/ui"
import { transformCsvToJSONandDownload } from "@shared/utils"
import { useTranslations } from "next-intl"
import { useCallback } from "react"
import { useLazyGetLastAnswersCsvForQuizInCompanyQuery } from "../api/getLastAnswersCsvForQuizInCompany"

export function DownloadQuizAnswers({ companyId, quizId }: { companyId: number; quizId: number }) {
  const t = useTranslations("CompanyPage.quizzes")
  const [trigger, { isLoading, isError }] = useLazyGetLastAnswersCsvForQuizInCompanyQuery()

  const handleDownload = useCallback(async () => {
    const csvData = await trigger({ companyId, quizId }).unwrap()
    if (!csvData) return

    const filename = `company_${companyId}_quiz_${quizId}_answers.json`
    transformCsvToJSONandDownload(csvData, filename)
  }, [trigger, companyId, quizId])

  return (
    <div>
      <Button
        onClick={handleDownload}
        size="small"
        disabled={isLoading}
        aria-label={t("downloadLastAnswers")}
        endIcon={isLoading ? <CircularProgress size={16} /> : undefined}
      >
        <Download />
      </Button>
      {isError && <ErrorMessage message={t("downloadError")} />}
    </div>
  )
}

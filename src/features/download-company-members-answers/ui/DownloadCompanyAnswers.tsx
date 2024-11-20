"use client"

import { Download } from "@mui/icons-material"
import { Button, CircularProgress } from "@mui/material"
import { ErrorMessage } from "@shared/components/ui"
import { transformCsvToJSONandDownload } from "@shared/utils"
import { useTranslations } from "next-intl"
import { useCallback } from "react"
import { useLazyGetLastAnswersCsvForCompanyQuery } from "../api/getLastAnswersCsvForCompanyMember"

export function DownloadCompanyAnswers({ companyId }: { companyId: number }) {
  const t = useTranslations("CompanyPage.quizzes")
  const [trigger, { isLoading, isError }] = useLazyGetLastAnswersCsvForCompanyQuery()

  const handleDownload = useCallback(async () => {
    const csvData = await trigger({ companyId }).unwrap()
    if (!csvData) return

    const filename = `company_${companyId}_answers.json`
    transformCsvToJSONandDownload(csvData, filename)
  }, [trigger, companyId])

  return (
    <div>
      <Button
        onClick={handleDownload}
        variant="outlined"
        size="small"
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

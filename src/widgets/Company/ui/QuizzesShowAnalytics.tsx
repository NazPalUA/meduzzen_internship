"use client "

import { CompanyAnalyticsAllMembers } from "@features/company-analytics-all-members"
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined"
import { Button } from "@mui/material"
import { ContentDialog } from "@shared/components/ui"
import { useDialog } from "@shared/hooks"
import { useTranslations } from "next-intl"

export function QuizzesShowAnalytics({ companyId }: { companyId: number }) {
  const t = useTranslations("CompanyPage.quizzes")

  const { openDialog } = useDialog()

  const createQuizDialog = (
    <ContentDialog>
      <CompanyAnalyticsAllMembers companyId={companyId} />
    </ContentDialog>
  )

  return (
    <Button
      size="small"
      variant="outlined"
      onClick={() => openDialog(createQuizDialog, { maxWidth: "lg" })}
      startIcon={<QueryStatsOutlinedIcon />}
    >
      {t("showAnalytics")}
    </Button>
  )
}

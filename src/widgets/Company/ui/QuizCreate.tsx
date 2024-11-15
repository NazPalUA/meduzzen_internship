"use client "

import { ContentDialog } from "@/src/shared/components/ui"
import { CreateQuizForm } from "@entities/quiz"
import { Quiz as QuizIcon } from "@mui/icons-material"
import { Button } from "@mui/material"
import { useDialog } from "@shared/hooks"
import { useTranslations } from "next-intl"

export function QuizCreate({ companyId }: { companyId: number }) {
  const t = useTranslations("CompanyPage.quizzes")

  const { openDialog } = useDialog()

  const createQuizDialog = (
    <ContentDialog>
      <CreateQuizForm companyId={companyId} />
    </ContentDialog>
  )

  return (
    <Button
      size="small"
      variant="outlined"
      onClick={() => openDialog(createQuizDialog, { fullScreen: true })}
      startIcon={<QuizIcon />}
    >
      {t("create")}
    </Button>
  )
}

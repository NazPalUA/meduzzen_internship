"use client "

import { CreateQuizForm } from "@entities/quiz"
import { Quiz as QuizIcon } from "@mui/icons-material"
import CloseIcon from "@mui/icons-material/Close"
import { Button, DialogContent, IconButton } from "@mui/material"
import { useDialog } from "@shared/hooks"
import { useTranslations } from "next-intl"

export function QuizCreate({ companyId }: { companyId: number }) {
  const t = useTranslations("CompanyPage.quizzes")

  const { openDialog, closeDialog } = useDialog()

  const createQuizDialog = (
    <>
      <IconButton
        aria-label="close"
        onClick={closeDialog}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <CreateQuizForm companyId={companyId} />
      </DialogContent>
    </>
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

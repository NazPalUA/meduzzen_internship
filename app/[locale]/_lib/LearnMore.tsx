// Use as example of how to use the Dialog Window

"use client"

import { Button } from "@mui/material"
import { ContentDialog } from "@shared/components/ui"
import { useDialog } from "@shared/hooks"
import { useTranslations } from "next-intl"

export default function LearnMore() {
  const t = useTranslations("HomePage")

  const { openDialog } = useDialog()

  return (
    <Button variant="contained" onClick={() => openDialog(<LearnMoreDialog />)}>
      {t("learnMoreButton")}
    </Button>
  )
}

function LearnMoreDialog() {
  const t = useTranslations("HomePage")
  const { closeDialog } = useDialog()

  return (
    <ContentDialog
      title={t("learnMoreTitle")}
      actions={
        <Button variant="contained" onClick={closeDialog}>
          {t("closeButton")}
        </Button>
      }
    >
      <p>{t("learnMoreDescription")}</p>
    </ContentDialog>
  )
}

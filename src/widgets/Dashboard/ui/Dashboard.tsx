"use client"

import { useSession } from "@entities/session"
import { Button } from "@mui/material"
import { ContentDialog } from "@shared/components/ui"
import { useDialog } from "@shared/hooks"
import { useTranslations } from "next-intl"
import { CreateCompanyForm } from "./CreateCompanyForm"

export function Dashboard() {
  const t = useTranslations("CreateCompany")
  const { user: currentUser } = useSession()
  const { openDialog } = useDialog()

  if (!currentUser) {
    return null
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          openDialog(
            <ContentDialog title={t("modal.title")}>
              <CreateCompanyForm />
            </ContentDialog>,
          )
        }
      >
        {t("modal.openButton")}
      </Button>
    </div>
  )
}

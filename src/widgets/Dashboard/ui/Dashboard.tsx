"use client"

import { useSession } from "@entities/session"
import { Button } from "@mui/material"
import { ContentDialog } from "@shared/components/ui"
import { useDialog } from "@shared/hooks"
import { useTranslations } from "next-intl"
import { CreateCompanyForm } from "./CreateCompanyForm"
import { UserInvites } from "./UserInvites"
import { UserRequests } from "./UserRequests"

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
      <div style={{ display: "flex", gap: "1rem" }}>
        <UserInvites user={currentUser} />
        <UserRequests user={currentUser} />
      </div>
    </div>
  )
}

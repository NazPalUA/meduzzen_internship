"use client"

import { useSession } from "@/src/entities/session"
import { ModalWindow, useOverlays } from "@/src/shared/overlays"
import { Button } from "@mui/material"
import { useTranslations } from "next-intl"
import { CreateCompanyForm } from "./CreateCompanyForm"

export function Dashboard() {
  const t = useTranslations("CreateCompany")
  const { user: currentUser } = useSession()
  const { openModal } = useOverlays()

  if (!currentUser) {
    return null
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => openModal("createCompany")}>
        {t("modal.openButton")}
      </Button>
      <ModalWindow title={t("modal.title")} modal="createCompany">
        <CreateCompanyForm />
      </ModalWindow>
    </div>
  )
}

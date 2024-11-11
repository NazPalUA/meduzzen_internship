"use client"

import { useSession } from "@entities/session"
import { Button } from "@mui/material"
import { ModalWindow, useOverlays } from "@shared/overlays"
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

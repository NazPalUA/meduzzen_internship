// Use as example of how to use the ModalWindow component

"use client"

import { Button } from "@mui/material"
import { ModalWindow, useOverlays } from "@shared/overlays"
import { useTranslations } from "next-intl"

export default function LearnMore() {
  const t = useTranslations("HomePage")

  const { openModal, closeModal } = useOverlays()

  return (
    <>
      <Button variant="contained" onClick={() => openModal("test")}>
        {t("learnMoreButton")}
      </Button>

      <ModalWindow title={t("learnMoreTitle")} modal="test">
        <p>{t("learnMoreDescription")}</p>
        <Button variant="contained" onClick={closeModal}>
          {t("closeButton")}
        </Button>
      </ModalWindow>
    </>
  )
}

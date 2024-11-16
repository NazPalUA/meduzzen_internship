"use client"

import { CreateCompanyForm } from "@entities/company"
import { useSession } from "@entities/session"
import DomainAddOutlinedIcon from "@mui/icons-material/DomainAddOutlined"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import { ContentDialog } from "@shared/components/ui"
import { useDialog } from "@shared/hooks"
import { useTranslations } from "next-intl"

export function CreateCompany() {
  const t = useTranslations("CreateCompany")
  const { user: currentUser } = useSession()
  const { openDialog } = useDialog()

  return (
    <Tooltip title={<p>{currentUser ? t("modal.openButton") : t("modal.disabledButton")}</p>}>
      <span>
        <IconButton
          disabled={!currentUser}
          onClick={() =>
            openDialog(
              <ContentDialog title={t("modal.title")}>
                <CreateCompanyForm />
              </ContentDialog>,
            )
          }
        >
          <DomainAddOutlinedIcon fontSize="medium" color="primary" />
        </IconButton>
      </span>
    </Tooltip>
  )
}

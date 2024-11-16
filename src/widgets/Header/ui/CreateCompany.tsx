"use client"

import { CreateCompanyForm } from "@entities/company"
import { useSession } from "@entities/session"
import DomainAddOutlinedIcon from "@mui/icons-material/DomainAddOutlined"
import Badge from "@mui/material/Badge"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import { ContentDialog } from "@shared/components/ui"
import { useDialog } from "@shared/hooks"
import { useTranslations } from "next-intl"

export function CreateCompany() {
  const t = useTranslations("CreateCompany")
  const { user: currentUser } = useSession()
  const { openDialog } = useDialog()

  if (!currentUser) {
    return null
  }

  return (
    <Tooltip title={<p>{t("modal.openButton")}</p>}>
      <Badge
        variant="dot"
        color="secondary"
        overlap="circular"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <IconButton
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
      </Badge>
    </Tooltip>
  )
}

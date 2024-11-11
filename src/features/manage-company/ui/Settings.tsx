"use client"

import { useGetCompanyByIdQuery } from "@entities/company"
import { useSession } from "@entities/session"
import {
  AccountCircle as AccountCircleIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material"
import { SettingsMenu, type MenuItem } from "@shared/components/SettingsMenu"
import { ContentDialog } from "@shared/components/ui"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { DeleteForm } from "./DeleteForm"
import { UpdateAvatarForm } from "./UpdateAvatarForm"
import { UpdateInfoForm } from "./UpdateInfoForm"
import { UpdateVisibleForm } from "./UpdateVisibleForm"

export function Settings() {
  const t = useTranslations("Settings")
  const { user: currentUser } = useSession()
  const params = useParams()
  const companyId = params.companyId as string

  const { data: companyData } = useGetCompanyByIdQuery(companyId)

  if (!currentUser || !companyData || currentUser.user_id !== companyData.company_owner.user_id) {
    return null
  }

  const menuItems: MenuItem[] = [
    {
      text: t("updateInfo"),
      icon: <EditIcon fontSize="small" />,
      content: (
        <ContentDialog title={t("updateInfo")}>
          <UpdateInfoForm company={companyData} />
        </ContentDialog>
      ),
    },
    {
      text: t("updateAvatar"),
      icon: <AccountCircleIcon fontSize="small" />,
      content: (
        <ContentDialog title={t("updateAvatar")}>
          <UpdateAvatarForm company={companyData} />
        </ContentDialog>
      ),
    },
    {
      text: t("updateVisible"),
      icon: <VisibilityIcon fontSize="small" />,
      content: (
        <ContentDialog title={t("updateVisible")}>
          <UpdateVisibleForm company={companyData} />
        </ContentDialog>
      ),
    },
    {
      text: t("deleteCompany"),
      icon: <DeleteIcon fontSize="small" />,
      content: (
        <ContentDialog title={t("deleteCompany")}>
          <DeleteForm company={companyData} />
        </ContentDialog>
      ),
    },
  ]

  return (
    <div>
      <SettingsMenu menuItems={menuItems} />
    </div>
  )
}

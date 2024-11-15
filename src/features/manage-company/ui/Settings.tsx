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
import { DeleteModal } from "./DeleteModal"
import { UpdateAvatarForm } from "./UpdateAvatarForm"
import { UpdateInfoForm } from "./UpdateInfoForm"
import { UpdateVisibleForm } from "./UpdateVisibleForm"

export function Settings() {
  const t = useTranslations("Settings")
  const { user: currentUser } = useSession()
  const params = useParams()
  const companyId = Number(params.companyId)

  const { data: companyData } = useGetCompanyByIdQuery(companyId)

  if (!currentUser || !companyData || currentUser.user_id !== companyData.company_owner.user_id) {
    return null
  }

  const menuItems: MenuItem[] = [
    {
      text: t("updateInfo"),
      icon: <EditIcon fontSize="small" />,
      content: (
        <ContentDialog>
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
        <ContentDialog>
          <UpdateVisibleForm company={companyData} />
        </ContentDialog>
      ),
    },
    {
      text: t("deleteCompany"),
      icon: <DeleteIcon fontSize="small" />,
      content: <DeleteModal company={companyData} />,
    },
  ]

  return <SettingsMenu menuItems={menuItems} />
}

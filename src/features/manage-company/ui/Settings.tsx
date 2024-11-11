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
      modalWindow: "updateCompanyInfo",
      modalTitle: t("updateInfo"),
      content: <UpdateInfoForm company={companyData} />,
    },
    {
      text: t("updateAvatar"),
      icon: <AccountCircleIcon fontSize="small" />,
      modalWindow: "updateCompanyAvatar",
      modalTitle: t("updateAvatar"),
      content: <UpdateAvatarForm company={companyData} />,
    },
    {
      text: t("updateVisible"),
      icon: <VisibilityIcon fontSize="small" />,
      modalWindow: "updateCompanyVisible",
      modalTitle: t("updateVisible"),
      content: <UpdateVisibleForm company={companyData} />,
    },
    {
      text: t("deleteCompany"),
      icon: <DeleteIcon fontSize="small" />,
      modalWindow: "deleteCompany",
      modalTitle: t("deleteCompany"),
      content: <DeleteForm company={companyData} />,
    },
  ]

  return (
    <div>
      <SettingsMenu menuItems={menuItems} />
    </div>
  )
}

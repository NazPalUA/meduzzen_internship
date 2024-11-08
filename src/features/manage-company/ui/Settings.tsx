"use client"

import { useGetCompanyByIdQuery } from "@/src/entities/company"
import { useSession } from "@entities/session"
import {
  AccountCircle as AccountCircleIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { ModalType } from "@shared/overlays"
import { ModalWindow } from "@shared/overlays/ui/ModalWindow"
import { SettingsMenu, type MenuItem } from "@shared/ui/SettingsMenu"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { ReactNode } from "react"
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

  const dialogWindows: { title?: string; modal: ModalType; component: ReactNode }[] = [
    {
      modal: "updateCompanyInfo",
      component: <UpdateInfoForm company={companyData} />,
    },
    {
      title: t("updateAvatar"),
      modal: "updateCompanyAvatar",
      component: <UpdateAvatarForm company={companyData} />,
    },
    {
      modal: "updateCompanyVisible",
      component: <UpdateVisibleForm company={companyData} />,
    },
    {
      title: t("deleteCompany"),
      modal: "deleteCompany",
      component: <DeleteForm company={companyData} />,
    },
  ]

  const menuItems: MenuItem[] = [
    {
      text: t("updateInfo"),
      icon: <EditIcon fontSize="small" />,
      modalWindow: "updateCompanyInfo",
    },
    {
      text: t("updateAvatar"),
      icon: <AccountCircleIcon fontSize="small" />,
      modalWindow: "updateCompanyAvatar",
    },
    {
      text: t("updateVisible"),
      icon: <VisibilityIcon fontSize="small" />,
      modalWindow: "updateCompanyVisible",
    },
    {
      text: t("deleteCompany"),
      icon: <DeleteIcon fontSize="small" />,
      modalWindow: "deleteCompany",
    },
  ]

  return (
    <div>
      <SettingsMenu menuItems={menuItems} />

      {dialogWindows.map((dialog) => (
        <ModalWindow key={dialog.modal} title={dialog.title} modal={dialog.modal}>
          {dialog.component}
        </ModalWindow>
      ))}
    </div>
  )
}

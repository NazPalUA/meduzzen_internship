"use client"

import {
  useAddToAdminMutation,
  useLeaveCompanyMutation,
  useRemoveFromAdminMutation,
} from "@features/action"
import { type CompanyDataUser } from "@features/company-data"
import { AdminPanelSettings as AdminIcon, PersonRemove as ExcludeIcon } from "@mui/icons-material"
import { ConfirmActionModal } from "@shared/components/ConfirmActionModal"
import { MenuItem } from "@shared/components/SettingsMenu"
import { Action } from "@shared/constants"
import { useTranslations } from "next-intl"
import { Permission } from "../lib/model/Permission"
import { ListItem } from "./ListItem"

export function MemberItem({
  member,
  permission,
  companyId,
}: {
  member: CompanyDataUser
  permission: Permission
  companyId: number
}) {
  const [excludeMember] = useLeaveCompanyMutation()
  const [addToAdmin] = useAddToAdminMutation()
  const [removeFromAdmin] = useRemoveFromAdminMutation()

  const t = useTranslations("CompanyPage.members")

  const { isOwner } = permission
  const isMemberOwner = member.action === Action.OWNER
  const isMemberAdmin = member.action === Action.ADMIN
  const showSettingsMenu = isOwner && !isMemberOwner

  const menuItems: MenuItem[] = [
    {
      icon: <ExcludeIcon />,
      text: t("exclude"),
      content: (
        <ConfirmActionModal
          title={t("modalExcludeTitle")}
          message={t("confirmExclude")}
          confirmAction={{
            onAction: () => excludeMember(member.action_id).unwrap(),
            buttonProps: {
              children: t("submitExclude"),
              color: "error",
            },
            successMessage: t("successExclude"),
            errorMessage: t("errorExclude"),
          }}
          cancelAction={{
            buttonProps: {
              children: t("cancelExclude"),
              color: "primary",
            },
          }}
        />
      ),
    },

    {
      icon: <AdminIcon />,
      text: !isMemberAdmin ? t("addToAdmin") : t("removeFromAdmin"),
      content: (
        <ConfirmActionModal
          title={!isMemberAdmin ? t("modalAddToAdminTitle") : t("modalRemoveFromAdminTitle")}
          message={!isMemberAdmin ? t("confirmAddToAdmin") : t("confirmRemoveFromAdmin")}
          confirmAction={{
            onAction: () =>
              !isMemberAdmin
                ? addToAdmin(member.action_id).unwrap()
                : removeFromAdmin(member.action_id).unwrap(),
            buttonProps: {
              children: !isMemberAdmin ? t("submitAddToAdmin") : t("submitRemoveFromAdmin"),
              color: "primary",
            },
            successMessage: !isMemberAdmin ? t("successAddToAdmin") : t("successRemoveFromAdmin"),
            errorMessage: !isMemberAdmin ? t("errorAddToAdmin") : t("errorRemoveFromAdmin"),
          }}
          cancelAction={{
            buttonProps: {
              children: !isMemberAdmin ? t("cancelAddToAdmin") : t("cancelRemoveFromAdmin"),
              color: "primary",
            },
          }}
        />
      ),
    },
  ]

  return (
    <ListItem
      user={member}
      menuItems={menuItems}
      showSettingsMenu={showSettingsMenu}
      companyId={companyId}
      showLastPass={true}
    />
  )
}

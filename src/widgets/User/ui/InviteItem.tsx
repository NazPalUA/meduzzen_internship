"use client"

import { useAcceptActionInviteMutation, useDeclineActionMutation } from "@features/action"
import { type UserDataCompany } from "@features/user-data"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import PersonOffIcon from "@mui/icons-material/PersonOff"
import { ConfirmActionModal } from "@shared/components/ConfirmActionModal"
import { MenuItem } from "@shared/components/SettingsMenu"
import { useTranslations } from "next-intl"
import { ListItem } from "./ListItem"

export function InviteItem({ company }: { company: UserDataCompany }) {
  const t = useTranslations("UserPage.invites")

  const [acceptInvite] = useAcceptActionInviteMutation()
  const [rejectInvite] = useDeclineActionMutation()

  const menuItems: MenuItem[] = [
    {
      icon: <PersonAddIcon />,
      text: t("acceptInvite"),
      content: (
        <ConfirmActionModal
          title={t("modalAcceptInviteTitle")}
          message={t("confirmAcceptInvite")}
          confirmAction={{
            onAction: () => acceptInvite(company.action_id.toString()).unwrap(),
            buttonProps: {
              children: t("submitAcceptInvite"),
              color: "success",
            },
            successMessage: t("successAcceptInvite"),
            errorMessage: t("errorAcceptInvite"),
          }}
          cancelAction={{
            buttonProps: {
              children: t("cancelAcceptInvite"),
              color: "primary",
            },
          }}
        />
      ),
    },
    {
      icon: <PersonOffIcon />,
      text: t("rejectInvite"),
      content: (
        <ConfirmActionModal
          title={t("modalRejectInviteTitle")}
          message={t("confirmRejectInvite")}
          confirmAction={{
            onAction: () => rejectInvite(company.action_id.toString()).unwrap(),
            buttonProps: {
              children: t("submitRejectInvite"),
              color: "error",
            },
            successMessage: t("successRejectInvite"),
            errorMessage: t("errorRejectInvite"),
          }}
          cancelAction={{
            buttonProps: {
              children: t("cancelRejectInvite"),
              color: "primary",
            },
          }}
        />
      ),
    },
  ]

  return <ListItem company={company} menuItems={menuItems} />
}

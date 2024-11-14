"use client"

import { useAcceptActionRequestMutation, useDeclineActionMutation } from "@features/action"
import { type CompanyDataUser } from "@features/company-data"
import { PersonAdd as AcceptIcon, PersonOff as RejectIcon } from "@mui/icons-material"
import { ConfirmActionModal } from "@shared/components/ConfirmActionModal"
import { MenuItem } from "@shared/components/SettingsMenu"
import { useTranslations } from "next-intl"
import { ListItem } from "./ListItem"

export function RequestItem({ user }: { user: CompanyDataUser }) {
  const t = useTranslations("CompanyPage.requests")

  const [rejectRequest] = useDeclineActionMutation()
  const [acceptRequest] = useAcceptActionRequestMutation()

  const menuItems: MenuItem[] = [
    {
      icon: <AcceptIcon />,
      text: t("acceptRequest"),
      content: (
        <ConfirmActionModal
          title={t("modalAcceptRequestTitle")}
          message={t("confirmAcceptRequest")}
          confirmAction={{
            onAction: () => acceptRequest(user.action_id.toString()).unwrap(),
            buttonProps: {
              children: t("submitAcceptRequest"),
              color: "success",
            },
            successMessage: t("successAcceptRequest"),
            errorMessage: t("errorAcceptRequest"),
          }}
          cancelAction={{
            buttonProps: {
              children: t("cancelAcceptRequest"),
              color: "primary",
            },
          }}
        />
      ),
    },
    {
      icon: <RejectIcon />,
      text: t("rejectRequest"),
      content: (
        <ConfirmActionModal
          title={t("modalRejectRequestTitle")}
          message={t("confirmRejectRequest")}
          confirmAction={{
            onAction: () => rejectRequest(user.action_id.toString()).unwrap(),
            buttonProps: {
              children: t("submitRejectRequest"),
              color: "error",
            },
            successMessage: t("successRejectRequest"),
            errorMessage: t("errorRejectRequest"),
          }}
          cancelAction={{
            buttonProps: {
              children: t("cancelRejectRequest"),
              color: "primary",
            },
          }}
        />
      ),
    },
  ]

  return <ListItem user={user} menuItems={menuItems} />
}

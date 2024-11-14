"use client"

import { useDeclineActionMutation } from "@features/action"
import { type UserDataCompany } from "@features/user-data"
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled"
import { ConfirmActionModal } from "@shared/components/ConfirmActionModal"
import { MenuItem } from "@shared/components/SettingsMenu"
import { useTranslations } from "next-intl"
import { ListItem } from "./ListItem"

export function RequestItem({ company }: { company: UserDataCompany }) {
  const t = useTranslations("UserPage.requests")

  const [cancelRequest] = useDeclineActionMutation()

  const menuItems: MenuItem[] = [
    {
      icon: <PersonAddDisabledIcon />,
      text: t("cancelRequest"),
      content: (
        <ConfirmActionModal
          title={t("modalCancelRequestTitle")}
          message={t("confirmCancelRequest")}
          confirmAction={{
            onAction: () => cancelRequest(company.action_id.toString()).unwrap(),
            buttonProps: {
              children: t("submitCancelRequest"),
              color: "error",
            },
            successMessage: t("successCancelRequest"),
            errorMessage: t("errorCancelRequest"),
          }}
          cancelAction={{
            buttonProps: {
              children: t("cancelCancelRequest"),
              color: "primary",
            },
          }}
        />
      ),
    },
  ]

  return <ListItem company={company} menuItems={menuItems} />
}

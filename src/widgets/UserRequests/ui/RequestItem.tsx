"use client"

import { CompanyListItem } from "@entities/company"
import { useDeclineActionMutation } from "@features/action"
import { type UserDataCompany } from "@features/user-data"
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled"
import { ConfirmActionModal } from "@shared/components/ConfirmActionModal"
import { MenuItem, SettingsMenu } from "@shared/components/SettingsMenu"
import { useTranslations } from "next-intl"

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
            onAction: () => cancelRequest(company.action_id).unwrap(),
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

  return (
    <CompanyListItem company={company} secondaryAction={<SettingsMenu menuItems={menuItems} />} />
  )
}

"use client"

import { CompanyListItem } from "@entities/company"
import { useLeaveCompanyMutation } from "@features/action"
import { type UserDataCompany } from "@features/user-data"
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"
import { ConfirmActionModal } from "@shared/components/ConfirmActionModal"
import { MenuItem, SettingsMenu } from "@shared/components/SettingsMenu"
import { useTranslations } from "next-intl"

export function CompanyItem({ company }: { company: UserDataCompany }) {
  const t = useTranslations("UserPage.companies")

  const [leaveCompany] = useLeaveCompanyMutation()

  const menuItems: MenuItem[] = [
    {
      icon: <PersonRemoveIcon />,
      text: t("leave"),
      content: (
        <ConfirmActionModal
          title={t("modalLeaveTitle")}
          message={t("confirmLeave")}
          confirmAction={{
            onAction: () => leaveCompany(company.action_id).unwrap(),
            buttonProps: {
              children: t("submitLeave"),
              color: "error",
            },
            successMessage: t("successLeave"),
            errorMessage: t("errorLeave"),
          }}
          cancelAction={{
            buttonProps: {
              children: t("cancelLeave"),
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

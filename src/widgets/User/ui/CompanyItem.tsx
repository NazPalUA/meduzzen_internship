"use client"

import { useLeaveCompanyMutation } from "@features/action"
import { type UserDataCompany } from "@features/user-data"
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"
import { ConfirmActionModal } from "@shared/components/ConfirmActionModal"
import { MenuItem } from "@shared/components/SettingsMenu"
import { useTranslations } from "next-intl"
import { ListItem } from "./ListItem"

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
            onAction: () => leaveCompany(company.action_id.toString()).unwrap(),
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

  return <ListItem company={company} menuItems={menuItems} />
}

"use client"

import { useDeclineActionMutation } from "@features/action"
import { type CompanyDataUser } from "@features/company-data"
import { PersonAddDisabled as CancelInviteIcon } from "@mui/icons-material"
import { ConfirmActionModal } from "@shared/components/ConfirmActionModal"
import { MenuItem, SettingsMenu } from "@shared/components/SettingsMenu"
import { useTranslations } from "next-intl"
import { ListItem } from "./ListItem"

export function InviteItem({ user }: { user: CompanyDataUser }) {
  const t = useTranslations("CompanyPage.invites")

  const [cancelInvite] = useDeclineActionMutation()

  const menuItems: MenuItem[] = [
    {
      icon: <CancelInviteIcon />,
      text: t("cancelInvite"),
      content: (
        <ConfirmActionModal
          title={t("modalCancelInviteTitle")}
          message={t("confirmCancelInvite")}
          confirmAction={{
            onAction: () => cancelInvite(user.action_id).unwrap(),
            buttonProps: {
              children: t("submitCancelInvite"),
              color: "error",
            },
            successMessage: t("successCancelInvite"),
            errorMessage: t("errorCancelInvite"),
          }}
          cancelAction={{
            buttonProps: {
              children: t("cancelCancelInvite"),
              color: "primary",
            },
          }}
        />
      ),
    },
  ]

  return <ListItem user={user} secondaryAction={<SettingsMenu menuItems={menuItems} />} />
}

"use client"

import { CompanyDetails, useDeleteCompanyMutation } from "@entities/company"
import { useRouter } from "@navigation"
import { ConfirmActionModal } from "@shared/components/ConfirmActionModal"
import { Routes } from "@shared/constants"
import { useTranslations } from "next-intl"

export function DeleteModal({ company }: { company: CompanyDetails }) {
  const t = useTranslations("DeleteCompany")

  const [deleteCompany] = useDeleteCompanyMutation()

  const router = useRouter()

  return (
    <ConfirmActionModal
      confirmAction={{
        onAction: () => deleteCompany(company.company_id.toString()).unwrap(),
        successMessage: t("result.success"),
        errorMessage: t("result.error"),
        onSuccess: () => router.push(`${Routes.USERS}/${company.company_owner.user_id}`),
        buttonProps: {
          children: t("submitText"),
          color: "error",
        },
      }}
      cancelAction={{
        buttonProps: {
          children: t("rejectText"),
          color: "primary",
        },
      }}
      message={t("confirmDelete")}
      title={t("title")}
    />
  )
}

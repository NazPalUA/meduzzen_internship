"use client"

import { CompanyDetails, useDeleteCompanyMutation } from "@entities/company"
import { Button, CircularProgress } from "@mui/material"
import { useRouter } from "@navigation"
import { Routes } from "@shared/constants"
import { useDialog, useToaster } from "@shared/hooks"
import { useTranslations } from "next-intl"
import styles from "./Styles.module.scss"

export function DeleteForm({ company }: { company: CompanyDetails }) {
  const t = useTranslations("DeleteCompany")

  const [deleteCompany, { isLoading }] = useDeleteCompanyMutation()
  const router = useRouter()

  const { toastError, toastSuccess } = useToaster()
  const { closeDialog } = useDialog()

  const handleDelete = async () => {
    try {
      await deleteCompany(company.company_id.toString()).unwrap()
      toastSuccess(t("result.success"))
      closeDialog()
      router.push(Routes.DASHBOARD)
    } catch {
      toastError(t("result.error"))
    }
  }

  return (
    <div>
      <p>{t("confirmDelete")}</p>
      <div className={styles["delete-form__buttons-container"]}>
        <Button variant="contained" color="error" onClick={handleDelete} disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : t("submitText")}
        </Button>
        <Button variant="outlined" onClick={closeDialog} disabled={isLoading}>
          {t("rejectText")}
        </Button>
      </div>
    </div>
  )
}

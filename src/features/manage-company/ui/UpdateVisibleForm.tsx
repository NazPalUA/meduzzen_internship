"use client"

import {
  CompanyDetails,
  UpdateCompanyVisibleCredentialsSchema,
  useUpdateCompanyVisibleMutation,
  type UpdateCompanyVisibleCredentials,
} from "@entities/company"
import { zodResolver } from "@hookform/resolvers/zod"
import { getForm } from "@shared/components/Form"
import { useDialog, useToaster } from "@shared/hooks"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import styles from "./Styles.module.scss"

export function UpdateVisibleForm({ company }: { company: CompanyDetails }) {
  const [updateVisible, { isError }] = useUpdateCompanyVisibleMutation()

  const { toastError, toastSuccess } = useToaster()
  const { closeDialog } = useDialog()

  const t = useTranslations()

  const onSubmit = async (data: UpdateCompanyVisibleCredentials) => {
    try {
      await updateVisible({
        companyId: company.company_id,
        visibleInfo: data,
      }).unwrap()
      toastSuccess(t("UpdateCompany.visible.result.success"))
      closeDialog()
    } catch {
      toastError(t("UpdateCompany.visible.result.error"))
    }
  }

  const Form = getForm<UpdateCompanyVisibleCredentials>()

  const form = useForm<UpdateCompanyVisibleCredentials>({
    resolver: zodResolver(UpdateCompanyVisibleCredentialsSchema),
    defaultValues: {
      is_visible: company.is_visible,
    },
  })

  return (
    <Form
      form={form}
      onSubmit={onSubmit}
      title={t("UpdateCompany.visible.title")}
      className={styles["update-form"]}
    >
      <Form.Switch name="is_visible" label={t("UpdateCompany.visible.labels.visible")} />
      <Form.SubmitButton text={t("UpdateCompany.visible.submitText")} />
      <Form.ErrorMessage text={isError ? t("Error.default") : null} />
    </Form>
  )
}

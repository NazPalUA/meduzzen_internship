"use client"

import {
  CompanyDetails,
  type UpdateCompanyInfoCredentials,
  updateCompanyInfoCredentialsSchema,
  useUpdateCompanyInfoMutation,
} from "@entities/company"
import { zodResolver } from "@hookform/resolvers/zod"
import { getForm } from "@shared/components/Form"
import { useDialog, useToaster } from "@shared/hooks"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import styles from "./Styles.module.scss"

export function UpdateInfoForm({ company }: { company: CompanyDetails }) {
  const [updateCompanyInfo, { isError }] = useUpdateCompanyInfoMutation()

  const t = useTranslations()

  const { toastError, toastSuccess } = useToaster()
  const { closeDialog } = useDialog()

  const schema = updateCompanyInfoCredentialsSchema((key) => t(`Validation.${key}`))

  const onSubmit = async (data: UpdateCompanyInfoCredentials) => {
    try {
      await updateCompanyInfo({
        companyId: company.company_id,
        companyInfo: data,
      }).unwrap()
      toastSuccess(t("UpdateCompany.info.result.success"))
      closeDialog()
    } catch {
      toastError(t("UpdateCompany.info.result.error"))
    }
  }

  const Form = getForm<UpdateCompanyInfoCredentials>()

  const form = useForm<UpdateCompanyInfoCredentials>({
    resolver: zodResolver(schema),
    defaultValues: {
      company_name: company.company_name,
      company_title: company.company_title || "",
      company_description: company.company_description || "",
      company_city: company.company_city || "",
      company_phone: company.company_phone || "",
      company_links: company.company_links || [""],
    },
  })

  return (
    <Form
      form={form}
      onSubmit={onSubmit}
      title={t("UpdateCompany.info.title")}
      className={styles["update-form"]}
    >
      <Form.TextField name="company_name" label={t("UpdateCompany.info.labels.name")} />
      <Form.TextField name="company_title" label={t("UpdateCompany.info.labels.title")} />
      <Form.TextField
        name="company_description"
        label={t("UpdateCompany.info.labels.description")}
      />
      <Form.TextField name="company_city" label={t("UpdateCompany.info.labels.city")} />
      <Form.TextField name="company_phone" label={t("UpdateCompany.info.labels.phone")} />
      <Form.ArrayField
        name="company_links"
        label={t("UpdateCompany.info.labels.links")}
        itemLabel={t("UpdateCompany.info.labels.links")}
      />
      <Form.SubmitButton text={t("UpdateCompany.info.submitText")} />
      <Form.ErrorMessage text={isError ? t("Error.default") : null} />
    </Form>
  )
}

"use client"

import {
  CreateCompanyCredentials,
  createCompanyCredentialsSchema,
  useCreateCompanyMutation,
} from "@entities/company"
import { zodResolver } from "@hookform/resolvers/zod"
import { getForm } from "@shared/components/Form"
import { useOverlays } from "@shared/overlays"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"

export function CreateCompanyForm() {
  const [createCompany, { isError }] = useCreateCompanyMutation()

  const t = useTranslations()

  const { toastError, toastSuccess, closeModal } = useOverlays()

  const schema = createCompanyCredentialsSchema((key) => t(`Validation.${key}`))

  const onSubmit = async (data: CreateCompanyCredentials) => {
    try {
      await createCompany(data).unwrap()
      toastSuccess(t("CreateCompany.result.success"))
      closeModal()
    } catch {
      toastError(t("CreateCompany.result.error"))
    }
  }

  const Form = getForm<CreateCompanyCredentials>()

  const form = useForm<CreateCompanyCredentials>({
    resolver: zodResolver(schema),
    defaultValues: {
      company_name: "",
      is_visible: false,
    },
  })

  return (
    <Form form={form} onSubmit={onSubmit} title={t("CreateCompany.title")}>
      <Form.TextField name="company_name" label={t("CreateCompany.labels.companyName")} />
      <Form.Switch name="is_visible" label={t("CreateCompany.labels.isVisible")} />
      <Form.SubmitButton text={t("CreateCompany.submitText")} />
      <Form.ErrorMessage text={isError ? t("Error.default") : null} />
    </Form>
  )
}

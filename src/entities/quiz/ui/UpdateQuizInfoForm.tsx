"use client "

import {
  type UpdateQuizInfoCredentials,
  updateQuizInfoCredentialsSchema,
  useUpdateQuizInfoMutation,
} from "@entities/quiz"
import { zodResolver } from "@hookform/resolvers/zod"
import { getForm } from "@shared/components/Form"
import { useDialog, useToaster } from "@shared/hooks"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"

export function UpdateQuizInfoForm({
  quizId,
  quizData,
}: {
  quizId: number
  quizData: UpdateQuizInfoCredentials
}) {
  const [updateQuiz, { isError: isErrorUpdate }] = useUpdateQuizInfoMutation()

  const { toastSuccess, toastError } = useToaster()
  const { closeDialog } = useDialog()

  const t = useTranslations()
  const schema = updateQuizInfoCredentialsSchema((key) => t(`Validation.${key}`))

  const onSubmit = async (data: UpdateQuizInfoCredentials) => {
    try {
      await updateQuiz({ quizId, quizInfo: data }).unwrap()
      toastSuccess(t("Quiz.updateInfo.result.success"))
      closeDialog()
    } catch {
      toastError(t("Quiz.updateInfo.result.error"))
    }
  }

  const form = useForm<UpdateQuizInfoCredentials>({
    resolver: zodResolver(schema),
    defaultValues: quizData,
  })

  const Form = getForm<UpdateQuizInfoCredentials>()

  return (
    <Form form={form} onSubmit={onSubmit} title={t("Quiz.updateInfo.title")}>
      <Form.TextField name="quiz_name" type="text" label={t("Quiz.labels.name")} />
      <Form.TextField name="quiz_title" type="text" label={t("Quiz.labels.title")} />
      <Form.TextField name="quiz_description" type="text" label={t("Quiz.labels.description")} />
      <Form.TextField name="quiz_frequency" type="number" label={t("Quiz.labels.frequency")} />
      <Form.SubmitButton text={t("Quiz.updateInfo.submitText")} />
      <Form.ErrorMessage text={isErrorUpdate ? t("Quiz.updateInfo.result.error") : null} />
    </Form>
  )
}

"use client "

import {
  type CreateQuizCredentials,
  createQuizCredentialsSchema,
  useCreateQuizMutation,
} from "@entities/quiz"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@mui/material"
import { getForm } from "@shared/components/Form"
import { useDialog, useToaster } from "@shared/hooks"
import { useTranslations } from "next-intl"
import { useFieldArray, useForm } from "react-hook-form"
import styles from "./CreateQuizForm.module.scss"
import { QuestionsField } from "./QuestionsField"

export function CreateQuizForm({ companyId }: { companyId: number }) {
  const [createQuiz, { isError }] = useCreateQuizMutation()

  const { toastSuccess, toastError } = useToaster()
  const { closeDialog } = useDialog()

  const t = useTranslations()
  const schema = createQuizCredentialsSchema((key) => t(`Validation.${key}`))

  const onSubmit = async (data: CreateQuizCredentials) => {
    try {
      await createQuiz(data).unwrap()
      toastSuccess(t("Quiz.create.result.success"))
      closeDialog()
    } catch {
      toastError(t("Quiz.create.result.error"))
    }
  }

  const defaultQuestion = {
    question_text: "",
    question_answers: [" ", " "],
    question_correct_answer: 0,
  }

  const form = useForm<CreateQuizCredentials>({
    resolver: zodResolver(schema),
    defaultValues: {
      quiz_name: "",
      quiz_frequency: undefined,
      company_id: companyId,
      questions_list: [defaultQuestion, defaultQuestion],
    },
  })

  const Form = getForm<CreateQuizCredentials>()

  const fieldArray = useFieldArray<CreateQuizCredentials>({
    control: form.control,
    name: "questions_list",
  })

  return (
    <Form form={form} onSubmit={onSubmit} title={t("Quiz.create.title")}>
      <div className={styles.upperFields}>
        <Form.TextField name="quiz_name" type="text" label={t("Quiz.labels.name")} />
        <Form.TextField name="quiz_frequency" type="number" label={t("Quiz.labels.frequency")} />
      </div>

      <QuestionsField control={form.control} fieldArray={fieldArray} />

      <div className={styles.buttonsContainer}>
        <Button variant="outlined" onClick={() => fieldArray.append(defaultQuestion)}>
          {t("Quiz.create.addQuestion")}
        </Button>
        <Form.SubmitButton text={t("Quiz.create.submitText")} />
      </div>

      <Form.ErrorMessage text={isError ? t("Quiz.create.result.error") : null} />
    </Form>
  )
}

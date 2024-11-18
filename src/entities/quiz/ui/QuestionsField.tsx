"use client "

import { type CreateQuizCredentials } from "@entities/quiz"
import ClearIcon from "@mui/icons-material/Clear"
import { IconButton, TextField as MuiTextField } from "@mui/material"
import { useTranslations } from "next-intl"
import { Control, Controller, UseFieldArrayReturn } from "react-hook-form"
import { Answers } from "./Answers"
import styles from "./QuestionsField.module.scss"

export function QuestionsField({
  control,
  fieldArray,
}: {
  control: Control<CreateQuizCredentials>
  fieldArray: UseFieldArrayReturn<CreateQuizCredentials>
}) {
  const t = useTranslations("Quiz")

  const { fields, remove } = fieldArray

  return (
    <div className={styles.container}>
      {fields.map((item, index) => (
        <div key={item.id} className={styles.listItem}>
          <Controller
            name={`questions_list.${index}.question_text`}
            control={control}
            render={({ field, fieldState }) => {
              return (
                <MuiTextField
                  {...field}
                  error={!!fieldState.error}
                  type="text"
                  multiline
                  rows={3}
                  label={`${t("labels.question")} ${index + 1}`}
                  helperText={fieldState.error?.message}
                  variant="outlined"
                  fullWidth
                />
              )
            }}
          />

          <Controller
            control={control}
            name={`questions_list.${index}.question_correct_answer`}
            render={({ field: { value, onChange } }) => {
              return (
                <Answers
                  name={`questions_list.${index}.question_answers`}
                  minItems={2}
                  itemLabel={t("labels.answer")}
                  correctAnswer={value}
                  setCorrectAnswer={onChange}
                />
              )
            }}
          />

          <IconButton
            type="button"
            size="small"
            disabled={fields.length <= 2}
            onClick={() => remove(index)}
            className={styles.deleteQuestionField}
          >
            <ClearIcon />
          </IconButton>
        </div>
      ))}
    </div>
  )
}

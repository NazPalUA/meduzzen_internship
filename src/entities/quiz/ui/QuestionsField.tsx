"use client "

import { type CreateQuizCredentials } from "@entities/quiz"
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"
import ClearIcon from "@mui/icons-material/Clear"
import { Autocomplete, Checkbox, IconButton, TextField as MuiTextField } from "@mui/material"
import { ArrayField } from "@shared/components/Form"
import { useTranslations } from "next-intl"
import { Control, Controller, UseFieldArrayReturn, useFormContext } from "react-hook-form"
import styles from "./QuestionsField.module.scss"

export function QuestionsField({
  control,
  fieldArray,
}: {
  control: Control<CreateQuizCredentials>
  fieldArray: UseFieldArrayReturn<CreateQuizCredentials>
}) {
  const t = useTranslations("Quiz")

  const form = useFormContext<CreateQuizCredentials>()

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

          <ArrayField
            className={styles.answersField}
            name={`questions_list.${index}.question_answers`}
            addButton
            leftPadding={false}
            minItems={2}
            itemLabel={t("labels.answer")}
          />

          <Controller
            control={control}
            name={`questions_list.${index}.question_correct_answer`}
            render={({ field: { value, onChange, ref }, fieldState: { error } }) => {
              const options = form
                .watch(`questions_list.${index}.question_answers`)
                .map((item, index) => ({
                  id: index,
                  label: item.trim(),
                }))
                .filter((item) => item.label)

              return (
                <Autocomplete
                  size="small"
                  className={styles.correctAnswerField}
                  options={options}
                  value={options.find((option) => Number(option.id) === value) || null}
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(option, newValue) => option.id === newValue.id}
                  onChange={(_, newValue) => {
                    onChange(newValue ? Number(newValue.id) : 0)
                  }}
                  disableCloseOnSelect
                  renderInput={(params) => (
                    <MuiTextField
                      {...params}
                      fullWidth
                      inputRef={ref}
                      error={!!error}
                      helperText={error?.message}
                      label={t("labels.correctAnswer")}
                    />
                  )}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon />}
                        checkedIcon={<CheckBoxIcon />}
                        checked={selected}
                      />
                      {option.label}
                    </li>
                  )}
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

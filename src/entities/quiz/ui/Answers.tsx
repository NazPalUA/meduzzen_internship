"use client"

import { Clear as RemoveFieldIcon } from "@mui/icons-material"
import { Button, IconButton, Radio, RadioGroup } from "@mui/material"
import { TextField } from "@shared/components/Form/TextField"
import { useTranslations } from "next-intl"
import {
  FieldArray,
  FieldArrayPath,
  FieldValues,
  Path,
  useFieldArray,
  useFormContext,
} from "react-hook-form"
import styles from "./Answers.module.scss"

export type AnswersProps<T extends FieldValues> = {
  name: keyof T
  itemLabel: string
  minItems?: number
  correctAnswer: number
  setCorrectAnswer: (value: number) => void
}

export function Answers<T extends FieldValues>({
  name,
  itemLabel,
  minItems = 0,
  correctAnswer,
  setCorrectAnswer,
}: AnswersProps<T>) {
  const { control } = useFormContext<T>()
  const t = useTranslations()

  const { fields, append, remove } = useFieldArray({
    control,
    name: name as FieldArrayPath<T>,
  })

  function removeItem(index: number) {
    if (fields.length > minItems) {
      remove(index)
    }
  }

  return (
    <div className={styles.container}>
      <RadioGroup
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(Number(e.target.value))}
        className={styles.fieldsList}
      >
        {fields.map((item, index) => (
          <div key={item.id} className={styles.fieldItem}>
            <Radio value={index} key={index} />
            <TextField
              size="small"
              className={styles.input}
              name={`${String(name)}.${index}` as Path<T>}
              label={`${itemLabel} ${index + 1}`}
            />
            <IconButton
              onClick={() => removeItem(index)}
              disabled={fields.length <= minItems}
              className={styles.deleteButton}
            >
              <RemoveFieldIcon />
            </IconButton>
          </div>
        ))}
      </RadioGroup>

      <Button
        onClick={() => append(" " as FieldArray<T, FieldArrayPath<T>>)}
        className={styles.addButton}
        variant="outlined"
        size="small"
      >
        {t("Common.addField")}
      </Button>
    </div>
  )
}

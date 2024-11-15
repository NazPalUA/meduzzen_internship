"use client"

import AddIcon from "@mui/icons-material/AddCircleOutline"
import DeleteIcon from "@mui/icons-material/RemoveCircleOutline"
import { Button, IconButton } from "@mui/material"
import clsx from "clsx"
import { useTranslations } from "next-intl"
import {
  FieldArray,
  FieldArrayPath,
  FieldValues,
  Path,
  useFieldArray,
  useFormContext,
} from "react-hook-form"
import styles from "./Form.module.scss"
import { TextField } from "./TextField"

export type ArrayFieldProps<T extends FieldValues> = {
  name: keyof T
  label?: string
  itemLabel: string
  addButton?: boolean
  leftPadding?: boolean
}

export function ArrayField<T extends FieldValues>({
  name,
  label,
  itemLabel,
  addButton,
  leftPadding = true,
}: ArrayFieldProps<T>) {
  const { control } = useFormContext<T>()
  const t = useTranslations()

  const { fields, append, remove } = useFieldArray({
    control,
    name: name as FieldArrayPath<T>,
  })

  return (
    <div className={styles["array-field"]}>
      {label && (
        <div className={styles["array-field__label-container"]}>
          <label className={styles["array-field__label"]} htmlFor={String(name)}>
            {label}
          </label>
          <IconButton onClick={() => append("" as FieldArray<T, FieldArrayPath<T>>)}>
            <AddIcon />
          </IconButton>
        </div>
      )}
      <div
        className={clsx(
          styles["array-field__items"],
          leftPadding && styles["array-field__items--left-padding"],
        )}
      >
        {fields.map((item, index) => (
          <div key={item.id} className={styles["array-field__item"]}>
            <TextField
              className={styles["array-field__input"]}
              name={`${String(name)}.${index}` as Path<T>}
              label={`${itemLabel} ${index + 1}`}
            />
            <IconButton
              onClick={() => remove(index)}
              className={styles["array-field__delete-button"]}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </div>
      {addButton && (
        <Button
          onClick={() => append("" as FieldArray<T, FieldArrayPath<T>>)}
          className={styles["array-field__add-button"]}
          variant="outlined"
          size="small"
        >
          {t("Common.addField")}
        </Button>
      )}
    </div>
  )
}

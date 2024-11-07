"use client"

import AddIcon from "@mui/icons-material/AddCircleOutline"
import DeleteIcon from "@mui/icons-material/RemoveCircleOutline"
import { IconButton } from "@mui/material"
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
  label: string
  itemLabel: string
}

export function ArrayField<T extends FieldValues>({ name, label, itemLabel }: ArrayFieldProps<T>) {
  const { control } = useFormContext<T>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: name as FieldArrayPath<T>,
  })

  return (
    <div className={styles["array-field"]}>
      <div className={styles["array-field__label-container"]}>
        <label className={styles["array-field__label"]} htmlFor={String(name)}>
          {label}
        </label>
        <IconButton onClick={() => append("" as FieldArray<T, FieldArrayPath<T>>)}>
          <AddIcon />
        </IconButton>
      </div>
      <div className={styles["array-field__items"]}>
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
    </div>
  )
}

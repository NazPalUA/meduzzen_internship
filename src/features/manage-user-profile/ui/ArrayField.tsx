"use client"

import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import {
  ArrayPath,
  FieldArray,
  FieldError,
  FieldValues,
  Path,
  useFieldArray,
  useFormContext,
} from "react-hook-form"
import styles from "./Form.module.scss"

interface UpdateFormProps<T extends FieldValues> {
  name: ArrayPath<T> | keyof T

  label: string
}

export const ArrayField = <T extends FieldValues>({
  name,

  label,
}: UpdateFormProps<T>) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<T>()

  const {
    fields: arrFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: name as ArrayPath<T>,
  })

  const fieldName = name as ArrayPath<T>
  const fieldErrors = errors[fieldName] as { [key: number]: FieldError }

  return (
    <div className={styles.inputGroup}>
      <div className={styles.labelContainer}>
        <label className={styles.label} htmlFor={String(fieldName)}>
          {label}
        </label>
        <IconButton onClick={() => append("" as FieldArray<T, ArrayPath<T>>)}>
          <AddIcon />
        </IconButton>
      </div>
      <div className={styles.fieldsContainer}>
        {arrFields.map((item, index) => (
          <div key={item.id} className={styles.inputGroup}>
            <div className={styles.inputContainer}>
              <input
                {...register(`${fieldName}.${index}` as Path<T>)}
                className={styles.input}
                type="string"
              />
              <IconButton onClick={() => remove(index)} className={styles.deleteIcon}>
                <DeleteIcon />
              </IconButton>
            </div>
            {fieldErrors?.[index]?.message && (
              <p className={styles.errorMessage}>{fieldErrors[index].message}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

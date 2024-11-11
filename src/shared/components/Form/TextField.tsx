"use client"

import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from "@mui/material"
import clsx from "clsx"
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form"
import styles from "./Form.module.scss"

export type TextFieldProps<T> = Omit<MuiTextFieldProps, "name"> & {
  name: Path<T>
  className?: string
}

export function TextField<T extends FieldValues>({
  name,
  className,
  ...textFieldProps
}: TextFieldProps<T>) {
  const { control } = useFormContext<T>()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <MuiTextField
          {...field}
          {...textFieldProps}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          variant="outlined"
          fullWidth
          className={clsx(styles.textField, className)}
        />
      )}
    />
  )
}

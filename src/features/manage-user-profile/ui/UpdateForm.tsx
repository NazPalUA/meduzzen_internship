"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CircularProgress } from "@mui/material"
import { FC } from "react"
import { Control, DefaultValues, FieldValues, FormProvider, Path, useForm } from "react-hook-form"
import type { ZodSchema } from "zod"
import { ArrayField } from "./ArrayField"
import styles from "./Form.module.scss"

interface Field<T> {
  name: keyof T
  label: string
  type: string
  autoComplete?: string
}

interface UpdateFormProps<T extends FieldValues> {
  schema: ZodSchema<T>
  onSubmit: (data: T) => Promise<void>
  fields: Field<T>[]
  title: string
  submitText: string
  isLoading: boolean
  ControlledFields?: FC<{
    control: Control<T, any>
  }>
  isError: boolean
  error: string | null
  children?: React.ReactNode
  defaultValues?: DefaultValues<T>
}

export const UpdateForm = <T extends FieldValues>({
  schema,
  onSubmit,
  fields,
  title,
  submitText,
  isLoading,
  isError,
  error,
  children,
  ControlledFields,
  defaultValues,
}: UpdateFormProps<T>) => {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form

  const arrField = fields.find((field) => field.type === "array")
  const nonArrFields = fields.filter((field) => field.type !== "array")

  const handleFormSubmit = async (data: T) => {
    await onSubmit(data)
    reset()
  }

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>{title}</h1>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
            {ControlledFields && <ControlledFields control={control} />}
            {nonArrFields.map((field) => (
              <div key={String(field.name)} className={styles.inputGroup}>
                <label className={styles.label} htmlFor={String(field.name)}>
                  {field.label}
                </label>
                <input
                  id={String(field.name)}
                  type={field.type}
                  {...register(field.name as Path<T>)}
                  className={styles.input}
                  autoComplete={field.autoComplete}
                />
                {errors[field.name] && (
                  <p className={styles.errorMessage}>{errors[field.name]?.message as string}</p>
                )}
              </div>
            ))}
            {arrField && <ArrayField {...arrField} />}
            {children}
            {isError && error && <p className={styles.errorMessage}>{error}</p>}
            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? <CircularProgress className={styles.spinner} /> : submitText}
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

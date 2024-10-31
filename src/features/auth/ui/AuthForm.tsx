"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, Path, useForm } from "react-hook-form"
import type { ZodSchema } from "zod"
import styles from "./Form.module.scss"

interface Field<T> {
  name: keyof T
  label: string
  type: string
  autoComplete?: string
}

interface AuthFormProps<T> {
  schema: ZodSchema<T>
  onSubmit: (data: T) => Promise<void>
  fields: Field<T>[]
  title: string
  submitText: string
  isLoading: boolean
  isError: boolean
  error: any
}

export const AuthForm = <T extends FieldValues>({
  schema,
  onSubmit,
  fields,
  title,
  submitText,
  isLoading,
  isError,
  error,
}: AuthFormProps<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(schema),
  })

  const handleFormSubmit = async (data: T) => {
    await onSubmit(data)
  }

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>{title}</h1>
        <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
          {fields.map((field) => (
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
          {isError && (
            <p className={styles.errorMessage}>{error?.data?.detail || "An error occurred"}</p>
          )}
          <button type="submit" className={styles.submitButton}>
            {isLoading ? "Loading..." : submitText}
          </button>
        </form>
      </div>
    </div>
  )
}

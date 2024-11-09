"use client"

import clsx from "clsx"
import React from "react"
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form"
import styles from "./Form.module.scss"

export type FormProps<T extends FieldValues> = {
  form: UseFormReturn<T>
  onSubmit: (data: T) => void
  children: React.ReactNode
  className?: string
  title?: string
}

export function Form<T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
  title,
}: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={clsx(styles.form, className)}>
        {title && <h1 className={styles.title}>{title}</h1>}
        {children}
      </form>
    </FormProvider>
  )
}

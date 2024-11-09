"use client"

import { Button, ButtonProps, CircularProgress } from "@mui/material"
import clsx from "clsx"
import { useFormContext } from "react-hook-form"
import styles from "./Form.module.scss"

export type SubmitButtonProps = ButtonProps & {
  text: string
  className?: string
}

export function SubmitButton({ text, className, ...buttonProps }: SubmitButtonProps) {
  const {
    formState: { isSubmitting },
  } = useFormContext()
  return (
    <Button
      startIcon={isSubmitting ? <CircularProgress size={16} /> : undefined}
      endIcon={isSubmitting ? <CircularProgress size={16} /> : undefined}
      disabled={isSubmitting}
      type="submit"
      variant="contained"
      className={clsx(styles.submit, className)}
      {...buttonProps}
    >
      {text}
    </Button>
  )
}

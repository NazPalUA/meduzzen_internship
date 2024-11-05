import { z } from "zod"

export const passwordSchema = (t?: (key: string) => string) => {
  const translate = (key: string, defaultMessage: string) => {
    return t ? t(key) : defaultMessage
  }

  return z
    .string()
    .min(12, translate("password.minLength", "Password must be at least 12 characters"))
    .regex(
      /[a-z]/,
      translate("password.lowercase", "Password must contain at least one lowercase letter"),
    )
    .regex(
      /[A-Z]/,
      translate("password.uppercase", "Password must contain at least one uppercase letter"),
    )
    .regex(/[0-9]/, translate("password.number", "Password must contain at least one number"))
    .regex(
      /[^a-zA-Z0-9]/,
      translate("password.specialChar", "Password must contain at least one special character"),
    )
    .trim()
}

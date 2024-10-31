"use client"

import { useSession } from "@/src/entities/session/hooks/useSession"
import { Routes } from "@/src/shared/constants/routes"
import { useTranslations } from "next-intl"
import { NavItem } from "./NavItem"

export function Auth() {
  const t = useTranslations("Navigation")
  const { isLoggedIn } = useSession()

  return (
    <>
      {isLoggedIn ? (
        <NavItem href={Routes.LOGOUT} label={t("logout")} />
      ) : (
        <>
          <NavItem href={Routes.LOGIN} label={t("login")} />
          <NavItem href={Routes.SIGN_UP} label={t("signUp")} />
        </>
      )}
    </>
  )
}

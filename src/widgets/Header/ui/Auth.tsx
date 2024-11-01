"use client"

import { useSession } from "@/src/entities/session/hooks/useSession"
import { Routes } from "@/src/shared/constants/routes"
import LoginIcon from "@mui/icons-material/Login"
import PersonIcon from "@mui/icons-material/Person"
import { Link } from "@navigation"
import { useTranslations } from "next-intl"
import { useState } from "react"
import styles from "./Auth.module.scss"

export function Auth() {
  const t = useTranslations("Navigation")
  const { isLoggedIn } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState)
  }

  const closeDropdown = () => {
    setIsOpen(false)
  }

  return (
    <div className={styles.authContainer}>
      <button className={styles.iconButton} onClick={toggleDropdown}>
        {isLoggedIn ? <PersonIcon /> : <LoginIcon />}
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {isLoggedIn ? (
            <Link href={Routes.LOGOUT} className={styles.menuItem} onClick={closeDropdown}>
              {t("logout")}
            </Link>
          ) : (
            <>
              <Link href={Routes.LOGIN} className={styles.menuItem} onClick={closeDropdown}>
                {t("login")}
              </Link>
              <Link href={Routes.SIGN_UP} className={styles.menuItem} onClick={closeDropdown}>
                {t("signUp")}
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  )
}

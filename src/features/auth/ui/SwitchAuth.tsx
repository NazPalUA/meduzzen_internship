import { Link } from "@navigation"
import { Routes } from "@shared/constants"
import { useTranslations } from "next-intl"
import styles from "./SwitchAuth.module.scss"

interface SwitchAuthProps {
  to: string
}

export function SwitchAuth({ to }: SwitchAuthProps) {
  const t = useTranslations("Auth")

  const isLogin = to === Routes.LOGIN

  return (
    <div className={styles.container}>
      <span className={styles.text}>{isLogin ? t("haveAccount") : t("noAccount")}</span>
      <Link href={to} className={styles.link}>
        {isLogin ? t("login") : t("signUp")}
      </Link>
    </div>
  )
}

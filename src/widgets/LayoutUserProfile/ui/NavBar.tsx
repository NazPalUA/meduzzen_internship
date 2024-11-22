"use client"

import {
  Business as CompaniesIcon,
  Badge as InfoIcon,
  Mail as InvitesIcon,
  Quiz as QuizzesIcon,
  ContactPage as RequestsIcon,
} from "@mui/icons-material"
import { Link, usePathname } from "@navigation"
import clsx from "clsx"
import { useTranslations } from "next-intl"
import styles from "./Styles.module.scss"

export function NavBar({ userId, isOwner }: { userId: number; isOwner: boolean }) {
  const t = useTranslations("UserPage.nav")
  const pathname = usePathname().split("/").pop()

  if (!isOwner) return null

  const navItems = [
    {
      icon: <InfoIcon />,
      label: t("info"),
    },
    {
      icon: <CompaniesIcon />,
      slug: "companies",
      label: t("companies"),
    },
    {
      icon: <QuizzesIcon />,
      slug: "quizzes",
      label: t("quizzes"),
    },
    {
      icon: <InvitesIcon />,
      slug: "invites",
      label: t("invites"),
    },
    {
      icon: <RequestsIcon />,
      slug: "requests",
      label: t("requests"),
    },
  ]

  const getHref = (slug?: string) => {
    return slug ? `/users/${userId}/${slug}` : `/users/${userId}`
  }

  return (
    <nav className={styles.navbar}>
      {navItems.map((item) => (
        <Link
          key={item.slug || "info"}
          href={getHref(item?.slug)}
          className={clsx(styles.navLink, {
            [styles.active]: item.slug ? pathname === item.slug : pathname === String(userId),
          })}
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  )
}

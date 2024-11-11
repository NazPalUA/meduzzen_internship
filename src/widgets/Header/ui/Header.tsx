import { Container } from "@shared/components/ui"
import { useTranslations } from "next-intl"
import { useLinks } from "../lib/links"
import { Auth } from "./Auth"
import styles from "./Header.module.scss"
import { LocaleSwitcher } from "./LocaleSwitcher"
import { NavItem } from "./NavItem"

export function Header() {
  const t = useTranslations("Header")
  const links = useLinks()
  return (
    <header>
      <Container className={styles.container}>
        <div className={styles.title}>{t("title")}</div>
        <div className={styles.nav}>
          {links.map(({ href, label }) => (
            <NavItem key={href} href={href} label={label} />
          ))}
          <Auth />
          <LocaleSwitcher />
        </div>
      </Container>
    </header>
  )
}

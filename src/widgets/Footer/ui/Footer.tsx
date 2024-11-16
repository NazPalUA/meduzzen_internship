import { Link } from "@navigation"
import { Container } from "@shared/components/ui"
import { useTranslations } from "next-intl"
import styles from "./Footer.module.scss"

export function Footer() {
  const t = useTranslations("Footer")
  return (
    <footer>
      <Container>
        <div className={styles.content}>
          <div>
            © {new Date().getFullYear()} {t("copyright")}
          </div>
          <div>
            <Link href="#" className={styles.link}>
              {t("privacyPolicyLinkLabel")}
            </Link>
            {" | "}
            <Link href="#" className={styles.link}>
              {t("termsOfServiceLinkLabel")}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

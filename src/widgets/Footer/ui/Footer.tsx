import { Link } from "@/src/shared/i18n/navigation"
import { Container } from "@mui/material"
import { useTranslations } from "next-intl"
import styles from "./Footer.module.scss"

export function Footer() {
	const t = useTranslations("Footer")
	return (
		<footer className={styles.footer}>
			<Container maxWidth="sm" className={styles.container}>
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
			</Container>
		</footer>
	)
}

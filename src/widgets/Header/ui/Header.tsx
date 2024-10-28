import { AppBar, Toolbar } from "@mui/material"
import { useTranslations } from "next-intl"
import { useLinks } from "../lib/links"
import styles from "./Header.module.scss"
import { LocaleSwitcher } from "./LocaleSwitcher"
import { NavItem } from "./NavItem"

export function Header() {
	const t = useTranslations("Header")
	const links = useLinks()
	return (
		<AppBar position="static" component="header">
			<Toolbar>
				<div className={styles.title}>{t("title")}</div>
				<div>
					{links.map(({ href, label }) => (
						<NavItem key={href} href={href} label={label} />
					))}
					<LocaleSwitcher />
				</div>
			</Toolbar>
		</AppBar>
	)
}

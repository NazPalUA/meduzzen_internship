import { MenuItem } from "@mui/material"
import { routing } from "@shared/i18n/routing"
import { useLocale, useTranslations } from "next-intl"
import { LocaleSwitcherSelect } from "./LocaleSwitcherSelect"
import styles from "./LocaleSwitcherSelect.module.scss"

export function LocaleSwitcher() {
	const t = useTranslations("LocaleSwitcher")
	const locale = useLocale()

	return (
		<LocaleSwitcherSelect defaultValue={locale} label={t("label")}>
			{routing.locales.map(cur => (
				<MenuItem className={styles.menuItem} key={cur} value={cur}>
					{t("locale", { locale: cur })}
				</MenuItem>
			))}
		</LocaleSwitcherSelect>
	)
}

import { Routes } from "@/src/shared/constants/routes"
import { useTranslations } from "next-intl"

export const useLinks = () => {
	const t = useTranslations("Navigation")

	return [
		{ href: Routes.HOME, label: t("home") },
		{ href: Routes.USERS, label: t("users") },
		{ href: Routes.COMPANIES, label: t("companies") },
		{ href: Routes.ABOUT, label: t("about") },
	]
}

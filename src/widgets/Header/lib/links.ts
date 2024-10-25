import { Routes } from "@/src/shared/constants/routes"
import { HEADER_TEXT } from "@/src/shared/constants/texts"

export const links = [
	{ href: Routes.HOME, label: HEADER_TEXT.HOME_LINK_LABEL },
	{ href: Routes.USERS, label: HEADER_TEXT.USERS_LINK_LABEL },
	{ href: Routes.COMPANIES, label: HEADER_TEXT.COMPANIES_LINK_LABEL },
	{ href: Routes.ABOUT, label: HEADER_TEXT.ABOUT_LINK_LABEL },
]

import { routing } from "@shared/i18n/routing"
import { useTranslations } from "next-intl"
import { BaseLayout } from "./_lib/BaseLayout"

export default function GlobalNotFound() {
	const t = useTranslations("NotFoundPage")
	return (
		<BaseLayout locale={routing.defaultLocale}>
			<p className="max-w-[460px]">{t("description")}</p>
		</BaseLayout>
	)
}

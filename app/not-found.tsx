import { routing } from "@shared/i18n/routing"
import { useTranslations } from "next-intl"
import { BaseLayout } from "./_lib/BaseLayout"

// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives
// an invalid value as the `[locale]` param and calls `notFound()`.

export default function GlobalNotFound() {
	const t = useTranslations("NotFoundPage")
	return (
		<BaseLayout locale={routing.defaultLocale}>
			<p className="max-w-[460px]">{t("description")}</p>
		</BaseLayout>
	)
}

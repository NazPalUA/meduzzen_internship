import { PageContainer } from "@/src/shared/ui/PageContainer"
import { useTranslations } from "next-intl"

export default function About() {
	const t = useTranslations("AboutPage")
	return (
		<PageContainer>
			<h2>{t("title")}</h2>
			<p>{t("description")}</p>
		</PageContainer>
	)
}

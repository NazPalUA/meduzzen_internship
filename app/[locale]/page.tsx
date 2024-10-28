import { ApiHealthCheck } from "@/src/features/api-health-check"
import { TestStore } from "@features/test-store"
import { PageContainer } from "@shared/ui/PageContainer"
import { useTranslations } from "next-intl"
import LearnMore from "./_lib/LearnMore"

export default function Home() {
  const t = useTranslations("HomePage")
  return (
    <PageContainer>
      <h1>{t("title")}</h1>
      <p>{t("welcomeMessage")}</p>
      <LearnMore />
      <TestStore />
      <ApiHealthCheck />
    </PageContainer>
  )
}

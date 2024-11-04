import { ApiHealthCheck } from "@/src/features/api-health-check"
import { Container } from "@/src/shared/ui/Container"
import { TestStore } from "@features/test-store"
import { useTranslations } from "next-intl"
import LearnMore from "./_lib/LearnMore"

export default function Home() {
  const t = useTranslations("HomePage")
  return (
    <>
      <section>
        <Container>
          <h1>{t("title")}</h1>
          <p>{t("welcomeMessage")}</p>
          <LearnMore />
        </Container>
      </section>
      <section>
        <Container>
          <TestStore />
          <ApiHealthCheck />
        </Container>
      </section>
    </>
  )
}

import { BaseLayout } from "@compose/BaseLayout"
import { routing } from "@shared/i18n/routing"
import { Footer } from "@widgets/Footer"
import { Header } from "@widgets/Header"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { ReactNode } from "react"
import styles from "./layout.module.scss"

type Props = {
  children: ReactNode
  params: { locale: string }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params: { locale } }: Omit<Props, "children">) {
  const t = await getTranslations({ locale, namespace: "LocaleLayout" })

  return {
    title: t("title"),
    description: t("description"),
  }
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  return (
    <BaseLayout locale={locale}>
      <div className={styles.root}>
        <Header />
        <main className={styles.main}>{children}</main>
        <Footer />
      </div>
    </BaseLayout>
  )
}

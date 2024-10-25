import { CssBaseline, StyledEngineProvider } from "@mui/material"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"
import { ThemeProvider } from "@mui/material/styles"
import { routing } from "@shared/i18n/routing"
import "@shared/styles/globals.css"
import theme from "@shared/styles/theme"
import { Footer } from "@widgets/Footer"
import { Header } from "@widgets/Header"
import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { Roboto } from "next/font/google"
import { notFound } from "next/navigation"
import styles from "./layout.module.scss"

const roboto = Roboto({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-roboto",
})

export const metadata: Metadata = {
	title: "Meduzzen Internship",
	description: "Meduzzen Internship Project",
}

export default async function RootLayout({
	children,
	params: { locale },
}: Readonly<{
	children: React.ReactNode
	params: { locale: string }
}>) {
	// Ensure that the incoming `locale` is valid
	if (!routing.locales.includes(locale as any)) {
		notFound()
	}

	// Providing all messages to the client
	// side is the easiest way to get started
	const messages = await getMessages()

	return (
		<html lang={locale}>
			<body className={roboto.variable}>
				<NextIntlClientProvider messages={messages}>
					<ThemeProvider theme={theme}>
						<AppRouterCacheProvider>
							<StyledEngineProvider injectFirst>
								<CssBaseline />
								<div className={styles.root}>
									<Header />
									<main className={styles.main}>{children}</main>
									<Footer />
								</div>
							</StyledEngineProvider>
						</AppRouterCacheProvider>
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}

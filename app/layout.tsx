import "@/src/shared/styles/globals.css"
import theme from "@/src/shared/styles/theme"
import { Footer } from "@/src/widgets/Footer"
import { Header } from "@/src/widgets/Header"
import { Box, CssBaseline } from "@mui/material"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"
import { ThemeProvider } from "@mui/material/styles"
import type { Metadata } from "next"
import { Roboto } from "next/font/google"
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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={roboto.variable}>
				<ThemeProvider theme={theme}>
					<AppRouterCacheProvider>
						<CssBaseline />
						<Box className={styles.root}>
							<Header />
							<Box component="main" className={styles.main}>
								{children}
							</Box>
							<Footer />
						</Box>
					</AppRouterCacheProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}

import { CssBaseline, StyledEngineProvider } from "@mui/material"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"
import { ThemeProvider } from "@mui/material/styles"
import { StoreProvider } from "@shared/store"
import "@shared/styles/globals.css"
import theme from "@shared/styles/theme"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { Roboto } from "next/font/google"
import { ReactNode } from "react"

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
})

type Props = {
  children: ReactNode
  locale: string
}

export async function BaseLayout({ children, locale }: Props) {
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={roboto.variable}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider theme={theme}>
            <AppRouterCacheProvider>
              <StyledEngineProvider injectFirst>
                <CssBaseline />
                <StoreProvider>{children}</StoreProvider>
              </StyledEngineProvider>
            </AppRouterCacheProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

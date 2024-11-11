import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"
import { ThemeProvider } from "@mui/material/styles"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { ReactNode } from "react"
import theme from "../styles/theme"
import { StoreProvider } from "./StoreProvider"

export async function Providers({ children }: { children: ReactNode }) {
  return (
    <NextIntlClientProvider messages={await getMessages()}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <StoreProvider>{children}</StoreProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </NextIntlClientProvider>
  )
}

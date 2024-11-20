import { ShowNotifications } from "@features/notifications"
import { CssBaseline } from "@mui/material"
import { Roboto } from "next/font/google"
import { ReactNode } from "react"
import { Providers } from "./providers"
import "./styles/globals.css"
import { Toaster } from "./Toaster"

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
  return (
    <html lang={locale}>
      <body className={roboto.variable}>
        <Providers>
          <CssBaseline />
          {children}
          <Toaster />
          <ShowNotifications />
        </Providers>
      </body>
    </html>
  )
}

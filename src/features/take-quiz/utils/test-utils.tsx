import { makeStore } from "@shared/store"
import { RenderOptions, render as rtlRender } from "@testing-library/react"
import { NextIntlClientProvider } from "next-intl"
import { ReactElement } from "react"
import { Provider } from "react-redux"
import { mockMessages } from "./mockMessages"

interface CustomRenderOptions extends RenderOptions {
  locale?: string
  messages?: Record<string, any>
}

const store = makeStore()

const customRender = (
  ui: ReactElement,
  { locale = "en", messages = mockMessages, ...options }: CustomRenderOptions = {},
) => {
  return rtlRender(
    <Provider store={store}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {ui}
      </NextIntlClientProvider>
    </Provider>,
    options,
  )
}

export * from "@testing-library/react"
export { customRender as render }

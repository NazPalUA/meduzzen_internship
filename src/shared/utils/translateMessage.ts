export const translateMessage =
  (t?: (key: string) => string) => (key: string, defaultMsg: string) => {
    return t ? t(key) : defaultMsg
  }

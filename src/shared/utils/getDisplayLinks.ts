type DisplayLink = {
  url: string
  displayText: string
}

export const getDisplayLinks = (company_links: string[] | null): DisplayLink[] =>
  company_links
    ? company_links
        .map((link) => {
          try {
            const url = new URL(link)
            return {
              url: url.toString(),
              displayText: url.hostname.replace(/^www\./, ""),
            }
          } catch {
            return null
          }
        })
        .filter((link) => link !== null)
    : []

export const getCurrentPage = (searchParams: URLSearchParams): number => {
  const page = Number(searchParams.get("page") ?? 1)
  return Number.isInteger(page) && page > 0 ? page : 1
}

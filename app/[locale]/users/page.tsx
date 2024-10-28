import { PageContainer } from "@shared/ui/PageContainer"
import { UsersList } from "@widgets/UsersList"
import { useTranslations } from "next-intl"
import { setRequestLocale } from "next-intl/server"

const mockUsers = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
  { id: "3", name: "Alice Johnson", email: "alice@example.com" },
  { id: "4", name: "Bob Brown", email: "bob@example.com" },
  { id: "5", name: "Charlie Davis", email: "charlie@example.com" },
  { id: "6", name: "Diana Garcia", email: "diana@example.com" },
  { id: "7", name: "Ethan Martinez", email: "ethan@example.com" },
  { id: "8", name: "Fiona Rodriguez", email: "fiona@example.com" },
  { id: "9", name: "George Lee", email: "george@example.com" },
  { id: "10", name: "Hannah Nguyen", email: "hannah@example.com" },
]

type Props = {
  params: { locale: string }
}

export default function Users({ params: { locale } }: Props) {
  // Enable static rendering
  setRequestLocale(locale)

  const t = useTranslations("UsersPage")
  return (
    <PageContainer>
      <h2>{t("title")}</h2>
      <p>{t("description")}</p>
      <UsersList users={mockUsers} />
    </PageContainer>
  )
}

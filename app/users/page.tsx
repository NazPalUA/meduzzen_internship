import { USERS_PAGE_TEXT } from "@/src/shared/constants/texts"
import { PageContainer } from "@/src/shared/ui/PageContainer"
import { UsersList } from "@/src/widgets/UsersList"

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

export default function Users() {
	return (
		<PageContainer>
			<h2>{USERS_PAGE_TEXT.TITLE}</h2>
			<p>{USERS_PAGE_TEXT.DESCRIPTION}</p>
			<UsersList users={mockUsers} />
		</PageContainer>
	)
}

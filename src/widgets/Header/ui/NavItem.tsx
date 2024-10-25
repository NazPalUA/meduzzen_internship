import { Link } from "@/src/shared/i18n/navigation"
import { Button } from "@mui/material"

type Props = {
	href: string
	label: string
}

export function NavItem({ href, label }: Props) {
	return (
		<Link href={href}>
			<Button color="inherit">{label}</Button>
		</Link>
	)
}

import { Button } from "@mui/material"
import { Link } from "@navigation"

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

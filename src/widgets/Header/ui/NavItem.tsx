import { Button } from "@mui/material"
import Link from "next/link"

type Props = {
	href: string
	label: string
}

export function NavItem({ href, label }: Props) {
	return (
		<Button color="inherit" component={Link} href={href}>
			{label}
		</Button>
	)
}

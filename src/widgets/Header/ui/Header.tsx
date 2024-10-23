import { HEADER_TEXT } from "@/src/shared/constants/texts"
import { AppBar, Box, Toolbar, Typography } from "@mui/material"
import { links } from "../lib/links"
import { NavItem } from "./NavItem"

export function Header() {
	return (
		<AppBar position="static" component="header">
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					{HEADER_TEXT.TITLE}
				</Typography>
				<Box>
					{links.map(({ href, label }) => (
						<NavItem key={href} href={href} label={label} />
					))}
				</Box>
			</Toolbar>
		</AppBar>
	)
}

import { HEADER_TEXT } from "@/src/shared/constants/texts"
import { AppBar, Box, Toolbar } from "@mui/material"
import { links } from "../lib/links"
import styles from "./Header.module.scss"
import { NavItem } from "./NavItem"

export function Header() {
	return (
		<AppBar position="static" component="header">
			<Toolbar>
				<div className={styles.title}>{HEADER_TEXT.TITLE}</div>
				<Box>
					{links.map(({ href, label }) => (
						<NavItem key={href} href={href} label={label} />
					))}
				</Box>
			</Toolbar>
		</AppBar>
	)
}

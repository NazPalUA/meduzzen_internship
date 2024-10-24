import { FOOTER_TEXT } from "@/src/shared/constants/texts"
import { Box, Container, Link } from "@mui/material"
import styles from "./Footer.module.scss"

export function Footer() {
	return (
		<Box
			component="footer"
			className={styles.footer}
			sx={{
				backgroundColor: "primary.main",
				color: "white",
			}}
		>
			<Container maxWidth="sm" className={styles.container}>
				<p>
					© {new Date().getFullYear()} {FOOTER_TEXT.COPYRIGHT}
				</p>
				<p>
					<Link href="#" color="inherit" underline="hover">
						{FOOTER_TEXT.PRIVACY_POLICY_LINK_LABEL}
					</Link>
					{" | "}
					<Link href="#" color="inherit" underline="hover">
						{FOOTER_TEXT.TERMS_OF_SERVICE_LINK_LABEL}
					</Link>
				</p>
			</Container>
		</Box>
	)
}

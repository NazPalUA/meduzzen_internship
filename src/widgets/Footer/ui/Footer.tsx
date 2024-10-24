import { FOOTER_TEXT } from "@/src/shared/constants/texts"
import { Box, Container, Link, Typography } from "@mui/material"
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
			<Container maxWidth="sm">
				<Typography variant="body1" className={styles.typographyBody1}>
					© {new Date().getFullYear()} {FOOTER_TEXT.COPYRIGHT}
				</Typography>
				<Typography variant="body2" className={styles.typographyBody2}>
					<Link href="#" color="inherit" underline="hover">
						{FOOTER_TEXT.PRIVACY_POLICY_LINK_LABEL}
					</Link>
					{" | "}
					<Link href="#" color="inherit" underline="hover">
						{FOOTER_TEXT.TERMS_OF_SERVICE_LINK_LABEL}
					</Link>
				</Typography>
			</Container>
		</Box>
	)
}

import { FOOTER_TEXT } from "@/src/shared/constants/texts"
import { Box, Container } from "@mui/material"
import Link from "next/link"
import styles from "./Footer.module.scss"

export function Footer() {
	return (
		<Box component="footer" className={styles.footer}>
			<Container maxWidth="sm" className={styles.container}>
				<div>
					© {new Date().getFullYear()} {FOOTER_TEXT.COPYRIGHT}
				</div>
				<div>
					<Link href="#" className={styles.link}>
						{FOOTER_TEXT.PRIVACY_POLICY_LINK_LABEL}
					</Link>
					{" | "}
					<Link href="#" className={styles.link}>
						{FOOTER_TEXT.TERMS_OF_SERVICE_LINK_LABEL}
					</Link>
				</div>
			</Container>
		</Box>
	)
}

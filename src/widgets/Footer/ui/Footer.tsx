import { FOOTER_TEXT } from "@/src/shared/constants/texts"
import { Box, Container, Link, Typography } from "@mui/material"

export function Footer() {
	return (
		<Box
			component="footer"
			sx={{
				py: 3,
				px: 2,
				mt: "auto",
				backgroundColor: "primary.main",
				color: "white",
			}}
		>
			<Container maxWidth="sm">
				<Typography variant="body1" align="center">
					© {new Date().getFullYear()} {FOOTER_TEXT.COPYRIGHT}
				</Typography>
				<Typography variant="body2" align="center" sx={{ mt: 1 }}>
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

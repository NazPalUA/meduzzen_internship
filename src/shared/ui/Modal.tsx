"use client"

import {
	Box,
	Button,
	Modal as MuiModal,
	Typography,
	useTheme,
} from "@mui/material"

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "90%",
	maxWidth: 500,
	bgcolor: "background.paper",
	borderRadius: 8,
	boxShadow: 24,
	p: 4,
	transition: "opacity 0.3s ease-in-out",
}

type Props = {
	open: boolean
	onClose: () => void
	title: string
	children: React.ReactNode
}

export function Modal({ open, onClose, title, children }: Props) {
	const theme = useTheme()

	return (
		<MuiModal
			open={open}
			onClose={onClose}
			aria-labelledby="modal-title"
			aria-describedby="modal-description"
		>
			<Box sx={style} role="dialog" aria-modal="true">
				<Typography
					id="modal-title"
					variant="h6"
					component="h2"
					tabIndex={-1}
					sx={{ color: theme.palette.text.primary, fontWeight: "bold" }}
				>
					{title}
				</Typography>
				<Typography
					id="modal-description"
					sx={{ mt: 2, color: theme.palette.text.secondary }}
				>
					{children}
				</Typography>
				<Button
					onClick={onClose}
					variant="contained"
					color="primary"
					sx={{ mt: 2 }}
				>
					Close
				</Button>
			</Box>
		</MuiModal>
	)
}

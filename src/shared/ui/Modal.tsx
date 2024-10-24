"use client"

import { Box, Button, Modal as MuiModal, useTheme } from "@mui/material"
import styles from "./Modal.module.scss"

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
				<strong
					id="modal-title"
					tabIndex={-1}
					color={theme.palette.text.primary}
				>
					{title}
				</strong>
				<div id="modal-description" className={styles.content}>
					{children}
				</div>
				<Button
					onClick={onClose}
					variant="contained"
					color="primary"
					className={styles.closeButton}
				>
					Close
				</Button>
			</Box>
		</MuiModal>
	)
}

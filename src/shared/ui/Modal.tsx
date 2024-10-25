import { Button, Modal as MuiModal } from "@mui/material"
import styles from "./Modal.module.scss"

type Props = {
	open: boolean
	onClose: () => void
	title: string
	children: React.ReactNode
}

export function Modal({ open, onClose, title, children }: Props) {
	return (
		<MuiModal
			open={open}
			onClose={onClose}
			aria-labelledby="modal-title"
			aria-describedby="modal-description"
		>
			<div className={styles.container}>
				<strong id="modal-title">{title}</strong>
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
			</div>
		</MuiModal>
	)
}

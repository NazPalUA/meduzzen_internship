// Use as example of how to use the Modal component

"use client"

import { HOME_PAGE_TEXT } from "@/src/shared/constants/texts"
import { Modal } from "@/src/shared/ui/Modal"
import { Button, Typography } from "@mui/material"
import { useState } from "react"

export default function LearnMore() {
	const [modalOpen, setModalOpen] = useState(false)

	const handleOpen = () => setModalOpen(true)
	const handleClose = () => setModalOpen(false)
	return (
		<>
			<Button variant="contained" color="primary" onClick={handleOpen}>
				{HOME_PAGE_TEXT.LEARN_MORE_BUTTON}
			</Button>
			<Modal
				open={modalOpen}
				onClose={handleClose}
				title="Learn More"
				content={<Typography>Your content goes here.</Typography>}
			/>
		</>
	)
}

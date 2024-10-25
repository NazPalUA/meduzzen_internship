// Use as example of how to use the Modal component

"use client"

import { Button } from "@mui/material"
import { Modal } from "@shared/ui/Modal"
import { useTranslations } from "next-intl"
import { useState } from "react"

export default function LearnMore() {
	const [modalOpen, setModalOpen] = useState(false)
	const t = useTranslations("HomePage")

	const handleOpen = () => setModalOpen(true)
	const handleClose = () => setModalOpen(false)
	return (
		<>
			<Button variant="contained" onClick={handleOpen}>
				{t("learnMoreButton")}
			</Button>
			<Modal open={modalOpen} onClose={handleClose} title="Learn More">
				<p>Your content goes here.</p>
			</Modal>
		</>
	)
}

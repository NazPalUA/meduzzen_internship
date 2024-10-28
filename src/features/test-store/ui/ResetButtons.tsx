"use client"

import { Button } from "@mui/material"
import { useTranslations } from "next-intl"
import { useDispatch } from "react-redux"
import { resetAll, resetValueA, resetValueB } from "../model/test.slice"
import styles from "./ResetButtons.module.scss"

export const ResetButtons = () => {
	const dispatch = useDispatch()
	const t = useTranslations("TestStore")
	return (
		<div className={styles.container}>
			<Button variant="contained" onClick={() => dispatch(resetValueA())}>
				{t("resetButton") + " A"}
			</Button>
			<Button variant="contained" onClick={() => dispatch(resetAll())}>
				{t("resetAllButton")}
			</Button>
			<Button variant="contained" onClick={() => dispatch(resetValueB())}>
				{t("resetButton") + " B"}
			</Button>
		</div>
	)
}

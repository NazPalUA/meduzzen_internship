"use client"

import { Button, TextField } from "@mui/material"

import { RootState, useAppDispatch, useAppSelector } from "@shared/store"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { useSelector } from "react-redux"
import { selectTestValueB, updateTestValueA, updateTestValueB } from "../model/test.slice"
import styles from "./TestComponent.module.scss"

export function TestComponentBetta() {
  const dispatch = useAppDispatch()

  const testValueB = useAppSelector(selectTestValueB)
  const { testValueA } = useSelector((state: RootState) => state.test)

  const [inputValue, setInputValue] = useState("")
  const t = useTranslations("TestStore")

  return (
    <div className={styles.container}>
      <h4>{t("title") + " Betta:"}</h4>
      <strong>A: {testValueA}</strong>
      <strong>B: {testValueB}</strong>
      <TextField
        label={t("inputLabel")}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button variant="contained" onClick={() => dispatch(updateTestValueA(inputValue))}>
        {t("updateButton") + " A"}
      </Button>
      <Button variant="contained" onClick={() => dispatch(updateTestValueB(inputValue))}>
        {t("updateButton") + " B"}
      </Button>
    </div>
  )
}

"use client"

import { useCreateActionFromCompanyMutation } from "@features/action"
import { Button, CircularProgress, Input } from "@mui/material"
import { useToaster } from "@shared/hooks"
import { useTranslations } from "next-intl"
import React, { useState } from "react"
import { z } from "zod"
import styles from "./Styles.module.scss"

export function InviteFromCompany({ companyId }: { companyId: number }) {
  const [userId, setUserId] = useState<string>("")
  const [userIdError, setUserIdError] = useState<string>("")

  const t = useTranslations()

  const userIdSchema = z.string().regex(/^[0-9]+$/, { message: t("Validation.userId.number") })
  const [inviteUser, { isLoading }] = useCreateActionFromCompanyMutation()
  const { toastError, toastSuccess } = useToaster()

  const validateUserId = (id: string): boolean => {
    const result = userIdSchema.safeParse(id)
    if (!result.success) {
      setUserIdError(result.error.errors[0].message)
      return false
    }
    setUserIdError("")
    return true
  }

  const handleSendRequest = async () => {
    if (!validateUserId(userId)) {
      return
    }

    try {
      await inviteUser({ companyId, userId: Number(userId.trim()) }).unwrap()
      toastSuccess(t("CompanyPage.invites.successInvite"))
      setUserId("")
    } catch (error) {
      console.error(error)
      toastError(t("CompanyPage.invites.errorInvite"))
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value)
    if (userIdError) {
      validateUserId(e.target.value)
    }
  }

  return (
    <div className={styles.invites__formContainer}>
      {userIdError && <small className={styles.invites__formError}>{userIdError}</small>}
      <Input
        type="text"
        value={userId}
        onChange={handleInputChange}
        placeholder={t("CompanyPage.invites.enterUserId")}
        aria-label={t("CompanyPage.invites.enterUserId")}
        disabled={isLoading}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
      />

      <Button
        onClick={handleSendRequest}
        variant="outlined"
        color="primary"
        size="small"
        disabled={isLoading}
        startIcon={isLoading ? <CircularProgress size={16} /> : undefined}
      >
        {t("CompanyPage.invites.inviteUser")}
      </Button>
    </div>
  )
}

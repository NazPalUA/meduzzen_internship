"use client"

import { CurrentUser } from "@entities/session"
import { useUpdateUserAvatarMutation } from "@entities/user"
import { Button, CircularProgress } from "@mui/material"
import { useOverlays } from "@shared/overlays"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { ChangeEvent, useState } from "react"
import styles from "./UpdateAvatarForm.module.scss"

export function UpdateAvatarForm({ user }: { user: CurrentUser }) {
  const [updateUserAvatar, { isLoading }] = useUpdateUserAvatarMutation()

  const t = useTranslations("UpdateUser.avatar")
  const { toastError, toastSuccess, closeModal } = useOverlays()

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleSubmit = async () => {
    if (!selectedFile) {
      toastError(t("result.error"))
      return
    }

    try {
      await updateUserAvatar({
        userId: user.user_id.toString(),
        avatar: { file: selectedFile },
      }).unwrap()
      toastSuccess(t("result.success"))
      setPreviewUrl(null)
      setSelectedFile(null)
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      closeModal()
    } catch {
      toastError(t("result.error"))
    }
  }

  return (
    <div className={styles.container}>
      <input
        accept="image/*"
        className={styles.hiddenInput}
        id="avatar-file-input"
        type="file"
        onChange={handleFileSelect}
      />

      <Button variant="contained" component="label" htmlFor="avatar-file-input">
        {t("chooseFile")}
      </Button>

      {previewUrl && (
        <Image
          src={previewUrl}
          alt="Avatar preview"
          width={250}
          height={250}
          className={styles.previewImage}
        />
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!selectedFile || isLoading}
        fullWidth
      >
        {isLoading ? <CircularProgress size={24} /> : t("submitText")}
      </Button>
    </div>
  )
}

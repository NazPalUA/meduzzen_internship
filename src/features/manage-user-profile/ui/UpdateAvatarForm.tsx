"use client"

import { CurrentUser } from "@entities/session"
import { useUpdateUserAvatarMutation } from "@entities/user"
import { Button, CircularProgress } from "@mui/material"
import { useDialog, useToaster } from "@shared/hooks"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { ChangeEvent, useState } from "react"
import styles from "./Styles.module.scss"

export function UpdateAvatarForm({ user }: { user: CurrentUser }) {
  const [updateUserAvatar, { isLoading }] = useUpdateUserAvatarMutation()

  const t = useTranslations("UpdateUser.avatar")
  const { toastError, toastSuccess } = useToaster()
  const { closeDialog } = useDialog()

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
        userId: user.user_id,
        avatar: { file: selectedFile },
      }).unwrap()
      toastSuccess(t("result.success"))
      setPreviewUrl(null)
      setSelectedFile(null)
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      closeDialog()
    } catch {
      toastError(t("result.error"))
    }
  }

  return (
    <div className={styles["update-avatar"]}>
      <input
        accept="image/*"
        className={styles["update-avatar__hidden-input"]}
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
          className={styles["update-avatar__preview-image"]}
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

"use client"

import { Avatar as MuiAvatar } from "@mui/material"
import Image from "next/image"

type AvatarSize = "sm" | "md" | "lg"

type Props = {
  src?: string | null
  alt: string
  size?: AvatarSize
}

const SIZE_DIMENSIONS: Record<AvatarSize, number> = {
  sm: 40,
  md: 60,
  lg: 100,
}

export function Avatar({ src, alt, size = "md" }: Props) {
  const dimension = SIZE_DIMENSIONS[size]

  return (
    <MuiAvatar
      sx={{
        width: dimension,
        height: dimension,
      }}
    >
      {src ? <Image src={src} fill sizes={`${dimension}px`} alt={alt} /> : alt.charAt(0)}
    </MuiAvatar>
  )
}

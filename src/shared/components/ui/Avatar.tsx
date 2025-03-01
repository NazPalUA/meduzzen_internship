"use client"

import { Avatar as MuiAvatar } from "@mui/material"
import Image from "next/image"

type AvatarSize = "xs" | "sm" | "md" | "lg"

type Props = {
  src?: string | null
  alt: string
  size?: AvatarSize
  cacheKey?: string | number
}

const SIZE_DIMENSIONS: Record<AvatarSize, number> = {
  xs: 30,
  sm: 40,
  md: 60,
  lg: 100,
}

export function Avatar({ src, alt, size = "md", cacheKey }: Props) {
  const dimension = SIZE_DIMENSIONS[size]

  const noCacheImageSrc = cacheKey && src ? `${src}?cb=${cacheKey}` : null

  const imageSrc = noCacheImageSrc || src

  return (
    <MuiAvatar
      sx={{
        width: dimension,
        height: dimension,
      }}
    >
      {imageSrc ? <Image src={imageSrc} fill sizes={`${dimension}px`} alt={alt} /> : alt.charAt(0)}
    </MuiAvatar>
  )
}

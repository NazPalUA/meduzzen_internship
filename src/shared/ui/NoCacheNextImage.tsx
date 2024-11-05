import Image, { type ImageProps } from "next/image"

interface NoCacheNextImageProps extends ImageProps {
  cacheKey?: string | number
}

export function NoCacheNextImage({ src, cacheKey, ...props }: NoCacheNextImageProps) {
  const noCacheUrl = cacheKey ? `${src}?cb=${cacheKey}` : src

  return <Image src={noCacheUrl} {...props} />
}

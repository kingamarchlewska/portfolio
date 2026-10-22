import Image, { type ImageProps } from "next/image"

export default function SiteImage({
  width = 1800,
  height = 1200,
  sizes = "100vw",
  ...props
}: Omit<ImageProps, "width" | "height"> & {
  width?: number
  height?: number
}) {
  return <Image width={width} height={height} sizes={sizes} {...props} />
}

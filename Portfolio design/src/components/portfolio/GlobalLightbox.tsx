"use client"

import SiteImage from "./SiteImage"
import { useEffect, useRef, useState } from "react"

type LightboxImage = {
  src: string
  alt: string
}

const IMAGE_SELECTOR = "img:not([data-lightbox-disabled])"

export default function GlobalLightbox() {
  const [activeImage, setActiveImage] = useState<LightboxImage | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const prepareImage = (image: HTMLImageElement) => {
      if (image.dataset.lightboxReady) return
      image.dataset.lightboxReady = "true"
      image.classList.add("clickable-photo")
      image.tabIndex = 0
      image.setAttribute("role", "button")
      image.setAttribute(
        "aria-label",
        `View ${image.alt || "image"} at full size`,
      )
    }

    document
      .querySelectorAll<HTMLImageElement>(IMAGE_SELECTOR)
      .forEach(prepareImage)

    const observer = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (
            node instanceof HTMLImageElement &&
            node.matches(IMAGE_SELECTOR)
          ) {
            prepareImage(node)
          } else if (node instanceof Element) {
            node
              .querySelectorAll<HTMLImageElement>(IMAGE_SELECTOR)
              .forEach(prepareImage)
          }
        })
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })

    const openImage = (image: HTMLImageElement) => {
      setActiveImage({
        src: image.currentSrc || image.src,
        alt: image.alt,
      })
    }

    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return
      const image = event.target.closest<HTMLImageElement>(IMAGE_SELECTOR)
      if (!image) return
      event.preventDefault()
      event.stopPropagation()
      openImage(image)
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (!(event.target instanceof HTMLImageElement)) return
      if (!event.target.matches(IMAGE_SELECTOR)) return
      if (event.key !== "Enter" && event.key !== " ") return
      event.preventDefault()
      event.stopPropagation()
      openImage(event.target)
    }

    document.addEventListener("click", handleClick, true)
    document.addEventListener("keydown", handleKeydown, true)

    return () => {
      observer.disconnect()
      document.removeEventListener("click", handleClick, true)
      document.removeEventListener("keydown", handleKeydown, true)
    }
  }, [])

  useEffect(() => {
    if (!activeImage) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeButtonRef.current?.focus()

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveImage(null)
    }

    window.addEventListener("keydown", handleEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleEscape)
    }
  }, [activeImage])

  if (!activeImage) return null

  return (
    <div
      className="photo-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Full-size image viewer"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setActiveImage(null)
      }}
    >
      <button
        ref={closeButtonRef}
        type="button"
        className="photo-lightbox__close"
        onClick={() => setActiveImage(null)}
        aria-label="Close full-size image"
      >
        ×
      </button>
      <figure className="photo-lightbox__figure">
        <SiteImage
          src={activeImage.src}
          alt={activeImage.alt}
          data-lightbox-disabled
        />
        {activeImage.alt && <figcaption>{activeImage.alt}</figcaption>}
      </figure>
    </div>
  )
}

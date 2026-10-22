"use client"
/* ── Lightbox ── */

/* lock scroll */ /* Top bar */ /* Image */ /* Caption */ /* Prev / Next */ /* Dot strip */ /* handled by parent index */

/* ── Photo tile ── */

/* ── Collection block ── */

/* ── Page ── */ /* NAV */ /* PAGE CONTENT */
import SiteImage from "./SiteImage"

import { useRef, useState, useEffect, useCallback } from "react"
import Link from "next/link"
import BackToHome from "./BackToHome"

function useReveal(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.06, ...options },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

const COLLECTIONS = [
  {
    index: "01",
    kind: "Places",
    title: "Highlands",
    note: "Mountains, fog, and the particular silence of high places.",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1486707471592-8e7eb7e36f78?w=1400&h=1800&fit=crop&auto=format",
        caption: "Somewhere in the fog",
        ratio: "3/4",
      },
      {
        url: "https://images.unsplash.com/photo-1670702146868-bc7797ef47a5?w=1400&h=1800&fit=crop&auto=format",
        caption: "Black peaks, white sky",
        ratio: "3/4",
      },
      {
        url: "https://images.unsplash.com/photo-1508108712903-49b7ef9b1df8?w=1800&h=900&fit=crop&auto=format",
        caption: "The valley below",
        ratio: "16/7",
      },
      {
        url: "https://images.unsplash.com/photo-1530814475243-8163d9d8bf41?w=1800&h=900&fit=crop&auto=format",
        caption: "Bird's eye",
        ratio: "16/7",
      },
    ],
  },
  {
    index: "02",
    kind: "Places",
    title: "Old Towns",
    note: "The streets that remember more than we do.",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1776368585964-3c25adcf7e5a?w=1800&h=900&fit=crop&auto=format",
        caption: "Medieval light",
        ratio: "16/7",
      },
      {
        url: "https://images.unsplash.com/photo-1783784034884-6ecc694d2e7d?w=1400&h=1800&fit=crop&auto=format",
        caption: "Lavender & lamp",
        ratio: "3/4",
      },
      {
        url: "https://images.unsplash.com/photo-1750456254362-92611755023a?w=1400&h=1800&fit=crop&auto=format",
        caption: "Golden hour stone",
        ratio: "3/4",
      },
      {
        url: "https://images.unsplash.com/photo-1762656669588-4541674a2b4e?w=1400&h=1800&fit=crop&auto=format",
        caption: "Cobblestones at dusk",
        ratio: "3/4",
      },
    ],
  },
  {
    index: "03",
    kind: "Places",
    title: "Waterscapes",
    note: "Still water, open horizons, and light doing what it wants.",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1717256644703-20bc59957326?w=1400&h=1800&fit=crop&auto=format",
        caption: "Far out",
        ratio: "3/4",
      },
      {
        url: "https://images.unsplash.com/photo-1426072921656-9b0950fb99b2?w=1800&h=900&fit=crop&auto=format",
        caption: "Blue afternoon",
        ratio: "16/7",
      },
      {
        url: "https://images.unsplash.com/photo-1485955891060-a3318433e95f?w=1400&h=1800&fit=crop&auto=format",
        caption: "Mirror",
        ratio: "3/4",
      },
      {
        url: "https://images.unsplash.com/photo-1441829266145-6d4bfbd38eb4?w=1800&h=900&fit=crop&auto=format",
        caption: "Open water",
        ratio: "16/7",
      },
    ],
  },
]
const FILTERS = ["All", "Places", "Events"] as const
function Lightbox({
  collection,
  photoIndex,
  onClose,
  onPrev,
  onNext,
}: {
  collection: typeof COLLECTIONS[0]
  photoIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const photo = collection.photos[photoIndex]
  const total = collection.photos.length

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose, onPrev, onNext])
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <div
      className="photo-gallery-page"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        backgroundColor: "rgba(10,8,8,0.96)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      {}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem 1.75rem",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <span
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "0.9rem",
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.04em",
          }}
        >
          {collection.title}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <span
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.35)",
              fontFamily: "'Lora', serif",
            }}
          >
            {photoIndex + 1} / {total}
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(255,255,255,0.6)",
              fontSize: "1.3rem",
              lineHeight: 1,
              padding: "0.25rem",
            }}
            className="hover:text-white transition-colors menu-close"
          >
            ✕
          </button>
        </div>
      </div>

      {}
      <div
        style={{
          maxWidth: "min(90vw, 1100px)",
          maxHeight: "78vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <SiteImage
          key={photo.url}
          src={photo.url}
          alt={photo.caption}
          data-lightbox-disabled
          style={{
            maxWidth: "100%",
            maxHeight: "78vh",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>

      {}
      <p
        style={{
          marginTop: "1.2rem",
          fontSize: "0.78rem",
          fontStyle: "italic",
          letterSpacing: "0.06em",
          color: "rgba(255,255,255,0.45)",
          fontFamily: "'Lora', serif",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {photo.caption}
      </p>

      {}
      {photoIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
          aria-label="Previous photo"
          style={{
            position: "absolute",
            left: "1.25rem",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.6)",
            width: 44,
            height: 44,
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "border-color 0.2s, color 0.2s",
          }}
          className="hover:!border-white/60 hover:!text-white"
        >
          ←
        </button>
      )}
      {photoIndex < total - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          aria-label="Next photo"
          style={{
            position: "absolute",
            right: "1.25rem",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.6)",
            width: 44,
            height: 44,
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "border-color 0.2s, color 0.2s",
          }}
          className="hover:!border-white/60 hover:!text-white"
        >
          →
        </button>
      )}

      {}
      <div
        style={{
          position: "absolute",
          bottom: "1.5rem",
          display: "flex",
          gap: "0.4rem",
        }}
      >
        {collection.photos.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation()
            }}
            aria-label={`Photo ${i + 1}`}
            style={{
              width: i === photoIndex ? 18 : 6,
              height: 6,
              borderRadius: 3,
              backgroundColor:
                i === photoIndex
                  ? "rgba(255,255,255,0.8)"
                  : "rgba(255,255,255,0.2)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "width 0.25s, background-color 0.25s",
            }}
          />
        ))}
      </div>
    </div>
  )
}
function Photo({
  url,
  caption,
  ratio,
  delay,
  onClick,
}: {
  url: string
  caption: string
  ratio: string
  delay: number
  onClick: () => void
}) {
  return (
    <figure className="gallery-photo" style={{ margin: 0 }}>
      <div
        className="overflow-hidden group cursor-zoom-in"
        style={{ aspectRatio: ratio, backgroundColor: "#ede8e4" }}
        onClick={onClick}
      >
        <SiteImage
          src={url}
          alt={caption}
          data-lightbox-disabled
          className="w-full h-full object-cover block transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          style={{ transitionDelay: `${delay}s` }}
        />
      </div>
      <figcaption
        style={{
          marginTop: "0.55rem",
          fontSize: "0.7rem",
          letterSpacing: "0.08em",
          color: "#a09090",
          fontFamily: "'Lora', serif",
          fontStyle: "italic",
        }}
      >
        {caption}
      </figcaption>
    </figure>
  )
}
function Collection({
  c,
  layoutIndex,
  onOpenPhoto,
}: {
  c: typeof COLLECTIONS[0]
  layoutIndex: number
  onOpenPhoto: (photoIndex: number) => void
}) {
  const heading = useReveal()
  const grid = useReveal()
  const portraits = c.photos.filter((p) => p.ratio === "3/4")
  const wides = c.photos.filter((p) => p.ratio === "16/7")
  const portraitIndices = c.photos.reduce<number[]>((acc, p, i) => {
    if (p.ratio === "3/4") acc.push(i)
    return acc
  }, [])
  const wideIndices = c.photos.reduce<number[]>((acc, p, i) => {
    if (p.ratio === "16/7") acc.push(i)
    return acc
  }, [])

  return (
    <section className="gallery-collection" style={{ marginBottom: "7rem" }}>
      <div
        ref={heading.ref}
        className={`gallery-collection__heading reveal${
          heading.visible ? " visible" : ""
        }`}
        style={{ marginBottom: "2.5rem" }}
      >
        <div
          className="gallery-collection__title"
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "1.2rem",
            marginBottom: "0.7rem",
          }}
        >
          <span
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              color: "#c0a8a8",
              textTransform: "uppercase",
              fontFamily: "'Lora', serif",
            }}
          >
            {c.index}
          </span>
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 400,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#1c1a1a",
              letterSpacing: "-0.01em",
              lineHeight: 1,
              margin: 0,
            }}
          >
            {c.title}
          </h2>
        </div>
        <div className="gallery-collection__meta">
          <span>{c.kind}</span>
          <span>{c.photos.length} photographs</span>
        </div>
        <p
          style={{
            fontSize: "0.82rem",
            color: "#9e8a8a",
            fontStyle: "italic",
            lineHeight: 1.6,
            maxWidth: "48ch",
          }}
        >
          {c.note}
        </p>
      </div>

      <div
        ref={grid.ref}
        className={`reveal${grid.visible ? " visible" : ""} delay-200`}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {layoutIndex % 2 === 0 ? (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1rem",
              }}
            >
              {portraits.map((p, i) => (
                <Photo
                  key={i}
                  url={p.url}
                  caption={p.caption}
                  ratio={p.ratio}
                  delay={i * 0.08}
                  onClick={() => onOpenPhoto(portraitIndices[i])}
                />
              ))}
            </div>
            {wides.map((p, i) => (
              <Photo
                key={i}
                url={p.url}
                caption={p.caption}
                ratio={p.ratio}
                delay={i * 0.08}
                onClick={() => onOpenPhoto(wideIndices[i])}
              />
            ))}
          </>
        ) : (
          <>
            {wides.slice(0, 1).map((p, i) => (
              <Photo
                key={i}
                url={p.url}
                caption={p.caption}
                ratio={p.ratio}
                delay={0}
                onClick={() => onOpenPhoto(wideIndices[i])}
              />
            ))}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1rem",
              }}
            >
              {portraits.map((p, i) => (
                <Photo
                  key={i}
                  url={p.url}
                  caption={p.caption}
                  ratio={p.ratio}
                  delay={i * 0.08}
                  onClick={() => onOpenPhoto(portraitIndices[i])}
                />
              ))}
            </div>
            {wides.slice(1).map((p, i) => (
              <Photo
                key={i}
                url={p.url}
                caption={p.caption}
                ratio={p.ratio}
                delay={0.3}
                onClick={() => onOpenPhoto(wideIndices[i + 1])}
              />
            ))}
          </>
        )}
      </div>

      <div
        style={{ marginTop: "5rem", height: 1, backgroundColor: "#e8dcd8" }}
      />
    </section>
  )
}
export default function PhotoGalleryPage() {
  const hero = useReveal()
  const [lightbox, setLightbox] = useState<{
    collectionIndex: number
    photoIndex: number
  } | null>(null)
  const [activeFilter, setActiveFilter] =
    useState<typeof FILTERS[number]>("All")

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const openLightbox = useCallback(
    (collectionIndex: number, photoIndex: number) => {
      setLightbox({ collectionIndex, photoIndex })
    },
    [],
  )

  const closeLightbox = useCallback(() => setLightbox(null), [])

  const prevPhoto = useCallback(() => {
    if (!lightbox) return
    setLightbox((lb) =>
      lb && lb.photoIndex > 0 ? { ...lb, photoIndex: lb.photoIndex - 1 } : lb,
    )
  }, [lightbox])

  const nextPhoto = useCallback(() => {
    if (!lightbox) return
    const total = COLLECTIONS[lightbox.collectionIndex].photos.length
    setLightbox((lb) =>
      lb && lb.photoIndex < total - 1
        ? { ...lb, photoIndex: lb.photoIndex + 1 }
        : lb,
    )
  }, [lightbox])

  const visibleCollections =
    activeFilter === "All"
      ? COLLECTIONS
      : COLLECTIONS.filter((collection) => collection.kind === activeFilter)

  return (
    <div
      className="photo-gallery-page"
      style={{
        fontFamily: "'Lora', serif",
        backgroundColor: "#faf9f7",
        minHeight: "100vh",
      }}
    >
      {lightbox && (
        <Lightbox
          collection={COLLECTIONS[lightbox.collectionIndex]}
          photoIndex={lightbox.photoIndex}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}

      {}
      <nav
        className="photo-gallery-nav fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
        style={{
          backgroundColor: "rgba(250,249,247,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(220,200,196,0.25)",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
          }}
          className="uppercase text-stone-500 tracking-widest hover:text-stone-800 transition-colors"
        >
          Kinga Marchlewska
        </Link>
        <BackToHome />
      </nav>

      {}
      <main className="gallery-journal">
        <div
          ref={hero.ref}
          className={`gallery-hero reveal${hero.visible ? " visible" : ""}`}
        >
          <div>
            <p className="gallery-hero__kicker">A growing visual journal</p>
            <h1>
              Places, people
              <br />
              <em>&amp; passing moments.</em>
            </h1>
          </div>
          <div className="gallery-hero__intro">
            <p>
              Photography is how I slow down. This is an evolving collection of
              places I wander through, events I want to remember, and small
              details that made me stop.
            </p>
            <dl>
              <div>
                <dt>Collections</dt>
                <dd>{COLLECTIONS.length}</dd>
              </div>
              <div>
                <dt>Photographs</dt>
                <dd>
                  {COLLECTIONS.reduce(
                    (total, collection) => total + collection.photos.length,
                    0,
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="gallery-filter" aria-label="Filter photo collections">
          <span>Browse by</span>
          <div>
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                className={activeFilter === filter ? "is-active" : ""}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="gallery-collections">
          {visibleCollections.length ? (
            visibleCollections.map((c) => {
              const originalIndex = COLLECTIONS.indexOf(c)
              return (
                <Collection
                  key={c.index}
                  c={c}
                  layoutIndex={originalIndex}
                  onOpenPhoto={(photoIndex) =>
                    openLightbox(originalIndex, photoIndex)
                  }
                />
              )
            })
          ) : (
            <div className="gallery-empty">
              <span>New chapter</span>
              <h2>Event stories will live here.</h2>
              <p>
                This journal is designed to grow one place, gathering, and
                memorable evening at a time.
              </p>
            </div>
          )}
        </div>

        <aside className="gallery-closing">
          <span>The journal keeps growing</span>
          <p>Places. Events. Ordinary days worth remembering.</p>
        </aside>
      </main>

      <div
        className="text-center pb-10"
        style={{
          fontSize: "0.7rem",
          letterSpacing: "0.08em",
          color: "#c0b0b0",
        }}
      >
        © 2026 Kinga Marchlewska
      </div>
    </div>
  )
}

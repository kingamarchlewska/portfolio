"use client"

import { useEffect } from "react"
import Link from "next/link"
import BackToHome from "./BackToHome"
const cvUrl = "/imports/kinga-marchlewska-cv.pdf"

export default function CvPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="projects-page cv-page">
      <nav className="projects-nav">
        <Link href="/" className="projects-nav__name">
          Kinga Marchlewska
        </Link>
        <div className="projects-nav__links">
          <Link href="/projects">Projects</Link>
          <Link href="/beyond">Community &amp; Leadership</Link>
          <Link href="/cv" aria-current="page">
            CV
          </Link>
          <BackToHome />
        </div>
      </nav>

      <header className="cv-hero">
        <div>
          <p className="projects-kicker">Curriculum vitae · 2026</p>
          <h1>The concise version.</h1>
        </div>
        <div className="cv-hero__intro">
          <p>
            Data Science & AI student with a foundation in international
            business, experience in global technology organizations, and a focus
            on medical AI, bioinformatics, and useful products.
          </p>
          <a className="editorial-button" href={cvUrl} download>
            <span>Download PDF</span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </header>

      <main className="cv-document-wrap">
        <object data={cvUrl} type="application/pdf" className="cv-document">
          <p>
            Your browser cannot display this PDF.{" "}
            <a href={cvUrl} download>
              Download the CV instead.
            </a>
          </p>
        </object>
      </main>
    </div>
  )
}

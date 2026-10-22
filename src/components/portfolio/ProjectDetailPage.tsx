"use client"

import SiteImage from "./SiteImage"
import { useEffect } from "react"
import Link from "next/link"
import { PROJECTS } from "./PortfolioPage"
import BackToHome from "./BackToHome"

export default function ProjectDetailPage({ slug }: { slug: string }) {
  const project = PROJECTS.find((item) => item.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!project)
    return (
      <main className="project-missing">
        <p>That case study could not be found.</p>
        <Link href="/projects">View all projects</Link>
      </main>
    )

  const media = [
    {
      type: "image" as const,
      src: project.image,
      alt: project.alt,
      caption: `${project.shortTitle} - primary project visual`,
    },
    ...(project.media ?? []),
  ]

  const sectionId = (heading: string) =>
    heading
      .toLowerCase()
      .replaceAll(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

  return (
    <div className="projects-page case-page">
      <nav className="projects-nav">
        <Link href="/" className="projects-nav__name">
          Kinga Marchlewska
        </Link>
        <div className="projects-nav__links">
          <Link href="/projects">All projects</Link>
          <Link href="/beyond">Community &amp; Leadership</Link>
          <Link href="/cv">CV</Link>
          <BackToHome />
        </div>
      </nav>

      <main>
        <nav
          className="case-pagination case-pagination--top"
          aria-label="Project navigation at top"
        >
          <Link href="/projects">← All projects</Link>
          <Link
            href={`/projects/${
              PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length].slug
            }`}
          >
            Next case study →
          </Link>
        </nav>

        <header className="case-hero">
          <div className="case-hero__copy">
            <p className="projects-kicker">
              Case study {project.number} · {project.year}
            </p>
            <h1>{project.title}</h1>
            <p className="case-hero__summary">{project.summary}</p>
            <div className="case-hero__cue">
              <span>Scroll to explore</span>
              <span aria-hidden="true">↓</span>
            </div>
            <dl className="project-meta">
              <div>
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>Field</dt>
                <dd>{project.domain}</dd>
              </div>
            </dl>
          </div>
          <div className="case-hero__visual">
            <SiteImage
              src={project.image}
              alt={project.alt}
              className={project.imageClass ?? "object-cover"}
            />
          </div>
        </header>

        <section className="case-body">
          <div className="project-metrics">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>

          <section className="case-media" id="project-gallery">
            <div className="case-media__heading">
              <div>
                <span>Visual walkthrough</span>
                <h2>See the project in action.</h2>
              </div>
            </div>
            <div className="case-media__grid">
              {media.map((item, index) => (
                <figure
                  className={
                    index === 0
                      ? "case-media__item case-media__item--lead"
                      : "case-media__item"
                  }
                  key={`${item.src}-${index}`}
                >
                  {item.type === "video" ? (
                    <video controls preload="metadata" poster={item.poster}>
                      <source src={item.src} />
                    </video>
                  ) : (
                    <SiteImage
                      src={item.src}
                      alt={item.alt}
                      className="object-contain"
                    />
                  )}
                  <figcaption>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {item.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <div className="case-content-layout">
            <aside className="case-contents">
              <span>On this page</span>
              <a href="#project-gallery">Project gallery</a>
              {project.sections.map((section, index) => (
                <a
                  href={`#${sectionId(section.heading)}`}
                  key={section.heading}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {section.heading}
                </a>
              ))}
            </aside>

            <div className="project-essay">
              {project.sections.map((section, index) => (
                <section
                  id={sectionId(section.heading)}
                  className={
                    section.heading === "What I took from it"
                      ? "case-chapter case-chapter--reflection"
                      : "case-chapter"
                  }
                  key={section.heading}
                >
                  <div className="case-chapter__heading">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h2>{section.heading}</h2>
                  </div>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets && (
                    <ul>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </div>

          <div className="project-detail__footer">
            <div className="project-tags" aria-label="Technologies used">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="case-links">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="text-link"
                >
                  View prototype <span aria-hidden="true">↗</span>
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="text-link"
                >
                  View repository <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>
        </section>

        <nav className="case-pagination" aria-label="Project navigation">
          <Link href="/projects">← All projects</Link>
          <Link
            href={`/projects/${
              PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length].slug
            }`}
          >
            Next case study →
          </Link>
        </nav>
      </main>
    </div>
  )
}

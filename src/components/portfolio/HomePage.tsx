"use client" /* FULL-SCREEN MENU OVERLAY */ /* Close button */ /* Portrait photo - centered, behind links via z-index */ /* Nav links */ /* Bottom info */ /* NAV */ /* HERO */ /* Photo row with links flanking it inside the card */ /* Mobile-only links row */ /* ABOUT */ /* Left photos */ /* Center text */ /* Right photos */ /* PORTFOLIO GRID */ /* AREAS OF EXPERTISE */ /* FOOTER LANDSCAPE */ /* FOOTER */
import SiteImage from "./SiteImage"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
const heroPhoto = "/imports/_MG_9469-1.JPG"
const aboutLeftTop = "/imports/IMG_5175.jpeg"
const aboutLeftBottom = "/imports/DSCF2512-1.JPG"
const aboutRightTop = "/imports/DSCF3349-1.JPG"
const aboutRightBottom = "/imports/IMG_4403_copy_2.jpeg"
const signSeeImage = "/imports/sign-see-otto.png"
const histoPathImage = "/imports/histopath-ai.png"
const cancerImage = "/imports/cancer-genomics.jpeg"
const picarImage = "/imports/picar-x.webp"
const rootImage = "/imports/root-phenotyping.jpeg"
const asteroidsImage = "/imports/asteroids.webp"
const trainJourney = "/imports/homepage-train-journey.jpg"

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
      { threshold: 0.12, ...options },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

const NAV_LINKS = [
  "Projects",
  "Community & Leadership",
  "CV",
  "About",
  "Contact",
]

const PROJECTS = [
  {
    title: "Sign-See",
    tag: "Computer Vision / EdTech",
    desc: "A real-time Dutch Sign Language learning app built for accessible, responsive practice.",
    img: signSeeImage,
    alt: "Otto, the Sign-See octopus mascot",
    slug: "sign-see",
    imageClass: "object-contain p-8",
  },
  {
    title: "HistoPath AI",
    tag: "Medical AI / Explainability",
    desc: "An explainable histopathology decision-support tool designed and tested around clinician trust.",
    img: histoPathImage,
    alt: "HistoPath AI identity",
    slug: "histopath-ai",
    imageClass: "object-contain p-6",
  },
  {
    title: "PiCar-X",
    tag: "Robotics / Computer Vision",
    desc: "An autonomous robot-car prototype combining perception, control, and practical experimentation.",
    img: picarImage,
    alt: "PiCar-X autonomous robot car",
    slug: "picar-x",
    imageClass: "object-contain p-6",
  },
  {
    title: "Cancer Genomics",
    tag: "Bioinformatics / Research",
    desc: "A careful study of whether tumor classifiers learn biology or the institution behind the data.",
    img: cancerImage,
    alt: "Cancer cell and DNA strand",
    slug: "cancer-genomics",
  },
  {
    title: "Root Phenotyping",
    tag: "Computer Vision / Plant Science",
    desc: "A computer-vision workflow for measuring root traits from images with reproducible analysis.",
    img: rootImage,
    alt: "Plant root phenotyping image",
    slug: "root-phenotyping",
  },
  {
    title: "Asteroids",
    tag: "Python / Game Development",
    desc: "A polished arcade game with state management, collision physics, progressive waves, and high scores.",
    img: asteroidsImage,
    alt: "Asteroids arcade game in play",
    slug: "asteroids",
  },
]

const EXPERTISE = [
  {
    category: "/ Data Science & Machine Learning",
    items: [
      "Python, SQL, statistical analysis, scikit-learn, and reproducible research.",
      "Model evaluation that looks beyond headline accuracy to robustness and real-world value.",
    ],
  },
  {
    category: "/ Medical AI & Bioinformatics",
    items: [
      "Computer vision, deep learning, Grad-CAM explainability, and human-centered AI.",
      "Genomics research with careful validation, ethics, and cross-institutional thinking.",
    ],
  },
  {
    category: "/ Product, MLOps & Communication",
    items: [
      "From Vue and FastAPI interfaces to Azure ML, MLflow, Docker, Git, and CI/CD.",
      "International business training and technical communication that connect systems with people.",
    ],
  },
]

const ABOUT_PHOTOS = [
  { src: aboutLeftTop as unknown as string, alt: "Kinga near the waterfront" },
  {
    src: aboutLeftBottom as unknown as string,
    alt: "Kinga in an old town street",
  },
  {
    src: aboutRightTop as unknown as string,
    alt: "Kinga hiking in the mountains",
  },
  {
    src: aboutRightBottom as unknown as string,
    alt: "Kinga on steps with folder",
  },
]

const MENU_LINKS = [
  "Home",
  "About",
  "Projects",
  "CV",
  "Community & Leadership",
  "Photo Gallery",
  "Contact Me",
]
const ROUTE_LINKS: Record<string, string> = {
  Home: "/",
  Projects: "/projects",
  Contact: "/contact",
  "Contact Me": "/contact",
  "Community & Leadership": "/beyond",
  CV: "/cv",
  "Photo Gallery": "/photo-gallery",
}

export default function App() {
  const [openExpertise, setOpenExpertise] = useState<number | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const aboutTitle = useReveal()
  const aboutLeft = useReveal()
  const aboutCenter = useReveal()
  const aboutRight = useReveal()
  const projectsTitle = useReveal()
  const projectsCarousel = useReveal()
  const projectTrackRef = useRef<HTMLDivElement>(null)
  const expertiseSection = useReveal()
  const footerLandscape = useReveal()
  const footerContent = useReveal()

  const scrollProjects = (direction: -1 | 1) => {
    projectTrackRef.current?.scrollBy({
      left: direction * projectTrackRef.current.clientWidth * 0.78,
      behavior: "smooth",
    })
  }

  return (
    <div className="min-h-screen">
      {}
      {menuOpen && (
        <div
          className="menu-overlay fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ backgroundColor: "rgba(250,244,242,0.97)" }}
        >
          {}
          <button
            onClick={() => setMenuOpen(false)}
            className="menu-close absolute top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center hover:bg-stone-700"
            style={{ fontSize: "1rem" }}
            aria-label="Close menu"
          >
            ✕
          </button>

          {}
          <div
            className="absolute"
            style={{
              width: 220,
              height: 300,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 0,
            }}
          >
            <SiteImage
              src={heroPhoto}
              alt="Kinga Marchlewska portrait"
              className="w-full h-full object-cover"
              style={{ opacity: 0.7 }}
            />
          </div>

          {}
          <nav
            className="relative z-10 flex flex-col items-center"
            style={{ gap: "0.1rem" }}
          >
            {MENU_LINKS.map((link) => {
              const route = ROUTE_LINKS[link]
              const sharedStyle = {
                fontFamily: "'Fraunces', serif",
                fontWeight: 400,
                fontSize: "clamp(2.4rem, 6vw, 4.5rem)" as const,
                lineHeight: 1.15,
                color: "#2e2626",
                textDecoration: "none" as const,
                transition: "opacity 0.2s",
              }
              return route ? (
                <Link
                  key={link}
                  href={route}
                  onClick={() => setMenuOpen(false)}
                  style={sharedStyle}
                  className="hover:opacity-50"
                >
                  {link}
                </Link>
              ) : (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(" ", "-")}`}
                  onClick={() => setMenuOpen(false)}
                  style={sharedStyle}
                  className="hover:opacity-50"
                >
                  {link}
                </a>
              )
            })}
          </nav>

          {}
          <div
            className="absolute bottom-10 flex justify-between w-full px-12"
            style={{
              fontSize: "0.72rem",
              color: "#9a8a84",
              letterSpacing: "0.05em",
            }}
          >
            <div>
              <p>kinga.marchlewska.a@gmail.com</p>
            </div>
            <p>© 2026 Kinga Marchlewska</p>
          </div>
        </div>
      )}

      {}
      <nav
        style={{
          backgroundColor: "rgba(253,245,245,0.92)",
          backdropFilter: "blur(8px)",
        }}
        className="enter-nav fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b border-stone-100"
      >
        <Link
          href="/"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
          }}
          className="home-nav-name uppercase text-stone-500 tracking-widest"
        >
          Kinga Marchlewska
        </Link>
        <button
          onClick={() => setMenuOpen(true)}
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "0.8rem",
            letterSpacing: "0.25em",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          className="home-menu-trigger uppercase text-stone-400 tracking-widest hover:text-stone-700 transition-colors"
        >
          Menu
        </button>
        <div className="home-nav-links flex">
          {NAV_LINKS.map((l) => {
            const route = ROUTE_LINKS[l]
            return route ? (
              <Link
                key={l}
                href={route}
                style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}
                className="text-stone-500 hover:text-stone-800 transition-colors uppercase tracking-wide"
              >
                {l}
              </Link>
            ) : (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}
                className="text-stone-500 hover:text-stone-800 transition-colors uppercase tracking-wide"
              >
                {l}
              </a>
            )
          })}
        </div>
      </nav>

      {}
      <section
        id="portfolio"
        className="enter-hero-bg relative flex items-center justify-center pt-16"
        style={{
          minHeight: "110vh",
          paddingTop: "5rem",
          paddingBottom: "3rem",
        }}
      >
        <SiteImage
          src="https://images.unsplash.com/photo-1617150119111-09bbb85178b0?w=1800&h=1200&fit=crop&auto=format"
          alt="Blue sky with soft clouds"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="enter-card relative z-10 flex flex-col items-center"
          style={{
            backgroundColor: "white",
            padding: "3rem 2.5rem 3rem",
            width: "min(760px, 94vw)",
            minHeight: "92vh",
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
          }}
        >
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 500,
              fontSize: "clamp(2.4rem, 5vw, 3.4rem)",
              lineHeight: 1.1,
              textAlign: "center",
            }}
            className="enter-name text-stone-900"
          >
            Kinga
            <br />
            Marchlewska
          </h1>

          {}
          <div
            className="relative w-full flex items-center justify-center"
            style={{ flex: 1, marginTop: "1.5rem", marginBottom: "1.5rem" }}
          >
            <Link
              href="/contact"
              style={{
                fontSize: "0.8rem",
                letterSpacing: "0.06em",
                left: "1rem",
              }}
              className="nudge-left enter-link-left absolute text-stone-500 hover:text-stone-800 underline underline-offset-4 transition-colors hidden md:block"
            >
              Contact Me
            </Link>
            <Link
              href="/projects"
              style={{
                fontSize: "0.8rem",
                letterSpacing: "0.06em",
                right: "1rem",
              }}
              className="nudge-right enter-link-right absolute text-stone-500 hover:text-stone-800 underline underline-offset-4 transition-colors hidden md:block"
            >
              View My Work
            </Link>

            <div
              className="enter-photo overflow-hidden"
              style={{ width: 290, height: 430, backgroundColor: "#f0ece8" }}
            >
              <SiteImage
                src={heroPhoto}
                alt="Kinga Marchlewska portrait"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div
              className="hero-specialties enter-tagline"
              aria-label="Data Science and AI, Medical AI and Bioinformatics, International Business"
            >
              <span>Data Science &amp; AI</span>
              <span>Medical AI &amp; Bioinformatics</span>
              <span>International Business</span>
            </div>
            {}
            <div className="flex justify-between w-full mt-4 px-2 md:hidden">
              <Link
                href="/contact"
                style={{ fontSize: "0.8rem", letterSpacing: "0.06em" }}
                className="nudge-left enter-link-left text-stone-500 hover:text-stone-800 underline underline-offset-4 transition-colors"
              >
                Contact Me
              </Link>
              <Link
                href="/projects"
                style={{ fontSize: "0.8rem", letterSpacing: "0.06em" }}
                className="nudge-right enter-link-right text-stone-500 hover:text-stone-800 underline underline-offset-4 transition-colors"
              >
                View My Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {}
      <section
        id="about"
        style={{ backgroundColor: "#fce8e8" }}
        className="py-28 px-0"
      >
        <h2
          ref={aboutTitle.ref}
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 500,
            fontSize: "clamp(2.2rem, 4.2vw, 3rem)",
            textAlign: "center",
            marginBottom: "3rem",
            marginTop: "-1rem",
          }}
          className={`text-stone-800 reveal${
            aboutTitle.visible ? " visible" : ""
          }`}
        >
          About Me
        </h2>

        <div className="max-w-[1220px] mx-auto grid grid-cols-1 md:grid-cols-[320px_1fr_320px] gap-14 items-start">
          {}
          <div
            ref={aboutLeft.ref}
            className={`flex flex-col gap-6 reveal-left${
              aboutLeft.visible ? " visible" : ""
            }`}
          >
            {ABOUT_PHOTOS.slice(0, 2).map((p, i) => (
              <div
                key={i}
                className="overflow-hidden"
                style={{ backgroundColor: "#e8d8d0" }}
              >
                <SiteImage
                  src={p.src}
                  alt={p.alt}
                  className="w-full object-cover"
                  style={{ height: 420 }}
                />
              </div>
            ))}
          </div>

          {}
          <div
            ref={aboutCenter.ref}
            className={`flex flex-col justify-center gap-4 py-4 reveal${
              aboutCenter.visible ? " visible" : ""
            } delay-200`}
            style={{ textAlign: "justify", paddingTop: "2rem" }}
          >
            <blockquote
              style={{
                fontFamily: "'Fraunces', serif",
                fontStyle: "italic",
                fontSize: "1.18rem",
                lineHeight: 1.6,
                marginBottom: "1.25rem",
              }}
              className="text-stone-600"
            >
              "The thing is - fear can&apos;t hurt you any more than a dream."
              <br />
              <span style={{ fontSize: "0.85rem" }}> - William Golding</span>
            </blockquote>
            <p
              style={{ fontSize: "0.9rem", lineHeight: 1.8 }}
              className="text-stone-600"
            >
              I&apos;m Kinga Marchlewska. I was born and raised in Płock,
              Poland. In 2019 I moved to the Netherlands with my family, where I
              now live, study, and work.
            </p>
            <p
              style={{ fontSize: "0.9rem", lineHeight: 1.8 }}
              className="text-stone-600"
            >
              As a kid I wanted to be and do a bit of everything, and that
              curiosity never really settled down. It just found a direction. My
              background is a bit of a mix: I started in international business
              with a marketing focus, and I&apos;m now deep in data science and
              AI, with a creative streak running through all of it. Rather than
              pulling me in different directions, that range taught me what I
              actually enjoy, which is figuring out how things work and using
              that to build something real.
            </p>
            <p
              style={{ fontSize: "0.9rem", lineHeight: 1.8 }}
              className="text-stone-600"
            >
              That&apos;s what pulls me toward data science. My goal is easy to
              say and hard to do well: I want to create things that are
              genuinely useful, that help a person or a cause in some concrete
              way. It&apos;s why my projects keep circling back to health and
              communication, whether that&apos;s recognizing Dutch Sign Language
              in real time, studying machine learning for cancer genomics, or
              teaching models to read medical images.
            </p>
            <p
              style={{ fontSize: "0.9rem", lineHeight: 1.8 }}
              className="text-stone-600"
            >
              Away from the screen I read, travel, draw, paint, and take photos,
              and I spend as much time as I can with the people I care about.
              I&apos;m curious, creative, and probably a little too eager to
              learn one more thing. My dream is to sincerely love the work I do,
              and to see some of the world while I&apos;m doing it.
            </p>
          </div>

          {}
          <div
            ref={aboutRight.ref}
            className={`flex flex-col gap-6 reveal-right${
              aboutRight.visible ? " visible" : ""
            } delay-100`}
          >
            {ABOUT_PHOTOS.slice(2, 4).map((p, i) => (
              <div
                key={i}
                className="overflow-hidden"
                style={{ backgroundColor: "#e8d8d0" }}
              >
                <SiteImage
                  src={p.src}
                  alt={p.alt}
                  className="w-full object-cover"
                  style={{ height: 420 }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section
        id="portfolio-grid"
        className="py-24 px-6"
        style={{ backgroundColor: "#faf9f7" }}
      >
        <div
          ref={projectsTitle.ref}
          className={`home-projects-heading reveal${
            projectsTitle.visible ? " visible" : ""
          }`}
        >
          <h2>Projects</h2>
          <div className="home-projects-controls" aria-label="Project carousel">
            <button
              type="button"
              onClick={() => scrollProjects(-1)}
              aria-label="View previous projects"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollProjects(1)}
              aria-label="View next projects"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={projectsCarousel.ref}
          className={`home-projects-carousel reveal${
            projectsCarousel.visible ? " visible" : ""
          }`}
        >
          <div className="home-projects-track" ref={projectTrackRef}>
            {PROJECTS.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="home-project-link group cursor-pointer"
              >
                <div
                  className="overflow-hidden"
                  style={{ aspectRatio: "4/5", backgroundColor: "#e8e0dc" }}
                >
                  <SiteImage
                    src={p.img}
                    alt={p.alt}
                    className={`w-full h-full ${p.imageClass ?? "object-cover"} transition-transform duration-700 ease-out group-hover:scale-105`}
                  />
                </div>
                <div className="mt-5">
                  <p className="home-project-tag">{p.tag}</p>
                  <h3 className="group-hover:underline underline-offset-4 transition-all">
                    {p.title}
                  </h3>
                  <p className="home-project-description">{p.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {}
      <section
        id="expertise"
        style={{ backgroundColor: "#edd8e4" }}
        className="py-20 px-8"
      >
        <div
          ref={expertiseSection.ref}
          className={`max-w-5xl mx-auto reveal${
            expertiseSection.visible ? " visible" : ""
          }`}
        >
          <div className="mb-10">
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 500,
                fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
              }}
              className="text-stone-800 mb-4"
            >
              Areas of Expertise
            </h2>
            <p
              style={{ fontSize: "0.82rem", lineHeight: 1.8, maxWidth: 520 }}
              className="text-stone-600"
            >
              I connect careful analysis with human-centered design - building
              machine-learning systems that are technically rigorous, clearly
              communicated, and useful beyond the notebook.
            </p>
          </div>

          <div className="border-t border-stone-300">
            {EXPERTISE.map((item, i) => (
              <div
                key={i}
                className="border-b border-stone-300 cursor-pointer"
                onClick={() => setOpenExpertise(openExpertise === i ? null : i)}
              >
                <div className="flex items-center justify-between py-5">
                  <span
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontWeight: 400,
                      fontSize: "clamp(1rem, 2vw, 1.2rem)",
                    }}
                    className="text-stone-800"
                  >
                    {item.category}
                  </span>
                  <span className="text-stone-400 text-lg">
                    {openExpertise === i ? "−" : "+"}
                  </span>
                </div>
                {openExpertise === i && (
                  <div className="pb-5 pl-4 grid md:grid-cols-2 gap-2">
                    {item.items.map((it, j) => (
                      <p
                        key={j}
                        style={{ fontSize: "0.8rem", lineHeight: 1.7 }}
                        className="text-stone-600"
                      >
                        {it}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <div
        ref={footerLandscape.ref}
        className={`footer-portrait-banner w-full reveal-scale${
          footerLandscape.visible ? " visible" : ""
        }`}
      >
        <SiteImage
          src={trainJourney}
          alt="Mountain scenery through the window of a train"
        />
      </div>

      {}
      <footer
        id="contact"
        style={{ backgroundColor: "#fce8e8" }}
        className="px-8 py-10"
      >
        <div
          ref={footerContent.ref}
          className={`max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-stone-200 pt-8 reveal${
            footerContent.visible ? " visible" : ""
          }`}
        >
          <div>
            <p
              style={{ fontSize: "0.72rem", letterSpacing: "0.1em" }}
              className="text-stone-400 uppercase mb-3"
            >
              Kinga Marchlewska
            </p>
            <h3
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 400,
                fontSize: "1.3rem",
                lineHeight: 1.2,
              }}
              className="text-stone-800"
            >
              Data Science & AI
              <br />
              Medical AI & Bioinformatics
              <br />
              International Business
            </h3>
          </div>

          <div
            style={{ fontSize: "0.78rem", lineHeight: 2 }}
            className="text-stone-500"
          >
            <p>kinga.marchlewska.a@gmail.com</p>
            <p className="mt-2">Breda, Netherlands</p>
          </div>

          <div>
            <div
              style={{ fontSize: "0.72rem", letterSpacing: "0.08em" }}
              className="text-stone-400 uppercase flex flex-col gap-1 mb-4"
            >
              <a href="#" className="hover:text-stone-700 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-stone-700 transition-colors">
                Accessibility Statement
              </a>
            </div>
            <div className="footer-social-links">
              {[
                {
                  label: "Email",
                  href: "mailto:kinga.marchlewska.a@gmail.com",
                },
                {
                  label: "GitHub",
                  href: "https://github.com/KingaMarchlewska",
                },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/kinga-marchlewska-2a2899232",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http") ? "noreferrer" : undefined
                  }
                  className="footer-social-link"
                >
                  <span>{social.label}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-8 pt-4 border-t border-stone-200">
          <p style={{ fontSize: "0.72rem" }} className="text-stone-400">
            © 2026 Kinga Marchlewska. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

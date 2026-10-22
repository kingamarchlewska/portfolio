"use client"

import SiteImage from "./SiteImage"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import BackToHome from "./BackToHome"
const candidPortrait = "/imports/esn-candid-portrait.jpg"
const eventPhotographer = "/imports/esn-event-photographer.jpg"
const eventSetup = "/imports/esn-event-setup.jpg"
const eventMaterials = "/imports/esn-event-materials.jpg"
const flagParty = "/imports/esn-flag-party.jpg"
const formalGroup = "/imports/esn-formal-group.jpg"
const formalGroupPortrait = "/imports/esn-formal-group-portrait.jpg"
const formalTrio = "/imports/esn-formal-trio.jpg"
const formalTrioPortrait = "/imports/esn-formal-trio-portrait.jpg"
const mascotActivity = "/imports/esn-mascot-activity.jpg"
const mascotArt = "/imports/esn-mascot-art.jpg"
const mascotDetail = "/imports/esn-mascot-detail.jpg"
const mascotPortrait = "/imports/esn-mascot-portrait.jpg"
const mascotRaised = "/imports/esn-mascot-raised.jpg"
const organizers = "/imports/esn-organizers.jpg"
const photographerCamera = "/imports/esn-photographer-camera.jpg"
const quizFriends = "/imports/esn-quiz-friends.jpg"
const quizWinners = "/imports/esn-quiz-winners.jpg"
const teamGroup = "/imports/esn-team-group.jpg"
const teamPair = "/imports/esn-team-pair.jpg"
const artWorkshop = "/imports/esn-art-workshop.jpg"
const mascotVolunteers = "/imports/esn-mascot-volunteers.jpg"
const sportsTeam = "/imports/esn-sports-team.jpg"
const sportsTeamCelebration = "/imports/esn-sports-team-celebration.jpg"

const STORIES = [
  {
    number: "01",
    label: "Team lead · ESN Breda",
    title: "Turning an idea into a room full of people.",
    copy: "From September 2026, I lead a seven-person Integration Committee. Together, we shape ideas into welcoming events for 30 - 50 international students - from the first planning session to the final photograph.",
    image: eventSetup,
    alt: "ESN Breda volunteers preparing a pub quiz venue",
  },
  {
    number: "02",
    label: "Belonging by design",
    title: "A good event begins before anyone arrives.",
    copy: "Creating community is thoughtful work: communicating clearly, dividing responsibilities, noticing who may need an invitation into the conversation, and making sure every detail supports a relaxed atmosphere.",
    image: quizWinners,
    alt: "Kinga and the ESN Breda team celebrating with a pub quiz participant",
  },
  {
    number: "03",
    label: "Across cultures",
    title: "Leadership starts with listening.",
    copy: "Before becoming team lead, I supported ESN Breda through Internal Operations. Volunteering continues to strengthen the same qualities I value in technical teams - empathy, organization, curiosity, and care.",
    image: flagParty,
    alt: "Two international students together at an ESN flag party",
  },
]

const GALLERY = [
  { image: organizers, alt: "ESN Breda organizers gathered after an event" },
  {
    image: candidPortrait,
    alt: "Candid portrait of Kinga during an ESN event",
  },
  {
    image: quizFriends,
    alt: "Friends posing together at the ESN Breda pub quiz",
  },
  { image: eventPhotographer, alt: "Kinga holding a camera at an ESN event" },
  { image: mascotDetail, alt: "Close-up of the ESN Breda mascot" },
  { image: mascotPortrait, alt: "Kinga holding the ESN Breda mascot" },
  {
    image: mascotActivity,
    alt: "ESN Breda volunteers presenting their mascot during an activity",
  },
  {
    image: teamPair,
    alt: "Kinga with an ESN Breda teammate at a community event",
  },
  {
    image: mascotArt,
    alt: "A participant's drawing beside the ESN Breda mascot",
  },
  {
    image: mascotRaised,
    alt: "The ESN Breda mascot held up during an event",
  },
  {
    image: photographerCamera,
    alt: "Kinga photographing an ESN Breda event",
  },
  {
    image: eventMaterials,
    alt: "Colorful ESN Breda event cards and activity materials",
  },
  {
    image: formalTrio,
    alt: "Three ESN members dressed for a formal international event",
  },
  {
    image: formalTrioPortrait,
    alt: "Portrait of three ESN members at a formal event",
  },
  {
    image: formalGroup,
    alt: "ESN members gathered together at a formal international event",
  },
  {
    image: formalGroupPortrait,
    alt: "Portrait of ESN members celebrating together at a formal event",
  },
  {
    image: mascotVolunteers,
    alt: "Kinga and an ESN Breda teammate holding the organization mascot",
  },
  {
    image: artWorkshop,
    alt: "International students sharing artwork at an ESN Breda workshop",
  },
  {
    image: sportsTeam,
    alt: "The ESN Breda team gathered behind their flag at a sports event",
  },
  {
    image: sportsTeamCelebration,
    alt: "ESN Breda volunteers celebrating together with their team flag",
  },
]

function useReveal() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.14 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

function Story({
  story,
  index,
}: {
  story: typeof STORIES[number]
  index: number
}) {
  const reveal = useReveal()

  return (
    <article
      ref={reveal.ref}
      className={`beyond-moment reveal${reveal.visible ? " visible" : ""}`}
    >
      <figure className="beyond-moment__photo">
        <SiteImage src={story.image} alt={story.alt} />
        <figcaption>{story.number} / Community in practice</figcaption>
      </figure>
      <div className="beyond-moment__copy">
        <span className="beyond-card__label">{story.label}</span>
        <h2>{story.title}</h2>
        <p>{story.copy}</p>
        <span className="beyond-moment__index" aria-hidden="true">
          0{index + 1}
        </span>
      </div>
    </article>
  )
}

export default function BeyondPage() {
  const galleryReveal = useReveal()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="projects-page beyond-page">
      <nav className="projects-nav">
        <Link href="/" className="projects-nav__name">
          Kinga Marchlewska
        </Link>
        <div className="projects-nav__links">
          <Link href="/projects">Projects</Link>
          <Link href="/beyond" aria-current="page">
            Community &amp; Leadership
          </Link>
          <Link href="/cv">CV</Link>
          <BackToHome />
        </div>
      </nav>

      <header className="beyond-hero">
        <div className="beyond-hero__copy">
          <p className="projects-kicker">ESN Breda · 2025 - present</p>
          <h1>
            Community
            <br />
            <em>&amp; leadership.</em>
          </h1>
          <p className="beyond-hero__intro">
            The things I build are shaped by what happens away from the screen:
            leading, listening, bringing people together, and learning how many
            different ways there are to see the world.
          </p>
        </div>
        <div
          className="beyond-hero__photos"
          aria-label="ESN Breda team moments"
        >
          <figure className="beyond-hero__photo beyond-hero__photo--main">
            <SiteImage
              src={teamGroup}
              alt="Kinga with the ESN Breda team at an event"
            />
          </figure>
          <figure className="beyond-hero__photo beyond-hero__photo--detail">
            <SiteImage
              src={mascotPortrait}
              alt="Kinga with the ESN Breda mascot"
            />
          </figure>
          <span className="beyond-hero__note">People first, always.</span>
        </div>
      </header>

      <aside className="beyond-manifesto">
        <span>Not a side note</span>
        <p>
          Community work is where strategy becomes human. It has taught me how
          to guide without overpowering, organize without losing spontaneity,
          and make space for every voice in the room.
        </p>
      </aside>

      <main className="beyond-story">
        {STORIES.map((story, index) => (
          <Story story={story} index={index} key={story.number} />
        ))}
      </main>

      <section
        ref={galleryReveal.ref}
        className={`beyond-gallery reveal${
          galleryReveal.visible ? " visible" : ""
        }`}
      >
        <div className="beyond-gallery__heading">
          <p className="projects-kicker">Seen along the way</p>
          <h2>The moments between the milestones.</h2>
        </div>
        <div className="beyond-gallery__grid">
          {GALLERY.map((photo, index) => (
            <figure key={photo.image}>
              <SiteImage src={photo.image} alt={photo.alt} loading="lazy" />
              <figcaption>{String(index + 1).padStart(2, "0")}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <footer className="projects-footer">
        <div>
          <span>There is more to the story</span>
          <Link href="/photo-gallery">See the photo journal.</Link>
        </div>
        <p>© 2026 Kinga Marchlewska</p>
      </footer>
    </div>
  )
}

"use client"

import SiteImage from "./SiteImage"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import BackToHome from "./BackToHome"
const signSeeImage = "/imports/sign-see-otto.png"
const histoPathImage = "/imports/histopath-ai.png"
const piCarImage = "/imports/picar-x.webp"
const cancerImage = "/imports/cancer-genomics.jpeg"
const rootsImage = "/imports/root-phenotyping.jpeg"
const asteroidsImage = "/imports/asteroids.webp"

type ProjectMetric = {
  label: string
  value: string
}

type ProjectSection = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

type ProjectMedia = {
  type: "image" | "video"
  src: string
  alt: string
  caption: string
  poster?: string
}

export type Project = {
  slug: string
  number: string
  title: string
  shortTitle: string
  summary: string
  year: string
  role: string
  domain: string
  tags: string[]
  metrics: ProjectMetric[]
  image: string
  alt: string
  imageClass?: string
  repo?: string
  demo?: string
  media?: ProjectMedia[]
  sections: ProjectSection[]
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.08 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

export const PROJECTS: Project[] = [
  {
    slug: "sign-see",
    number: "01",
    title: "Sign-See",
    shortTitle: "Sign-See",
    summary:
      "A real-time Dutch Sign Language fingerspelling app I co-founded and now lead, owning its design, frontend, and user experience.",
    year: "2025 - present",
    role: "Co-founder & product lead · frontend, UI/UX",
    domain: "Frontend · Computer vision · EdTech",
    tags: [
      "Vue 3",
      "TypeScript",
      "Tailwind CSS",
      "WebSocket",
      "Accessibility",
      "FastAPI",
      "PyTorch",
    ],
    metrics: [
      { label: "Accessibility", value: "WCAG 2.2 AA" },
      { label: "NGT signs", value: "22" },
      { label: "Inference", value: "Real-time" },
    ],
    image: signSeeImage,
    alt: "Otto, the purple Sign-See octopus mascot, holding a sign-language book",
    imageClass: "object-contain p-8 md:p-14",
    repo: "https://github.com/BredaUniversityADSAI/2025-26d-fai2-adsai-group-researchgroup2",
    sections: [
      {
        heading: "Context",
        paragraphs: [
          "Sign-See started as a two-week challenge set by a Dutch disability center that works with sign language. The brief was open: build something that could help people learn NGT. Ana and I built the first working backbone, and in a later deployment block the team rebuilt it into a real application. I led the frontend. At the end of year two, the four of us chose to keep going and turn Sign-See into a startup.",
          "Today I am a co-founder and product lead, responsible for how Sign-See looks, feels, and behaves for the people who use it. The gap we are addressing is real: most deaf children in the Netherlands have hearing parents who need to learn NGT quickly, while current options are largely scheduled courses and passive video.",
        ],
      },
      {
        heading: "What I built",
        paragraphs: [
          "At the heart of the app, a camera composable captures webcam frames at around 10 fps, streams them to the backend over WebSocket, and draws a 21-point hand skeleton over every response. Backpressure keeps no more than one frame in flight, while automatic reconnection helps the experience remain smooth when the connection does not.",
        ],
        bullets: [
          "Four connected product modes: Learn, with hints and hold-to-validate practice; Collect, for contributing labeled examples; Home, which ties the experience together; and Game, which gamifies practice across the app so learning feels engaging, progress is visible, and people want to return and continue.",
          "A 26-test frontend suite and a file-by-file WCAG 2.2 AA accessibility retrofit.",
          "Production work including an Azure database migration, CI fixes, and a collaborative PR review cycle.",
        ],
      },
      {
        heading: "The wider system",
        paragraphs: [
          "The team’s recognition pipeline uses MediaPipe hand landmarks and a fine-tuned EfficientNet-B0, with a landmark-based MLP supporting low-confidence frames and temporal smoothing preventing flicker. A FastAPI service exposes HTTP and WebSocket endpoints with JWT authentication and PostgreSQL storage. Around it sits an MLOps stack spanning Azure ML, MLflow, Airflow, a versioned model registry, and CI/CD.",
        ],
      },
      {
        heading: "What I took from it",
        paragraphs: [
          "Sign-See showed me how different it feels to build something people are meant to return to, not just evaluate once. Every decision - from feedback timing to accessibility - affects whether learning feels encouraging or frustrating. It confirmed that I want to keep building thoughtful products around real needs, especially where technology can make knowledge or communication more accessible.",
        ],
      },
    ],
  },
  {
    slug: "histopath-ai",
    number: "02",
    title: "HistoPath AI",
    shortTitle: "HistoPath AI",
    summary:
      "A decision-support tool that classifies histopathology tissue, explains its reasoning with Grad-CAM, and was designed and user-tested for clinicians.",
    year: "2025",
    role: "Individual project",
    domain: "Computer vision · Medical AI · Human-centered AI",
    tags: [
      "TensorFlow/Keras",
      "EfficientNet",
      "Transfer learning",
      "Grad-CAM",
      "Figma",
      "A/B testing",
    ],
    metrics: [
      { label: "Accuracy", value: "~98%" },
      { label: "Human baseline", value: "83%" },
      { label: "Explainability", value: "Grad-CAM" },
    ],
    image: histoPathImage,
    alt: "HistoPath AI professional analysis tool identity",
    imageClass: "object-contain p-6 md:p-12",
    demo: "https://www.figma.com/proto/ODHXH43Kdi4r8SeqpGeygo/Wireframe-A?node-id=65-6821",
    sections: [
      {
        heading: "Context",
        paragraphs: [
          "Cancer survival depends heavily on catching it early, yet histopathologists - the specialists who diagnose it from tissue samples - are in increasingly short supply. HistoPath AI is a decision-support tool for that gap: it reads a histopathology image, classifies the tissue as benign or malignant, and is intended to take confident cases off a pathologist’s plate while flagging uncertain ones for human review.",
        ],
      },
      {
        heading: "The model",
        paragraphs: [
          "I framed the task as binary classification and built up from honest baselines: a random guess, a simple MLP at around 80%, and an estimate of human-level performance at about 83%. A simple CNN reached 82%; data augmentation lifted it to 93%; VGG16 transfer learning reached 97%; and EfficientNetB0 with augmentation reached about 98%.",
          "The final model misclassified one held-out image - a benign sample flagged as malignant, the safer direction to err in screening. Grad-CAM checks showed that its attention generally aligned with the regions a pathologist would examine.",
        ],
      },
      {
        heading: "Designed for clinicians",
        paragraphs: [
          "A model is only half of a medical tool. I designed a clinical Figma prototype with a heatmap beside each prediction, a confidence score, clear assistive-use disclaimers, and medical-ID-gated access. A think-aloud study with four participants validated the core flow and surfaced concrete navigation and labeling improvements.",
          "I also compared interface versions with and without Grad-CAM and a persistent menu across six usability measures. None of the differences were statistically significant, so I reported the null result plainly: one version scored marginally higher, but not meaningfully so.",
        ],
      },
      {
        heading: "What I took from it",
        paragraphs: [
          "HistoPath AI taught me to evaluate the interface, explanation, and workflow with the same care as the model itself. In healthcare, performance is only one part of the problem. The system also has to communicate uncertainty clearly and support the specialist using it.",
        ],
      },
    ],
  },
  {
    slug: "picar-x",
    number: "03",
    title: "Autonomous Traffic-Aware Robot Car",
    shortTitle: "PiCar-X",
    summary:
      "A Raspberry Pi robot car that follows lanes, reads traffic signs, and takes voice commands to drive a track autonomously.",
    year: "2026",
    role: "Team of five · voice control & turn execution",
    domain: "Robotics · Computer vision · Voice",
    tags: ["Raspberry Pi", "Vosk", "OpenCV", "YOLO", "WebSocket", "Python"],
    metrics: [
      { label: "Challenge", value: "SRH Heidelberg BIP" },
      { label: "Team", value: "5 people" },
      { label: "Platform", value: "PiCar-X" },
    ],
    image: piCarImage,
    alt: "SunFounder PiCar-X robot car on a white background",
    imageClass: "object-contain p-7 md:p-12",
    sections: [
      {
        heading: "Context",
        paragraphs: [
          "The SRH Heidelberg BIP challenge gave us a few days and a SunFounder PiCar-X with one goal: make it drive a track completely on its own. It needed to follow a lane, read a traffic sign, turn correctly, complete the loop, and stop at a STOP sign - with bonus points for voice commands and obstacle handling. I owned the voice-control system and the turn-execution logic.",
        ],
      },
      {
        heading: "The system",
        paragraphs: [
          "We designed a split brain. The Pi handles everything real-time - lane following, steering, speed, voice, and its ultrasonic sensor - while a YOLO traffic-sign model runs on a GPU laptop. The car streams frames over Wi-Fi and receives detections as JSON. Driving never depends on the network: if Wi-Fi drops, the car keeps following the lane because detection is advice, not a requirement.",
        ],
      },
      {
        heading: "What I built",
        paragraphs: [
          "My offline Vosk voice system listens on a separate thread from the drive loop and keeps a fast local parser available whenever the language model is slow or unavailable. Safety shaped the implementation more than the happy path.",
        ],
        bullets: [
          "“Stop” fires instantly from the partial local transcript and never waits for a network request.",
          "A two-second timeout and generation counter discard stale language-model replies.",
          "Negated or ambiguous commands are ignored, while an RMS gate and fuzzy matching improve reliability.",
          "Detected signs arm a maneuver; the car waits for all three floor sensors to confirm the intersection before turning.",
        ],
      },
      {
        heading: "Outcome & reflection",
        paragraphs: [
          "By the demo, autonomous lane following, sign response, voice control, and obstacle stopping all worked. Steering around an obstacle was the honest gap we scoped out in favor of a reliable stop.",
          "This was my first time writing code that drives physical hardware in real time. On a screen, a bug is a wrong answer; on a robot, it can mean driving off a table. Designing safe behavior first - instant local stop, stale-command rejection, and explicit intersection confirmation - changed how I think about what “done” means.",
        ],
      },
    ],
  },
  {
    slug: "cancer-genomics",
    number: "04",
    title: "Batch Effects in Cancer Genomics",
    shortTitle: "Cancer Genomics",
    summary:
      "A research project asking whether a model predicting tumor subtype from gene expression learns biology - or merely the hospital that produced the sample.",
    year: "2025",
    role: "Individual research project",
    domain: "Bioinformatics · Machine learning · Research",
    tags: [
      "Python",
      "scikit-learn",
      "ComBat-seq",
      "RNA-seq",
      "PCA",
      "Statistics",
    ],
    metrics: [
      { label: "Dataset", value: "TCGA-BRCA" },
      { label: "LOBO folds", value: "16" },
      { label: "Experiments", value: "144" },
    ],
    image: cancerImage,
    alt: "Cancer cell and DNA strand in warm coral tones",
    repo: "https://github.com/BredaUniversityADSAI/2025-26c-fai2-adsai-KingaMarchlewska241290",
    sections: [
      {
        heading: "The question",
        paragraphs: [
          "RNA-seq data is produced across different hospitals, machines, dates, and protocols. Those technical differences leave fingerprints unrelated to biology. A model can quietly learn the batch, score beautifully on familiar data, and collapse on samples from a new institution. I set out to measure how much these effects distort breast-cancer subtype prediction - and whether standard corrections fix the problem or merely hide it.",
        ],
      },
      {
        heading: "What I did",
        paragraphs: [
          "I worked with TCGA-BRCA, retaining 842 tumors and the 5,000 most variable genes after filtering and variance stabilization. The task was to predict five PAM50 molecular subtypes, judged with macro-F1 and balanced accuracy because the classes are uneven.",
          "The core design was leave-one-batch-out cross-validation: hold out an entire institution, train on the other fifteen, and always evaluate on an unseen source. Across 16 institutions, I compared an uncorrected baseline, ComBat-seq, and per-batch mean-centering with logistic regression, random forest, and SVM - 144 experiments in total. PCA, ANOVA, Wilcoxon signed-rank tests, Kruskal-Wallis, and Spearman tests completed the analysis.",
        ],
      },
      {
        heading: "What I found",
        paragraphs: [
          "The headline result contradicted my expectation: biology dominated. Subtype explained roughly 22 times more variation in the leading principal component than institution did - an R² near 0.75 versus 0.03. Batch effects were real, but they were not the principal structure in the data.",
          "Correction’s value appeared in consistency rather than average performance. Uncorrected macro-F1 varied by around 0.50 across held-out hospitals; ComBat-seq roughly halved that spread for logistic regression, down to about 0.23, while sacrificing only a few average F1 points. It traded a little headline accuracy for much steadier cross-hospital behavior.",
        ],
      },
      {
        heading: "What I took from it",
        paragraphs: [
          "I expected the project to confirm a clear hypothesis, but the data told a more complicated story. Learning to accept that, investigate what was actually happening, and report it honestly was one of the most valuable parts of the work. It reminded me that good research is not about being right at the beginning - it is about staying curious and being rigorous enough to change your mind.",
        ],
      },
    ],
  },
  {
    slug: "root-phenotyping",
    number: "05",
    title: "Automated Root Phenotyping & Robotic Inoculation",
    shortTitle: "Root Phenotyping",
    summary:
      "An end-to-end NPEC system that segments roots from Petri-dish images and drives a robot to inoculate them precisely.",
    year: "2026",
    role: "Individual project",
    domain: "Computer vision · Robotics · MLOps",
    tags: [
      "TensorFlow/Keras",
      "U-Net",
      "OpenCV",
      "Stable-Baselines3",
      "Gymnasium",
      "PyBullet",
      "ClearML",
    ],
    metrics: [
      { label: "Root segmentation", value: "87% F1" },
      { label: "Inoculation success", value: "94.4%" },
      { label: "Positioning error", value: "0.54 mm" },
    ],
    image: rootsImage,
    alt: "NPEC plant phenotyping facilities illustration",
    imageClass: "object-contain p-8 md:p-12",
    repo: "https://github.com/BredaUniversityADSAI/2025-26b-fai2-adsai-KingaMarchlewska241290",
    sections: [
      {
        heading: "Context",
        paragraphs: [
          "NPEC studies how plant genetics and environment interact. Its Hades module images tens of thousands of seedlings, but inoculating each root with microbes was still manual: slow, difficult to scale, and variable. My project automated the step end to end in simulation - detect a root, find a biologically meaningful point, and drive a liquid-handling robot to it.",
        ],
      },
      {
        heading: "Approach",
        paragraphs: [
          "OpenCV first finds and crops the Petri dish. A TensorFlow/Keras U-Net then labels root, shoot, and seed pixels. Because roots occupy only a fraction of one percent of an image, I used weighted cross-entropy plus Dice loss and evaluated with F1 rather than misleading pixel accuracy. Skeletonization traces each primary root from shoot to tip.",
          "For control, I built a three-axis PID controller with anti-windup for a simulated Opentrons OT-2 in PyBullet. I also wrapped the simulator in a custom Gymnasium environment and trained a PPO agent, then benchmarked it against PID on identical targets. A coordinate transform joins the two halves by translating image pixels into reachable robot coordinates.",
        ],
      },
      {
        heading: "Results",
        paragraphs: [
          "Root segmentation reached about 87% F1. Root-length extraction achieved 6.4% sMAPE after fixing a plant-position matching error that had kept it near 20%. The integrated PID system achieved 94.4% sub-millimeter success with 0.54 mm mean error - a 52% reduction from baseline - while the classical controller proved more precise and consistent than PPO for this task.",
          "Every reinforcement-learning run was tracked in ClearML, remotely executed, checkpointed, and ranked through a structured hyperparameter search with fixed seeds and a versioned model registry.",
        ],
      },
      {
        heading: "What I took from it",
        paragraphs: [
          "This project made machine learning feel physical. Small mistakes in segmentation or coordinate mapping did not stay inside a notebook - they changed where the robot moved. Building the complete chain helped me understand how much context, validation, and dependable engineering matter when a model becomes part of a real system.",
        ],
      },
    ],
  },
  {
    slug: "asteroids",
    number: "06",
    title: "Asteroids, with a Data Layer",
    shortTitle: "Asteroids",
    summary:
      "A complete Python Asteroids clone with every play session logged and analyzed in Power BI - a playful project with a real end-to-end loop underneath.",
    year: "2025",
    role: "Two-person project",
    domain: "Game development · Data analytics",
    tags: ["Python", "Arcade", "Power BI", "Data analytics"],
    metrics: [
      { label: "Built in", value: "2 weeks" },
      { label: "Sessions logged", value: "12" },
      { label: "Asteroids destroyed", value: "2,686" },
    ],
    image: asteroidsImage,
    alt: "Black and white title screen for the Asteroids game",
    sections: [
      {
        heading: "Context",
        paragraphs: [
          "For a two-week challenge with a loose brief - build a small game - Floris and I made a complete Asteroids clone in Python. Then we wired a data layer underneath it, logging every game so we could inspect our own play afterward. That turned a weekend game into a small end-to-end system: build, instrument, collect, and analyze.",
        ],
      },
      {
        heading: "What we built",
        paragraphs: [
          "Using Python’s Arcade library, we built menu, playing, paused, and game-over states; thrust-and-drag momentum; wraparound; splitting asteroids; progressively harder waves; hit invulnerability; and a name-entry high-score table. The entities, constants, collision math, and data layer each live in their own module.",
          "Every session is saved to JSON with player, score, duration, destroyed asteroids, and timestamp. A Power BI dashboard turns that into a leaderboard, peak and average scores, progression over time, and a duration-versus-score view. Across twelve games, we destroyed 2,686 asteroids, while my scores rose from roughly 5,000 to 13,000.",
        ],
      },
      {
        heading: "What I took from it",
        paragraphs: [
          "We started with a game because it sounded fun, and that freedom made the project surprisingly useful. The analytics layer became my favorite part because it let us see our own behavior change over time. It showed me that even a playful idea can become a thoughtful end-to-end system.",
        ],
      },
    ],
  },
]

function ProjectCard({ project }: { project: Project }) {
  const reveal = useReveal()

  return (
    <article
      ref={reveal.ref}
      className={`project-card reveal${reveal.visible ? " visible" : ""}`}
    >
      <div className="project-card__visual">
        <SiteImage
          src={project.image}
          alt={project.alt}
          className={`h-full w-full ${project.imageClass ?? "object-cover"}`}
        />
        <span className="project-card__number">{project.number}</span>
      </div>

      <div className="project-card__intro">
        <div className="project-card__eyebrow">
          <span>{project.shortTitle}</span>
          <span>{project.year}</span>
        </div>
        <h2 className="project-card__title">{project.title}</h2>
        <p className="project-card__summary">{project.summary}</p>

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

        <Link href={`/projects/${project.slug}`} className="editorial-button">
          <span>Read more</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  )
}

export default function PortfolioPage() {
  const hero = useReveal()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="projects-page">
      <nav className="projects-nav">
        <Link href="/" className="projects-nav__name">
          Kinga Marchlewska
        </Link>
        <div className="projects-nav__links">
          <a href="#projects" aria-current="page">
            Projects
          </a>
          <Link href="/beyond">Community &amp; Leadership</Link>
          <Link href="/cv">CV</Link>
          <BackToHome />
        </div>
      </nav>

      <header
        ref={hero.ref}
        className={`projects-hero reveal${hero.visible ? " visible" : ""}`}
      >
        <p className="projects-kicker">Selected work · 2025 - 2026</p>
        <h1>
          Projects with
          <br />
          <em>purpose.</em>
        </h1>
        <div className="projects-hero__footer">
          <p>
            From medical research to robots and accessible products - six case
            studies about building careful, useful technology.
          </p>
          <a href="#projects" className="projects-scroll">
            Explore the work <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="projects-orbit" aria-hidden="true">
          <span>data</span>
          <span>research</span>
          <span>people</span>
        </div>
      </header>

      <main>
        <section id="projects" className="projects-list">
          <div className="projects-list__heading">
            <span>Selected projects</span>
            <span>06 case studies</span>
          </div>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.number} project={project} />
          ))}
        </section>
      </main>

      <footer className="projects-footer">
        <div>
          <span>Have a question or an idea?</span>
          <Link href="/contact">Let’s talk.</Link>
        </div>
        <p>© 2026 Kinga Marchlewska</p>
      </footer>
    </div>
  )
}

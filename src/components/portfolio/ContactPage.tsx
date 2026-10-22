"use client"

import SiteImage from "./SiteImage"
import { useActionState } from "react"
import Link from "next/link"
import BackToHome from "./BackToHome"
import {
  sendContactMessage,
  type ContactState,
} from "@/app/(frontend)/contact/actions"

const initialState: ContactState = { status: "idle", message: "" }
const socialLinks = [
  ["Email", "Send me an email", "mailto:kinga.marchlewska.a@gmail.com"],
  ["GitHub", "View my code", "https://github.com/KingaMarchlewska"],
  [
    "LinkedIn",
    "Connect professionally",
    "https://www.linkedin.com/in/kinga-marchlewska-2a2899232",
  ],
]

export default function ContactPage() {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialState,
  )

  return (
    <div className="contact-page">
      <nav className="contact-nav">
        <Link href="/">Kinga Marchlewska</Link>
        <BackToHome />
      </nav>
      <div className="contact-layout">
        <div className="contact-art">
          <SiteImage
            src="/imports/contact-lightbulb.jpg"
            alt="Minimal hand-drawn lightbulb illustration"
          />
        </div>
        <main className="contact-panel">
          <div className="contact-panel__inner">
            <p className="contact-kicker">Get in touch</p>
            <h1>
              Connect
              <br />
              with Me
            </h1>
            <p className="contact-intro">
              Whether you want to discuss potential collaborations, explore my
              projects, or simply share ideas - don’t hesitate to reach out.
            </p>
            {state.status === "success" ? (
              <div className="contact-success" role="status">
                <h2>Thank you.</h2>
                <p>{state.message}</p>
              </div>
            ) : (
              <form action={formAction} className="contact-form">
                <div className="contact-form__row">
                  <Field
                    label="First name"
                    name="firstName"
                    error={state.errors?.firstName}
                  />
                  <Field
                    label="Last name"
                    name="lastName"
                    error={state.errors?.lastName}
                  />
                </div>
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  error={state.errors?.email}
                />
                <label className="contact-field">
                  <span>Message *</span>
                  <textarea name="message" rows={4} required />
                  {state.errors?.message && (
                    <small>{state.errors.message}</small>
                  )}
                </label>
                <input
                  className="contact-honeypot"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                {state.status === "error" && (
                  <p className="contact-error" role="alert">
                    {state.message}
                  </p>
                )}
                <button type="submit" disabled={pending}>
                  {pending ? "Sending…" : "Send message"}{" "}
                  <span aria-hidden="true">↗</span>
                </button>
              </form>
            )}
            <div className="contact-socials" aria-label="Contact links">
              {socialLinks.map(([label, detail, href]) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                >
                  <span>
                    <strong>{label}</strong>
                    <small>{detail}</small>
                  </span>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function Field({
  label,
  name,
  type = "text",
  error,
}: {
  label: string
  name: string
  type?: string
  error?: string
}) {
  return (
    <label className="contact-field">
      <span>{label} *</span>
      <input name={name} type={type} required />
      {error && <small>{error}</small>}
    </label>
  )
}

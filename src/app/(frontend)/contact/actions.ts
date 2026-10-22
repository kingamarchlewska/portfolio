"use server"

export type ContactState = {
  status: "idle" | "success" | "error"
  message: string
  errors?: Record<string, string>
}

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim()
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

export async function sendContactMessage(
  _previousState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const firstName = field(formData, "firstName")
  const lastName = field(formData, "lastName")
  const email = field(formData, "email")
  const message = field(formData, "message")

  if (field(formData, "website")) {
    return { status: "success", message: "Thank you for your message." }
  }

  const errors: Record<string, string> = {}
  if (firstName.length < 2 || firstName.length > 80)
    errors.firstName = "Enter your first name."
  if (lastName.length < 2 || lastName.length > 80)
    errors.lastName = "Enter your last name."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 160)
    errors.email = "Enter a valid email address."
  if (message.length < 10 || message.length > 5000)
    errors.message = "Write a message between 10 and 5,000 characters."

  if (Object.keys(errors).length) {
    return {
      status: "error",
      message: "Please check the form and try again.",
      errors,
    }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return {
      status: "error",
      message:
        "Email delivery is temporarily unavailable. Please email me directly.",
    }
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["kinga.marchlewska.a@gmail.com"],
        reply_to: email,
        subject: `Portfolio message from ${firstName} ${lastName}`,
        text: `${firstName} ${lastName}\n${email}\n\n${message}`,
        html: `<p><strong>From:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>`,
      }),
    })

    if (!response.ok) throw new Error("Email delivery failed")

    return {
      status: "success",
      message: "Your message has been sent. I’ll get back to you soon.",
    }
  } catch {
    return {
      status: "error",
      message:
        "I couldn’t send your message right now. Please use the email button below.",
    }
  }
}

import Link from "next/link"

export default function BackToHome() {
  return (
    <Link href="/" className="back-home-control">
      <span aria-hidden="true">←</span>
      <span>Back to home</span>
    </Link>
  )
}

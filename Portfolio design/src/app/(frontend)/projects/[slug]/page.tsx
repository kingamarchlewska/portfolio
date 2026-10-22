import ProjectDetailPage from "@/components/portfolio/ProjectDetailPage"

const slugs = [
  "sign-see",
  "histopath-ai",
  "picar-x",
  "cancer-genomics",
  "root-phenotyping",
  "asteroids",
]

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <ProjectDetailPage slug={slug} />
}

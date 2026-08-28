import type { Metadata } from "next"
import ImagePanel from "@/components/ImagePanel"
import ServicesRail from "@/components/ServicesRail"
import SiteEnd from "@/components/SiteEnd"

export const metadata: Metadata = {
  title: "Services — Primestone Construction",
  description: "Residential, commercial and civil construction, renovation, site development and custom builds in The Gambia.",
}

const ALSO = [
  "Architectural design",
  "Interior design",
  "Landscaping",
  "Permit assistance",
  "Project management",
  "Quality inspection",
  "Maintenance",
  "Insurance coordination",
]

export default function ServicesPage() {
  return (
    <div className="snap-container bg-[color:var(--ground)]">
      <ImagePanel
        image="panel-services"
        position="50% 40%"
        priority
        size="hero"
        heading={"What we\nbuild"}
        body="Six kinds of work. Tell us which one you are closest to and we will tell you what it takes."
      />

      <ServicesRail />

      <ImagePanel
        image="panel-quote"
        position="50% 45%"
        heading={"We can also\narrange"}
        body="Ask for these alongside a build and we will fold them into one quote."
      >
        <ul className="mt-8 flex max-w-3xl flex-wrap gap-x-3 gap-y-3">
          {ALSO.map((a) => (
            <li key={a} className="rounded-full border border-[color:var(--sand)]/30 px-5 py-2 text-base text-[color:var(--sand-dim)] sm:text-lg">{a}</li>
          ))}
        </ul>
        <SiteEnd />
      </ImagePanel>
    </div>
  )
}

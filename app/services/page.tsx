import type { Metadata } from "next"
import ImagePanel from "@/components/ImagePanel"
import SiteEnd from "@/components/SiteEnd"

export const metadata: Metadata = {
  title: "Services — Primestone Construction",
  description: "Residential, commercial and civil construction, renovation, site development and custom builds in The Gambia.",
}

const SERVICES = [
  { name: "Residential construction", note: "Family homes, from foundations on an empty plot through to handover." },
  { name: "Commercial construction", note: "Offices, retail units and mixed-use buildings." },
  { name: "Renovation and remodelling", note: "Extending, reworking or finishing a building that already stands." },
  { name: "Civil engineering", note: "Roads, drainage and infrastructure works." },
  { name: "Site development", note: "Clearing, levelling and preparing land before a build begins." },
  { name: "Custom builds", note: "Work that does not fit a standard shape." },
]

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

      <ImagePanel image="panel-build" position="50% 50%" heading="The work">
        <ul className="mt-9 grid max-w-4xl grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <li key={s.name} className="border-t border-white/25 pt-4">
              <div className="text-xl font-semibold text-[color:var(--sand)] sm:text-2xl">{s.name}</div>
              <p className="mt-1.5 text-base text-[color:var(--sand-dim)] sm:text-lg">{s.note}</p>
            </li>
          ))}
        </ul>
      </ImagePanel>

      <ImagePanel
        image="panel-quote"
        position="50% 45%"
        heading={"We can also\narrange"}
        body="Ask for these alongside a build and we will fold them into one quote."
      >
        <ul className="mt-8 flex max-w-3xl flex-wrap gap-x-3 gap-y-3">
          {ALSO.map((a) => (
            <li key={a} className="rounded-full border border-white/30 px-5 py-2 text-base text-[color:var(--sand-dim)] sm:text-lg">{a}</li>
          ))}
        </ul>
        <SiteEnd />
      </ImagePanel>
    </div>
  )
}

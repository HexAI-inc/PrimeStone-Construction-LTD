import type { Metadata } from "next"
import ImagePanel from "@/components/ImagePanel"
import SiteEnd from "@/components/SiteEnd"
import { COMPANY } from "@/lib/enquiry"

export const metadata: Metadata = {
  title: "About — Primestone Construction",
  description: "A construction company in The Gambia, built around clients who cannot stand on the site.",
}

export default function AboutPage() {
  return (
    <div className="snap-container bg-[#0b0f14]">
      <ImagePanel
        image="panel-about"
        position="50% 45%"
        priority
        size="hero"
        heading={"We build here.\nYou can be anywhere."}
        body="Primestone Construction Company Ltd. is a construction company working across The Gambia — residential, commercial and civil. We are based at Turntable, Brusubi."
      />

      <ImagePanel
        image="panel-process"
        position="50% 50%"
        heading={"What we are\nfor"}
        body="Most of the people who write to us are not in the country. They are choosing a contractor from a screen, sending money across a border, and relying on someone they have not met. That is the job we have organised ourselves around."
      >
        <ul className="mt-9 max-w-3xl space-y-4 text-lg text-white/90 sm:text-xl">
          <li className="border-t border-white/20 pt-4">
            Ask us where the work has reached and we will send photographs of it.
          </li>
          <li className="border-t border-white/20 pt-4">
            One company for the build, so you are not coordinating separate trades from another time zone.
          </li>
          <li className="border-t border-white/20 pt-4">
            The same two numbers on every page, answered by the same people.
          </li>
        </ul>
      </ImagePanel>

      <ImagePanel
        image="panel-place"
        position="50% 55%"
        heading={"Come and\nfind us."}
        body={`${COMPANY.address}. Open ${COMPANY.hours[0].days.toLowerCase()}, ${COMPANY.hours[0].time}, and ${COMPANY.hours[1].days.toLowerCase()}, ${COMPANY.hours[1].time} (${COMPANY.timezone}).`}
      >
        <SiteEnd />
      </ImagePanel>
    </div>
  )
}

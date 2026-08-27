import type { Metadata } from "next"
import ImagePanel from "@/components/ImagePanel"
import SiteEnd from "@/components/SiteEnd"
import { buildWhatsAppUrl } from "@/lib/enquiry"

export const metadata: Metadata = {
  title: "Projects — Primestone Construction",
  description: "Ask us for references and photographs of completed work.",
}

/**
 * There is no project gallery yet: PRODUCT.md records that no photograph of a
 * completed Primestone project exists, and inventing one is not an option.
 * This page says so plainly and routes the visitor to a real conversation,
 * rather than filling the gap with stock buildings captioned as our work.
 */
export default function ProjectsPage() {
  return (
    <div className="snap-container bg-[#0b0f14]">
      <ImagePanel
        image="panel-projects"
        position="50% 45%"
        priority
        size="hero"
        heading={"Our gallery is\nstill being built."}
        body="We would rather show you nothing than show you someone else's building. Photographs of our own completed work are being put together — until they are ready, ask and we will put you in touch with people we have built for."
      >
        <div className="mt-10">
          <a
            href={buildWhatsAppUrl("Hello Primestone, could you send me references or photographs of work you have completed?")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#c2571a] px-8 py-4 text-base font-semibold text-white transition hover:bg-[#a84a14] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14] sm:text-lg"
          >
            Ask for references
          </a>
        </div>
      </ImagePanel>

      <ImagePanel
        image="panel-team"
        position="50% 45%"
        heading={"What you can\nask us for"}
        body="Any of this, on WhatsApp, without an appointment."
      >
        <ul className="mt-9 max-w-3xl space-y-4 text-lg text-white/90 sm:text-xl">
          <li className="border-t border-white/20 pt-4">Photographs of a site we are working on now.</li>
          <li className="border-t border-white/20 pt-4">Clients who will talk to you about how it went.</li>
          <li className="border-t border-white/20 pt-4">A written breakdown of what a build like yours costs.</li>
        </ul>
        <SiteEnd />
      </ImagePanel>
    </div>
  )
}

import type { Metadata } from "next"
import ImagePanel from "@/components/ImagePanel"
import SiteEnd from "@/components/SiteEnd"
import { COMPANY } from "@/lib/enquiry"

export const metadata: Metadata = {
  title: "Team — Primestone Construction",
  description: "The people who answer, and the trades that do the work.",
}

/**
 * The previous version of this page named three executives with degrees and
 * years of experience, none of it verified. Publishing unverified biographies
 * of real people is not something this page will do. It describes the trades
 * honestly and invites contact until confirmed names and photographs exist.
 */
export default function TeamPage() {
  return (
    <div className="snap-container bg-[color:var(--ground)]">
      <ImagePanel
        image="panel-team"
        position="50% 42%"
        priority
        size="hero"
        heading={"The people\non the site."}
        body="A build is only as good as the trades doing it. Ours are the people you will be paying for, so it is fair to ask who they are before you commit."
      />

      <ImagePanel
        image="panel-people"
        position="50% 45%"
        heading={"Who you\nwill deal with"}
        body="Call either number during opening hours and you reach the people running the work — not a call centre, and not a form that goes nowhere."
      >
        <div className="mt-9 flex flex-wrap gap-x-10 gap-y-3 text-lg text-[color:var(--sand-dim)]">
          <a href={`tel:+${COMPANY.whatsappNumber}`} className="underline-offset-4 hover:text-[color:var(--ember)] hover:underline">{COMPANY.phonePrimary}</a>
          <a href="tel:+2207834351" className="underline-offset-4 hover:text-[color:var(--ember)] hover:underline">{COMPANY.phoneSecondary}</a>
          <a href={`mailto:${COMPANY.emailProjects}`} className="underline-offset-4 hover:text-[color:var(--ember)] hover:underline">{COMPANY.emailProjects}</a>
        </div>
        <p className="mt-8 max-w-3xl text-base text-[color:var(--sand-faint)] sm:text-lg">
          Want to know exactly who will run your build, and see them? Ask us — we will tell you their name and what
          else they have worked on.
        </p>
        <SiteEnd />
      </ImagePanel>
    </div>
  )
}

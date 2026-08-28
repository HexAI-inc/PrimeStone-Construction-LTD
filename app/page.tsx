"use client"

import { useEffect, useRef, useState } from "react"
import ImagePanel from "@/components/ImagePanel"
import SiteEnd from "@/components/SiteEnd"
import { PANELS } from "@/lib/panels"
import { COMPANY } from "@/lib/enquiry"

/** Five full-viewport photographs, snapped one to the next. */
export default function Home() {
  const [active, setActive] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sections = containerRef.current?.querySelectorAll("section") ?? []
    const list = Array.from(sections)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const i = list.indexOf(e.target as HTMLElement)
          if (i >= 0) setActive(i)
        }
      },
      { root: containerRef.current, threshold: 0.55 },
    )
    list.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="snap-container bg-[color:var(--ground)]">
      <nav
        aria-label="Sections"
        className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-4 sm:right-8 lg:flex"
      >
        {PANELS.map((panel, i) => (
          <a
            key={panel.id}
            href={`#${panel.id}`}
            aria-current={active === i ? "true" : undefined}
            aria-label={panel.heading.replace(/\n/g, " ")}
            className="group flex items-center gap-3 py-1 focus:outline-none"
          >
            <span
              className={`h-[2px] transition-all duration-500 ${
                active === i ? "w-12 bg-[#ff9d4d]" : "w-6 bg-white/50 group-hover:w-9 group-hover:bg-white/85"
              } group-focus-visible:w-12 group-focus-visible:bg-white`}
            />
          </a>
        ))}
      </nav>

      {PANELS.map((panel, i) => (
        <ImagePanel
          key={panel.id}
          id={panel.id}
          image={panel.image}
          position={panel.position}
          heading={panel.heading}
          body={panel.body}
          priority={i === 0}
          size={i === 0 ? "hero" : "section"}
        >
          {panel.items && (
            <ul className="mt-9 grid max-w-3xl grid-cols-1 gap-x-12 gap-y-1 text-lg text-[color:var(--sand-dim)] sm:grid-cols-2 sm:text-xl">
              {panel.items.map((item) => (
                <li key={item} className="border-b border-white/25 py-3">{item}</li>
              ))}
            </ul>
          )}

          {panel.id === "people" && (
            <div className="mt-9 flex flex-wrap gap-x-10 gap-y-3 text-lg text-[color:var(--sand-dim)]">
              <a href={`tel:+${COMPANY.whatsappNumber}`} className="underline-offset-4 hover:text-[color:var(--ember)] hover:underline">{COMPANY.phonePrimary}</a>
              <a href="tel:+2207834351" className="underline-offset-4 hover:text-[color:var(--ember)] hover:underline">{COMPANY.phoneSecondary}</a>
              <a href={`mailto:${COMPANY.emailGeneral}`} className="underline-offset-4 hover:text-[color:var(--ember)] hover:underline">{COMPANY.emailGeneral}</a>
            </div>
          )}

          {panel.id === "place" && <SiteEnd />}
        </ImagePanel>
      ))}
    </div>
  )
}

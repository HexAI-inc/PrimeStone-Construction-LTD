"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"
import { PANELS } from "@/lib/panels"
import { PANEL_LQIP } from "@/lib/panel-lqip"
import { COMPANY, buildWhatsAppUrl } from "@/lib/enquiry"

/**
 * Five full-viewport photographs, snapped one to the next. The scroll container
 * is the page itself so the browser handles snapping natively.
 */
export default function Home() {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const i = refs.current.indexOf(entry.target as HTMLElement)
          if (i >= 0) setActive(i)
        }
      },
      { threshold: 0.55 },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="snap-container bg-[#0b0f14]">
      {/* Which panel you are on, and a way to jump. Hidden on small screens
          where the thumb has nowhere comfortable to put it. */}
      <nav aria-label="Sections" className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-4 sm:right-8 lg:flex">
        {PANELS.map((panel, i) => (
          <a
            key={panel.id}
            href={`#${panel.id}`}
            aria-current={active === i ? "true" : undefined}
            aria-label={panel.heading.replace(/\n/g, " ")}
            className="group flex items-center gap-3 focus:outline-none"
          >
            <span
              className={`h-[2px] transition-all duration-500 ${
                active === i ? "w-10 bg-[#ff9d4d]" : "w-5 bg-white/45 group-hover:w-8 group-hover:bg-white/80"
              } group-focus-visible:w-10 group-focus-visible:bg-white`}
            />
          </a>
        ))}
      </nav>

      {PANELS.map((panel, i) => (
        <section
          key={panel.id}
          id={panel.id}
          ref={(el) => { refs.current[i] = el }}
          aria-label={panel.heading.replace(/\n/g, " ")}
          className="snap-panel relative flex h-[100svh] w-full items-end overflow-hidden"
        >
          {/* Tiny inline placeholder holds the frame until the photograph lands,
              so a slow connection never shows an empty screen. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 scale-110 bg-cover bg-center blur-xl"
            style={{ backgroundImage: `url(${PANEL_LQIP[panel.image]})` }}
          />
          <picture>
            <source media="(max-width: 900px)" srcSet={`/images/panels/${panel.image}-sm.jpg`} />
            <img
              src={`/images/panels/${panel.image}.jpg`}
              alt=""
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : undefined}
              style={{ objectPosition: panel.position, filter: "saturate(0.82) contrast(1.06) brightness(0.86)" }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </picture>
          {/* These are bright, high-key daylight photographs; white copy needs a
              heavy veil, not a hint of one. Written as a real gradient because
              Tailwind does not emit arbitrary-hex stops with opacity modifiers. */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to top, rgba(11,15,20,0.95) 0%, rgba(11,15,20,0.88) 22%, rgba(11,15,20,0.66) 52%, rgba(11,15,20,0.50) 78%, rgba(11,15,20,0.55) 100%)",
            }}
          />

          <div className="panel-copy relative z-10 w-full px-6 pb-20 sm:px-8 sm:pb-24 lg:pb-28">
            <div className="mx-auto w-full max-w-5xl">
              <h1
                className={`max-w-4xl whitespace-pre-line font-semibold leading-[1.02] tracking-[-0.03em] text-white [text-wrap:balance] ${
                  i === 0 ? "text-[clamp(2.25rem,5.6vw,4.5rem)]" : "text-[clamp(2rem,4.4vw,3.5rem)]"
                }`}
              >
                {panel.heading}
              </h1>

              {panel.body && (
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">{panel.body}</p>
              )}

              {panel.items && (
                <ul className="mt-8 grid max-w-3xl grid-cols-1 gap-x-10 gap-y-2 text-base text-white/85 sm:grid-cols-2 sm:text-lg">
                  {panel.items.map((item) => (
                    <li key={item} className="border-b border-white/25 py-2.5">{item}</li>
                  ))}
                </ul>
              )}

              {panel.id === "people" && (
                <div className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-base text-white/85">
                  <a href={`tel:+${COMPANY.whatsappNumber}`} className="underline-offset-4 hover:text-[#ff9d4d] hover:underline">{COMPANY.phonePrimary}</a>
                  <a href="tel:+2207834351" className="underline-offset-4 hover:text-[#ff9d4d] hover:underline">{COMPANY.phoneSecondary}</a>
                  <a href={`mailto:${COMPANY.emailGeneral}`} className="underline-offset-4 hover:text-[#ff9d4d] hover:underline">{COMPANY.emailGeneral}</a>
                </div>
              )}

              {panel.id === "place" && (
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <a
                    href={buildWhatsAppUrl("Hello Primestone, I would like to ask about a project.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c2571a] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#a84a14] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14]"
                  >
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    Message us on WhatsApp
                  </a>
                  <Link
                    href="/quote"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/45 px-7 py-4 text-base font-semibold text-white transition hover:border-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f14]"
                  >
                    Request a quote
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Link>
                </div>
              )}

              {panel.id === "place" && (
                <p className="mt-10 text-sm text-white/70">
                  © {new Date().getFullYear()} {COMPANY.name} · {COMPANY.address} ·{" "}
                  <Link href="/credits" className="underline underline-offset-4 hover:text-white">Photography credits</Link>
                </p>
              )}
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

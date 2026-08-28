"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { PANEL_LQIP } from "@/lib/panel-lqip"
import { SERVICES } from "@/lib/services"

/**
 * The six services as a horizontally snapping rail of full-height photographs.
 *
 * A horizontal scroller is invisible to anyone not using a trackpad, so it
 * carries arrow buttons, is focusable for keyboard scrolling, and reports
 * position. It sits inside a vertically snapping page, so the two axes are kept
 * on separate elements.
 */
export default function ServicesRail() {
  const railRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const sync = useCallback(() => {
    const el = railRef.current
    if (!el) return
    const card = el.firstElementChild as HTMLElement | null
    const step = card ? card.offsetWidth + 16 : el.clientWidth
    setIndex(Math.round(el.scrollLeft / step))
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8)
  }, [])

  useEffect(() => {
    const el = railRef.current
    if (!el) return
    sync()
    el.addEventListener("scroll", sync, { passive: true })
    window.addEventListener("resize", sync)
    return () => {
      el.removeEventListener("scroll", sync)
      window.removeEventListener("resize", sync)
    }
  }, [sync])

  const nudge = (dir: -1 | 1) => {
    const el = railRef.current
    if (!el) return
    const card = el.firstElementChild as HTMLElement | null
    const step = card ? card.offsetWidth + 16 : el.clientWidth
    el.scrollBy({ left: dir * step, behavior: "smooth" })
  }

  return (
    <section
      aria-label="What we build"
      className="snap-panel relative flex min-h-[100svh] w-full flex-col justify-end bg-[color:var(--ground)] pb-10 pt-28 sm:pb-12"
    >
      <div className="mb-7 flex items-end justify-between gap-6 pl-6 pr-6 sm:pl-10 sm:pr-10 lg:pl-16 lg:pr-16">
        <div>
          <h2 className="font-display text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-[color:var(--sand)]">
            The work
          </h2>
          <p className="mt-3 max-w-[46ch] text-lg text-[color:var(--sand-dim)]">
            Six kinds of work. Scroll across, or use the arrows.
          </p>
        </div>

        <div className="hidden shrink-0 gap-3 sm:flex">
          {([["Previous service", -1, ArrowLeft, atStart], ["Next service", 1, ArrowRight, atEnd]] as const).map(
            ([label, dir, Icon, disabled]) => (
              <button
                key={label}
                type="button"
                onClick={() => nudge(dir)}
                disabled={disabled}
                aria-label={label}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--sand)]/35 text-[color:var(--sand)] transition hover:bg-[color:var(--sand)]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ember)] disabled:opacity-30"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </button>
            ),
          )}
        </div>
      </div>

      <div
        ref={railRef}
        tabIndex={0}
        role="group"
        aria-label="Services, scroll horizontally"
        className="services-rail flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-6 pb-4 pl-6 pr-6 sm:scroll-pl-10 sm:pl-10 sm:pr-10 lg:scroll-pl-16 lg:pl-16 lg:pr-16"
      >
        {SERVICES.map((s, i) => (
          <article
            key={s.id}
            aria-label={s.name}
            className="relative h-[58svh] w-[82vw] shrink-0 snap-start overflow-hidden rounded-xl sm:w-[52vw] lg:h-[62svh] lg:w-[34vw]"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 scale-110 bg-cover bg-center blur-lg"
              style={{ backgroundImage: `url(${PANEL_LQIP[s.image]})` }}
            />
            <picture>
              <source media="(max-width: 900px)" srcSet={`/images/panels/${s.image}-sm.jpg`} />
              <img
                src={`/images/panels/${s.image}.jpg`}
                alt=""
                loading={i < 2 ? "eager" : "lazy"}
                style={{ objectPosition: s.position, filter: "saturate(0.82) contrast(1.06) brightness(0.82)" }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </picture>
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.75) 26%, rgba(0,0,0,0.35) 58%, rgba(0,0,0,0.15) 100%)",
              }}
            />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
              <h3 className="font-display text-[clamp(1.6rem,2.4vw,2.1rem)] font-semibold leading-tight tracking-[-0.02em] text-[color:var(--sand)]">
                {s.name}
              </h3>
              <p className="mt-2 max-w-[34ch] text-base text-[color:var(--sand-dim)]">{s.note}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-5 flex gap-2 pl-6 sm:pl-10 lg:pl-16" aria-hidden="true">
        {SERVICES.map((s, i) => (
          <span
            key={s.id}
            className={`h-[2px] transition-all duration-400 ${
              i === index ? "w-10 bg-[color:var(--ember)]" : "w-5 bg-[color:var(--sand)]/30"
            }`}
          />
        ))}
      </div>
    </section>
  )
}

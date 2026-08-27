"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { COMPANY, buildWhatsAppUrl } from "@/lib/enquiry"
import { NAV_LINKS } from "@/lib/panels"

/**
 * A single control in the top-right corner, and a menu that takes the whole
 * screen. There is no persistent bar: the photography is the page, so the
 * chrome stays out of it until asked for.
 */
export default function Navigation() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => setOpen(false), [])

  // Route change closes the menu; without this it stays open over the new page.
  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); toggleRef.current?.focus(); return }
      if (e.key !== "Tab") return
      // Keep focus inside the overlay while it covers everything behind it.
      const items = panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      if (!items || items.length === 0) return
      const first = items[0], last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }

    const { overflow } = document.body.style
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", onKey)
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus()

    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between p-6 sm:p-8">
        <Link
          href="/"
          className="pointer-events-auto rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
          aria-label="Primestone Construction — home"
        >
          <Image
            src="/images/primestone-logo.png"
            alt=""
            width={200}
            height={60}
            priority
            className="h-9 w-auto brightness-0 invert drop-shadow-[0_1px_8px_rgba(0,0,0,0.55)] sm:h-11"
          />
        </Link>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="pointer-events-auto -m-2 flex h-12 w-12 flex-col items-center justify-center gap-[7px] rounded-sm p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <span
            className={`block h-[2px] w-8 bg-white shadow-[0_1px_6px_rgba(0,0,0,0.6)] transition-transform duration-300 ${open ? "translate-y-[4.5px] rotate-45" : ""}`}
          />
          <span
            className={`block h-[2px] w-8 bg-white shadow-[0_1px_6px_rgba(0,0,0,0.6)] transition-transform duration-300 ${open ? "-translate-y-[4.5px] -rotate-45" : ""}`}
          />
        </button>
      </header>

      <div
        id="site-menu"
        ref={panelRef}
        aria-hidden={!open}
        // `hidden` loses to Tailwind's `flex` (equal specificity, later source
        // order), so the display toggle has to be a class.
        className={`fixed inset-0 z-40 flex-col justify-between overflow-y-auto bg-[#0b0f14] px-6 pb-10 pt-28 sm:px-8 sm:pt-32 ${
          open ? "flex" : "hidden"
        }`}
      >
        <nav aria-label="Main">
          <ul className="mx-auto w-full max-w-5xl">
            {NAV_LINKS.map((link, i) => {
              const active = pathname === link.href
              return (
                <li key={link.href} className="border-b border-white/10">
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    style={{ transitionDelay: `${60 + i * 35}ms` }}
                    className={`menu-item group block py-4 text-4xl font-semibold tracking-tight transition-colors sm:py-5 sm:text-6xl ${
                      active ? "text-[#ff9d4d]" : "text-white hover:text-[#ff9d4d]"
                    } focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9d4d]`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="mx-auto mt-12 grid w-full max-w-5xl gap-8 text-sm text-white/70 sm:grid-cols-3">
          <div>
            <div className="mb-2 font-medium text-white">Talk to us</div>
            <a href={buildWhatsAppUrl("Hello Primestone, I would like to ask about a project.")} target="_blank" rel="noopener noreferrer" className="block underline-offset-4 hover:text-[#ff9d4d] hover:underline">
              WhatsApp {COMPANY.phonePrimary}
            </a>
            <a href={`tel:+${COMPANY.whatsappNumber}`} className="block underline-offset-4 hover:text-[#ff9d4d] hover:underline">
              Call {COMPANY.phonePrimary}
            </a>
            <a href={`mailto:${COMPANY.emailGeneral}`} className="block underline-offset-4 hover:text-[#ff9d4d] hover:underline">
              {COMPANY.emailGeneral}
            </a>
          </div>
          <div>
            <div className="mb-2 font-medium text-white">Find us</div>
            <p>{COMPANY.address}</p>
          </div>
          <div>
            <div className="mb-2 font-medium text-white">Opening hours</div>
            {COMPANY.hours.map((h) => (
              <p key={h.days}>{h.days}, {h.time}</p>
            ))}
            <p className="mt-1 text-white/50">All times {COMPANY.timezone}</p>
          </div>
        </div>
      </div>
    </>
  )
}

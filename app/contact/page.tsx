"use client"

import type React from "react"
import { useState } from "react"
import ImagePanel from "@/components/ImagePanel"
import SiteEnd from "@/components/SiteEnd"
import { COMPANY, buildEnquiryMessage, buildWhatsAppUrl, openHandoff } from "@/lib/enquiry"

const SERVICES: Record<string, string> = {
  residential: "Residential construction",
  commercial: "Commercial construction",
  renovation: "Renovation and remodelling",
  civil: "Civil engineering",
  site: "Site development",
  custom: "Custom build",
}

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" })
  const [sent, setSent] = useState(false)

  // No backend exists, so the visitor carries their own message to WhatsApp.
  // Nothing here may promise a reply time — see PRODUCT.md.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    openHandoff(
      buildWhatsAppUrl(
        buildEnquiryMessage("Message from the Primestone website", [
          { label: "Name", value: formData.name },
          { label: "Email", value: formData.email },
          { label: "Phone", value: formData.phone },
          { label: "Service", value: SERVICES[formData.service] ?? "" },
          { label: "Details", value: formData.message },
        ]),
      ),
    )
    setSent(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const field =
    "w-full rounded-lg border border-white/25 bg-white/[0.06] px-4 py-3 text-base text-[color:var(--sand)] placeholder-[color:var(--sand-faint)] transition focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-[color:var(--ember)]"
  const label = "mb-2 block text-sm font-medium text-[color:var(--sand-dim)]"

  return (
    <div className="bg-[color:var(--ground)]">
      <ImagePanel
        image="panel-contact"
        position="50% 50%"
        priority
        size="hero"
        heading={"Talk to a\nperson."}
        body={`We are at ${COMPANY.address}. Message us any time — we read and reply during opening hours, ${COMPANY.timezone}.`}
      >
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          <div>
            <div className="text-sm uppercase tracking-widest text-[color:var(--sand-faint)]">Phone</div>
            <a href={`tel:+${COMPANY.whatsappNumber}`} className="mt-1 block text-lg text-[color:var(--sand)] underline-offset-4 hover:text-[color:var(--ember)] hover:underline">{COMPANY.phonePrimary}</a>
            <a href="tel:+2207834351" className="block text-lg text-[color:var(--sand)] underline-offset-4 hover:text-[color:var(--ember)] hover:underline">{COMPANY.phoneSecondary}</a>
          </div>
          <div>
            <div className="text-sm uppercase tracking-widest text-[color:var(--sand-faint)]">Email</div>
            <a href={`mailto:${COMPANY.emailGeneral}`} className="mt-1 block break-all text-lg text-[color:var(--sand)] underline-offset-4 hover:text-[color:var(--ember)] hover:underline">{COMPANY.emailGeneral}</a>
            <a href={`mailto:${COMPANY.emailProjects}`} className="block break-all text-lg text-[color:var(--sand)] underline-offset-4 hover:text-[color:var(--ember)] hover:underline">{COMPANY.emailProjects}</a>
          </div>
          <div>
            <div className="text-sm uppercase tracking-widest text-[color:var(--sand-faint)]">Open</div>
            {COMPANY.hours.map((h) => (
              <p key={h.days} className="mt-1 text-lg text-[color:var(--sand-dim)]">{h.days}, {h.time}</p>
            ))}
            <p className="text-[color:var(--sand-faint)]">All times {COMPANY.timezone}</p>
          </div>
        </div>
      </ImagePanel>

      <section className="px-6 py-24 sm:px-10 lg:px-16" aria-labelledby="send-heading">
        <div className="w-full max-w-3xl">
          <h2 id="send-heading" className="font-display text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-tight tracking-[-0.03em] text-[color:var(--sand)]">
            Send us a message
          </h2>
          <p className="mt-5 text-lg text-[color:var(--sand-dim)]">
            Your message opens in WhatsApp with these details filled in. It only reaches us once you press send there.
          </p>

          {sent && (
            <div role="status" className="mt-8 rounded-lg border border-[color:var(--ember)]/40 bg-[#ff9d4d]/10 p-4 text-base text-[color:var(--sand)]">
              Your message is waiting in WhatsApp — press send there to deliver it. We read messages{" "}
              {COMPANY.hours[0].days} {COMPANY.hours[0].time} and {COMPANY.hours[1].days} {COMPANY.hours[1].time},{" "}
              {COMPANY.timezone}.
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="min-w-0">
                <label htmlFor="name" className={label}>Full name *</label>
                <input id="name" name="name" value={formData.name} onChange={handleChange} required autoComplete="name" maxLength={120} className={field} placeholder="Your full name" />
              </div>
              <div className="min-w-0">
                <label htmlFor="email" className={label}>Email address *</label>
                <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required autoComplete="email" inputMode="email" maxLength={160} className={field} placeholder="you@example.com" />
              </div>
              <div className="min-w-0">
                <label htmlFor="phone" className={label}>Phone or WhatsApp number</label>
                <input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} autoComplete="tel" inputMode="tel" maxLength={32} className={field} placeholder="+220 363 6351" />
              </div>
              <div className="min-w-0">
                <label htmlFor="service" className={label}>What is it about?</label>
                <select id="service" name="service" value={formData.service} onChange={handleChange} className={field}>
                  <option value="">Not sure yet</option>
                  {Object.entries(SERVICES).map(([id, name]) => (
                    <option key={id} value={id}>{name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className={label}>Tell us about the project *</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6} maxLength={1500} className={`${field} resize-y`} placeholder="Where it is, what you want built, and anything you are unsure about." />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--ember-deep)] px-8 py-4 text-lg font-semibold text-[color:var(--sand)] transition hover:bg-[#a84a14] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--sand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--ground)] sm:w-auto"
            >
              Send on WhatsApp
            </button>
          </form>
        </div>
      </section>

      <ImagePanel image="panel-place" position="50% 55%" heading={"Or just\ncall us."}>
        <SiteEnd />
      </ImagePanel>
    </div>
  )
}

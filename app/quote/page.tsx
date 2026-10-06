"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Building2,
  Calculator,
  Check,
  CheckCircle,
  Clock,
  Copy,
  FileText,
  Hammer,
  Home,
  Mail,
  Map,
  MessageCircle,
  Phone,
  Route,
  Sparkles,
} from "lucide-react"
import ImagePanel from "@/components/ImagePanel"
import {
  COMPANY,
  buildEnquiryMessage,
  buildMailtoUrl,
  buildWhatsAppUrl,
  copyToClipboard,
  openHandoff,
  type EnquiryField,
} from "@/lib/enquiry"

type FormData = {
  name: string
  email: string
  phone: string
  company: string
  projectType: string
  projectSize: string
  location: string
  timeline: string
  description: string
  additionalServices: string[]
  materials: string
  permits: string
}

type FieldName = keyof FormData
type Errors = Partial<Record<FieldName, string>>

const EMPTY_FORM: FormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  projectType: "",
  projectSize: "",
  location: "",
  timeline: "",
  description: "",
  additionalServices: [],
  materials: "",
  permits: "",
}

/** Bumped when the shape of FormData changes, so stale drafts are discarded. */
const DRAFT_KEY = "primestone:quote-draft:v1"

const LIMITS = {
  name: 120,
  email: 160,
  phone: 32,
  company: 120,
  location: 120,
  description: 1200,
  materials: 400,
  permits: 400,
} as const

const projectTypes = [
  { id: "residential", label: "Residential Construction", Icon: Home },
  { id: "commercial", label: "Commercial Construction", Icon: Building2 },
  { id: "renovation", label: "Renovation & Remodeling", Icon: Hammer },
  { id: "civil", label: "Civil Engineering", Icon: Route },
  { id: "site", label: "Site Development", Icon: Map },
  { id: "custom", label: "Custom Build", Icon: Sparkles },
]

const projectSizes = [
  { id: "small", label: "Small — under $50,000", description: "Minor renovations, small residential projects" },
  { id: "medium", label: "Medium — $50,000 to $200,000", description: "Home construction, office spaces" },
  { id: "large", label: "Large — $200,000 to $500,000", description: "Commercial buildings, large homes" },
  { id: "enterprise", label: "Major — above $500,000", description: "Large commercial and infrastructure projects" },
]

const timelines = [
  { id: "asap", label: "As soon as possible" },
  { id: "1-3months", label: "Within 1–3 months" },
  { id: "3-6months", label: "Within 3–6 months" },
  { id: "6-12months", label: "Within 6–12 months" },
  { id: "flexible", label: "Flexible" },
]

const additionalServices = [
  "Architectural Design",
  "Interior Design",
  "Landscaping",
  "Permit Assistance",
  "Project Management",
  "Quality Inspection",
  "Maintenance Services",
  "Insurance Coordination",
]

const steps = [
  { number: 1, title: "Your details", Icon: FileText },
  { number: 2, title: "The project", Icon: Calculator },
  { number: 3, title: "Requirements", Icon: CheckCircle },
  { number: 4, title: "Review & send", Icon: ArrowRight },
]

/** Deliberately permissive: the job is to catch typos, not to police addresses. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validateStep(step: number, data: FormData): Errors {
  const errors: Errors = {}

  if (step === 1) {
    if (!data.name.trim()) errors.name = "Enter your name so we know who we are quoting for."
    if (!data.email.trim()) errors.email = "Enter an email address we can reach you on."
    else if (!EMAIL_PATTERN.test(data.email.trim())) errors.email = "This does not look like an email address. Check for a missing @ or a typo."
    if (!data.phone.trim()) errors.phone = "Enter a phone number, including the country code if you are abroad."
    else if (data.phone.replace(/\D/g, "").length < 7) errors.phone = "This number looks too short. Include the country code, for example +44 or +1."
  }

  if (step === 2) {
    if (!data.projectType) errors.projectType = "Choose the kind of work you need."
    if (!data.projectSize) errors.projectSize = "Choose a budget range so the quote is realistic."
    if (!data.location.trim()) errors.location = "Tell us where the project is, for example Brusubi or Kololi."
  }

  if (step === 3) {
    const description = data.description.trim()
    if (!description) errors.description = "Describe the project so we can quote it properly."
    else if (description.length < 20) errors.description = "Add a little more detail — a sentence or two is enough to start."
  }

  return errors
}

function labelFor(list: { id: string; label: string }[], id: string): string {
  return list.find((item) => item.id === id)?.label ?? ""
}

export default function QuotePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")
  const [announcement, setAnnouncement] = useState("")
  const [draftRestored, setDraftRestored] = useState(false)
  const [copied, setCopied] = useState(false)
  const hydrated = useRef(false)
  const sentHeadingRef = useRef<HTMLHeadingElement>(null)

  // Restore an interrupted draft. This audience fills forms on a phone, at
  // night, between other things — losing four steps of typing is not acceptable.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(DRAFT_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<FormData & { currentStep: number }>
        const restored: FormData = { ...EMPTY_FORM }
        for (const key of Object.keys(EMPTY_FORM) as FieldName[]) {
          const value = parsed[key]
          if (key === "additionalServices") {
            if (Array.isArray(value)) restored.additionalServices = value.filter((item): item is string => typeof item === "string")
          } else if (typeof value === "string") {
            restored[key] = value as never
          }
        }
        const hasContent = Object.values(restored).some((value) => (Array.isArray(value) ? value.length > 0 : value !== ""))
        if (hasContent) {
          setFormData(restored)
          const savedStep = Number(parsed.currentStep)
          if (savedStep >= 1 && savedStep <= 4) setCurrentStep(savedStep)
          setDraftRestored(true)
        }
      }
    } catch {
      // Private mode, disabled storage, or corrupt JSON: start clean.
    }
    hydrated.current = true
  }, [])

  useEffect(() => {
    if (!hydrated.current || status === "sent") return
    try {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...formData, currentStep }))
    } catch {
      // Storage full or unavailable: the form still works, it just will not survive a reload.
    }
  }, [formData, currentStep, status])

  // The form is replaced by a shorter panel, so the scroll position no longer
  // points at anything meaningful. Take the visitor to the confirmation.
  useEffect(() => {
    if (status !== "sent") return
    sentHeadingRef.current?.focus()
    sentHeadingRef.current?.scrollIntoView({ block: "center", behavior: "smooth" })
  }, [status])

  const clearDraft = useCallback(() => {
    try {
      window.localStorage.removeItem(DRAFT_KEY)
    } catch {
      // Nothing to recover from; the draft simply stays.
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear the error as soon as the visitor starts fixing it, never mid-typing add one.
    setErrors((prev) => (prev[name as FieldName] ? { ...prev, [name as FieldName]: undefined } : prev))
  }

  const toggleService = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(value)
        ? prev.additionalServices.filter((item) => item !== value)
        : [...prev.additionalServices, value],
    }))
  }

  const focusFirstError = (stepErrors: Errors) => {
    const first = Object.keys(stepErrors)[0]
    if (!first) return
    window.requestAnimationFrame(() => {
      const field = document.getElementById(`field-${first}`)
      field?.focus({ preventScroll: false })
    })
  }

  const goToStep = (target: number) => {
    if (target === currentStep) return

    // Moving backwards never validates: the visitor is allowed to change their mind.
    if (target < currentStep) {
      setCurrentStep(target)
      setAnnouncement(`Step ${target} of 4: ${steps[target - 1].title}`)
      return
    }

    const stepErrors = validateStep(currentStep, formData)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      const count = Object.keys(stepErrors).length
      setAnnouncement(`${count} ${count === 1 ? "answer needs" : "answers need"} fixing before you can continue.`)
      focusFirstError(stepErrors)
      return
    }

    setErrors({})
    setCurrentStep(target)
    setAnnouncement(`Step ${target} of 4: ${steps[target - 1].title}`)
  }

  const enquiryFields: EnquiryField[] = [
    { label: "Name", value: formData.name },
    { label: "Email", value: formData.email },
    { label: "Phone", value: formData.phone },
    { label: "Company", value: formData.company },
    { label: "Project type", value: labelFor(projectTypes, formData.projectType) },
    { label: "Budget range", value: labelFor(projectSizes, formData.projectSize) },
    { label: "Location", value: formData.location },
    { label: "Timeline", value: labelFor(timelines, formData.timeline) },
    { label: "Additional services", value: formData.additionalServices.join(", ") },
    { label: "Materials", value: formData.materials },
    { label: "Special requirements", value: formData.permits },
    { label: "Description", value: formData.description },
  ]

  const enquirySubject = `Quote request — ${formData.name || "new enquiry"}`
  const enquiryMessage = buildEnquiryMessage("Quote request from the Primestone website", enquiryFields)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === "sending") return

    // Every step is validated, not just the visible one — the earlier steps are
    // unmounted, so the browser's own required-field check cannot see them.
    for (const step of [1, 2, 3]) {
      const stepErrors = validateStep(step, formData)
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors)
        setCurrentStep(step)
        setAnnouncement(`Something is missing on step ${step}. We have taken you back to it.`)
        focusFirstError(stepErrors)
        return
      }
    }

    setStatus("sending")
    openHandoff(buildWhatsAppUrl(enquiryMessage))
    setStatus("sent")
    setAnnouncement("Your request is ready in WhatsApp. Press send there to deliver it.")
    clearDraft()
  }

  const handleCopy = async () => {
    const ok = await copyToClipboard(enquiryMessage)
    setCopied(ok)
    setAnnouncement(ok ? "Request copied to your clipboard." : "Could not copy automatically. Select the text below and copy it.")
    if (ok) window.setTimeout(() => setCopied(false), 4000)
  }

  const startOver = () => {
    setFormData(EMPTY_FORM)
    setErrors({})
    setCurrentStep(1)
    setStatus("idle")
    setDraftRestored(false)
    setAnnouncement("Started a new quote request.")
    clearDraft()
  }

  const inputClass = (field: FieldName) =>
    `w-full rounded-lg border bg-white/[0.06] px-4 py-3 text-base text-[color:var(--sand)] placeholder-[color:var(--sand-faint)] transition-colors focus:outline-none focus:ring-2 focus:ring-[color:var(--ember)] ${
      errors[field] ? "border-red-400" : "border-white/25 focus:border-white/60"
    }`

  const describedBy = (field: FieldName, extra?: string) =>
    [errors[field] ? `error-${field}` : null, extra].filter(Boolean).join(" ") || undefined

  const primaryButtonClass =
    "inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--ember-deep)] px-8 py-3.5 font-semibold text-[color:var(--sand)] transition hover:bg-[#a84a14] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--sand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--ground)] disabled:cursor-not-allowed disabled:opacity-60"

  return (
    <div className="bg-[color:var(--ground)] text-[color:var(--sand)]">
      {/* Announcements for screen readers: step moves, validation, send status. */}
      <div aria-live="polite" role="status" className="sr-only">
        {announcement}
      </div>

      {/* The gradient's light end cannot carry white body text at 4.5:1, so a
          scrim darkens it without changing the shared hero treatment. */}
      <ImagePanel
        image="panel-quote"
        position="50% 45%"
        priority
        size="hero"
        heading={"Request a\nquote"}
        body={`Tell us about your project. The request opens in WhatsApp, so you can reach us from anywhere. We read messages ${COMPANY.hours[0].days}, ${COMPANY.hours[0].time} and ${COMPANY.hours[1].days}, ${COMPANY.hours[1].time} (${COMPANY.timezone}).`}
      />

      {status !== "sent" && (
        <section className="border-b border-white/10 pb-8 pt-28 sm:pt-32">
          <div className="px-6 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-4xl">
              <p className="mb-4 text-sm font-medium text-[color:var(--sand-dim)] sm:hidden">
                Step {currentStep} of 4 — {steps[currentStep - 1].title}
              </p>
              <ol className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const reached = currentStep >= step.number
                  const isCurrent = currentStep === step.number
                  return (
                    <li key={step.number} className="flex min-w-0 items-center">
                      <button
                        type="button"
                        onClick={() => goToStep(step.number)}
                        aria-current={isCurrent ? "step" : undefined}
                        aria-label={`Step ${step.number} of 4: ${step.title}`}
                        className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all focus:outline-none focus:ring-2 focus:ring-orange-900 focus:ring-offset-2 ${
                          reached ? "border-[#c2571a] bg-[color:var(--ember-deep)] text-[color:var(--sand)]" : "border-white/30 bg-transparent text-[color:var(--sand-faint)]"
                        }`}
                      >
                        <step.Icon className="h-5 w-5" aria-hidden="true" />
                      </button>
                      <span
                        className={`ml-3 hidden truncate text-sm font-medium sm:block ${
                          reached ? "text-[color:var(--ember)]" : "text-[color:var(--sand-faint)]"
                        }`}
                      >
                        {step.title}
                      </span>
                      {index < steps.length - 1 && (
                        <span
                          aria-hidden="true"
                          className={`mx-4 h-0.5 w-8 flex-shrink-0 ${currentStep > step.number ? "bg-[color:var(--ember-deep)]" : "bg-white/25"}`}
                        />
                      )}
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="px-6 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-4xl">
            {status === "sent" ? (
              <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-8">
                <div className="mb-6 flex items-start gap-3">
                  <MessageCircle className="mt-1 h-7 w-7 flex-shrink-0 text-green-700" aria-hidden="true" />
                  <div>
                    <h2 ref={sentHeadingRef} tabIndex={-1} className="text-2xl font-bold text-blue-900 focus:outline-none">
                      Your request is waiting in WhatsApp
                    </h2>
                    <p className="mt-2 text-gray-700">
                      It is not sent until you press send in WhatsApp. If the app did not open, use one of the options
                      below — nothing you typed has been lost.
                    </p>
                  </div>
                </div>

                <div className="mb-8 flex flex-wrap gap-3">
                  <button type="button" onClick={() => openHandoff(buildWhatsAppUrl(enquiryMessage))} className={primaryButtonClass}>
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Open WhatsApp again
                  </button>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3.5 font-semibold text-[color:var(--sand)] transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--sand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--ground)]"
                  >
                    {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                    {copied ? "Copied" : "Copy the request"}
                  </button>
                  <a
                    href={buildMailtoUrl(enquirySubject, enquiryMessage)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3.5 font-semibold text-[color:var(--sand)] transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--sand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--ground)]"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Send by email instead
                  </a>
                </div>

                <div className="mb-8">
                  <h3 className="mb-3 font-semibold text-[color:var(--sand)]">What you are sending</h3>
                  <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-words rounded-lg border border-white/12 bg-white/[0.05] p-4 font-sans text-sm text-[color:var(--sand-dim)]">
                    {enquiryMessage}
                  </pre>
                </div>

                <div className="rounded-lg border border-white/12 bg-white/[0.05] p-6">
                  <h3 className="mb-3 font-semibold text-[color:var(--sand)]">When you will hear back</h3>
                  <p className="text-sm text-[color:var(--sand-dim)]">
                    We read WhatsApp during opening hours: {COMPANY.hours[0].days} {COMPANY.hours[0].time}, and{" "}
                    {COMPANY.hours[1].days} {COMPANY.hours[1].time}, {COMPANY.timezone}. If you are messaging from
                    outside The Gambia, that may be the next working morning our side.
                  </p>
                  <p className="mt-3 text-sm text-[color:var(--sand-dim)]">
                    Prefer to speak to someone? Call {COMPANY.phonePrimary} or {COMPANY.phoneSecondary} during those
                    hours.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={startOver}
                  className="mt-6 text-sm font-medium text-[color:var(--ember)] underline underline-offset-4 hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--sand)]"
                >
                  Start another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 sm:p-8">
                {draftRestored && (
                  <div className="mb-8 flex items-start gap-3 rounded-lg border border-white/12 bg-white/[0.05] p-4 text-sm text-[color:var(--sand-dim)]">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    <p className="min-w-0">
                      We brought back what you had already filled in.{" "}
                      <button type="button" onClick={startOver} className="font-semibold underline underline-offset-2 hover:no-underline">
                        Start fresh instead
                      </button>
                      .
                    </p>
                  </div>
                )}

                {currentStep === 1 && (
                  <div>
                    <h2 className="mb-8 font-display text-3xl font-semibold tracking-[-0.02em] text-[color:var(--sand)] sm:text-4xl">Your details</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="min-w-0">
                        <label htmlFor="field-name" className="mb-2 block text-sm font-medium text-[color:var(--sand-dim)]">
                          Full <span className="whitespace-nowrap">name <span className="text-[#ff8f8f]">*</span></span>
                        </label>
                        <input
                          id="field-name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          maxLength={LIMITS.name}
                          autoComplete="name"
                          aria-required="true"
                          aria-invalid={errors.name ? true : undefined}
                          aria-describedby={describedBy("name")}
                          className={inputClass("name")}
                          placeholder="Your full name"
                        />
                        {errors.name && <FieldError id="error-name">{errors.name}</FieldError>}
                      </div>

                      <div className="min-w-0">
                        <label htmlFor="field-email" className="mb-2 block text-sm font-medium text-[color:var(--sand-dim)]">
                          Email <span className="whitespace-nowrap">address <span className="text-[#ff8f8f]">*</span></span>
                        </label>
                        <input
                          id="field-email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          maxLength={LIMITS.email}
                          autoComplete="email"
                          inputMode="email"
                          aria-required="true"
                          aria-invalid={errors.email ? true : undefined}
                          aria-describedby={describedBy("email")}
                          className={inputClass("email")}
                          placeholder="you@example.com"
                        />
                        {errors.email && <FieldError id="error-email">{errors.email}</FieldError>}
                      </div>

                      <div className="min-w-0">
                        <label htmlFor="field-phone" className="mb-2 block text-sm font-medium text-[color:var(--sand-dim)]">
                          Phone or WhatsApp <span className="whitespace-nowrap">number <span className="text-[#ff8f8f]">*</span></span>
                        </label>
                        <input
                          id="field-phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          maxLength={LIMITS.phone}
                          autoComplete="tel"
                          inputMode="tel"
                          aria-required="true"
                          aria-invalid={errors.phone ? true : undefined}
                          aria-describedby={describedBy("phone", "hint-phone")}
                          className={inputClass("phone")}
                          placeholder="+220 833 636 351"
                        />
                        {errors.phone && <FieldError id="error-phone">{errors.phone}</FieldError>}
                        <p id="hint-phone" className="mt-2 text-sm text-[color:var(--sand-faint)]">
                          Include your country code if you are outside The Gambia.
                        </p>
                      </div>

                      <div className="min-w-0">
                        <label htmlFor="field-company" className="mb-2 block text-sm font-medium text-[color:var(--sand-dim)]">
                          Company <span className="font-normal text-gray-600">(optional)</span>
                        </label>
                        <input
                          id="field-company"
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          maxLength={LIMITS.company}
                          autoComplete="organization"
                          className={inputClass("company")}
                          placeholder="Your company name"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <h2 className="mb-8 font-display text-3xl font-semibold tracking-[-0.02em] text-[color:var(--sand)] sm:text-4xl">The project</h2>

                    <fieldset className="mb-8">
                      <legend className="mb-4 text-sm font-medium text-[color:var(--sand-dim)]">
                        What kind of work is <span className="whitespace-nowrap">it? <span className="text-[#ff8f8f]">*</span></span>
                      </legend>
                      <div
                        id="field-projectType"
                        tabIndex={-1}
                        aria-describedby={describedBy("projectType")}
                        className="grid grid-cols-2 gap-4 focus:outline-none lg:grid-cols-3"
                      >
                        {projectTypes.map((type) => (
                          <label key={type.id} className="cursor-pointer">
                            <input
                              type="radio"
                              name="projectType"
                              value={type.id}
                              checked={formData.projectType === type.id}
                              onChange={handleInputChange}
                              className="peer sr-only"
                            />
                            <span
                              className={`flex h-full flex-col items-center gap-2 rounded-lg border-2 p-4 text-center transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-orange-900 peer-focus-visible:ring-offset-2 ${
                                formData.projectType === type.id
                                  ? "border-[color:var(--ember)] bg-[#ff9d4d]/12"
                                  : "border-white/25 hover:border-white/60"
                              }`}
                            >
                              <type.Icon className="h-6 w-6 text-[color:var(--ember)]" aria-hidden="true" />
                              <span className="font-medium text-[color:var(--sand)]">{type.label}</span>
                            </span>
                          </label>
                        ))}
                      </div>
                      {errors.projectType && <FieldError id="error-projectType">{errors.projectType}</FieldError>}
                    </fieldset>

                    <fieldset className="mb-8">
                      <legend className="mb-1 text-sm font-medium text-[color:var(--sand-dim)]">
                        Roughly what budget are you working <span className="whitespace-nowrap">with? <span className="text-[#ff8f8f]">*</span></span>
                      </legend>
                      <p className="mb-4 text-sm text-[color:var(--sand-faint)]">
                        Ranges are in US dollars. A rough band is enough — it only shapes the first conversation.
                      </p>
                      <div
                        id="field-projectSize"
                        tabIndex={-1}
                        aria-describedby={describedBy("projectSize")}
                        className="space-y-3 focus:outline-none"
                      >
                        {projectSizes.map((size) => (
                          <label key={size.id} className="block cursor-pointer">
                            <input
                              type="radio"
                              name="projectSize"
                              value={size.id}
                              checked={formData.projectSize === size.id}
                              onChange={handleInputChange}
                              className="peer sr-only"
                            />
                            <span
                              className={`block rounded-lg border-2 p-4 transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-orange-900 peer-focus-visible:ring-offset-2 ${
                                formData.projectSize === size.id
                                  ? "border-[color:var(--ember)] bg-[#ff9d4d]/12"
                                  : "border-white/25 hover:border-white/60"
                              }`}
                            >
                              <span className="mb-1 block font-medium text-[color:var(--sand)]">{size.label}</span>
                              <span className="block text-sm text-[color:var(--sand-faint)]">{size.description}</span>
                            </span>
                          </label>
                        ))}
                      </div>
                      {errors.projectSize && <FieldError id="error-projectSize">{errors.projectSize}</FieldError>}
                    </fieldset>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="min-w-0">
                        <label htmlFor="field-location" className="mb-2 block text-sm font-medium text-[color:var(--sand-dim)]">
                          Where is the <span className="whitespace-nowrap">project? <span className="text-[#ff8f8f]">*</span></span>
                        </label>
                        <input
                          id="field-location"
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          maxLength={LIMITS.location}
                          aria-required="true"
                          aria-invalid={errors.location ? true : undefined}
                          aria-describedby={describedBy("location")}
                          className={inputClass("location")}
                          placeholder="Town or area, for example Brusubi"
                        />
                        {errors.location && <FieldError id="error-location">{errors.location}</FieldError>}
                      </div>

                      <div className="min-w-0">
                        <label htmlFor="field-timeline" className="mb-2 block text-sm font-medium text-[color:var(--sand-dim)]">
                          When would you like to start?
                        </label>
                        <select
                          id="field-timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className={inputClass("timeline")}
                        >
                          <option value="">No fixed date yet</option>
                          {timelines.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div>
                    <h2 className="mb-8 font-display text-3xl font-semibold tracking-[-0.02em] text-[color:var(--sand)] sm:text-4xl">Requirements</h2>

                    <div className="mb-8">
                      <label htmlFor="field-description" className="mb-2 block text-sm font-medium text-[color:var(--sand-dim)]">
                        Describe the <span className="whitespace-nowrap">project <span className="text-[#ff8f8f]">*</span></span>
                      </label>
                      <textarea
                        id="field-description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={6}
                        maxLength={LIMITS.description}
                        aria-required="true"
                        aria-invalid={errors.description ? true : undefined}
                        aria-describedby={describedBy("description", "hint-description")}
                        className={`${inputClass("description")} resize-y`}
                        placeholder="Size, number of rooms, style, the plot, anything already built, and anything you are unsure about."
                      />
                      {errors.description && <FieldError id="error-description">{errors.description}</FieldError>}
                      <p id="hint-description" className="mt-2 text-sm text-[color:var(--sand-faint)]">
                        {formData.description.length} of {LIMITS.description} characters used.
                      </p>
                    </div>

                    <fieldset className="mb-8">
                      <legend className="mb-4 text-sm font-medium text-[color:var(--sand-dim)]">Anything else you need from us?</legend>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                        {additionalServices.map((service) => (
                          <label key={service} className="flex cursor-pointer items-center gap-2">
                            <input
                              type="checkbox"
                              checked={formData.additionalServices.includes(service)}
                              onChange={() => toggleService(service)}
                              className="h-4 w-4 flex-shrink-0 rounded border-gray-300 accent-[#c2571a] focus:outline-none focus:ring-2 focus:ring-orange-900 focus:ring-offset-2"
                            />
                            <span className="min-w-0 text-sm text-[color:var(--sand-dim)]">{service}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="min-w-0">
                        <label htmlFor="field-materials" className="mb-2 block text-sm font-medium text-[color:var(--sand-dim)]">
                          Materials or finishes you have in mind
                        </label>
                        <textarea
                          id="field-materials"
                          name="materials"
                          value={formData.materials}
                          onChange={handleInputChange}
                          rows={3}
                          maxLength={LIMITS.materials}
                          className={`${inputClass("materials")} resize-y`}
                          placeholder="Optional"
                        />
                      </div>
                      <div className="min-w-0">
                        <label htmlFor="field-permits" className="mb-2 block text-sm font-medium text-[color:var(--sand-dim)]">
                          Permits, access, or anything unusual
                        </label>
                        <textarea
                          id="field-permits"
                          name="permits"
                          value={formData.permits}
                          onChange={handleInputChange}
                          rows={3}
                          maxLength={LIMITS.permits}
                          className={`${inputClass("permits")} resize-y`}
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div>
                    <h2 className="mb-8 font-display text-3xl font-semibold tracking-[-0.02em] text-[color:var(--sand)] sm:text-4xl">Review & send</h2>

                    <dl className="mb-8 grid grid-cols-1 gap-4 rounded-lg border border-white/12 bg-white/[0.05] p-6 text-sm md:grid-cols-2">
                      {enquiryFields
                        .filter((field) => field.value.trim().length > 0)
                        .map((field) => (
                          <div key={field.label} className="min-w-0">
                            <dt className="font-semibold text-[color:var(--sand)]">{field.label}</dt>
                            <dd className="mt-1 whitespace-pre-wrap break-words text-[color:var(--sand-dim)]">{field.value}</dd>
                          </div>
                        ))}
                    </dl>

                    <div className="mb-8 rounded-lg border border-white/12 bg-white/[0.05] p-6">
                      <h3 className="mb-4 font-semibold text-[color:var(--sand)]">What happens when you press send</h3>
                      <ul className="space-y-3 text-sm text-[color:var(--sand-dim)]">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-700" aria-hidden="true" />
                          <span>WhatsApp opens with these details already written out.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-700" aria-hidden="true" />
                          <span>Nothing reaches us until you press send inside WhatsApp.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-700" aria-hidden="true" />
                          <span>
                            We read messages {COMPANY.hours[0].days} {COMPANY.hours[0].time} and {COMPANY.hours[1].days}{" "}
                            {COMPANY.hours[1].time}, {COMPANY.timezone}.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-700" aria-hidden="true" />
                          <span>If WhatsApp will not open, you can copy the request or email it instead.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between gap-4 border-t border-white/15 pt-8">
                  <button
                    type="button"
                    onClick={() => goToStep(currentStep - 1)}
                    disabled={currentStep === 1}
                    className={`inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--sand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--ground)] ${
                      currentStep === 1
                        ? "cursor-not-allowed border border-white/12 text-[color:var(--sand-faint)]"
                        : "border border-white/40 text-[color:var(--sand)] hover:bg-white/10"
                    }`}
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Back
                  </button>

                  {currentStep < 4 ? (
                    <button type="button" onClick={() => goToStep(currentStep + 1)} className={primaryButtonClass}>
                      Next
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  ) : (
                    <button type="submit" disabled={status === "sending"} className={primaryButtonClass}>
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      {status === "sending" ? "Opening WhatsApp…" : "Send on WhatsApp"}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="px-6 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-8 font-display text-3xl font-semibold tracking-[-0.02em] text-[color:var(--sand)] sm:text-4xl">Rather not fill in a form?</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <ContactRoute icon={MessageCircle} label="WhatsApp" value="Start a chat" href={buildWhatsAppUrl("Hello Primestone, I would like to ask about a project.")} external />
              <ContactRoute icon={Phone} label="Call us" value={COMPANY.phonePrimary} href={`tel:+${COMPANY.whatsappNumber}`} />
              <ContactRoute icon={Mail} label="Email us" value={COMPANY.emailProjects} href={`mailto:${COMPANY.emailProjects}`} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm text-[#ff8f8f]">
      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
      <span className="min-w-0">{children}</span>
    </p>
  )
}

function ContactRoute({
  icon: Icon,
  label,
  value,
  href,
  external,
}: {
  icon: typeof Phone
  label: string
  value: string
  href: string
  external?: boolean
}) {
  return (
    <div className="flex items-center justify-center gap-3">
      <Icon className="h-6 w-6 flex-shrink-0 text-[color:var(--ember)]" aria-hidden="true" />
      <div className="min-w-0 text-left">
        <div className="font-semibold text-[color:var(--sand)]">{label}</div>
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="break-words text-[color:var(--ember)] underline underline-offset-2 hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--sand)]"
        >
          {value}
        </a>
      </div>
    </div>
  )
}

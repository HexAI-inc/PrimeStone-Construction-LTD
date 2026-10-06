/**
 * Enquiry handoff.
 *
 * The site has no backend, so an enquiry is carried by the visitor: we build a
 * readable message and hand it to WhatsApp (primary) or email (fallback).
 * Nothing here may promise a response time — see PRODUCT.md.
 */

/** Confirmed company facts. Do not add unverified values. */
export const COMPANY = {
  name: "Primestone Construction Company Ltd.",
  /** Digits only, international format, for wa.me links. */
  whatsappNumber: "220833636351",
  phonePrimary: "+220 833 636 351",
  phoneSecondary: "+220 877 834 351",
  emailGeneral: "oumiehairy@gmail.com",
  emailProjects: "oumiehairy@gmail.com",
  address: "Turntable, Brusubi, The Gambia",
  hours: [
    { days: "Monday to Friday", time: "8:00 AM – 6:00 PM" },
    { days: "Saturday", time: "9:00 AM – 4:00 PM" },
  ],
  /** The Gambia observes GMT year-round; visitors abroad need this stated. */
  timezone: "GMT",
} as const

/**
 * wa.me rejects very long URLs and some clients truncate silently, so cap the
 * message and tell the reader what was cut rather than losing it invisibly.
 */
const MAX_MESSAGE_LENGTH = 1400

export type EnquiryField = { label: string; value: string }

export function buildEnquiryMessage(heading: string, fields: EnquiryField[]): string {
  const body = fields
    .filter((field) => field.value.trim().length > 0)
    .map((field) => `${field.label}: ${field.value.trim()}`)
    .join("\n")

  const message = `${heading}\n\n${body}`
  if (message.length <= MAX_MESSAGE_LENGTH) return message

  return `${message.slice(0, MAX_MESSAGE_LENGTH)}\n\n[Message shortened to send. Ask me for the rest.]`
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function buildMailtoUrl(subject: string, message: string): string {
  return `mailto:${COMPANY.emailProjects}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
}

/**
 * Opening a new tab can be blocked, and some in-app browsers return a live
 * window that never navigates. Fall back to same-tab navigation so the visitor
 * is never left thinking the button is broken.
 */
export function openHandoff(url: string): void {
  try {
    const opened = window.open(url, "_blank", "noopener,noreferrer")
    if (!opened || opened.closed) window.location.href = url
  } catch {
    window.location.href = url
  }
}

/** Best-effort clipboard write; callers must handle a false result. */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // Permission denied or insecure context; fall through.
  }
  return false
}

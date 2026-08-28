import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"
import { COMPANY, buildWhatsAppUrl } from "@/lib/enquiry"

/** The closing panel every route ends on, replacing the old global footer. */
export default function SiteEnd({ hideQuoteLink = false }: { hideQuoteLink?: boolean }) {
  return (
    <div className="mt-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <a
          href={buildWhatsAppUrl("Hello Primestone, I would like to ask about a project.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--ember-deep)] px-8 py-4 text-base font-semibold text-[color:var(--sand)] transition hover:bg-[#a84a14] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--sand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--ground)] sm:text-lg"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          Message us on WhatsApp
        </a>
        {!hideQuoteLink && (
          <Link
            href="/quote"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/45 px-8 py-4 text-base font-semibold text-[color:var(--sand)] transition hover:border-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--sand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--ground)] sm:text-lg"
          >
            Request a quote
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        )}
      </div>

      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-base text-[color:var(--sand-dim)]">
        <a href={`tel:+${COMPANY.whatsappNumber}`} className="underline-offset-4 hover:text-[color:var(--ember)] hover:underline">{COMPANY.phonePrimary}</a>
        <a href="tel:+2207834351" className="underline-offset-4 hover:text-[color:var(--ember)] hover:underline">{COMPANY.phoneSecondary}</a>
        <a href={`mailto:${COMPANY.emailGeneral}`} className="underline-offset-4 hover:text-[color:var(--ember)] hover:underline">{COMPANY.emailGeneral}</a>
      </div>

      <p className="mt-8 text-sm text-[color:var(--sand-faint)]">
        © {new Date().getFullYear()} {COMPANY.name} · {COMPANY.address} ·{" "}
        <Link href="/credits" className="underline underline-offset-4 hover:text-[color:var(--sand)]">Photography credits</Link>
      </p>
    </div>
  )
}

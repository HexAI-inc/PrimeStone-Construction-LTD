import type { Metadata } from "next"
import Link from "next/link"
import { PHOTO_CREDITS } from "@/lib/panels"
import { COMPANY } from "@/lib/enquiry"

export const metadata: Metadata = {
  title: "Photography credits — Primestone Construction",
  description: "Attribution for the photography used on this site.",
}

export default function CreditsPage() {
  return (
    <div className="min-h-[100svh] bg-[color:var(--ground)] px-6 pb-24 pt-32 text-[color:var(--sand)] sm:px-10 lg:px-16">
      <div className="w-full max-w-3xl">
        <h1 className="font-display text-[clamp(2.1rem,5vw,3.5rem)] font-semibold leading-tight tracking-[-0.03em]">
          Photography credits
        </h1>
        <p className="mt-6 text-[color:var(--sand-dim)]">
          The photographs on this site are licensed stock images of construction in West Africa, used to set the
          scene. They are not photographs of Primestone projects, and no building shown here is presented as our work.
        </p>

        <ul className="mt-12 space-y-8">
          {PHOTO_CREDITS.map((c) => (
            <li key={c.file} className="border-t border-white/12 pt-6">
              <div className="font-medium">{c.title}</div>
              <div className="mt-1 text-sm text-[color:var(--sand-faint)]">
                by {c.author} ·{" "}
                <a href={c.licenceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-[color:var(--ember)]">
                  {c.licence}
                </a>
              </div>
              <a
                href={c.source}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block break-all text-sm text-[color:var(--sand-faint)] underline underline-offset-4 hover:text-[color:var(--sand-dim)]"
              >
                {c.source}
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-14 text-sm text-[color:var(--sand-faint)]">
          © {new Date().getFullYear()} {COMPANY.name} ·{" "}
          <Link href="/" className="underline underline-offset-4 hover:text-[color:var(--sand-dim)]">Back to the homepage</Link>
        </p>
      </div>
    </div>
  )
}

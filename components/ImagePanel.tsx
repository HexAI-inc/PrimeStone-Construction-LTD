import type { ReactNode } from "react"
import { PANEL_LQIP } from "@/lib/panel-lqip"

type Props = {
  id?: string
  /** Basename in /public/images/panels, without extension. */
  image: string
  /** object-position, so the subject survives every crop. */
  position?: string
  heading: string
  body?: string
  children?: ReactNode
  /** The first panel on a route loads eagerly; the rest are lazy. */
  priority?: boolean
  /** Heroes carry the larger of the two display sizes. */
  size?: "hero" | "section"
  className?: string
}

/**
 * One full-viewport photograph with copy set hard against the left edge.
 *
 * The photographs are bright daylight scenes, so legibility comes from two
 * stacked layers: an overall veil, then a deep shadow ramp up from the bottom
 * edge where the copy actually sits. Tailwind does not emit arbitrary-hex
 * gradient stops with opacity modifiers, so both are written as real CSS.
 */
export default function ImagePanel({
  id,
  image,
  position = "50% 50%",
  heading,
  body,
  children,
  priority = false,
  size = "section",
  className = "",
}: Props) {
  return (
    <section
      id={id}
      aria-label={heading.replace(/\n/g, " ")}
      className={`snap-panel relative flex min-h-[100svh] w-full items-end overflow-hidden ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 scale-110 bg-cover bg-center blur-xl"
        style={{ backgroundImage: `url(${PANEL_LQIP[image]})` }}
      />
      <picture>
        <source media="(max-width: 900px)" srcSet={`/images/panels/${image}-sm.jpg`} />
        <img
          src={`/images/panels/${image}.jpg`}
          alt=""
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          style={{ objectPosition: position, filter: "saturate(0.8) contrast(1.06) brightness(0.82)" }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>

      {/* Overall veil. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(11,15,20,0.92) 0%, rgba(11,15,20,0.80) 26%, rgba(11,15,20,0.55) 55%, rgba(11,15,20,0.40) 80%, rgba(11,15,20,0.45) 100%)",
        }}
      />
      {/* Deep shadow under the copy itself. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[70%]"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.72) 18%, rgba(0,0,0,0.40) 45%, rgba(0,0,0,0.12) 75%, rgba(0,0,0,0) 100%)",
        }}
      />
      {/* A little extra weight down the left edge, where the copy now lives. */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[65%]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.28) 45%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="panel-copy relative z-10 w-full pb-16 pl-6 pr-6 pt-32 sm:pb-20 sm:pl-10 sm:pr-10 lg:pb-24 lg:pl-16">
        <h1
          className={`max-w-[22ch] whitespace-pre-line font-display font-semibold leading-[1.02] tracking-[-0.02em] text-[color:var(--sand)] ${
            size === "hero"
              ? "text-[clamp(2.6rem,6.4vw,5.25rem)]"
              : "text-[clamp(2.25rem,5vw,4.25rem)]"
          }`}
        >
          {heading}
        </h1>

        {body && (
          <p className="mt-7 max-w-[46ch] text-lg leading-relaxed text-[color:var(--sand-dim)] sm:text-xl lg:text-[1.375rem]">
            {body}
          </p>
        )}

        {children}
      </div>
    </section>
  )
}

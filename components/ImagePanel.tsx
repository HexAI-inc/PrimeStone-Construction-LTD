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
 * One full-viewport photograph with copy over it.
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
          style={{ objectPosition: position, filter: "saturate(0.82) contrast(1.06) brightness(0.84)" }}
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

      <div className="panel-copy relative z-10 w-full px-6 pb-16 pt-32 sm:px-8 sm:pb-20 lg:pb-24">
        <div className="mx-auto w-full max-w-5xl">
          <h1
            className={`max-w-4xl whitespace-pre-line font-semibold leading-[1.0] tracking-[-0.035em] text-white [text-wrap:balance] ${
              size === "hero"
                ? "text-[clamp(2.75rem,6.8vw,5.5rem)]"
                : "text-[clamp(2.4rem,5.4vw,4.5rem)]"
            }`}
          >
            {heading}
          </h1>

          {body && (
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/90 sm:text-xl lg:text-2xl">
              {body}
            </p>
          )}

          {children}
        </div>
      </div>
    </section>
  )
}

import type React from "react"
import type { Metadata } from "next"
import { Fraunces, Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/Navigation"

// Fraunces carries the display voice; Inter does the reading.
const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
})

const body = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "Primestone Construction Company Ltd.",
  description:
    "Residential, commercial and civil construction in The Gambia — for people making the decisions from another country.",
  keywords: "construction, building, Gambia, residential, commercial, civil engineering, diaspora",
  openGraph: {
    title: "Primestone Construction Company Ltd.",
    description:
      "Residential, commercial and civil construction in The Gambia — for people making the decisions from another country.",
    type: "website",
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image" },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${display.variable} ${body.variable}`}>
      <body className="font-body antialiased">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}

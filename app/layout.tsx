import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/Navigation"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
    <html lang="en" className="scroll-smooth">
      <body className={poppins.className}>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}

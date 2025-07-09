import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import MouseTracker from "@/components/MouseTracker"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Primestone Construction Company Ltd. - Building Excellence in The Gambia",
  description:
    "Full-service construction company in The Gambia specializing in residential, commercial, and civil engineering projects. Quality construction with international standards.",
  keywords: "construction, building, Gambia, residential, commercial, civil engineering",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={poppins.className}>
        <MouseTracker />
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

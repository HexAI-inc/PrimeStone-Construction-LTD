"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, type ReactNode } from "react"

interface SmoothSectionProps {
  children: ReactNode
  className?: string
  id?: string
  fullHeight?: boolean
}

export default function SmoothSection({ children, className = "", id, fullHeight = true }: SmoothSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: false,
    margin: "-10% 0px -10% 0px",
  })

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 0.75],
      }}
      className={`
        ${fullHeight ? "min-h-screen" : ""} 
        flex flex-col justify-center 
        transition-all duration-700 ease-in-out
        ${className}
      `}
    >
      {children}
    </motion.section>
  )
}

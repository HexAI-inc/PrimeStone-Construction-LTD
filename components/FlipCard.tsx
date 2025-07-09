"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import type { ReactNode } from "react"

interface FlipCardProps {
  frontContent: ReactNode
  backContent: ReactNode
  className?: string
}

export default function FlipCard({ frontContent, backContent, className = "" }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className={`relative w-full h-full perspective-1000 ${className}`}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden">{frontContent}</div>

        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">{backContent}</div>
      </motion.div>
    </div>
  )
}

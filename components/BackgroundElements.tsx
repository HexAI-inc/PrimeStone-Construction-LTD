"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface BackgroundElementsProps {
  variant?: "blue" | "light"
}

export default function BackgroundElements({ variant = "blue" }: BackgroundElementsProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", updateMousePosition)
    return () => window.removeEventListener("mousemove", updateMousePosition)
  }, [])

  const isBlue = variant === "blue"

  // Generate random positions for floating elements
  const floatingElements = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 4,
    delay: Math.random() * 2,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Mouse-following gradient */}
      <motion.div
        className={`absolute w-96 h-96 rounded-full opacity-20 blur-3xl ${isBlue ? "bg-orange-800" : "bg-blue-900"}`}
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 20,
        }}
      />

      {/* Floating dots/stars */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute rounded-full ${isBlue ? "bg-white bg-opacity-30" : "bg-blue-900 bg-opacity-20"}`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + element.delay,
            repeat: Number.POSITIVE_INFINITY,
            delay: element.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Geometric shapes */}
      <motion.div
        className={`absolute top-20 right-20 w-32 h-32 ${
          isBlue ? "border-white border-opacity-20" : "border-blue-900 border-opacity-20"
        } border-2 rotate-45`}
        animate={{
          rotate: [45, 225, 45],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <motion.div
        className={`absolute bottom-32 left-16 w-24 h-24 ${
          isBlue ? "bg-white bg-opacity-10" : "bg-blue-900 bg-opacity-10"
        } rounded-full`}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Grid pattern */}
      <div
        className={`absolute inset-0 opacity-5 ${isBlue ? "bg-white" : "bg-blue-900"}`}
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Animated lines */}
      <motion.div
        className={`absolute top-1/4 left-0 w-full h-px ${
          isBlue ? "bg-white bg-opacity-20" : "bg-blue-900 bg-opacity-20"
        }`}
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className={`absolute top-3/4 left-0 w-full h-px ${
          isBlue ? "bg-white bg-opacity-20" : "bg-blue-900 bg-opacity-20"
        }`}
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          delay: 3,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

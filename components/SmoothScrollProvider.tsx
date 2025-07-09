"use client"

import { useEffect } from "react"

export default function SmoothScrollProvider() {
  useEffect(() => {
    // Add smooth scrolling behavior
    const style = document.createElement("style")
    style.textContent = `
      html {
        scroll-behavior: smooth;
        scroll-snap-type: y mandatory;
      }
      
      section {
        scroll-snap-align: start;
        scroll-snap-stop: always;
      }
      
      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: #f1f5f9;
      }
      
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #003366, #e85d0e);
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #002244, #d14a00);
      }
      
      /* Smooth transitions for all elements */
      * {
        transition: all 0.3s cubic-bezier(0.25, 0.25, 0.25, 0.75);
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return null
}

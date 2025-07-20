"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  return (
    <footer className="bg-gradient-to-br from-blue-900 to-blue-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <motion.div variants={itemVariants}>
              <div className="mb-6">
                <Image
                  src="/images/primestone-logo.png"
                  alt="PrimeStone Construction Company Ltd."
                  width={200}
                  height={60}
                  className="h-12 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Building excellence in The Gambia with international standards. Your trusted partner for all
                construction needs.
              </p>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                    <div className="w-10 h-10 bg-white bg-opacity-10 rounded-lg flex items-center justify-center hover:bg-orange-800 transition-colors cursor-pointer">
                      <Icon size={18} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-xl mb-6">Quick Links</h3>
              <div className="space-y-3">
                {[
                  { href: "/about", label: "About Us" },
                  { href: "/services", label: "Services" },
                  { href: "/projects", label: "Projects" },
                  { href: "/contact", label: "Contact" },
                ].map((link) => (
                  <motion.div key={link.href} whileHover={{ x: 5 }}>
                    <Link href={link.href} className="text-gray-300 hover:text-orange-300 transition-colors block">
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Services */}
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-xl mb-6">Our Services</h3>
              <div className="space-y-3">
                {[
                  "Residential Construction",
                  "Commercial Construction",
                  "Renovations",
                  "Civil Engineering",
                  "Site Development",
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="inline-block bg-orange-800 bg-opacity-20 text-orange-300 px-3 py-1 rounded-full text-sm mb-2 mr-2">
                      {service}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants}>
              <h3 className="font-semibold text-xl mb-6">Contact Information</h3>
              <div className="space-y-4">
                {[
                  { icon: MapPin, text: "Turntable, Brusubi, The Gambia" },
                  { icon: Phone, text: "+220 363 6351" },
                  { icon: Mail, text: "PrimeStonecompany@gmail.com" },
                  { icon: Clock, text: "Mon - Fri: 8:00 AM - 6:00 PM" },
                ].map((item, index) => (
                  <motion.div key={index} whileHover={{ x: 5 }} className="flex items-center space-x-3">
                    <item.icon className="text-orange-300 flex-shrink-0" size={20} />
                    <span className="text-gray-300">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="border-t border-blue-800 mt-12 pt-8 text-center">
            <motion.p variants={itemVariants} className="text-gray-400">
              © 2025 Primestone Construction Company Ltd. All rights reserved.
              Developed by HexAI
            </motion.p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

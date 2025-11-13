"use client"

import type React from "react"

import { useState } from "react"
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from "lucide-react"
import AnimatedSection from "@/components/AnimatedSection"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    })
    alert("Thank you for your message! We will get back to you soon.")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-orange-600" />,
      title: "Phone",
      details: ["+220 363 6351", "+220 783 4351"],
      action: "tel:+2203636351",
    },
    {
      icon: <Mail className="w-6 h-6 text-orange-600" />,
      title: "Email",
      details: ["info@primestone.gm", "projects@primestone.gm"],
      action: "mailto:info@primestone.gm",
    },
    {
      icon: <MapPin className="w-6 h-6 text-orange-600" />,
      title: "Address",
      details: ["Turntable", "Brusubi, The Gambia"],
      action: "#",
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-600" />,
      title: "Business Hours",
      details: ["Mon - Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 4:00 PM"],
      action: "#",
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl lg:text-2xl text-blue-100">
              Ready to start your construction project? Contact us for a free consultation
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <AnimatedSection direction="left" duration={ 2 }/*animation="slide-in-left"*/>
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all"
                        placeholder="+220 123 4567"
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all"
                      >
                        <option value="">Select a service</option>
                        <option value="residential">Residential Construction</option>
                        <option value="commercial">Commercial Construction</option>
                        <option value="renovation">Renovations</option>
                        <option value="civil">Civil Engineering</option>
                        <option value="site">Site Development</option>
                        <option value="custom">Custom Builds</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your project, timeline, budget, and any specific requirements..."
                    ></textarea>
                  </div>

                  <button type="submit" className="w-full btn-primary text-lg py-4">
                    Send Message
                    <Send className="ml-2 w-5 h-5" />
                  </button>
                </form>
              </div>
            </AnimatedSection>

            {/* Contact Information */}
            <AnimatedSection direction="right" duration={ 2 } /* animation="slide-in-right" */>
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-blue-900 mb-6">Contact Information</h2>
                  <p className="text-gray-600 mb-8">
                    Get in touch with us through any of the following methods. We're here to help with your construction
                    needs.
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">{info.icon}</div>
                      <div>
                        <h3 className="font-semibold text-blue-900 mb-2">{info.title}</h3>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-gray-600">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* WhatsApp Contact */}
                <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <MessageSquare className="w-6 h-6 text-green-600" />
                    <h3 className="font-semibold text-green-800">WhatsApp Chat</h3>
                  </div>
                  <p className="text-green-700 mb-4">
                    For quick questions and immediate responses, chat with us on WhatsApp.
                  </p>
                  <a
                    href="https://wa.me/2201234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Visit Our Office</h2>
            <p className="text-xl text-gray-600">
              Located in the heart of Brusubi, we're easily accessible for consultations
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Interactive map would be embedded here</p>
                  <p className="text-sm text-gray-500 mt-2">Turntable, Brusubi, The Gambia</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-12 bg-red-50 border-t border-red-200">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center">
            <h3 className="text-xl font-bold text-red-800 mb-2">Emergency Construction Services</h3>
            <p className="text-red-700 mb-4">For urgent construction emergencies, call our 24/7 hotline</p>
            <a
              href="tel:+2203636351"
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              Emergency: +220 363 6351
            </a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

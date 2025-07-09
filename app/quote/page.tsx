"use client"

import type React from "react"
import { useState } from "react"
import { ArrowRight, Calculator, FileText, Clock, CheckCircle, Phone, Mail } from "lucide-react"
import AnimatedSection from "@/components/AnimatedSection"

export default function QuotePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    name: "",
    email: "",
    phone: "",
    company: "",

    // Project Details
    projectType: "",
    projectSize: "",
    location: "",
    timeline: "",
    budget: "",

    // Specific Requirements
    description: "",
    features: [] as string[],
    materials: "",
    permits: "",

    // Additional Services
    additionalServices: [] as string[],
    urgency: "",
    previousExperience: "",
  })

  const projectTypes = [
    { id: "residential", label: "Residential Construction", icon: "🏠" },
    { id: "commercial", label: "Commercial Construction", icon: "🏢" },
    { id: "renovation", label: "Renovation & Remodeling", icon: "🔨" },
    { id: "civil", label: "Civil Engineering", icon: "🛣️" },
    { id: "site", label: "Site Development", icon: "📍" },
    { id: "custom", label: "Custom Build", icon: "⚡" },
  ]

  const projectSizes = [
    { id: "small", label: "Small (Under $50K)", description: "Minor renovations, small residential projects" },
    { id: "medium", label: "Medium ($50K - $200K)", description: "Home construction, office spaces" },
    { id: "large", label: "Large ($200K - $500K)", description: "Commercial buildings, large homes" },
    { id: "enterprise", label: "Enterprise ($500K+)", description: "Major commercial, infrastructure projects" },
  ]

  const additionalServices = [
    "Architectural Design",
    "Interior Design",
    "Landscaping",
    "Permit Assistance",
    "Project Management",
    "Quality Inspection",
    "Maintenance Services",
    "Insurance Coordination",
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleCheckboxChange = (value: string, field: "features" | "additionalServices") => {
    const currentArray = formData[field]
    const updatedArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]

    setFormData({
      ...formData,
      [field]: updatedArray,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Quote request submitted:", formData)
    alert("Thank you for your quote request! We will contact you within 24 hours with a detailed proposal.")
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const steps = [
    { number: 1, title: "Personal Info", icon: <FileText className="w-5 h-5" /> },
    { number: 2, title: "Project Details", icon: <Calculator className="w-5 h-5" /> },
    { number: 3, title: "Requirements", icon: <CheckCircle className="w-5 h-5" /> },
    { number: 4, title: "Review & Submit", icon: <ArrowRight className="w-5 h-5" /> },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Request a Quote</h1>
            <p className="text-xl text-blue-100 mb-8">
              Get a detailed, personalized quote for your construction project
            </p>
            <div className="flex items-center justify-center space-x-2 text-orange-300">
              <Clock className="w-5 h-5" />
              <span>Response within 24 hours</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                      currentStep >= step.number
                        ? "bg-orange-800 border-orange-800 text-white"
                        : "bg-white border-gray-300 text-gray-500"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <div className={`font-medium ${currentStep >= step.number ? "text-orange-800" : "text-gray-500"}`}>
                      {step.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-4 ${currentStep > step.number ? "bg-orange-800" : "bg-gray-300"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <AnimatedSection>
                  <h2 className="text-2xl font-bold text-blue-900 mb-8">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-800 focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-800 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-800 focus:border-transparent"
                        placeholder="+220 123 4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company (Optional)</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-800 focus:border-transparent"
                        placeholder="Your company name"
                      />
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Step 2: Project Details */}
              {currentStep === 2 && (
                <AnimatedSection>
                  <h2 className="text-2xl font-bold text-blue-900 mb-8">Project Details</h2>

                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-4">Project Type *</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {projectTypes.map((type) => (
                        <label key={type.id} className="cursor-pointer">
                          <input
                            type="radio"
                            name="projectType"
                            value={type.id}
                            checked={formData.projectType === type.id}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div
                            className={`p-4 border-2 rounded-lg text-center transition-all ${
                              formData.projectType === type.id
                                ? "border-orange-800 bg-orange-50"
                                : "border-gray-200 hover:border-orange-300"
                            }`}
                          >
                            <div className="text-2xl mb-2">{type.icon}</div>
                            <div className="font-medium text-gray-900">{type.label}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-4">Project Size & Budget *</label>
                    <div className="space-y-3">
                      {projectSizes.map((size) => (
                        <label key={size.id} className="cursor-pointer">
                          <input
                            type="radio"
                            name="projectSize"
                            value={size.id}
                            checked={formData.projectSize === size.id}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <div
                            className={`p-4 border-2 rounded-lg transition-all ${
                              formData.projectSize === size.id
                                ? "border-orange-800 bg-orange-50"
                                : "border-gray-200 hover:border-orange-300"
                            }`}
                          >
                            <div className="font-medium text-gray-900 mb-1">{size.label}</div>
                            <div className="text-sm text-gray-600">{size.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Location *</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-800 focus:border-transparent"
                        placeholder="City, Region"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Timeline</label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-800 focus:border-transparent"
                      >
                        <option value="">Select timeline</option>
                        <option value="asap">ASAP (Rush job)</option>
                        <option value="1-3months">1-3 months</option>
                        <option value="3-6months">3-6 months</option>
                        <option value="6-12months">6-12 months</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Step 3: Requirements */}
              {currentStep === 3 && (
                <AnimatedSection>
                  <h2 className="text-2xl font-bold text-blue-900 mb-8">Project Requirements</h2>

                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Description *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-800 focus:border-transparent resize-none"
                      placeholder="Describe your project in detail. Include size, style preferences, specific requirements, and any other important details..."
                    />
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-4">Additional Services Needed</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {additionalServices.map((service) => (
                        <label key={service} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.additionalServices.includes(service)}
                            onChange={() => handleCheckboxChange(service, "additionalServices")}
                            className="w-4 h-4 text-orange-800 border-gray-300 rounded focus:ring-orange-800"
                          />
                          <span className="ml-2 text-sm text-gray-700">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Material Preferences</label>
                      <textarea
                        name="materials"
                        value={formData.materials}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-800 focus:border-transparent resize-none"
                        placeholder="Any specific materials or finishes you prefer..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Special Requirements</label>
                      <textarea
                        name="permits"
                        value={formData.permits}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-800 focus:border-transparent resize-none"
                        placeholder="Permits needed, accessibility requirements, etc..."
                      />
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Step 4: Review & Submit */}
              {currentStep === 4 && (
                <AnimatedSection>
                  <h2 className="text-2xl font-bold text-blue-900 mb-8">Review Your Request</h2>

                  <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <h3 className="font-semibold text-gray-900 mb-4">Project Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>Name:</strong> {formData.name}
                      </div>
                      <div>
                        <strong>Email:</strong> {formData.email}
                      </div>
                      <div>
                        <strong>Phone:</strong> {formData.phone}
                      </div>
                      <div>
                        <strong>Project Type:</strong> {projectTypes.find((t) => t.id === formData.projectType)?.label}
                      </div>
                      <div>
                        <strong>Budget Range:</strong> {projectSizes.find((s) => s.id === formData.projectSize)?.label}
                      </div>
                      <div>
                        <strong>Location:</strong> {formData.location}
                      </div>
                      <div>
                        <strong>Timeline:</strong> {formData.timeline}
                      </div>
                      <div>
                        <strong>Additional Services:</strong> {formData.additionalServices.join(", ") || "None"}
                      </div>
                    </div>
                    {formData.description && (
                      <div className="mt-4">
                        <strong>Description:</strong>
                        <p className="mt-1 text-gray-700">{formData.description}</p>
                      </div>
                    )}
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg mb-8">
                    <h3 className="font-semibold text-blue-900 mb-4">What Happens Next?</h3>
                    <div className="space-y-3 text-sm text-blue-800">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                        We'll review your request within 2 hours
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                        Our team will contact you within 24 hours
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                        We'll schedule a site visit if needed
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                        You'll receive a detailed quote within 3-5 business days
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-8 border-t">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    currentStep === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Previous
                </button>

                {currentStep < 4 ? (
                  <button type="button" onClick={nextStep} className="btn-primary px-8 py-3">
                    <span className="mr-2">Next Step</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button type="submit" className="btn-primary px-8 py-3">
                    <span className="mr-2">Submit Quote Request</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-blue-900 mb-8">Need Help with Your Quote?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center justify-center space-x-3">
                <Phone className="w-6 h-6 text-orange-800" />
                <div>
                  <div className="font-semibold text-gray-900">Call Us</div>
                  <a href="tel:+2201234567" className="text-orange-800 hover:text-orange-900">
                    +220 123 4567
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Mail className="w-6 h-6 text-orange-800" />
                <div>
                  <div className="font-semibold text-gray-900">Email Us</div>
                  <a href="mailto:quotes@primestone.gm" className="text-orange-800 hover:text-orange-900">
                    quotes@primestone.gm
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

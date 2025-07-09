"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Linkedin, Mail, Phone, Award, Users, Calendar } from "lucide-react"

export default function TeamPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const teamMembers = [
    {
      id: 1,
      name: "Ousman Jatta",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "With over 20 years of experience in the construction industry, Ousman founded Primestone Construction with a vision to bring international standards to The Gambia.",
      expertise: ["Strategic Planning", "Project Management", "Business Development"],
      education: "MBA in Construction Management",
      experience: "20+ Years",
      projects: "200+ Projects Led",
      achievements: [
        "Founded Primestone Construction in 2010",
        "Led expansion to 50+ team members",
        "Achieved ISO 9001:2015 certification",
        "Best CEO Award - Construction Industry 2023",
      ],
      contact: {
        email: "ousman@primestone.gm",
        phone: "+220 123 4567",
        linkedin: "#",
      },
      quote: "Building excellence isn't just about structures; it's about building trust and relationships.",
    },
    {
      id: 2,
      name: "Mariama Sowe",
      role: "Chief Engineer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      bio: "Mariama brings exceptional technical expertise to Primestone Construction. With a Master's degree in Civil Engineering, she ensures every project meets international standards.",
      expertise: ["Structural Engineering", "Quality Control", "Technical Innovation"],
      education: "MSc Civil Engineering",
      experience: "15+ Years",
      projects: "150+ Projects Engineered",
      achievements: [
        "Led technical team for major infrastructure projects",
        "Implemented advanced quality control systems",
        "Zero structural failures record",
        "Women in Engineering Excellence Award 2022",
      ],
      contact: {
        email: "mariama@primestone.gm",
        phone: "+220 123 4568",
        linkedin: "#",
      },
      quote: "Engineering is about solving problems and creating solutions that stand the test of time.",
    },
    {
      id: 3,
      name: "Lamin Ceesay",
      role: "Project Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "Lamin is the backbone of our project execution. His meticulous attention to detail ensures every project is delivered on time and within budget.",
      expertise: ["Project Coordination", "Timeline Management", "Client Relations"],
      education: "BSc Project Management",
      experience: "12+ Years",
      projects: "100+ Projects Managed",
      achievements: [
        "98% on-time project delivery rate",
        "Managed projects worth over $50M",
        "Client satisfaction rating of 99%",
        "Project Management Excellence Award 2023",
      ],
      contact: {
        email: "lamin@primestone.gm",
        phone: "+220 123 4569",
        linkedin: "#",
      },
      quote: "Success in construction is measured by how we build it - with precision, care, and respect.",
    },
  ]

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % teamMembers.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, teamMembers.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % teamMembers.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + teamMembers.length) % teamMembers.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  const currentMember = teamMembers[currentSlide]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Meet Our Expert Team</h1>
            <p className="text-xl text-blue-100">The skilled professionals behind Primestone Construction's success</p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Slideshow Section - 2/3 width */}
              <div className="xl:col-span-2">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden relative">
                  <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                    {/* Image Section */}
                    <div className="relative bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentSlide}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.5 }}
                          className="text-center text-white p-8"
                        >
                          <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-white/20">
                            <img
                              src={currentMember.image || "/placeholder.svg"}
                              alt={currentMember.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h2 className="text-2xl font-bold mb-2">{currentMember.name}</h2>
                          <p className="text-orange-300 font-semibold mb-4">{currentMember.role}</p>
                          <blockquote className="italic text-blue-100 leading-relaxed">
                            "{currentMember.quote}"
                          </blockquote>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentSlide}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: 0.5 }}
                        >
                          {/* Stats */}
                          <div className="flex gap-4 mb-6">
                            <div className="bg-blue-50 px-3 py-2 rounded-lg flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-blue-600" />
                              <span className="text-sm font-medium text-blue-900">{currentMember.experience}</span>
                            </div>
                            <div className="bg-orange-50 px-3 py-2 rounded-lg flex items-center space-x-2">
                              <Award className="w-4 h-4 text-orange-800" />
                              <span className="text-sm font-medium text-orange-900">{currentMember.projects}</span>
                            </div>
                          </div>

                          {/* Bio */}
                          <p className="text-gray-600 mb-6 leading-relaxed">{currentMember.bio}</p>

                          {/* Education */}
                          <div className="mb-6">
                            <h3 className="font-semibold text-blue-900 mb-2">Education</h3>
                            <p className="text-gray-600">{currentMember.education}</p>
                          </div>

                          {/* Expertise */}
                          <div className="mb-6">
                            <h3 className="font-semibold text-blue-900 mb-3">Expertise</h3>
                            <div className="flex flex-wrap gap-2">
                              {currentMember.expertise.map((skill, index) => (
                                <span
                                  key={index}
                                  className="bg-gradient-to-r from-blue-100 to-orange-100 text-blue-900 px-3 py-1 rounded-full text-sm"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Contact */}
                          <div className="flex space-x-3">
                            <a
                              href={`mailto:${currentMember.contact.email}`}
                              className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors"
                            >
                              <Mail size={18} />
                            </a>
                            <a
                              href={`tel:${currentMember.contact.phone}`}
                              className="w-10 h-10 bg-orange-800 hover:bg-orange-900 text-white rounded-full flex items-center justify-center transition-colors"
                            >
                              <Phone size={18} />
                            </a>
                            <a
                              href={currentMember.contact.linkedin}
                              className="w-10 h-10 bg-blue-800 hover:bg-blue-900 text-white rounded-full flex items-center justify-center transition-colors"
                            >
                              <Linkedin size={18} />
                            </a>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Navigation */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>

                  {/* Indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {teamMembers.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentSlide ? "bg-orange-800 w-6" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Controls */}
                <div className="text-center mt-6">
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      isAutoPlaying
                        ? "bg-orange-800 hover:bg-orange-900 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                  >
                    {isAutoPlaying ? "Pause" : "Resume"} Slideshow
                  </button>
                </div>
              </div>

              {/* Achievements Sidebar - 1/3 width */}
              <div className="xl:col-span-1">
                <div className="bg-white rounded-2xl shadow-xl p-6 h-full">
                  <h3 className="text-xl font-bold text-blue-900 mb-6 text-center">Key Achievements</h3>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Member Info */}
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 border-2 border-orange-800">
                          <img
                            src={currentMember.image || "/placeholder.svg"}
                            alt={currentMember.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="font-semibold text-blue-900">{currentMember.name}</h4>
                        <p className="text-sm text-orange-800">{currentMember.role}</p>
                      </div>

                      {/* Achievements List */}
                      <div className="space-y-3">
                        {currentMember.achievements.map((achievement, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start space-x-3 p-3 bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg border-l-4 border-orange-800"
                          >
                            <Award className="w-4 h-4 text-orange-800 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm">{achievement}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Quick Stats */}
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="grid grid-cols-1 gap-3">
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <div className="font-bold text-blue-900">{currentMember.experience}</div>
                            <div className="text-xs text-blue-700">Experience</div>
                          </div>
                          <div className="text-center p-3 bg-orange-50 rounded-lg">
                            <div className="font-bold text-orange-900">{currentMember.projects}</div>
                            <div className="text-xs text-orange-700">Completed</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Team by Numbers</h2>
            <p className="text-xl text-gray-600">The collective expertise that drives our success</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: "6", label: "Leadership Team", icon: Users },
              { number: "50+", label: "Total Team Members", icon: Users },
              { number: "85+", label: "Years Combined Experience", icon: Calendar },
              { number: "500+", label: "Projects Delivered", icon: Award },
            ].map((stat, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-xl shadow-lg">
                <stat.icon className="w-8 h-8 text-orange-800 mx-auto mb-4" />
                <div className="text-2xl font-bold text-blue-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

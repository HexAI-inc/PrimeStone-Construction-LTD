"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  Star,
  Home,
  Building2,
  Wrench,
  RouteIcon as Road,
  MapPin,
  Hammer,
  Award,
  Users,
  Clock,
  Shield,
} from "lucide-react"
import AnimatedSection from "@/components/AnimatedSection"
import StaggeredContainer from "@/components/StaggeredContainer"
import FlipCard from "@/components/FlipCard"

export default function HomePage() {
  const services = [
    {
      icon: <Home className="w-12 h-12 text-orange-800" />,
      title: "Residential Construction",
      description: "Custom homes and residential developments built to the highest standards with modern design.",
      stats: { projects: "200+", rating: "5.0★", time: "On-time" },
    },
    {
      icon: <Building2 className="w-12 h-12 text-orange-800" />,
      title: "Commercial Construction",
      description: "Office buildings, retail spaces, and commercial complexes for businesses of all sizes.",
      stats: { projects: "150+", rating: "4.9★", time: "Fast" },
    },
    {
      icon: <Wrench className="w-12 h-12 text-orange-800" />,
      title: "Renovations",
      description: "Transform existing spaces with our expert renovation and remodeling services.",
      stats: { projects: "100+", rating: "5.0★", time: "Flexible" },
    },
    {
      icon: <Road className="w-12 h-12 text-orange-800" />,
      title: "Civil Engineering",
      description: "Infrastructure projects including roads, bridges, and utility systems development.",
      stats: { projects: "50+", rating: "5.0★", time: "Reliable" },
    },
    {
      icon: <MapPin className="w-12 h-12 text-orange-800" />,
      title: "Site Development",
      description: "Land preparation and site development services for construction projects.",
      stats: { projects: "80+", rating: "4.8★", time: "Efficient" },
    },
    {
      icon: <Hammer className="w-12 h-12 text-orange-800" />,
      title: "Custom Builds",
      description: "Unique architectural projects tailored to your specific needs and vision.",
      stats: { projects: "30+", rating: "5.0★", time: "Premium" },
    },
  ]

  const whyChooseUs = [
    {
      icon: <Award className="w-12 h-12 text-orange-800" />,
      title: "Quality Assurance",
      description: "International standards with local expertise and attention to detail",
      stat: "ISO 9001",
    },
    {
      icon: <Users className="w-12 h-12 text-orange-800" />,
      title: "Expert Team",
      description: "50+ skilled professionals with years of construction experience",
      stat: "50+ Experts",
    },
    {
      icon: <Clock className="w-12 h-12 text-orange-800" />,
      title: "On-Time Delivery",
      description: "Projects completed within agreed timelines with efficient management",
      stat: "98% On-Time",
    },
    {
      icon: <Shield className="w-12 h-12 text-orange-800" />,
      title: "Safety First",
      description: "Comprehensive safety protocols and insurance coverage on all sites",
      stat: "Zero Incidents",
    },
  ]

  const testimonials = [
    {
      name: "Fatou Jallow",
      role: "Homeowner",
      content:
        "Primestone built our dream home exactly as we envisioned. Their attention to detail and professionalism exceeded our expectations. The quality is outstanding!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Amadou Bah",
      role: "Business Owner",
      content:
        "Our commercial complex was completed on time and within budget. The team's expertise in commercial construction is evident in every detail.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Isatou Ceesay",
      role: "Property Developer",
      content:
        "Working with Primestone has been a pleasure. They understand the local market while maintaining international construction standards.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
  ]

  const projects = [
    {
      title: "Luxury Residential Complex",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      category: "Residential",
      location: "Kololi",
      details: { units: "24 Units", amenities: "Pool & Gym", features: "Solar Power" },
    },
    {
      title: "Modern Office Building",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      category: "Commercial",
      location: "Banjul",
      details: { floors: "15 Floors", parking: "200 Cars", certification: "Green Building" },
    },
    {
      title: "Infrastructure Development",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
      category: "Civil Engineering",
      location: "Coastal Region",
      details: { length: "25km Highway", bridges: "3 Bridges", lighting: "LED Systems" },
    },
    {
      title: "Heritage Villa Restoration",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      category: "Renovation",
      location: "Bakau",
      details: { heritage: "Colonial Era", modern: "Smart Home", garden: "Restored Gardens" },
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 lg:py-32 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-orange-300 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-ping"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection direction="up" duration={0.8}>
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                className="text-4xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Building Excellence in{" "}
                <span className="text-gradient bg-gradient-to-r from-orange-300 to-orange-600 bg-clip-text text-transparent">
                  The Gambia
                </span>
              </motion.h1>

              <motion.p
                className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Your trusted partner for residential, commercial, and civil engineering projects. Quality construction
                with international standards.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                    <span className="mr-2">Get Free Quote</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/projects" className="btn-secondary text-lg px-8 py-4">
                    View Projects
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection direction="up">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4">Our Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From residential homes to commercial complexes, we provide comprehensive construction services
              </p>
            </div>
          </AnimatedSection>

          <StaggeredContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { y: 50, opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                  }}
                  className="h-80"
                >
                  <FlipCard
                    frontContent={
                      <div className="bg-white p-8 rounded-2xl shadow-lg h-full flex flex-col justify-center border border-gray-100">
                        <div className="mb-6">{service.icon}</div>
                        <h3 className="text-xl font-semibold text-blue-900 mb-4">{service.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{service.description}</p>
                      </div>
                    }
                    backContent={
                      <div className="bg-gradient-to-br from-blue-900 to-orange-800 text-white p-8 rounded-2xl shadow-lg h-full flex flex-col justify-center">
                        <h3 className="text-xl font-semibold mb-6 text-center">{service.title}</h3>
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-orange-300">{service.stats.projects}</div>
                            <div className="text-sm text-blue-100">Projects</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-orange-300">{service.stats.rating}</div>
                            <div className="text-sm text-blue-100">Rating</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-orange-300">{service.stats.time}</div>
                            <div className="text-sm text-blue-100">Delivery</div>
                          </div>
                        </div>
                      </div>
                    }
                    className="w-full h-full"
                  />
                </motion.div>
              ))}
            </div>
          </StaggeredContainer>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-6">Why Choose Primestone?</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                With over a decade of experience in The Gambian construction industry, we combine local knowledge with
                international best practices.
              </p>

              <div className="space-y-6">
                {whyChooseUs.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4 p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors duration-300"
                  >
                    <div className="flex-shrink-0">{item.icon}</div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-blue-900">{item.title}</h3>
                        <span className="bg-orange-800 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {item.stat}
                        </span>
                      </div>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-8 text-center">Our Track Record</h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { number: "500+", label: "Projects Completed" },
                    { number: "15+", label: "Years Experience" },
                    { number: "100%", label: "Client Satisfaction" },
                    { number: "50+", label: "Expert Team" },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.1, type: "spring" }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <div className="text-3xl font-bold text-orange-300 mb-2">{stat.number}</div>
                      <div className="text-blue-100">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection direction="up">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4">Featured Projects</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore some of our recent construction projects across The Gambia
              </p>
            </div>
          </AnimatedSection>

          <StaggeredContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { y: 50, opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                  }}
                  className="group cursor-pointer h-80"
                >
                  <FlipCard
                    frontContent={
                      <div className="relative overflow-hidden rounded-xl shadow-lg h-full">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-orange-800 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {project.category}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                          <div className="absolute bottom-4 left-4 text-white">
                            <div className="font-semibold text-lg mb-1">{project.title}</div>
                            <div className="text-sm opacity-90">📍 {project.location}</div>
                          </div>
                        </div>
                      </div>
                    }
                    backContent={
                      <div className="bg-gradient-to-br from-blue-900 to-orange-800 text-white p-6 rounded-xl shadow-lg h-full flex flex-col justify-center">
                        <h3 className="text-lg font-semibold mb-4 text-center">{project.title}</h3>
                        <div className="space-y-3">
                          {Object.entries(project.details).map(([key, value], idx) => (
                            <div key={idx} className="text-center">
                              <div className="text-orange-300 font-semibold">{value}</div>
                              <div className="text-blue-100 text-sm capitalize">{key}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    }
                    className="w-full h-full"
                  />
                </motion.div>
              ))}
            </div>
          </StaggeredContainer>

          <AnimatedSection direction="up" delay={0.3}>
            <div className="text-center mt-12">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/projects" className="btn-primary px-8 py-3">
                  <span className="mr-2">View All Projects</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection direction="up">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4">What Our Clients Say</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Don't just take our word for it - hear from our satisfied clients
              </p>
            </div>
          </AnimatedSection>

          <StaggeredContainer>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { y: 50, opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                  }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-blue-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <p className="text-gray-600 italic leading-relaxed">"{testimonial.content}"</p>
                </motion.div>
              ))}
            </div>
          </StaggeredContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Get in touch with us today for a free consultation and quote. Let's build something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/quote" className="btn-primary text-lg px-8 py-4">
                  <span className="mr-2">Get Free Quote</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="tel:+220833636351" className="btn-secondary text-lg px-8 py-4">
                  Call: +220 833 636 351
                </Link>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

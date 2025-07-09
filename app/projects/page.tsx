"use client"

import { useState } from "react"
import { Filter, ArrowRight } from "lucide-react"
import Link from "next/link"
import AnimatedSection from "@/components/AnimatedSection"

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All")

  const filters = ["All", "Residential", "Commercial", "Civil Engineering", "Renovation"]

  const projects = [
    {
      id: 1,
      title: "Luxury Residential Complex",
      category: "Residential",
      location: "Kololi, The Gambia",
      year: "2023",
      description: "Modern 24-unit residential complex with premium amenities and sustainable design features.",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      features: ["24 Units", "Swimming Pool", "Solar Power", "Security System"],
    },
    {
      id: 2,
      title: "Atlantic Business Center",
      category: "Commercial",
      location: "Banjul, The Gambia",
      year: "2023",
      description: "State-of-the-art office building with modern facilities and energy-efficient systems.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      features: ["15 Floors", "Conference Centers", "Parking Garage", "Green Building"],
    },
    {
      id: 3,
      title: "Coastal Highway Extension",
      category: "Civil Engineering",
      location: "Coastal Region, The Gambia",
      year: "2022",
      description: "Major infrastructure project improving transportation connectivity along the coast.",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
      features: ["25km Highway", "Bridge Construction", "Drainage Systems", "Street Lighting"],
    },
    {
      id: 4,
      title: "Heritage Villa Restoration",
      category: "Renovation",
      location: "Banjul, The Gambia",
      year: "2023",
      description: "Careful restoration of a historic colonial villa preserving architectural heritage.",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      features: ["Historic Preservation", "Modern Amenities", "Garden Restoration", "Cultural Heritage"],
    },
    {
      id: 5,
      title: "Sunrise Shopping Mall",
      category: "Commercial",
      location: "Serekunda, The Gambia",
      year: "2022",
      description: "Modern shopping and entertainment complex serving the greater Banjul area.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      features: ["50 Retail Units", "Food Court", "Cinema Complex", "Parking for 500 Cars"],
    },
    {
      id: 6,
      title: "Eco-Friendly Family Homes",
      category: "Residential",
      location: "Bakau, The Gambia",
      year: "2023",
      description: "Sustainable housing development featuring solar power and rainwater harvesting.",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
      features: ["12 Houses", "Solar Panels", "Rainwater Harvesting", "Energy Efficient"],
    },
    {
      id: 7,
      title: "University Campus Expansion",
      category: "Commercial",
      location: "Kanifing, The Gambia",
      year: "2022",
      description: "New academic buildings and student facilities for expanding university campus.",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop",
      features: ["3 Academic Buildings", "Student Center", "Library Extension", "Sports Facilities"],
    },
    {
      id: 8,
      title: "Modern Office Renovation",
      category: "Renovation",
      location: "Banjul, The Gambia",
      year: "2023",
      description: "Complete transformation of outdated office space into modern, efficient workplace.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      features: ["Open Plan Design", "Smart Systems", "Sustainable Materials", "Wellness Areas"],
    },
  ]

  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter)

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Our Project Portfolio</h1>
            <p className="text-xl lg:text-2xl text-blue-100">
              Explore our completed construction projects across The Gambia
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600 font-medium">Filter by category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeFilter === filter
                      ? "bg-orange-800 text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-gray-100 shadow"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <AnimatedSection key={project.id} animation="fade-in" className="group cursor-pointer">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-800 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-blue-900 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">📍 {project.location}</p>
                    <p className="text-gray-600 mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.features.map((feature, featureIndex) => (
                        <span key={featureIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <button className="text-orange-800 font-medium flex items-center group-hover:text-orange-900 transition-colors">
                      View Details
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4">Project Statistics</h2>
            <p className="text-xl text-gray-600">Numbers that showcase our construction expertise</p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Projects Completed" },
              { number: "15+", label: "Years Experience" },
              { number: "50+", label: "Expert Team Members" },
              { number: "100%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <AnimatedSection key={index} animation="fade-in" className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-orange-800 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Let's discuss how we can bring your construction vision to life with the same quality and expertise
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/services" className="btn-secondary text-lg px-8 py-4">
                View Our Services
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

import { Home, Building2, Wrench, RouteIcon as Road, MapPin, Hammer, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import AnimatedSection from "@/components/AnimatedSection"
import FlipCard from "@/components/FlipCard"

export default function ServicesPage() {
  const services = [
    {
      icon: <Home className="w-12 h-12 text-orange-800" />,
      title: "Residential Construction",
      description: "Custom homes, apartments, and residential developments built to the highest standards.",
      features: [
        "Custom home design and construction",
        "Multi-family residential complexes",
        "Luxury villa construction",
        "Affordable housing projects",
        "Interior finishing and design",
      ],
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
      stats: { projects: "200+", satisfaction: "100%", timeline: "On-time" },
    },
    {
      icon: <Building2 className="w-12 h-12 text-orange-800" />,
      title: "Commercial Construction",
      description: "Office buildings, retail spaces, and commercial complexes for businesses of all sizes.",
      features: [
        "Office building construction",
        "Retail and shopping centers",
        "Warehouses and industrial facilities",
        "Hotels and hospitality venues",
        "Mixed-use developments",
      ],
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      stats: { projects: "150+", satisfaction: "98%", timeline: "Fast" },
    },
    {
      icon: <Wrench className="w-12 h-12 text-orange-800" />,
      title: "Renovations & Remodeling",
      description: "Transform existing spaces with our expert renovation and remodeling services.",
      features: [
        "Home renovations and extensions",
        "Commercial space remodeling",
        "Kitchen and bathroom upgrades",
        "Structural modifications",
        "Historic building restoration",
      ],
      image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&h=600&fit=crop",
      stats: { projects: "100+", satisfaction: "99%", timeline: "Flexible" },
    },
    {
      icon: <Road className="w-12 h-12 text-orange-800" />,
      title: "Civil Engineering",
      description: "Infrastructure projects including roads, bridges, and utility systems.",
      features: [
        "Road construction and maintenance",
        "Bridge and overpass construction",
        "Drainage and sewage systems",
        "Water supply infrastructure",
        "Public facility construction",
      ],
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
      stats: { projects: "50+", satisfaction: "100%", timeline: "Reliable" },
    },
    {
      icon: <MapPin className="w-12 h-12 text-orange-800" />,
      title: "Site Development",
      description: "Land preparation and site development services for construction projects.",
      features: [
        "Land surveying and planning",
        "Site preparation and clearing",
        "Grading and excavation",
        "Utility installation",
        "Landscaping and finishing",
      ],
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
      stats: { projects: "80+", satisfaction: "97%", timeline: "Efficient" },
    },
    {
      icon: <Hammer className="w-12 h-12 text-orange-800" />,
      title: "Custom Builds",
      description: "Unique architectural projects tailored to your specific needs and vision.",
      features: [
        "Architectural design consultation",
        "Custom project planning",
        "Specialized construction techniques",
        "Unique material sourcing",
        "Project management and coordination",
      ],
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      stats: { projects: "30+", satisfaction: "100%", timeline: "Premium" },
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Our Construction Services</h1>
            <p className="text-xl lg:text-2xl text-blue-100">
              Comprehensive construction solutions for residential, commercial, and infrastructure projects
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4">What We Do</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From concept to completion, we provide end-to-end construction services with quality and precision
            </p>
          </AnimatedSection>

          <div className="space-y-20">
            {services.map((service, index) => (
              <AnimatedSection key={index} animation={index % 2 === 0 ? "slide-in-left" : "slide-in-right"}>
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                    <div className="flex items-center mb-6">
                      {service.icon}
                      <h3 className="text-2xl lg:text-3xl font-bold text-blue-900 ml-4">{service.title}</h3>
                    </div>
                    <p className="text-lg text-gray-600 mb-6">{service.description}</p>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-orange-800 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact" className="btn-primary text-sm sm:text-base px-4 sm:px-6">
                      <span className="mr-2">Get Quote for This Service</span>
                      <ArrowRight className="w-4 h-4 flex-shrink-0" />
                    </Link>
                  </div>
                  <div className={`${index % 2 === 1 ? "lg:col-start-1" : ""} h-80`}>
                    <FlipCard
                      frontContent={
                        <img
                          src={service.image || "/placeholder.svg"}
                          alt={service.title}
                          className="w-full h-full object-cover rounded-xl shadow-lg"
                        />
                      }
                      backContent={
                        <div className="w-full h-full bg-gradient-to-br from-blue-900 to-orange-800 rounded-xl shadow-lg p-6 flex flex-col justify-center text-white">
                          <h4 className="text-xl font-bold mb-4 text-center">Service Statistics</h4>
                          <div className="space-y-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-orange-300">{service.stats.projects}</div>
                              <div className="text-sm text-blue-100">Projects Completed</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-orange-300">{service.stats.satisfaction}</div>
                              <div className="text-sm text-blue-100">Client Satisfaction</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-orange-300">{service.stats.timeline}</div>
                              <div className="text-sm text-blue-100">Delivery</div>
                            </div>
                          </div>
                        </div>
                      }
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4">Our Construction Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach that ensures quality, efficiency, and client satisfaction
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "Initial meeting to understand your needs, budget, and timeline",
                details: "Free consultation with detailed project assessment and cost estimation",
              },
              {
                step: "02",
                title: "Planning & Design",
                description: "Detailed project planning, design development, and permit acquisition",
                details: "3D modeling, architectural drawings, and all necessary permits handled",
              },
              {
                step: "03",
                title: "Construction",
                description: "Professional execution with regular updates and quality control",
                details: "Daily progress reports, quality inspections, and safety protocols",
              },
              {
                step: "04",
                title: "Completion",
                description: "Final inspection, handover, and ongoing support services",
                details: "Final walkthrough, warranty coverage, and maintenance support",
              },
            ].map((process, index) => (
              <AnimatedSection key={index} animation="fade-in" className="text-center h-64">
                <FlipCard
                  frontContent={
                    <div className="bg-white p-6 rounded-xl shadow-lg h-full flex flex-col justify-center">
                      <div className="bg-orange-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                        {process.step}
                      </div>
                      <h3 className="text-xl font-semibold text-blue-900 mb-4">{process.title}</h3>
                      <p className="text-gray-600">{process.description}</p>
                    </div>
                  }
                  backContent={
                    <div className="bg-gradient-to-br from-blue-900 to-orange-800 text-white p-6 rounded-xl shadow-lg h-full flex flex-col justify-center">
                      <div className="text-orange-300 text-3xl font-bold mb-4">{process.step}</div>
                      <h3 className="text-lg font-semibold mb-4">{process.title}</h3>
                      <p className="text-blue-100 text-sm leading-relaxed">{process.details}</p>
                    </div>
                  }
                  className="w-full h-full"
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Start Your Construction Project?</h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Contact us today to discuss your project requirements and get a free consultation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                <span className="mr-2">Get Free Consultation</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/projects" className="btn-secondary text-lg px-8 py-4">
                View Our Work
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

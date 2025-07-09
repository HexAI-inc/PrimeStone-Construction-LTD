import { Home, Building2, Wrench, RouteIcon as Road, MapPin, Hammer, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import AnimatedSection from "@/components/AnimatedSection"

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
                    <Link href="/contact" className="btn-primary">
                      Get Quote for This Service
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </div>
                  <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-80 object-cover rounded-xl shadow-lg"
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
              },
              {
                step: "02",
                title: "Planning & Design",
                description: "Detailed project planning, design development, and permit acquisition",
              },
              {
                step: "03",
                title: "Construction",
                description: "Professional execution with regular updates and quality control",
              },
              {
                step: "04",
                title: "Completion",
                description: "Final inspection, handover, and ongoing support services",
              },
            ].map((process, index) => (
              <AnimatedSection key={index} animation="fade-in" className="text-center">
                <div className="bg-orange-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold text-blue-900 mb-4">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
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
                Get Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
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

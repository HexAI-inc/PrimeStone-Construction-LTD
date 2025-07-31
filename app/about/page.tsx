"use client";

import { motion } from "framer-motion";
import {
  EmojiEvents as Award,
  People,
  FavoriteBorder,
  TrendingUp,
  TrackChanges as Target,
  Public as Globe,
  Lightbulb,
  Shield,
} from "@mui/icons-material";
import AnimatedSection from "@/components/AnimatedSection";
import BackgroundElements from "@/components/BackgroundElements";
import MouseTracker from "@/components/MouseTracker";
import FlipCard from "@/components/FlipCard";

export default function AboutPage() {
  const values = [
    {
      icon: <Award sx={{ fontSize: 48, color: "#E85D0E" }} />,
      title: "Excellence",
      description:
        "We strive for the highest quality in every project we undertake, exceeding industry standards.",
    },
    {
      icon: <People sx={{ fontSize: 48, color: "#E85D0E" }} />,
      title: "Integrity",
      description:
        "Honest communication and transparent business practices guide our work and relationships.",
    },
    {
      icon: <FavoriteBorder sx={{ fontSize: 48, color: "#E85D0E" }} />,
      title: "Community",
      description:
        "We are committed to contributing to The Gambia's development and economic growth.",
    },
    {
      icon: <TrendingUp sx={{ fontSize: 48, color: "#E85D0E" }} />,
      title: "Innovation",
      description:
        "We embrace new technologies and methods to deliver better, more efficient results.",
    },
  ];

  const achievements = [
    "ISO 9001:2015 Quality Management Certification",
    "Best Construction Company Award 2023",
    "Green Building Council Member",
    "Safety Excellence Recognition",
    "Community Development Partner Award",
    "International Standards Compliance Certificate",
  ];

  const milestones = [
    {
      year: "2020",
      event: "Company Founded",
      description:
        "Started with a vision to bring international standards to The Gambia",
    },
    {
      year: "2021",
      event: "10 Projects Milestone",
      description: "Completed our 10th construction project",
    },
    {
      year: "2022",
      event: "ISO Certification",
      description: "Achieved ISO 9001:2022 Quality Management certification",
    },
    {
      year: "2023",
      event: "Team Expansion",
      description: "Grew to 50+ skilled professionals",
    },
    {
      year: "2024",
      event: "Industry Recognition",
      description: "One of the Best Construction Companies in The Gambia",
    },
    {
      year: "2025",
      event: "International Expansion",
      description: "Planning expansion to neighboring West African countries",
    },
  ];

  const stats = [
    {
      number: "50+",
      label: "Projects Completed",
      icon: <Target sx={{ fontSize: 32 }} />,
    },
    {
      number: "15+",
      label: "Years Experience",
      icon: <Globe sx={{ fontSize: 32 }} />,
    },
    {
      number: "50+",
      label: "Expert Team Members",
      icon: <People sx={{ fontSize: 32 }} />,
    },
    {
      number: "100%",
      label: "Client Satisfaction",
      icon: <Award sx={{ fontSize: 32 }} />,
    },
  ];

  return (
    <div className="relative">
      <MouseTracker />

      {/* Hero Section */}
      <section className="hero-gradient text-white min-h-screen flex items-center justify-center relative overflow-hidden">
        <BackgroundElements variant="blue" />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection direction="up">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                className="text-4xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                About Primestone Construction
              </motion.h1>
              <motion.p
                className="text-xl lg:text-2xl text-blue-100 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Building The Gambia's future with quality, integrity, and
                innovation since 2020
              </motion.p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="min-h-screen flex items-center justify-center py-20 bg-white relative">
        <BackgroundElements variant="light" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Founded in 2020, Primestone Construction Company Ltd. began as
                  a small local construction firm with a big vision: to bring
                  international construction standards to The Gambia while
                  supporting local development.
                </p>
                <p>
                  Over the years, we have grown from a team of 5 passionate
                  builders to a comprehensive construction company with over 50
                  skilled professionals. Our journey has been marked by
                  continuous learning, adaptation, and an unwavering commitment
                  to excellence.
                </p>
                <p>
                  Today, we stand as one of The Gambia's most trusted
                  construction partners, having completed over 50 projects
                  ranging from residential homes to major commercial complexes
                  and infrastructure developments.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-blue-50 to-orange-50 p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="text-orange-600 mb-3">{stat.icon}</div>
                    <div className="text-2xl font-bold text-blue-900 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="hero-gradient text-white min-h-screen flex items-center justify-center relative overflow-hidden">
        <BackgroundElements variant="blue" />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection direction="up">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Our Core Values
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                The principles that guide every decision we make and every
                project we undertake
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-2xl text-center border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300"
              >
                <div className="mb-6">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-blue-100 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="min-h-screen flex items-center justify-center py-20 bg-gray-50 relative">
        <BackgroundElements variant="light" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-8">
                Our Achievements
              </h2>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-3 h-3 bg-orange-600 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">
                      {achievement}
                    </span>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white p-8 rounded-2xl">
                <div className="flex items-center mb-6">
                  <Lightbulb sx={{ fontSize: 40, color: "#E85D0E" }} />
                  <h3 className="text-2xl font-bold ml-4">
                    Innovation & Quality
                  </h3>
                </div>
                <p className="text-blue-100 leading-relaxed mb-6">
                  Our commitment to innovation and quality has earned us
                  recognition both locally and internationally. We continuously
                  invest in new technologies, training, and processes to deliver
                  exceptional results.
                </p>
                <div className="flex items-center">
                  <Shield sx={{ fontSize: 32, color: "#E85D0E" }} />
                  <span className="ml-3 font-semibold">
                    ISO 9001:2015 Certified
                  </span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="hero-gradient text-white min-h-screen flex items-center justify-center relative overflow-hidden">
        <BackgroundElements variant="blue" />
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection duration={2} direction="up">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Our Journey
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Key milestones that have shaped our growth and success over the
                years
              </p>
            </div>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-orange-600 opacity-30"></div>

              {
                /* {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center mb-12 ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-2xl border border-white border-opacity-20">
                      <div className="text-orange-400 font-bold text-xl mb-2">{milestone.year}</div>
                      <h3 className="text-lg font-semibold mb-3">{milestone.event}</h3>
                      <p className="text-blue-100 text-sm leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>

                 
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-600 rounded-full border-4 border-white"></div>
                </motion.div>
              ))} */

                milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                    className={`relative flex  items-center mb-12 w-full ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                  >
                    {/* ${index % 2 === 0 ? "justify-start" : "justify-end"} */}
                    <div className={`w-[350px] mb-20 ${index % 2 === 0 ? "transform translate-x-1/4" : "transform -translate-x-1/4"}`}>
                      <FlipCard
                        frontContent={
                          <div
                            className={`p-6 rounded-2xl ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"} border border-white border-opacity-20 bg-white bg-opacity-10 backdrop-blur-sm`}
                          >
                            {/**
                             * w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                             * <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-2xl border border-white border-opacity-20">
                             * </div>
                             * */}
                              <div className="text-orange-400 font-bold text-xl mb-2">
                                {milestone.year}
                              </div>
                            
                          </div>
                        }
                        backContent={
                          <div
                            className={`p-8 rounded-2xl border border-white border-opacity-20 bg-white bg-opacity-10 backdrop-blur-sm text-center`}
                          >
                            {/**
                             * w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                             * <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-2xl border border-white border-opacity-20">
                             * </div>
                             * */}

                              <h3 className="text-lg font-semibold mb-3">
                                {milestone.event}
                              </h3>
                              <p className="text-blue-100 text-sm leading-relaxed">
                                {milestone.description}
                              </p>
                            </div>
                        }
                      />
                    </div>
                    {/* Centered dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-600 rounded-full border-4 border-white"></div>
                  </motion.div>
                ))
              }
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="min-h-screen flex items-center justify-center py-20 bg-white relative">
        <BackgroundElements variant="light" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection direction="up">
              <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-8">
                Our Vision for the Future
              </h2>
              <div className="text-xl text-gray-600 leading-relaxed space-y-6">
                <p>
                  As we look toward the future, Primestone Construction remains
                  committed to being The Gambia's premier construction partner.
                  We envision a future where our expertise extends beyond
                  borders, contributing to development across West Africa.
                </p>
                <p>
                  Our goal is to continue setting new standards in construction
                  quality, safety, and innovation while maintaining our core
                  values of integrity, excellence, and community commitment.
                </p>
              </div>

              <motion.div
                className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-br from-blue-50 to-orange-50 p-6 rounded-2xl">
                  <Target sx={{ fontSize: 40, color: "#003366" }} />
                  <h3 className="text-lg font-semibold text-blue-900 mt-4 mb-2">
                    Expansion Goals
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Regional growth across West Africa by 2025
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-orange-50 p-6 rounded-2xl">
                  <Lightbulb sx={{ fontSize: 40, color: "#E85D0E" }} />
                  <h3 className="text-lg font-semibold text-blue-900 mt-4 mb-2">
                    Innovation Focus
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Sustainable building technologies and smart construction
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-orange-50 p-6 rounded-2xl">
                  <People sx={{ fontSize: 40, color: "#003366" }} />
                  <h3 className="text-lg font-semibold text-blue-900 mt-4 mb-2">
                    Community Impact
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Training 1000+ local construction professionals
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}

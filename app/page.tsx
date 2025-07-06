"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Linkedin, Code, Database, Cloud, Zap, ChevronDown, Menu, X, Github } from "lucide-react"
import Image from "next/image"

export default function ModernPortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [_mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cursorFollowerRef = useRef<HTMLDivElement>(null)
  const trailTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const skills = [
    { name: "NestJS/Node.js", level: 95, icon: Database },
    { name: "React/Next.js", level: 90, icon: Code },
    { name: "Flutter/Dart", level: 85, icon: Code },
    { name: "Python/FastAPI", level: 85, icon: Zap },
    { name: "Microservices/Docker", level: 85, icon: Cloud },
    { name: "TypeScript", level: 95, icon: Code },
    { name: "Low-Code/Automation", level: 80, icon: Zap },
  ]

  const projects = [
    {
      title: "Employee Wallet App",
      description: "A gamified employee engagement platform with crypto rewards system",
      tech: ["Flutter", "Firebase", "NestJS", "Blockchain"],
      highlight: true,
    },
    {
      title: "Scalable Microservice Architecture",
      description: "Enterprise-grade backend system built with NestJS for high availability",
      tech: ["NestJS", "Docker", "PostgreSQL", "Redis"],
      highlight: true,
    },
    {
      title: "VoIP Integration System",
      description: "Browser-based voice calling system using FreeSWITCH and WebRTC",
      tech: ["FreeSWITCH", "WebRTC", "NestJS", "React"],
      highlight: false,
    },
    {
      title: "Rapid Prototyping & Automation",
      description: "Low-code solutions and workflow automation using Bubble and various automation tools",
      tech: ["Bubble", "No-Code", "Automation", "Workflows"],
      highlight: false,
    },
  ]

  // Cursor tracking and ripple effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Update cursor follower position
      if (cursorFollowerRef.current) {
        cursorFollowerRef.current.style.left = `${e.clientX}px`
        cursorFollowerRef.current.style.top = `${e.clientY}px`
      }

      // Create trail effect
      if (trailTimeoutRef.current) {
        clearTimeout(trailTimeoutRef.current)
      }

      trailTimeoutRef.current = setTimeout(() => {
        createTrail(e.clientX, e.clientY)
      }, 50)
    }

    const handleClick = (e: MouseEvent) => {
      createRipple(e.clientX, e.clientY)
    }

    const handleMouseDown = (e: MouseEvent) => {
      createRipple(e.clientX, e.clientY, true)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("click", handleClick)
    document.addEventListener("mousedown", handleMouseDown)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("click", handleClick)
      document.removeEventListener("mousedown", handleMouseDown)
      if (trailTimeoutRef.current) {
        clearTimeout(trailTimeoutRef.current)
      }
    }
  }, [])

  const createRipple = (x: number, y: number, isLarge = false) => {
    const ripple = document.createElement("div")
    ripple.className = `cursor-ripple ${isLarge ? "cursor-ripple-large" : ""}`
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    ripple.style.background = `radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 70%)`
    ripple.style.border = "1px solid rgba(255, 255, 255, 0.1)"

    document.body.appendChild(ripple)

    setTimeout(
      () => {
        document.body.removeChild(ripple)
      },
      isLarge ? 1200 : 800,
    )
  }

  const createTrail = (x: number, y: number) => {
    const trail = document.createElement("div")
    trail.className = "cursor-trail"
    trail.style.left = `${x}px`
    trail.style.top = `${y}px`

    document.body.appendChild(trail)

    setTimeout(() => {
      if (document.body.contains(trail)) {
        document.body.removeChild(trail)
      }
    }, 500)
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "experience", "contact"]
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Custom Cursor Follower */}
      <div ref={cursorFollowerRef} className="cursor-follower"></div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/10 backdrop-blur-2xl z-50 border-b border-white/20 shadow-lg shadow-black/10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="text-white font-bold text-xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text hover-ripple">
              LT
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {["Home", "About", "Skills", "Experience", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase() === "home" ? "hero" : item.toLowerCase())}
                  className={`text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 rounded-2xl transition-all duration-300 backdrop-blur-sm hover-ripple ${
                    activeSection === (item.toLowerCase() === "home" ? "hero" : item.toLowerCase())
                      ? "text-white bg-white/15 shadow-lg"
                      : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white bg-white/10 backdrop-blur-sm p-2 rounded-2xl hover:bg-white/20 transition-all duration-300 hover-ripple"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white/10 backdrop-blur-2xl border-t border-white/20 rounded-3xl shadow-2xl shadow-black/20 mx-4 mb-4">
              <div className="px-4 pt-4 pb-6 space-y-2">
                {["Home", "About", "Skills", "Experience", "Contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase() === "home" ? "hero" : item.toLowerCase())}
                    className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/15 transition-all duration-300 w-full text-left rounded-2xl backdrop-blur-sm hover-ripple"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in">
            <div className="bg-white/5 backdrop-blur-2xl rounded-[3rem] p-12 border border-white/20 shadow-2xl shadow-black/20 max-w-4xl mx-auto hover-ripple">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Lamberto
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  {" "}
                  Tamayo
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
                NestJS Backend Specialist & Full-Stack Developer building scalable, microservice-ready applications with
                modern React and Flutter
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500/80 to-blue-500/80 hover:from-purple-600/90 hover:to-blue-600/90 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover-ripple"
                  onClick={() => scrollToSection("contact")}
                >
                  Get In Touch
                </Button>
                <Button
                  size="lg"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover-ripple"
                  onClick={() => scrollToSection("experience")}
                >
                  View My Work
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/20 hover-ripple">
            <ChevronDown className="text-white/60 w-6 h-6" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">About Me</h2>
            <div className="bg-white/5 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 border border-white/20 shadow-2xl shadow-black/10 hover-ripple">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="w-64 h-64 mx-auto bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 shadow-2xl hover-ripple overflow-hidden">
                    <Image 
                      width={256}
                      height={256}
                      src="/profile-photo.jpeg" 
                      alt="Lamberto Tamayo Jr."
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="text-white/80 space-y-6">
                  <p className="text-lg leading-relaxed">
                    I&apos;m a passionate software developer with nearly 4 years of experience specializing in building
                    scalable, microservice-ready applications. I work across the full development spectrum - from
                    low-code/no-code solutions for rapid prototyping to enterprise-grade NestJS backends, React/Next.js
                    frontends, and Flutter mobile apps.
                  </p>
                  <p className="text-lg leading-relaxed">
                    At SP Madrid & Associates Law Firm, I lead R&D initiatives and architect scalable solutions that can
                    seamlessly transition to microservice architectures. I&apos;m passionate about clean code, system design,
                    and creating applications that can scale with business growth.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <div className="flex items-center gap-2 text-purple-300 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/20 hover-ripple">
                      <MapPin className="w-4 h-4" />
                      <span>Pangasinan, Philippines</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-300 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/20 hover-ripple">
                      <Code className="w-4 h-4" />
                      <span>4+ Years Experience</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Technical Skills</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {skills.map((skill, _index) => (
                <div
                  key={skill.name}
                  className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-xl shadow-black/10 hover:bg-white/10 hover:shadow-2xl transition-all duration-500 hover-ripple"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm p-2 rounded-2xl border border-white/20 hover-ripple">
                      <skill.icon className="w-6 h-6 text-purple-300" />
                    </div>
                    <span className="text-white font-semibold">{skill.name}</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-full h-3 overflow-hidden border border-white/20">
                    <div
                      className="h-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <span className="text-white/60 text-sm mt-2 block">{skill.level}%</span>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-white mb-8">Technologies I Work With</h3>
              <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-xl shadow-black/10 hover-ripple">
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    "NestJS",
                    "TypeScript",
                    "React",
                    "Next.js",
                    "Flutter",
                    "Dart",
                    "Node.js",
                    "Python",
                    "FastAPI",
                    "PostgreSQL",
                    "MongoDB",
                    "Redis",
                    "Docker",
                    "Microservices",
                    "AWS",
                    "GCP",
                    "Firebase",
                    "Bubble",
                    "No-Code",
                    "Automation",
                    "Workflows",
                  ].map((tech) => (
                    <div
                      key={tech}
                      className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm text-white border border-white/20 hover:from-purple-500/20 hover:to-blue-500/20 hover:border-white/30 transition-all duration-300 px-4 py-2 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 hover-ripple cursor-pointer"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience/Projects Section */}
      <section id="experience" className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Featured Projects</h2>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {projects.map((project, _index) => (
              <div
                key={project.title}
                className={`bg-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-xl shadow-black/10 hover:bg-white/10 hover:shadow-2xl hover:scale-105 transition-all duration-500 hover-ripple ${
                  project.highlight ? "ring-2 ring-purple-400/50 shadow-purple-500/20" : ""
                }`}
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-semibold text-lg">{project.title}</h3>
                    {project.highlight && (
                      <div className="bg-gradient-to-r from-purple-500/80 to-blue-500/80 backdrop-blur-sm px-3 py-1 rounded-2xl text-white text-sm border border-white/20 hover-ripple">
                        Featured
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-white/70 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <div
                      key={tech}
                      className="bg-white/10 backdrop-blur-sm text-white/80 px-3 py-1 rounded-2xl text-sm border border-white/20 hover-ripple"
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Experience Timeline */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-white mb-8 text-center">Work Experience</h3>
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-xl shadow-black/10 hover-ripple">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <div>
                    <h4 className="text-xl font-semibold text-white">Software Developer</h4>
                    <p className="text-purple-300">SP Madrid & Associates Law Firm, Philippines</p>
                  </div>
                  <div className="bg-green-500/20 backdrop-blur-sm text-green-300 border border-green-400/30 px-4 py-2 rounded-2xl w-fit hover-ripple">
                    Aug 2022 - Present (2 years 11 months)
                  </div>
                </div>

                <ul className="space-y-4 text-white/70 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      <strong className="text-white">Primary Focus:</strong> Architecting scalable NestJS applications
                      designed for microservice architecture, paired with React/Next.js frontends and Flutter mobile
                      apps for comprehensive full-stack solutions.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      Actively involved in R&D, creating POCs and MVPs for new processes and technologies, exploring AI
                      optimization tools and machine learning to identify solutions that can enhance system capabilities
                      and drive company innovation.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      Integrated telephony systems using FreeSWITCH and FusionPBX, enabling browser-based voice calls
                      through WebRTC and enhancing VoIP features in web applications.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      Contributed to the development of a data warehouse, optimizing data storage, retrieval, and
                      processing.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      Developed and maintained automation workflows using UI Path and Python, streamlining business
                      processes and improving operational efficiency.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      Leveraged low-code/no-code platforms like Bubble for rapid prototyping and client solutions,
                      enabling faster time-to-market and efficient validation of business concepts.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      Developed interactive dashboards using Next.js, enabling real-time data visualization and
                      analytics.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      Created and integrated APIs to facilitate seamless communication between systems and enhance
                      functionality.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      Gained experience in DevOps, working with Docker, containerization, and horizontal scaling to
                      improve system performance and deployment efficiency.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      Mentored and supported colleagues, sharing knowledge and best practices in backend development,
                      automation, and API integration.
                    </span>
                  </li>
                </ul>

                {/* Project Highlight */}
                <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-purple-400 border hover-ripple">
                  <h5 className="font-semibold text-white mb-3">Wallet App Project (Employee Engagement Initiative)</h5>
                  <ul className="space-y-2 text-sm text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        Developed a wallet app with a private network crypto system to improve employee engagement.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>
                        Built features like mini games allowing employees to use collected coins for activities and
                        rewards.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Integrated Firebase (Firestore, Functions, Hosting) for backend services.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-xl shadow-black/10 hover-ripple">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <div>
                    <h4 className="text-xl font-semibold text-white">Software Developer</h4>
                    <p className="text-blue-300">Texxen Inc., Philippines</p>
                  </div>
                  <div className="bg-blue-500/20 backdrop-blur-sm text-blue-300 border border-blue-400/30 px-4 py-2 rounded-2xl w-fit hover-ripple">
                    Aug 2021 - Aug 2022 (1 year 1 month)
                  </div>
                </div>

                <ul className="space-y-4 text-white/70">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      Collaborated with developers, UI/UX designers, and QA teams to deliver high-quality applications.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      Worked in an Agile Scrum environment, breaking down tasks into smaller, manageable units to meet
                      deadlines efficiently.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Gained hands-on experience with Node.js, building backend services and APIs.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Explored Solidity and Web3, contributing to blockchain-based applications.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>
                      Actively participated in sprint planning, stand-ups, and retrospectives, improving teamwork and
                      project execution.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-8">Let&apos;s Work Together</h2>
            <p className="text-xl text-white/80 mb-12">
              I&apos;m always interested in new opportunities and exciting projects. Let&apos;s discuss how we can bring your
              ideas to life!
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-xl shadow-black/10 hover:bg-white/10 hover:shadow-2xl transition-all duration-500 hover-ripple">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm p-4 rounded-2xl w-fit mx-auto mb-4 border border-white/20 hover-ripple">
                    <Mail className="w-8 h-8 text-purple-300" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Email</h3>
                  <p className="text-white/70">lambertotamayo15@gmail.com</p>
                </div>
              </div>

              <a
                href="https://github.com/lamberto15"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-transform hover:scale-105"
              >
                <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-xl shadow-black/10 hover:bg-white/10 hover:shadow-2xl transition-all duration-500 cursor-pointer h-full hover-ripple">
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm p-4 rounded-2xl w-fit mx-auto mb-4 border border-white/20 hover-ripple">
                      <Github className="w-8 h-8 text-purple-300" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">GitHub</h3>
                    <p className="text-white/70">lamberto15</p>
                  </div>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/lamberto15"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-transform hover:scale-105"
              >
                <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-xl shadow-black/10 hover:bg-white/10 hover:shadow-2xl transition-all duration-500 cursor-pointer h-full hover-ripple">
                  <div className="text-center">
                    <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm p-4 rounded-2xl w-fit mx-auto mb-4 border border-white/20 hover-ripple">
                      <Linkedin className="w-8 h-8 text-purple-300" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">LinkedIn</h3>
                    <p className="text-white/70">in/lamberto15</p>
                  </div>
                </div>
              </a>
            </div>

            <a
              href="mailto:lambertotamayo15@gmail.com?subject=Portfolio%20Inquiry%20-%20Let&apos;s%20Work%20Together&body=Hi%20Lamberto,%0D%0A%0D%0AI%20found%20your%20portfolio%20and%20I&apos;m%20interested%20in%20discussing%20a%20project.%0D%0A%0D%0AProject%20details:%0D%0A-%20%0D%0A%0D%0ABest%20regards"
              className="inline-flex"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500/80 to-blue-500/80 hover:from-purple-600/90 hover:to-blue-600/90 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover-ripple"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white/5 backdrop-blur-2xl border-t border-white/20 shadow-2xl shadow-black/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/60">© 2024 Lamberto Tamayo Jr. Built with Next.js & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  )
}

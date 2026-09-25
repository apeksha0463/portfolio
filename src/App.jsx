import { useEffect } from 'react'
import About from './components/About.jsx'
import Chatbot from './components/Chatbot.jsx'
import Contact from './components/Contact.jsx'
import Education from './components/Education.jsx'
import Experience from './components/Experience.jsx'
import Footer from './components/Footer.jsx'
import Home from './components/Home.jsx'
import Navbar from './components/Navbar.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'

export default function App() {
  // Gently fade sections in the first time they scroll into view.
  useEffect(() => {
    const sections = document.querySelectorAll('.section')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Home />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}

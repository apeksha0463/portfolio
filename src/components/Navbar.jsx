import { useEffect, useState } from 'react'
import { profile } from '../data/profile.js'
import { CloseIcon, MenuIcon } from './Icons.jsx'

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#education', label: 'Education' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  // Highlight the link for the section currently on screen.
  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="navbar">
      <nav className="container navbar-inner" aria-label="Main">
        <a href="#home" className="brand" onClick={() => setOpen(false)}>
          {profile.name}
        </a>
        <button
          className="icon-button nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
        <ul id="nav-links" className={`nav-links ${open ? 'open' : ''}`}>
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={active === link.href.slice(1) ? 'active' : ''}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

import { profile, isSet } from '../data/profile.js'
import { ArrowIcon, FileIcon, GitHubIcon } from './Icons.jsx'

export default function Home() {
  return (
    <section id="home" className="hero" aria-label="Introduction">
      <div className="container">
        <p className="hero-greeting">Hi, I'm</p>
        <h1 className="hero-name">{profile.name}</h1>
        <p className="hero-headline">{profile.headline}</p>
        <p className="hero-intro">{profile.intro}</p>
        <div className="button-row">
          <a href="#projects" className="button button-primary">
            View Projects <ArrowIcon />
          </a>
          <a href={profile.contact.github} target="_blank" rel="noreferrer" className="button button-secondary">
            <GitHubIcon /> GitHub
          </a>
          {isSet(profile.resumeUrl) && (
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="button button-secondary">
              <FileIcon /> Resume
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

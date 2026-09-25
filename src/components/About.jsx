import { profile } from '../data/profile.js'
import Section from './Section.jsx'

export default function About() {
  return (
    <Section id="about" title="About Me">
      <div className="about-grid">
        <div className="about-text">
          {profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="card">
          <h3 className="card-heading">Interests</h3>
          <ul className="tag-list">
            {profile.interests.map((interest) => (
              <li key={interest} className="tag">
                {interest}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

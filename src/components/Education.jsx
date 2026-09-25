import { profile, isSet } from '../data/profile.js'
import Section from './Section.jsx'

export default function Education() {
  const { degree, major, minor, college, graduationYear } = profile.education
  const details = [college, graduationYear].filter(isSet).join(' · ')

  return (
    <Section id="education" title="Education">
      <div className="education-grid">
        <div className="card">
          <p className="label">{degree}</p>
          <h3 className="card-title">{major}</h3>
          {details && <p className="muted">{details}</p>}
        </div>
        <div className="card">
          <p className="label">Minor</p>
          <h3 className="card-title">{minor}</h3>
        </div>
      </div>
    </Section>
  )
}

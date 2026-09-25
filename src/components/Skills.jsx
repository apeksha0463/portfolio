import { profile } from '../data/profile.js'
import Section from './Section.jsx'

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="skills-grid">
        {profile.skills.map((group) => (
          <div key={group.category} className="card">
            <h3 className="card-heading">{group.category}</h3>
            <ul className="tag-list">
              {group.items.map((skill) => (
                <li key={skill} className="tag">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

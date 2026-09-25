import { profile, isSet } from '../data/profile.js'
import { projects } from '../data/projects.js'
import Section from './Section.jsx'

export default function Experience() {
  return (
    <Section id="experience" title="Experience & Training">
      <div className="experience-list">
        {profile.experience.map((item) => {
          const meta = [item.organization, item.period].filter(isSet).join(' · ')
          const related = projects.find((p) => p.id === item.relatedProject)
          return (
            <article key={item.title} className="card experience-card">
              <h3 className="card-title">{item.title}</h3>
              {meta && <p className="muted">{meta}</p>}
              <p>{item.summary}</p>
              <ul className="tag-list">
                {item.areas.map((area) => (
                  <li key={area} className="tag">
                    {area}
                  </li>
                ))}
              </ul>
              {related && (
                <p className="muted related-project">
                  Related project:{' '}
                  <a href={related.github} target="_blank" rel="noreferrer">
                    {related.name}
                  </a>
                </p>
              )}
            </article>
          )
        })}
      </div>
    </Section>
  )
}

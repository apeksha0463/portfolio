import { GitHubIcon } from './Icons.jsx'

const PREVIEW_FEATURES = 3
const PREVIEW_TECH = 6

export default function ProjectCard({ project, onOpen }) {
  const extraTech = project.technologies.length - PREVIEW_TECH

  return (
    <article className="card project-card">
      <h3 className="card-title">{project.name}</h3>
      <p className="project-summary">{project.summary}</p>

      <ul className="tag-list tag-list-small" aria-label="Technologies">
        {project.technologies.slice(0, PREVIEW_TECH).map((tech) => (
          <li key={tech} className="tag">
            {tech}
          </li>
        ))}
        {extraTech > 0 && <li className="tag tag-muted">+{extraTech} more</li>}
      </ul>

      <ul className="feature-list">
        {project.features.slice(0, PREVIEW_FEATURES).map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

      <div className="project-actions">
        <button className="button button-primary button-small" onClick={() => onOpen(project)}>
          View details
        </button>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="button button-secondary button-small"
          aria-label={`${project.name} on GitHub`}
        >
          <GitHubIcon /> GitHub
        </a>
      </div>
    </article>
  )
}

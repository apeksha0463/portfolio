import { useEffect, useRef } from 'react'
import { CloseIcon, GitHubIcon } from './Icons.jsx'

// Project details shown in a native <dialog> (Esc and the close button work).
export default function ProjectDetails({ project, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (project && !dialog.open) dialog.showModal()
    if (!project && dialog.open) dialog.close()
  }, [project])

  // Clicking the dim backdrop (outside the panel) closes the dialog.
  const handleClick = (event) => {
    if (event.target === dialogRef.current) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      onClose={onClose}
      onClick={handleClick}
      aria-labelledby="project-dialog-title"
    >
      {project && (
        <div className="dialog-panel">
          <div className="dialog-header">
            <h2 id="project-dialog-title">{project.name}</h2>
            <button className="icon-button" onClick={onClose} aria-label="Close project details">
              <CloseIcon />
            </button>
          </div>

          <div className="dialog-body">
            <h3>Overview</h3>
            <p>{project.overview}</p>

            <h3>Problem</h3>
            <p>{project.problem}</p>

            <h3>Solution</h3>
            <p>{project.solution}</p>

            <h3>Technologies</h3>
            <ul className="tag-list">
              {project.technologies.map((tech) => (
                <li key={tech} className="tag">
                  {tech}
                </li>
              ))}
            </ul>

            <h3>Features</h3>
            <ul className="feature-list">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="dialog-footer">
            <a href={project.github} target="_blank" rel="noreferrer" className="button button-primary">
              <GitHubIcon /> View on GitHub
            </a>
          </div>
        </div>
      )}
    </dialog>
  )
}

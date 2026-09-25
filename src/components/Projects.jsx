import { useState } from 'react'
import { projects } from '../data/projects.js'
import ProjectCard from './ProjectCard.jsx'
import ProjectDetails from './ProjectDetails.jsx'
import Section from './Section.jsx'

export default function Projects() {
  const [selected, setSelected] = useState(null)

  return (
    <Section id="projects" title="Projects">
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={setSelected} />
        ))}
      </div>
      <ProjectDetails project={selected} onClose={() => setSelected(null)} />
    </Section>
  )
}

import { useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import projects from '../../../data/projects.json'

const ProjectsPage = () => {
  const [filter, setFilter] = useState('all')

  const filters = [
    { value: 'all', label: 'Tous les projets' },
    { value: 'dashboard', label: 'Dashboard' },
    { value: 'etl', label: 'Data Engineering / ETL' },
    { value: 'data-viz', label: 'Data Visualisation' }
  ]

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter)

  return (
    <section id="projects">
      <div className="container">
        <div className="reveal" style={{marginBottom: '40px'}}>
          <div className="section-label">Portfolio</div>
          <h2 className="section-title">Projets<br/><span className="gradient-text">Data & Analytics</span></h2>
          <p className="section-desc">Sélection de projets représentatifs couvrant la BI, l'ETL et la Data Visualisation.</p>
        </div>

        <div className="projects-filters reveal">
          {filters.map(f => (
            <button
              key={f.value}
              className={`filter-btn ${filter === f.value ? 'active' : ''}`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsPage
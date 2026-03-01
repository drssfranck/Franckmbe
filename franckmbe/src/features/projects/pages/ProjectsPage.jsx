import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ProjectCard from '../components/ProjectCard'
import { useProjectsData } from '../../../hooks/useProjectsData'

const ProjectsPage = () => {
  const { t } = useTranslation()
  const projects = useProjectsData()
  const [filter, setFilter] = useState('all')

  const filters = [
    { value: 'all', label: t('projects.filterAll') },
    { value: 'dashboard', label: t('projects.filterDashboard') },
    { value: 'etl', label: t('projects.filterETL') },
    { value: 'data-viz', label: t('projects.filterViz') }
  ]

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter)

  return (
    <section id="projects">
      <div className="container">
        <div className="reveal" style={{marginBottom: '40px'}}>
          <div className="section-label">{t('projects.sectionLabel')}</div>
          <h2 className="section-title">{t('projects.title')}<br/><span className="gradient-text">{t('projects.titleGradient')}</span></h2>
          <p className="section-desc">{t('projects.description')}</p>
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
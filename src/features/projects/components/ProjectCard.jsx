const ProjectCard = ({ project, index }) => {
  const categoryClass = {
    'dashboard': 'cat-dashboard',
    'etl': 'cat-etl',
    'data-viz': 'cat-data-viz'
  }[project.category]

  const delayClass = index === 0 ? '' :
    index === 1 ? 'reveal-delay-1' :
    index === 2 ? 'reveal-delay-2' :
    index === 3 ? 'reveal-delay-3' : ''

  return (
    <div className={`project-card reveal ${delayClass}`} data-category={project.category}>
      <div className="project-visual">
        <div
          className="project-visual-inner"
          style={{background: project.gradient}}
        >
          {project.visual}
        </div>
        <span className={`project-cat-badge ${categoryClass}`}>
          {project.category === 'dashboard' ? 'Dashboard' :
           project.category === 'etl' ? 'ETL' : 'Data Viz'}
        </span>
      </div>
      <div className="project-body">
        <div className="project-title">{project.title}</div>
        <div className="project-desc">{project.description}</div>
        <div className="project-tech">
          {project.technologies.map((tech, i) => (
            <span className="tech-tag" key={i}>{tech}</span>
          ))}
        </div>
        <div className="project-actions">
          <a href={project.link} className="project-link primary">Voir le projet</a>
          <a href={project.github} className="project-link secondary">GitHub</a>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
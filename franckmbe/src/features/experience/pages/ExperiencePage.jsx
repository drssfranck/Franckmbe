import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useCVData } from '../../../hooks/useCVData'

const ExperiencePage = () => {
  const { t } = useTranslation()
  const cvData = useCVData()
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible')
            }, i * 150)
          }
        })
      },
      { threshold: 0.05 }
    )

    document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Utiliser directement les expériences du CV
  const experiences = cvData.experiences || []

  return (
    <section id="experience">
      <div className="container">
        <div className="reveal" style={{marginBottom:'56px'}}>
          <div className="section-label">{t('experience.sectionLabel')}</div>
          <h2 className="section-title">{t('experience.title')}<br/><span className="gradient-text">{t('experience.titleGradient')}</span></h2>
        </div>
        <div className="timeline">

          {experiences.map((exp, index) => (
            <div className="timeline-item" key={index}>
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <div className="timeline-meta">
                  <span className="timeline-period">{exp.period}</span>
                  <span className="timeline-type">{exp.type}</span>
                </div>
                <div className="timeline-title">{exp.title}</div>
                <div className="timeline-company">{exp.company}</div>
                <div className="timeline-tasks">
                  {(exp.missions || []).map((mission, i) => (
                    <div className="timeline-task" key={i}>
                      <div className="task-dot"></div>
                      {mission}
                    </div>
                  ))}
                </div>
                <div className="timeline-tags">
                  {(exp.technologies || []).map((tech, i) => (
                    <span className="xp-tag" key={i}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}

export default ExperiencePage
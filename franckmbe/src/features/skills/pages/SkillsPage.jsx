import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useCVData } from '../../../hooks/useCVData'

const SkillsPage = () => {
  const { t } = useTranslation()
  const cvData = useCVData()
  const skillsRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.skill-bar-fill')
            bars.forEach(bar => {
              const width = bar.getAttribute('data-width')
              setTimeout(() => {
                bar.style.width = width + '%'
              }, 200)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (skillsRef.current) {
      observer.observe(skillsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const categories = cvData.skills.categories || []

  return (
    <section id="skills">
      <div className="container">
        <div className="skills-header-row">
          <div className="reveal">
            <div className="section-label">{t('skills.sectionLabel')}</div>
            <h2 className="section-title">{t('skills.title')}</h2>
            <p className="section-desc">{t('skills.description')}</p>
          </div>
        </div>
        <div className="skills-categories" ref={skillsRef}>

          {categories.map((category, catIndex) => (
            <div
              className={`skill-category-card reveal ${catIndex === 1 ? 'reveal-delay-1' : catIndex === 2 ? 'reveal-delay-2' : catIndex === 3 ? 'reveal-delay-3' : ''}`}
              key={catIndex}
            >
              <div className="skill-cat-icon" style={{background: category.color}}>{category.icon}</div>
              <div className="skill-cat-title">{category.name}</div>
              <div className="skill-bars">
                {category.items.map((skill, skillIndex) => (
                  <div className="skill-bar-item" key={skillIndex}>
                    <div className="skill-bar-header">
                      <span className="skill-bar-name">{skill.name}</span>
                      <span className="skill-bar-pct">{skill.level}%</span>
                    </div>
                    <div className="skill-bar-track">
                      <div className="skill-bar-fill" data-width={skill.level}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}

export default SkillsPage
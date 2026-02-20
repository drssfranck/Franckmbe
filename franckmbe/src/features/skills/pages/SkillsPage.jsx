import { useEffect, useRef } from 'react'

const SkillsPage = () => {
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

  return (
    <section id="skills">
      <div className="container">
        <div className="skills-header-row">
          <div className="reveal">
            <div className="section-label">Compétences</div>
            <h2 className="section-title">Stack Technique</h2>
            <p className="section-desc">Maîtrise de l'ensemble de la chaîne data, de l'ingestion jusqu'à la visualisation.</p>
          </div>
        </div>
        <div className="skills-categories" ref={skillsRef}>

          <div className="skill-category-card reveal reveal-delay-1">
            <div className="skill-cat-icon" style={{background: 'rgba(59,130,246,0.12)'}}>📊</div>
            <div className="skill-cat-title">Data Visualisation & BI</div>
            <div className="skill-bars">
              <div className="skill-bar-item">
                <div className="skill-bar-header"><span className="skill-bar-name">Power BI</span><span className="skill-bar-pct">85%</span></div>
                <div className="skill-bar-track"><div className="skill-bar-fill" data-width="85"></div></div>
              </div>
              <div className="skill-bar-item">
                <div className="skill-bar-header"><span className="skill-bar-name">Tableau</span><span className="skill-bar-pct">75%</span></div>
                <div className="skill-bar-track"><div className="skill-bar-fill" data-width="75"></div></div>
              </div>
              <div className="skill-bar-item">
                <div className="skill-bar-header"><span className="skill-bar-name">DAX</span><span className="skill-bar-pct">80%</span></div>
                <div className="skill-bar-track"><div className="skill-bar-fill" data-width="80"></div></div>
              </div>
              <div className="skill-bar-item">
                <div className="skill-bar-header"><span className="skill-bar-name">Streamlit</span><span className="skill-bar-pct">70%</span></div>
                <div className="skill-bar-track"><div className="skill-bar-fill" data-width="70"></div></div>
              </div>
            </div>
          </div>

          <div className="skill-category-card reveal reveal-delay-2">
            <div className="skill-cat-icon" style={{background: 'rgba(16,185,129,0.12)'}}>🐍</div>
            <div className="skill-cat-title">Langages & Requêtes</div>
            <div className="skill-bars">
              <div className="skill-bar-item">
                <div className="skill-bar-header"><span className="skill-bar-name">Python</span><span className="skill-bar-pct">82%</span></div>
                <div className="skill-bar-track"><div className="skill-bar-fill" data-width="82"></div></div>
              </div>
              <div className="skill-bar-item">
                <div className="skill-bar-header"><span className="skill-bar-name">SQL</span><span className="skill-bar-pct">88%</span></div>
                <div className="skill-bar-track"><div className="skill-bar-fill" data-width="88"></div></div>
              </div>
              <div className="skill-bar-item">
                <div className="skill-bar-header"><span className="skill-bar-name">NoSQL</span><span className="skill-bar-pct">60%</span></div>
                <div className="skill-bar-track"><div className="skill-bar-fill" data-width="60"></div></div>
              </div>
              <div className="skill-bar-item">
                <div className="skill-bar-header"><span className="skill-bar-name">dbt</span><span className="skill-bar-pct">65%</span></div>
                <div className="skill-bar-track"><div className="skill-bar-fill" data-width="65"></div></div>
              </div>
            </div>
          </div>

          <div className="skill-category-card reveal reveal-delay-3">
            <div className="skill-cat-icon" style={{background: 'rgba(245,158,11,0.12)'}}>☁️</div>
            <div className="skill-cat-title">Cloud & Data Platforms</div>
            <div className="skill-bars">
              <div className="skill-bar-item">
                <div className="skill-bar-header"><span className="skill-bar-name">Azure Data Lake</span><span className="skill-bar-pct">78%</span></div>
                <div className="skill-bar-track"><div className="skill-bar-fill" data-width="78"></div></div>
              </div>
              <div className="skill-bar-item">
                <div className="skill-bar-header"><span className="skill-bar-name">Snowflake</span><span className="skill-bar-pct">72%</span></div>
                <div className="skill-bar-track"><div className="skill-bar-fill" data-width="72"></div></div>
              </div>
              <div className="skill-bar-item">
                <div className="skill-bar-header"><span className="skill-bar-name">Microsoft Fabric</span><span className="skill-bar-pct">68%</span></div>
                <div className="skill-bar-track"><div className="skill-bar-fill" data-width="68"></div></div>
              </div>
              <div className="skill-bar-item">
                <div className="skill-bar-header"><span className="skill-bar-name">AWS (bases)</span><span className="skill-bar-pct">50%</span></div>
                <div className="skill-bar-track"><div className="skill-bar-fill" data-width="50"></div></div>
              </div>
            </div>
          </div>

          <div className="skill-category-card reveal reveal-delay-4">
            <div className="skill-cat-icon" style={{background: 'rgba(139,92,246,0.12)'}}>🏗️</div>
            <div className="skill-cat-title">Architecture & Méthodes</div>
            <div className="skill-bars">
              <div className="skill-bar-item">
                <div className="skill-bar-header"><span className="skill-bar-name">Pipelines ETL</span><span className="skill-bar-pct">80%</span></div>
                <div className="skill-bar-track"><div className="skill-bar-fill" data-width="80"></div></div>
              </div>
              <div className="skill-bar-item">
                <div className="skill-bar-header"><span className="skill-bar-name">Architecture Medallion</span><span className="skill-bar-pct">70%</span></div>
                <div className="skill-bar-track"><div className="skill-bar-fill" data-width="70"></div></div>
              </div>
              <div className="skill-bar-item">
                <div className="skill-bar-header"><span className="skill-bar-name">Merise / UML</span><span className="skill-bar-pct">75%</span></div>
                <div className="skill-bar-track"><div className="skill-bar-fill" data-width="75"></div></div>
              </div>
              <div className="skill-bar-item">
                <div className="skill-bar-header"><span className="skill-bar-name">CRM / ERP Analyse</span><span className="skill-bar-pct">78%</span></div>
                <div className="skill-bar-track"><div className="skill-bar-fill" data-width="78"></div></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default SkillsPage
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const HomePage = () => {
  const { t } = useTranslation()

  useEffect(() => {
    // Hero entrance animation
    const heroContent = document.querySelector('.hero-content')
    if (heroContent) {
      heroContent.style.opacity = '0'
      heroContent.style.transform = 'translateY(30px)'
      heroContent.style.transition = 'opacity 0.9s cubic-bezier(0.4,0,0.2,1), transform 0.9s cubic-bezier(0.4,0,0.2,1)'
      setTimeout(() => {
        heroContent.style.opacity = '1'
        heroContent.style.transform = 'translateY(0)'
      }, 100)
    }
  }, [])

  return (
    <section id="home">
      <div className="hero-bg">
        <div className="hero-grid"></div>
        <div className="hero-blob hero-blob-1"></div>
        <div className="hero-blob hero-blob-2"></div>
      </div>
      <div className="container">
        <div className="hero-content">
          {/* LEFT */}
          <div>
            <div className="hero-tag">
              <div className="available-dot"></div>
              🔍 {t('hero.tag')}
            </div>
            <h1 className="hero-title">
              {t('hero.name')}
              <span className="line2 gradient-text">{t('hero.title')}</span>
            </h1>
            <p className="hero-subtitle">
              {t('hero.description')}
            </p>
            <div className="hero-ctas">
              <Link to="/cv" className="btn-primary">
                {t('hero.downloadCV')}
              </Link>
              <Link to="/contact" className="btn-secondary">
                {t('hero.contact')}
              </Link>
              <a href="https://linkedin.com/in/imbe" className="btn-secondary" target="_blank" rel="noopener">
                {t('hero.linkedin')}
              </a>
            </div>
            <div className="hero-stats">
              <div>
                <div className="hero-stat-num">5+</div>
                <div className="hero-stat-label">Années XP</div>
              </div>
              <div>
                <div className="hero-stat-num">4+</div>
                <div className="hero-stat-label">Projets Data</div>
              </div>
              <div>
                <div className="hero-stat-num">MBA</div>
                <div className="hero-stat-label">Big Data & IA</div>
              </div>
              <div>
                <div className="hero-stat-num">Paris</div>
                <div className="hero-stat-label">&lt; 50 km</div>
              </div>
            </div>
          </div>

          {/* RIGHT: Profile Card */}
          <div>
            <div className="hero-card">
              <div className="hero-avatar">FM</div>
              <div className="hero-card-name">Franck MBE</div>
              <div className="hero-card-title">Data Analyst · Data Engineer</div>
              <div className="hero-card-info">
                <div className="hero-card-info-item">
                  <div className="info-icon">📍</div>
                  Paris, Île-de-France (&lt;50km)
                </div>
                <div className="hero-card-info-item">
                  <div className="info-icon">✉️</div>
                  drssfranck@gmail.com
                </div>
                <div className="hero-card-info-item">
                  <div className="info-icon">📱</div>
                  +33 6 43 74 68 40
                </div>
                <div className="hero-card-info-item">
                  <div className="info-icon">🎓</div>
                  MBA Big Data & IA — MBA ESG (2027)
                </div>
                <div className="hero-card-info-item">
                  <div className="info-icon">💼</div>
                  Alternant chez ENI France (2025–2026)
                </div>
              </div>
              <div className="hero-tech-stack">
                <span className="tech-tag">Python</span>
                <span className="tech-tag">SQL</span>
                <span className="tech-tag">Power BI</span>
                <span className="tech-tag">Azure</span>
                <span className="tech-tag">Snowflake</span>
                <span className="tech-tag">Tableau</span>
                <span className="tech-tag">DAX</span>
                <span className="tech-tag">ETL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePage
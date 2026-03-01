import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import profileImage from '../../../assets/images/profile.jpg'
import { useCVData } from '../../../hooks/useCVData'
import { generateCVPdf } from '../../../lib/generateCVPdf'

const HomePage = () => {
  const { t, i18n } = useTranslation()
  const cvData = useCVData()

  const handleDownloadCV = () => {
    generateCVPdf(i18n.language)
  }

  useEffect(() => {
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
              {cvData.name}
              <span className="line2 gradient-text">{cvData.title}</span>
            </h1>
            <p className="hero-subtitle">
              {t('hero.description')}
            </p>
            <div className="hero-ctas">
              <button onClick={handleDownloadCV} className="btn-primary">
                {t('hero.downloadCV')}
              </button>
              <a href="#contact" className="btn-secondary">
                {t('hero.contact')}
              </a>
              <a href="https://linkedin.com/in/imbe" className="btn-secondary" target="_blank" rel="noopener">
                {t('hero.linkedin')}
              </a>
            </div>
            <div className="hero-stats">
              {cvData.hero.stats.map((stat, index) => (
                <div key={index}>
                  <div className="hero-stat-num">{stat.value}</div>
                  <div className="hero-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Profile Card */}
          <div>
            <div className="hero-card">
              <img src={profileImage} alt={cvData.name} className="hero-avatar-image" />
              <div className="hero-card-name">{cvData.name}</div>
              <div className="hero-card-title">{cvData.title}</div>
              <div className="hero-card-info">
                {(cvData.hero?.cardInfo || [
                  { icon: '📍', text: cvData.location || 'Location' },
                  { icon: '⚡', text: 'Data & AI Expert' },
                  { icon: '✅', text: cvData.availability || 'Available' }
                ]).map((item, index) => (
                  <div className="hero-card-info-item" key={index}>
                    <div className="info-icon">{item.icon}</div>
                    {item.text}
                  </div>
                ))}
              </div>
              <div className="hero-tech-stack">
                {(cvData.hero?.techStack || []).map((tech, index) => (
                  <span className="tech-tag" key={index}>{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePage
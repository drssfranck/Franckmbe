import { useTranslation } from 'react-i18next'
import { useCVData } from '../../../hooks/useCVData'

const AboutPage = () => {
  const { t } = useTranslation()
  const cvData = useCVData()
  return (
    <section id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-text reveal">
            <div className="section-label">{t('about.sectionLabel')}</div>
            <h2 className="section-title">{t('about.title')}<br/><span className="gradient-text">{t('about.titleGradient')}</span></h2>
            {cvData.about.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <div className="about-highlight">🎯 {cvData.about.highlight}</div>
          </div>
          <div className="reveal reveal-delay-2">
            <div className="about-cdi-card">
              <div className="cdi-header">
                <div className="cdi-icon">✅</div>
                <div>
                  <div className="cdi-title">{cvData.about.cdi.title}</div>
                  <div style={{fontSize:'0.75rem', color:'var(--text-muted)'}}>{cvData.about.cdi.subtitle}</div>
                </div>
              </div>
              <div className="cdi-list">
                {cvData.about.cdi.items.map((item, index) => (
                  <div className="cdi-item" key={index}>
                    <div className="cdi-dot"></div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="lang-card">
              <h4>{t('about.languagesSection', 'Langues')}</h4>
              <div className="lang-items">
                {cvData.languages.map((lang, index) => (
                  <div className="lang-item" key={index}>
                    <span className="lang-name">{lang.name}</span>
                    <span className="lang-level">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPage
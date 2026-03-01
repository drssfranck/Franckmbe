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
            {cvData.about?.summary && <p>{cvData.about.summary}</p>}
            {cvData.about?.objective && <p>{cvData.about.objective}</p>}
            <div className="about-highlight">🎯 {cvData.about?.summary || 'Professionnel passionné par la data'}</div>
          </div>
          <div className="reveal reveal-delay-2">
            <div className="about-cdi-card">
              <div className="cdi-header">
                <div className="cdi-icon">✅</div>
                <div>
                  <div className="cdi-title">CDI Disponible</div>
                  <div style={{fontSize:'0.75rem', color:'var(--text-muted)'}}>Septembre 2026</div>
                </div>
              </div>
              <div className="cdi-list">
                <div className="cdi-item">
                  <div className="cdi-dot"></div>
                  Disponibilité: {cvData.availability || 'Septembre 2026'}
                </div>
                <div className="cdi-item">
                  <div className="cdi-dot"></div>
                  Localisation: {cvData.location || 'Paris'}
                </div>
                <div className="cdi-item">
                  <div className="cdi-dot"></div>
                  Prêt pour défis data stratégiques
                </div>
              </div>
            </div>
            <div className="lang-card">
              <h4>{t('about.languagesSection', 'Langues')}</h4>
              <div className="lang-items">
                {(cvData.languages || []).map((lang, index) => (
                  <div className="lang-item" key={index}>
                    <span className="lang-name">{lang.language || 'Langue'}</span>
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
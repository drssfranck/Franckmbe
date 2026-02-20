import { useTranslation } from 'react-i18next'

const AboutPage = () => {
  const { t } = useTranslation()

  return (
    <section id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-text reveal">
            <div className="section-label">{t('about.label')}</div>
            <h2 className="section-title">{t('about.title')}<br/><span className="gradient-text">{t('about.titleGradient')}</span></h2>
            <p>{t('about.paragraph1')}</p>
            <p>{t('about.paragraph2')}</p>
            <div className="about-highlight">
              <p>{t('about.highlight')}</p>
            </div>
            <p>{t('about.paragraph3')}</p>
          </div>
          <div className="reveal reveal-delay-2">
            <div className="about-cdi-card">
              <div className="cdi-header">
                <div className="cdi-icon">✅</div>
                <div>
                  <div className="cdi-title">{t('about.cdiTitle')}</div>
                  <div style={{fontSize:'0.75rem', color:'var(--text-muted)'}}>{t('about.cdiSubtitle')}</div>
                </div>
              </div>
              <div className="cdi-list">
                <div className="cdi-item"><div className="cdi-dot"></div>{t('about.cdiItem1')}</div>
                <div className="cdi-item"><div className="cdi-dot"></div>{t('about.cdiItem2')}</div>
                <div className="cdi-item"><div className="cdi-dot"></div>{t('about.cdiItem3')}</div>
                <div className="cdi-item"><div className="cdi-dot"></div>{t('about.cdiItem4')}</div>
                <div className="cdi-item"><div className="cdi-dot"></div>{t('about.cdiItem5')}</div>
              </div>
            </div>
            <div className="lang-card">
              <h4>{t('about.languages')}</h4>
              <div className="lang-items">
                <div className="lang-item">
                  <span className="lang-name">🇫🇷 Français</span>
                  <span className="lang-level">Natif (C2)</span>
                </div>
                <div className="lang-item">
                  <span className="lang-name">🇬🇧 Anglais</span>
                  <span className="lang-level">Intermédiaire B1-B2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPage
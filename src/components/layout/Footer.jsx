import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="logo">FM<span>.</span></div>
            <p>{t('footer.description')}</p>
          </div>

          <div className="footer-links">
            <h4>{t('footer.navigation')}</h4>
            <ul>
              <li><a href="#home">{t('nav.home')}</a></li>
              <li><a href="#about">{t('nav.about')}</a></li>
              <li><a href="#skills">{t('nav.skills')}</a></li>
              <li><a href="#experience">{t('nav.experience')}</a></li>
              <li><a href="#projects">{t('nav.projects')}</a></li>
              <li><a href="#cv">{t('nav.cv')}</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>{t('footer.contact')}</h4>
            <ul>
              <li><a href="mailto:drssfranck@gmail.com">drssfranck@gmail.com</a></li>
              <li><a href="tel:+33643746840">+33 6 43 74 68 40</a></li>
              <li><a href="https://linkedin.com/in/imbe" target="_blank" rel="noopener">🔗 LinkedIn</a></li>
              <li><a href="https://github.com/franckmbe" target="_blank" rel="noopener">💻 GitHub</a></li>
              <li><a href="#contact">{t('footer.contactForm')}</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>{t('footer.recruiters')}</h4>
            <ul>
              <li><a href="#cv">{t('footer.downloadCV')}</a></li>
              <li><a href="#contact">{t('footer.offer')}</a></li>
              <li><a href="#services">{t('footer.consulting')}</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Franck MBE · {t('footer.rights')} · {t('footer.seo')}</p>
          <div className="footer-available">
            <div className="available-dot"></div>
            🔍 {t('available.full')}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
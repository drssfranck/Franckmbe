import { Link } from 'react-router-dom'
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
              <li><Link to="/">{t('nav.home')}</Link></li>
              <li><Link to="/about">{t('nav.about')}</Link></li>
              <li><Link to="/skills">{t('nav.skills')}</Link></li>
              <li><Link to="/experience">{t('nav.experience')}</Link></li>
              <li><Link to="/projects">{t('nav.projects')}</Link></li>
              <li><Link to="/cv">{t('nav.cv')}</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>{t('footer.contact')}</h4>
            <ul>
              <li><a href="mailto:drssfranck@gmail.com">drssfranck@gmail.com</a></li>
              <li><a href="tel:+33643746840">+33 6 43 74 68 40</a></li>
              <li><a href="https://linkedin.com/in/imbe" target="_blank" rel="noopener">LinkedIn</a></li>
              <li><Link to="/contact">{t('footer.contactForm')}</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>{t('footer.recruiters')}</h4>
            <ul>
              <li><Link to="/cv">{t('footer.downloadCV')}</Link></li>
              <li><Link to="/contact">{t('footer.offer')}</Link></li>
              <li><Link to="/services">{t('footer.consulting')}</Link></li>
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
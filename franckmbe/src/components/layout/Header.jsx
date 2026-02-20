import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { t, i18n } = useTranslation()
  const location = useLocation()

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr')
  }

  const closeMobileNav = () => setMobileMenuOpen(false)

  const navLinks = [
    { to: '/about', label: t('nav.about') },
    { to: '/skills', label: t('nav.skills') },
    { to: '/experience', label: t('nav.experience') },
    { to: '/projects', label: t('nav.projects') },
    { to: '/services', label: t('nav.services') },
    { to: '/contact', label: t('nav.contact') },
    { to: '/cv', label: t('nav.cv') },
  ]

  return (
    <>
      <header role="banner">
        <Link to="/" className="logo">FM<span>.</span></Link>

        <nav className="nav-links" aria-label="Navigation principale">
          {navLinks.map(link => (
            <Link 
              key={link.to} 
              to={link.to}
              className={location.pathname === link.to ? 'active' : ''}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav-right">
          <div className="available-badge" aria-label="Disponible CDI Septembre 2026">
            <div className="available-dot"></div>
            {t('available.badge')}
          </div>
          <button className="icon-btn" onClick={toggleTheme} aria-label="Basculer thème clair/sombre">
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
          <button className="icon-btn" onClick={toggleLanguage} aria-label="Switch language">
            {i18n.language === 'fr' ? 'FR' : 'EN'}
          </button>
          <Link to="/contact" className="btn-hire">{t('nav.hire')}</Link>
          <button 
            className="icon-btn hamburger" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            ☰
          </button>
        </div>
      </header>

      <nav className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`} aria-label="Menu mobile">
        {navLinks.map(link => (
          <Link 
            key={link.to} 
            to={link.to} 
            onClick={closeMobileNav}
          >
            {link.label}
          </Link>
        ))}
        <div className="available-badge" style={{ justifyContent: 'center', marginTop: '8px' }}>
          <div className="available-dot"></div>
          🔍 {t('available.full')}
        </div>
      </nav>
    </>
  )
}

export default Header
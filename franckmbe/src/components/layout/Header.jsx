import { useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { t, i18n } = useTranslation()

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr')
  }

  const closeMobileNav = () => setMobileMenuOpen(false)

  const navLinks = [
    { href: '#about', label: t('nav.about') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#experience', label: t('nav.experience') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#services', label: t('nav.services') },
    { href: '#contact', label: t('nav.contact') },
    { href: '#cv', label: t('nav.cv') },
  ]

  return (
    <>
      <header role="banner">
        <a href="#home" className="logo" aria-label="Logo Franck MBE">
          FM<span>.</span>
        </a>

        <nav className="nav-links" aria-label="Navigation principale">
          {navLinks.map(link => (
            <a 
              key={link.href} 
              href={link.href}
              aria-current={typeof window !== 'undefined' && window.location.hash === link.href ? 'page' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-right">
          <div 
            className="available-badge" 
            role="status"
            aria-label="Disponible CDI Septembre 2026"
          >
            <div className="available-dot" aria-hidden="true"></div>
            {t('available.badge')}
          </div>
          
          <button 
            className="icon-btn" 
            onClick={toggleTheme} 
            aria-label={`Basculer vers thème ${theme === 'dark' ? 'clair' : 'sombre'}`}
            title={`Thème ${theme === 'dark' ? 'clair' : 'sombre'}`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          
          <button 
            className="icon-btn" 
            onClick={toggleLanguage} 
            aria-label="Changer de langue"
            title={i18n.language === 'fr' ? 'Passer à l\'anglais' : 'Switch to French'}
          >
            {i18n.language === 'fr' ? 'EN' : 'FR'}
          </button>
          
          <a 
            href="#contact" 
            className="btn-hire"
            aria-label="Ouvrir la section contact"
          >
            {t('nav.hire')}
          </a>
          
          <button
            className="icon-btn hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu principal"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            ☰
          </button>
        </div>
      </header>

      <nav 
        id="mobile-nav"
        className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`} 
        aria-label="Menu mobile"
      >
        {navLinks.map(link => (
          <a 
            key={link.href} 
            href={link.href} 
            onClick={closeMobileNav}
            aria-current={typeof window !== 'undefined' && window.location.hash === link.href ? 'page' : undefined}
          >
            {link.label}
          </a>
        ))}
        <div 
          className="available-badge" 
          style={{ justifyContent: 'center', marginTop: 'var(--sm)' }}
          role="status"
        >
          <div className="available-dot" aria-hidden="true"></div>
          🔍 {t('available.full')}
        </div>
      </nav>
    </>
  )
}

export default Header
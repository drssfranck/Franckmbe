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
        <a href="#home" className="logo">FM<span>.</span></a>

        <nav className="nav-links" aria-label="Navigation principale">
          {navLinks.map(link => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
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
          <a href="#contact" className="btn-hire">{t('nav.hire')}</a>
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
          <a key={link.href} href={link.href} onClick={closeMobileNav}>
            {link.label}
          </a>
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
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const ContactPage = () => {
  const { t } = useTranslation()
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const btn = e.target.querySelector('.form-submit')
    btn.textContent = '⏳ Envoi en cours...'
    btn.disabled = true

    setTimeout(() => {
      setFormSubmitted(true)
    }, 1500)
  }

  return (
    <section id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="reveal">
            <div className="section-label">{t('contact.label')}</div>
            <h2 className="section-title">{t('contact.title')}<br/><span className="gradient-text">{t('contact.titleGradient')}</span></h2>
            <p className="section-desc" style={{marginBottom:'32px'}}>{t('contact.description')}</p>

            <div className="contact-info">
              <a href="mailto:drssfranck@gmail.com" className="contact-item">
                <div className="contact-icon">✉️</div>
                <div>
                  <div className="contact-label">EMAIL</div>
                  <div className="contact-value">drssfranck@gmail.com</div>
                </div>
              </a>
              <a href="tel:+33643746840" className="contact-item">
                <div className="contact-icon">📱</div>
                <div>
                  <div className="contact-label">TÉLÉPHONE</div>
                  <div className="contact-value">+33 6 43 74 68 40</div>
                </div>
              </a>
              <a href="https://linkedin.com/in/imbe" target="_blank" className="contact-item" rel="noopener">
                <div className="contact-icon">💼</div>
                <div>
                  <div className="contact-label">LINKEDIN</div>
                  <div className="contact-value">linkedin.com/in/imbe</div>
                </div>
              </a>
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <div className="contact-label">LOCALISATION</div>
                  <div className="contact-value">Paris, Île-de-France — &lt;50 km</div>
                </div>
              </div>
            </div>

            <div className="cdi-banner" style={{marginTop:'24px'}}>
              <h4>🔍 {t('available.full')}</h4>
              <p>{t('contact.cdiMessage')}</p>
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <div className="contact-form">
              <h3 style={{fontFamily:'var(--font-display)', fontWeight:'700', letterSpacing:'-0.03em', marginBottom:'24px'}}>{t('contact.formTitle')}</h3>
              {!formSubmitted ? (
                <form id="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstname">{t('contact.firstName')}</label>
                      <input type="text" id="firstname" placeholder={t('contact.firstNamePlaceholder')} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastname">{t('contact.lastName')}</label>
                      <input type="text" id="lastname" placeholder={t('contact.lastNamePlaceholder')} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email-contact">{t('contact.email')}</label>
                    <input type="email" id="email-contact" placeholder={t('contact.emailPlaceholder')} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">{t('contact.company')}</label>
                    <input type="text" id="company" placeholder={t('contact.companyPlaceholder')} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">{t('contact.subject')}</label>
                    <select id="subject">
                      <option value="">{t('contact.subjectPlaceholder')}</option>
                      <option value="cdi">{t('contact.subjectCDI')}</option>
                      <option value="cdi-de">{t('contact.subjectCDIDE')}</option>
                      <option value="freelance">{t('contact.subjectFreelance')}</option>
                      <option value="collab">{t('contact.subjectCollab')}</option>
                      <option value="other">{t('contact.subjectOther')}</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">{t('contact.message')}</label>
                    <textarea id="message" placeholder={t('contact.messagePlaceholder')} required></textarea>
                  </div>
                  <button type="submit" className="form-submit">✉ {t('contact.send')}</button>
                </form>
              ) : (
                <div className="form-success" style={{display:'block'}}>
                  ✅ {t('contact.success')}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactPage
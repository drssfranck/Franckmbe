import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import cvData from '../../../data/cv.json'

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

  const contactItems = [
    {
      type: 'email',
      icon: '✉️',
      label: 'Email',
      value: cvData.email || 'contact@example.com',
      link: `mailto:${cvData.email}`
    },
    {
      type: 'tel',
      icon: '📱',
      label: 'Téléphone',
      value: cvData.phone || '+33 6 00 00 00 00',
      link: `tel:${cvData.phone}`
    },
    {
      type: 'link',
      icon: '🔗',
      label: 'LinkedIn',
      value: 'LinkedIn Profile',
      link: cvData.linkedin || 'https://linkedin.com'
    }
  ].filter(item => item.value)

  return (
    <section id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="reveal">
            <div className="section-label">Contact</div>
            <h2 className="section-title">Travaillons<br/><span className="gradient-text">ensemble</span></h2>
            <p className="section-desc" style={{marginBottom:'32px'}}>Recruteur, manager ou freelance client : je suis disponible pour discuter de toute opportunité CDI ou mission data.</p>

            <div className="contact-info">
              {contactItems.map((item, index) => {
                if (item.type === 'email' || item.type === 'tel' || item.type === 'link') {
                  return (
                    <a href={item.link} className="contact-item" key={index} target={item.type === 'link' ? '_blank' : undefined} rel={item.type === 'link' ? 'noopener' : undefined}>
                      <div className="contact-icon">{item.icon}</div>
                      <div>
                        <div className="contact-label">{item.label}</div>
                        <div className="contact-value">{item.value}</div>
                      </div>
                    </a>
                  )
                } else {
                  return (
                    <div className="contact-item" key={index}>
                      <div className="contact-icon">{item.icon}</div>
                      <div>
                        <div className="contact-label">{item.label}</div>
                        <div className="contact-value">{item.value}</div>
                      </div>
                    </div>
                  )
                }
              })}
            </div>

            <div className="cdi-banner" style={{marginTop:'24px'}}>
              <h4>🔍 {t('available.full')}</h4>
              <p>{cvData.contact?.cdiMessage || 'Recruteur, manager ou freelance client : je suis disponible pour discuter de toute opportunité CDI ou mission data.'}</p>
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <div className="contact-form">
              <h3 style={{fontFamily:'var(--font-display)', fontWeight:'700', letterSpacing:'-0.03em', marginBottom:'24px'}}>Envoyer un message</h3>
              {!formSubmitted ? (
                <form id="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstname">Prénom</label>
                      <input type="text" id="firstname" placeholder="Jean" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastname">Nom</label>
                      <input type="text" id="lastname" placeholder="Dupont" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email-contact">Email professionnel</label>
                    <input type="email" id="email-contact" placeholder="jean.dupont@entreprise.com" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">Entreprise</label>
                    <input type="text" id="company" placeholder="Nom de votre entreprise" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Objet</label>
                    <select id="subject">
                      <option value="">Sélectionnez un objet...</option>
                      <option value="cdi">Proposition CDI Data Analyst</option>
                      <option value="cdi-de">Proposition CDI Data Engineer</option>
                      <option value="freelance">Mission Freelance / Consulting</option>
                      <option value="collab">Collaboration / Partenariat</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" placeholder="Décrivez votre opportunité ou votre projet data..." required></textarea>
                  </div>
                  <button type="submit" className="form-submit">✉ Envoyer le message</button>
                </form>
              ) : (
                <div className="form-success" style={{display:'block'}}>
                  ✅ Message envoyé ! Je vous répondrai dans les 24h.
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
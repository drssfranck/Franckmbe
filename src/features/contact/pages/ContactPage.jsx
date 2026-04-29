import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { sendContactEmail, validateContactForm } from '../../../services/emailService'
import cvData from '../../../data/cv.json'

const ContactPage = () => {
  const { t } = useTranslation()
  
  // État du formulaire
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  })

  // État de soumission
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})

  /**
   * Gère les changements des champs du formulaire
   */
  const handleInputChange = (e) => {
    const { id, value } = e.target
    const fieldName = id
      .replace('contact-', '')
      .replace('email-contact', 'email')
      .replace(/^contact-/, '')
    
    // Mapper les IDs aux noms de champs
    const fieldMap = {
      'firstname': 'firstName',
      'lastname': 'lastName',
      'email-contact': 'email',
      'company': 'company',
      'subject': 'subject',
      'message': 'message'
    }
    
    const fieldKey = fieldMap[id] || fieldName
    
    setFormData(prev => ({
      ...prev,
      [fieldKey]: value
    }))

    // Effacer l'erreur du champ quand l'utilisateur commence à taper
    if (fieldErrors[fieldKey]) {
      setFieldErrors(prev => ({
        ...prev,
        [fieldKey]: null
      }))
    }
  }

  /**
   * Réinitialiser le formulaire
   */
  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      subject: '',
      message: ''
    })
    setFieldErrors({})
    setError(null)
    setSubmitted(false)
  }

  /**
   * Gère la soumission du formulaire
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setFieldErrors({})

    // Validation
    const validation = validateContactForm(formData)
    if (!validation.valid) {
      setFieldErrors(validation.errors)
      return
    }

    setLoading(true)

    try {
      // Ajouter l'email du portfolio pour la notification
      const emailData = {
        ...formData,
        portfolioEmail: cvData.email
      }

      await sendContactEmail(emailData)
      setSubmitted(true)

      // Réinitialiser après 3 secondes
      setTimeout(() => {
        resetForm()
      }, 3000)
    } catch (err) {
      console.error('Erreur:', err)
      setError(err.message || 'Une erreur est survenue lors de l\'envoi du message.')
    } finally {
      setLoading(false)
    }
  }

  const contactItems = [
    {
      type: 'email',
      icon: 'E',
      label: 'Email',
      value: cvData.email || 'contact@example.com',
      link: `mailto:${cvData.email}`
    },
    {
      type: 'tel',
      icon: 'T',
      label: 'Téléphone',
      value: cvData.phone || '+33 6 00 00 00 00',
      link: `tel:${cvData.phone}`
    },
    {
      type: 'link',
      icon: 'L',
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
              <h4>{t('available.full')}</h4>
              <p>{cvData.contact?.cdiMessage || 'Recruteur, manager ou freelance client : je suis disponible pour discuter de toute opportunité CDI ou mission data.'}</p>
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <div className="contact-form">
              <h3 style={{fontFamily:'var(--font-display)', fontWeight:'700', letterSpacing:'-0.03em', marginBottom:'24px'}}>Envoyer un message</h3>
              
              {submitted ? (
                <div className="form-success" style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'16px', padding:'24px', background:'rgba(16, 185, 129, 0.1)', border:'2px solid rgba(16, 185, 129, 0.3)', borderRadius:'12px'}}>
                  <div style={{fontSize:'2.5rem'}}>✓</div>
                  <div>
                    <div style={{fontWeight:'600', marginBottom:'8px'}}>Message envoyé avec succès!</div>
                    <p style={{marginBottom:'0', color:'var(--text-muted)', fontSize:'0.95rem'}}>Je vous répondrai dans les 24h.\nVous recevrez un accusé de réception à l\'adresse email fournie.</p>
                  </div>
                </div>
              ) : (
                <form id="contact-form" onSubmit={handleSubmit} noValidate>
                  {error && (
                    <div style={{padding:'12px', background:'rgba(239, 68, 68, 0.1)', border:'2px solid rgba(239, 68, 68, 0.3)', borderRadius:'8px', marginBottom:'16px', color:'#ef4444', fontSize:'0.9rem'}}>
                      ⚠ {error}
                    </div>
                  )}

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstname">Prénom *</label>
                      <input 
                        type="text" 
                        id="firstname" 
                        placeholder="Jean" 
                        value={formData.firstName}
                        onChange={handleInputChange}
                        disabled={loading}
                        style={fieldErrors.firstName ? {borderColor: '#ef4444'} : {}}
                      />
                      {fieldErrors.firstName && (
                        <span style={{color:'#ef4444', fontSize:'0.85rem', marginTop:'4px'}}>{fieldErrors.firstName}</span>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastname">Nom *</label>
                      <input 
                        type="text" 
                        id="lastname" 
                        placeholder="Dupont" 
                        value={formData.lastName}
                        onChange={handleInputChange}
                        disabled={loading}
                        style={fieldErrors.lastName ? {borderColor: '#ef4444'} : {}}
                      />
                      {fieldErrors.lastName && (
                        <span style={{color:'#ef4444', fontSize:'0.85rem', marginTop:'4px'}}>{fieldErrors.lastName}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email-contact">Email professionnel *</label>
                    <input 
                      type="email" 
                      id="email-contact" 
                      placeholder="jean.dupont@entreprise.com" 
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={loading}
                      style={fieldErrors.email ? {borderColor: '#ef4444'} : {}}
                    />
                    {fieldErrors.email && (
                      <span style={{color:'#ef4444', fontSize:'0.85rem', marginTop:'4px'}}>{fieldErrors.email}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="company">Entreprise</label>
                    <input 
                      type="text" 
                      id="company" 
                      placeholder="Nom de votre entreprise"
                      value={formData.company}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Objet *</label>
                    <select 
                      id="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      disabled={loading}
                      style={fieldErrors.subject ? {borderColor: '#ef4444'} : {}}
                    >
                      <option value="">Sélectionnez un objet...</option>
                      <option value="Proposition CDI Data Analyst">Proposition CDI Data Analyst</option>
                      <option value="Proposition CDI Data Engineer">Proposition CDI Data Engineer</option>
                      <option value="Mission Freelance / Consulting">Mission Freelance / Consulting</option>
                      <option value="Collaboration / Partenariat">Collaboration / Partenariat</option>
                      <option value="Autre">Autre</option>
                    </select>
                    {fieldErrors.subject && (
                      <span style={{color:'#ef4444', fontSize:'0.85rem', marginTop:'4px'}}>{fieldErrors.subject}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea 
                      id="message" 
                      placeholder="Décrivez votre opportunité ou votre projet data..." 
                      value={formData.message}
                      onChange={handleInputChange}
                      disabled={loading}
                      style={fieldErrors.message ? {borderColor: '#ef4444'} : {}}
                    ></textarea>
                    {fieldErrors.message && (
                      <span style={{color:'#ef4444', fontSize:'0.85rem', marginTop:'4px'}}>{fieldErrors.message}</span>
                    )}
                  </div>

                  <div style={{display:'flex', gap:'12px', marginTop:'24px'}}>
                    <button 
                      type="submit" 
                      className="form-submit"
                      disabled={loading}
                      style={{opacity: loading ? 0.6 : 1}}
                    >
                      {loading ? 'Envoi en cours...' : 'Envoyer le message'}
                    </button>
                    {!loading && (
                      <button 
                        type="button" 
                        onClick={resetForm}
                        style={{
                          padding:'12px 24px',
                          background:'transparent',
                          border:'1.5px solid rgba(59,130,246,0.3)',
                          borderRadius:'8px',
                          color:'var(--text)',
                          cursor:'pointer',
                          fontWeight:'500',
                          transition:'all 0.2s'
                        }}
                      >
                        Réinitialiser
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactPage
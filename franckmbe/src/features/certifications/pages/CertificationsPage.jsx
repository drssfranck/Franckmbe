import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useCVData } from '../../../hooks/useCVData'

const CertificationsPage = () => {
  const { t } = useTranslation()
  const cvData = useCVData()

  useEffect(() => {
    // Charger le script Credly pour afficher les badges
    const script = document.createElement('script')
    script.src = '//cdn.credly.com/assets/utilities/embed.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const credslyBadges = cvData.certifications?.filter(cert => cert.type === 'credly') || []
  const microsoftCerts = cvData.certifications?.filter(cert => cert.type === 'microsoft-learn') || []

  return (
    <section id="certifications" style={{background: 'var(--bg2)'}}>
      <div className="container">
        <div className="reveal" style={{marginBottom: '40px'}}>
          <div className="section-label">Certifications</div>
          <h2 className="section-title">
            Certifications
            <br />
            <span className="gradient-text">Professionnelles</span>
          </h2>
          <p className="section-desc">
            {t('i18n:lang') === 'fr' 
              ? 'Certifications officielles et reconnaissances de compétences dans les domaines du Cloud, Data Engineering et Business Intelligence.'
              : 'Official certifications and recognized credentials in Cloud, Data Engineering and Business Intelligence.'
            }
          </p>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', marginBottom: '48px'}}>
          {credslyBadges.map((cert, index) => (
            <div key={index} style={{display: 'flex', justifyContent: 'center'}}>
              <div
                data-iframe-width="150"
                data-iframe-height="270"
                data-share-badge-id={cert.id}
                data-share-badge-host="https://www.credly.com"
              ></div>
            </div>
          ))}
        </div>

        {microsoftCerts.length > 0 && (
          <div style={{background: 'rgba(59, 130, 246, 0.05)', border: '1.5px solid rgba(59, 130, 246, 0.2)', borderRadius: '12px', padding: '32px'}}>
            <h3 style={{fontFamily: 'var(--font-display)', fontWeight: '700', marginBottom: '16px'}}>
              {t('i18n:lang') === 'fr' ? 'Certificats Microsoft Learn' : 'Microsoft Learn Certificates'}
            </h3>
            <div style={{display: 'grid', gap: '16px'}}>
              {microsoftCerts.map((cert, index) => (
                <a
                  key={index}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '16px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1.5px solid rgba(59, 130, 246, 0.2)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)'
                    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.08)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)'
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
                  }}
                >
                  <div>
                    <div style={{fontWeight: '600', color: '#2563eb'}}>{cert.title}</div>
                    <div style={{fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px'}}>
                      ID: {cert.credential_id}
                    </div>
                  </div>
                  <div style={{fontSize: '1.5rem'}}>→</div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default CertificationsPage

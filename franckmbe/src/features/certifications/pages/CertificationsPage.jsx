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
          <div className="section-label">🌟 Certifications</div>
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

        {credslyBadges.length > 0 && (
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', marginBottom: '48px'}}>
            {credslyBadges.map((cert, index) => (
              <div key={index} style={{display: 'flex', justifyContent: 'center', animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`}}>
                <div
                  data-iframe-width="150"
                  data-iframe-height="270"
                  data-share-badge-id={cert.id}
                  data-share-badge-host="https://www.credly.com"
                ></div>
              </div>
            ))}
          </div>
        )}

        {microsoftCerts.length > 0 && (
          <div style={{background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%)', border: '2px solid rgba(59, 130, 246, 0.3)', borderRadius: '16px', padding: '40px', marginBottom: '32px'}}>
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
              <div style={{fontSize: '2rem', marginRight: '12px'}}>🏆</div>
              <h3 style={{fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '18px', margin: '0', color: 'var(--text-main)'}}>
                {t('i18n:lang') === 'fr' ? 'Certificats Microsoft Learn' : 'Microsoft Learn Certificates'}
              </h3>
            </div>
            <p style={{color: 'var(--text-muted)', marginBottom: '24px', fontSize: '14px'}}>
              {t('i18n:lang') === 'fr' 
                ? 'Certifications officielles Microsoft validant mes compétences en Data, Cloud et BI' 
                : 'Official Microsoft certifications validating my skills in Data, Cloud and BI'}
            </p>
            <div style={{display: 'grid', gap: '12px'}}>
              {microsoftCerts.map((cert, index) => (
                <a
                  key={index}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '20px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1.5px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: 'inherit',
                    backdropFilter: 'blur(4px)',
                    animation: `slideInRight 0.5s ease-out ${index * 0.1}s both`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.7)'
                    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.12)'
                    e.currentTarget.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)'
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                    e.currentTarget.style.transform = 'translateX(0)'
                  }}
                >
                  <div>
                    <div style={{fontWeight: '600', color: '#2563eb', fontSize: '14px'}}>✓ {cert.title}</div>
                    <div style={{fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px'}}>
                      {t('i18n:lang') === 'fr' ? 'Numéro' : 'ID'}: {cert.credential_id}
                    </div>
                  </div>
                  <div style={{fontSize: '1.5rem', color: '#2563eb', transition: 'transform 0.3s'}}>→</div>
                </a>
              ))}
            </div>
          </div>
        )}

        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>
      </div>
    </section>
  )
}

export default CertificationsPage

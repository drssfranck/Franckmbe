import React from 'react'
import { useTranslation } from 'react-i18next'
import { useCVData } from '../../../hooks/useCVData'
import { generateCVPdf } from '../../../lib/generateCVPdf'
import profileImage from '../../../assets/images/profile.jpg'

const CVPage = () => {
  const { t } = useTranslation()
  const { i18n } = useTranslation()
  const cvData = useCVData()
  // Extraire toutes les compétences de la structure categories
  const allSkills = []

  // Parcourir toutes les catégories de compétences
  if (cvData.skills && cvData.skills.categories) {
    cvData.skills.categories.forEach(category => {
      category.items.forEach(item => {
        allSkills.push(item.name)
      })
    })
  }

  const [showCV, setShowCV] = React.useState(false);
  
  const handleDownloadCV = async () => {
    try {
      await generateCVPdf(i18n.language);
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      alert('Erreur lors du téléchargement du CV');
    }
  };
  return (
    <section id="cv" style={{background: 'var(--bg2)'}}>
      <div className="container">
        {!showCV && (
          <div style={{textAlign:'center', padding:'48px 0'}}>
            <button className="btn-primary" style={{fontSize:'1.1rem', padding:'16px 32px'}} onClick={handleDownloadCV}>
              Télécharger mon CV
            </button>
          </div>
        )}
        {showCV && (
          <div className="cv-preview cv-print-only">
            <div className="cv-preview-header">
              <div className="cv-header-top">
                <div className="cv-avatar-section">
                  <img src={profileImage} alt={cvData.name} className="cv-avatar" />
                </div>
                <div className="cv-header-info">
                  <div className="cv-preview-name">{cvData.name}</div>
                  <div className="cv-preview-title">{cvData.title}</div>
                  <div className="cv-location-badge">{cvData.availability}</div>
                </div>
              </div>
              <div className="cv-contact-info">
                <span>✉ {cvData.email}</span>
                <span>📱 {cvData.phone}</span>
                <span>📍 {cvData.location}</span>
              </div>
            </div>
            <div className="cv-preview-body">
              <div className="cv-section-title">Profil</div>
              <p style={{fontSize:'0.8rem', color:'#374151', lineHeight:'1.6'}}>{cvData.profile}</p>

              <div className="cv-section-title">Expériences professionnelles</div>
              {cvData.experiences && cvData.experiences.map((exp, i) => (
                <div className="cv-entry" key={i}>
                  <div className="cv-entry-title">{exp.title} — {exp.company}</div>
                  <div className="cv-entry-sub">{exp.period} {exp.type ? `· ${exp.type}` : ''}</div>
                  {exp.missions && (
                    <ul style={{marginLeft:'1em', fontSize:'0.8rem', color:'#374151'}}>
                      {exp.missions.map((mission, j) => (
                        <li key={j}>{mission}</li>
                      ))}
                    </ul>
                  )}
                  {exp.technologies && (
                    <div style={{marginTop:'0.5em', fontSize:'0.75rem', color:'#2563eb'}}>
                      <strong>Technologies :</strong> {exp.technologies.join(', ')}
                    </div>
                  )}
                </div>
              ))}

              <div className="cv-section-title">Compétences</div>
              <div className="cv-skill-pills">
                {allSkills.map((skill, i) => (
                  <span className="cv-pill" key={i}>{skill}</span>
                ))}
              </div>

                <div className="cv-section-title">Certifications</div>
                <div style={{fontSize:'0.8rem', color:'#374151', lineHeight:'1.8'}}>
                  {cvData.certifications && cvData.certifications.map((cert, i) => (
                    <div key={i} style={{marginBottom:'0.8em'}}>
                      {cert.type === 'credly' && (
                        <div>
                          <strong>{cert.issuer}</strong> - {cert.displayText} (Credly)
                        </div>
                      )}
                      {cert.type === 'microsoft-learn' && (
                        <div>
                          <strong>{cert.issuer}</strong> - <a href={cert.url} target="_blank" rel="noopener noreferrer" style={{color:'#2563eb', textDecoration:'underline'}}>{cert.title}</a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="cv-section-title">Formation</div>
                {cvData.education && cvData.education.map((edu, i) => (
                  <div className="cv-entry" key={i}>
                    <div className="cv-entry-title">{edu.degree}</div>
                    <div className="cv-entry-sub">{edu.institution} {edu.period ? `· ${edu.period}` : ''}</div>
                  </div>
                ))}

                <div className="cv-section-title">Langues</div>
                <div className="cv-skill-pills">
                  {cvData.languages && cvData.languages.map((lang, i) => (
                    <span className="cv-pill" key={i}>{lang.language} · {lang.level}</span>
                  ))}
                </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default CVPage
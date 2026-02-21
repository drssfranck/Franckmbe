import { useTranslation } from 'react-i18next'
import { useCVData } from '../../../hooks/useCVData'

const CVPage = () => {
  const { t } = useTranslation()
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

  return (
    <section id="cv" style={{background: 'var(--bg2)'}}>
      <div className="container">
        <div className="reveal" style={{marginBottom:'56px'}}>
          <div className="section-label">{t('cv.sectionLabel')}</div>
          <h2 className="section-title">{t('cv.title')}<br/><span className="gradient-text">{t('cv.titleGradient')}</span></h2>
        </div>
        <div className="cv-container">
          {/* CV Preview */}
          <div className="reveal">
            <div className="cv-preview">
              <div className="cv-preview-header">
                <div className="cv-preview-name">{cvData.name}</div>
                <div className="cv-preview-title">{cvData.title} | Paris · {cvData.availability}</div>
                <div style={{marginTop:'10px', fontSize:'0.75rem', opacity:'0.7', display:'flex', gap:'16px', flexWrap:'wrap'}}>
                  <span>✉ {cvData.email}</span>
                  <span>📱 {cvData.phone}</span>
                  <span>📍 {cvData.location}</span>
                  <span>💼 {cvData.linkedin}</span>
                </div>
              </div>
              <div className="cv-preview-body">
                <div className="cv-section-title">{t('cv.profileSection')}</div>
                <p style={{fontSize:'0.8rem', color:'#374151', lineHeight:'1.6'}}>{cvData.profile}</p>

                <div className="cv-section-title">{t('cv.experienceSection')}</div>
                {cvData.experiences && cvData.experiences.slice(0, 3).map((exp, i) => (
                  <div className="cv-entry" key={i}>
                    <div className="cv-entry-title">{exp.title} — {exp.company}</div>
                    <div className="cv-entry-sub">{exp.period} · {exp.description}</div>
                  </div>
                ))}

                <div className="cv-section-title">{t('cv.skillsSection')}</div>
                <div className="cv-skill-pills">
                  {allSkills.map((skill, i) => (
                    <span className="cv-pill" key={i}>{skill}</span>
                  ))}
                </div>

                <div className="cv-section-title">{t('cv.educationSection')}</div>
                {cvData.education && cvData.education.slice(0, 2).map((edu, i) => (
                  <div className="cv-entry" key={i}>
                    <div className="cv-entry-title">{edu.degree}</div>
                    <div className="cv-entry-sub">{edu.school} · {edu.year}</div>
                  </div>
                ))}

                <div className="cv-section-title">{t('cv.languagesSection')}</div>
                <div className="cv-skill-pills">
                  {cvData.languages && cvData.languages.map((lang, i) => (
                    <span className="cv-pill" key={i}>{lang.name} · {lang.level}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CV Actions */}
          <div className="cv-actions reveal reveal-delay-2">
            <div className="cv-action-card">
              <div className="cv-action-icon">📄</div>
              <div className="cv-action-title">{t('cv.downloadPdfTitle')}</div>
              <div className="cv-action-desc">{t('cv.downloadPdfDesc')}</div>
              <a href="#" className="cv-dl-btn primary" onClick={(e) => { e.preventDefault(); window.print(); }}>{t('cv.downloadPdfBtn')}</a>
            </div>

            <div className="cv-action-card">
              <div className="cv-action-icon">🖨️</div>
              <div className="cv-action-title">{t('cv.printTitle')}</div>
              <div className="cv-action-desc">{t('cv.printDesc')}</div>
              <button className="cv-dl-btn secondary" onClick={() => window.print()}>{t('cv.printBtn')}</button>
            </div>

            <div className="cv-action-card">
              <div className="cv-action-icon">💼</div>
              <div className="cv-action-title">{t('cv.linkedinTitle')}</div>
              <div className="cv-action-desc">{t('cv.linkedinDesc')}</div>
              <a href="https://linkedin.com/in/imbe" target="_blank" className="cv-dl-btn secondary" rel="noopener">{t('cv.linkedinBtn')}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CVPage
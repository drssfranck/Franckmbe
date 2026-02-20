import cvData from '../../../data/cv.json'

const CVPage = () => {
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
          <div className="section-label">Mon CV</div>
          <h2 className="section-title">Curriculum<br/><span className="gradient-text">Vitae</span></h2>
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
                <div className="cv-section-title">Profil</div>
                <p style={{fontSize:'0.8rem', color:'#374151', lineHeight:'1.6'}}>{cvData.profile}</p>

                <div className="cv-section-title">Expériences</div>
                {cvData.experiences && cvData.experiences.slice(0, 3).map((exp, i) => (
                  <div className="cv-entry" key={i}>
                    <div className="cv-entry-title">{exp.title} — {exp.company}</div>
                    <div className="cv-entry-sub">{exp.period} · {exp.description}</div>
                  </div>
                ))}

                <div className="cv-section-title">Compétences</div>
                <div className="cv-skill-pills">
                  {allSkills.map((skill, i) => (
                    <span className="cv-pill" key={i}>{skill}</span>
                  ))}
                </div>

                <div className="cv-section-title">Formation</div>
                {cvData.education && cvData.education.slice(0, 2).map((edu, i) => (
                  <div className="cv-entry" key={i}>
                    <div className="cv-entry-title">{edu.degree}</div>
                    <div className="cv-entry-sub">{edu.school} · {edu.year}</div>
                  </div>
                ))}

                <div className="cv-section-title">Langues</div>
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
              <div className="cv-action-title">Télécharger le CV PDF</div>
              <div className="cv-action-desc">Version PDF optimisée ATS, prête à l'emploi pour les recruteurs et systèmes de suivi des candidatures.</div>
              <a href="#" className="cv-dl-btn primary" onClick={(e) => { e.preventDefault(); window.print(); }}>↓ Télécharger PDF</a>
            </div>

            <div className="cv-action-card">
              <div className="cv-action-icon">🖨️</div>
              <div className="cv-action-title">Imprimer le CV</div>
              <div className="cv-action-desc">Version imprimable directement depuis votre navigateur en format A4.</div>
              <button className="cv-dl-btn secondary" onClick={() => window.print()}>🖨 Imprimer</button>
            </div>

            <div className="cv-action-card">
              <div className="cv-action-icon">💼</div>
              <div className="cv-action-title">Profil LinkedIn</div>
              <div className="cv-action-desc">Consultez mon profil LinkedIn complet avec recommandations et historique détaillé.</div>
              <a href="https://linkedin.com/in/imbe" target="_blank" className="cv-dl-btn secondary" rel="noopener">→ Voir LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CVPage
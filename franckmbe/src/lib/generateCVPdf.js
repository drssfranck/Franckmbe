import cvDataFR from '../data/cv.json'
import cvDataEN from '../data/cv-en.json'

export async function generateCVPdf(lang = 'fr') {
  const cvData = lang === 'fr' ? cvDataFR : cvDataEN
  generateCVHTML(lang, cvData)
}

// Fonction pour générer le CV en HTML imprimable
function generateCVHTML(lang = 'fr', cvData) {
  // Générer toutes les catégories de compétences
  const skillsHtml = (cvData.skills.categories || []).map(cat => `
    <div style="margin-bottom: 10px;">
      <div style="font-weight: 600; color: #2c3e50; font-size: 12px; margin-bottom: 4px;">
        <span>${cat.icon || ''}</span> ${cat.name}
      </div>
      <div class="skills-container" style="margin-left: 0; display: flex; flex-wrap: wrap; gap: 6px;">
        ${(cat.items || []).map(item => `<span class="skill-item">${item.name} <span style='color:#2563eb;'>${item.level ? `(${item.level}/100)` : ''}</span></span>`).join('')}
      </div>
    </div>
  `).join('')

  // Générer les stages/expériences
  const experiencesHtml = cvData.experiences.map(exp => {
    const missionsList = exp.missions 
      ? `<ul class="missions">${exp.missions.slice(0, 2).map(m => `<li>${m}</li>`).join('')}</ul>`
      : ''
    const techTags = exp.technologies
      ? `<div class="tech-tags"><strong>${lang === 'fr' ? 'Tech:' : 'Tech:'}</strong> ${exp.technologies.join(', ')}</div>`
      : ''
    return `
      <div class="entry">
        <div class="entry-title">${exp.title} - ${exp.company}</div>
        <div class="entry-subtitle">${exp.period}${exp.type ? ' • ' + exp.type : ''}</div>
        ${missionsList}
        ${techTags}
      </div>
    `
  }).join('')

  // Générer les langues
  const languagesHtml = (cvData.skills.langues || []).map(langObj => 
    `<div class="lang-item"><strong>${langObj.language}:</strong> ${langObj.level}</div>`
  ).join('')
  // Générer la section intérêts
  const interestsSection = cvData.interests && cvData.interests.length > 0 ? `
    <div class="section">
      <div class="section-title">${lang === 'fr' ? 'CENTRES D’INTÉRÊT' : 'INTERESTS'}</div>
      <div style="display: flex; flex-wrap: wrap; gap: 10px;">
        ${cvData.interests.map(interest => `<span class="skill-item">${interest}</span>`).join('')}
      </div>
    </div>
  ` : ''

  // Générer la section objectifs de carrière
  const careerGoalSection = cvData.career_goal ? `
    <div class="section">
      <div class="section-title">${lang === 'fr' ? 'OBJECTIF DE CARRIÈRE' : 'CAREER GOAL'}</div>
      <div style="font-size:12px; margin-bottom:6px;">${lang === 'fr' ? 'Postes visés :' : 'Target positions:'} ${cvData.career_goal.position_targets.join(', ')}</div>
      <div style="font-size:12px; margin-bottom:6px;">${lang === 'fr' ? 'Localisation :' : 'Location:'} ${cvData.career_goal.location}</div>
      <div style="font-size:12px;">${lang === 'fr' ? 'Disponibilité :' : 'Start date:'} ${cvData.career_goal.start_date}</div>
    </div>
  ` : ''

  // Générer la section hero/stats
  const heroSection = cvData.hero ? `
    <div class="section">
      <div class="section-title">${lang === 'fr' ? 'STATS' : 'STATS'}</div>
      <div style="display: flex; flex-wrap: wrap; gap: 18px;">
        ${(cvData.hero.stats || []).map(stat => `<div class="skill-item"><strong>${stat.value}</strong> ${stat.label}</div>`).join('')}
      </div>
      <div style="margin-top:10px; font-size:12px; color:#2563eb;">${lang === 'fr' ? 'Stack technique :' : 'Tech stack:'} ${(cvData.hero.techStack || []).join(', ')}</div>
    </div>
  ` : ''

  const profileSection = cvData.profile ? `
    <div class="section">
      <div class="section-title">${lang === 'fr' ? 'PROFIL' : 'PROFILE'}</div>
      <p class="profile-text">${cvData.profile}</p>
    </div>
  ` : ''

  const certificationsSection = cvData.certifications && cvData.certifications.length > 0 ? `
    <div class="section">
      <div class="section-title" style="background: linear-gradient(90deg,#2563eb,#38bdf8); color: #fff;">${lang === 'fr' ? 'CERTIFICATIONS' : 'CERTIFICATIONS'} <span style="font-size:1.2em;">⭐</span></div>
      <div style="display: flex; flex-wrap: wrap; gap: 18px;">
        ${cvData.certifications.map(cert => `
          <div class="cert-highlight" style="flex:1; min-width:260px; background: #f0f7ff; border-left: 4px solid #2563eb; box-shadow: 0 2px 8px rgba(59,130,246,0.08);">
            <div style="font-weight:600; color:#2563eb; margin-bottom:4px;">${cert.title || cert.displayText}</div>
            <div style="font-size:12px; color:#374151; margin-bottom:4px;">${cert.issuer}</div>
            ${cert.credential_id ? `<div style="font-size:11px; color:#7f8c8d;">ID: ${cert.credential_id}</div>` : ''}
            ${cert.verification_url ? `<a href="${cert.verification_url}" target="_blank" style="color:#2563eb; text-decoration:underline; font-size:12px;">Vérifier la certification</a>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  ` : ''

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>CV - ${cvData.name}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.6; 
          color: #2c3e50;
          background: #f5f5f5;
          padding: 40px 20px;
        }
        .container { 
          max-width: 850px; 
          margin: 0 auto; 
          background: white;
          padding: 40px;
          box-shadow: 0 0 20px rgba(0,0,0,0.1);
          line-height: 1.5;
        }
        .header { 
          text-align: center; 
          border-bottom: 3px solid #2563eb; 
          padding-bottom: 30px; 
          margin-bottom: 30px;
        }
        .header h1 { 
          margin: 0; 
          font-size: 28px; 
          color: #2563eb;
          font-weight: 700;
        }
        .header .title {
          font-size: 18px;
          color: #38bdf8;
          margin-top: 5px;
          font-weight: 600;
        }
        .header .contact { 
          margin-top: 12px; 
          color: #555; 
          font-size: 11px;
          letter-spacing: 0.5px;
        }
        .contact-item {
          display: inline-block;
          margin: 0 15px;
        }
        .portfolio-link {
          display: inline-block;
          margin-top: 10px;
          font-size: 13px;
          color: #2563eb;
          text-decoration: underline;
          font-weight: 600;
        }
        .section { 
          margin-bottom: 25px; 
        }
        .section-title { 
          font-size: 13px; 
          font-weight: 700;
          color: #fff; 
          background: linear-gradient(90deg,#2563eb,#38bdf8); 
          padding: 10px 12px;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-radius: 6px;
        }
        .cert-highlight {
          background-color: #f0f7ff;
          border-left: 4px solid #2563eb;
          box-shadow: 0 2px 8px rgba(59,130,246,0.08);
          padding: 12px;
          margin: 8px 0;
          border-radius: 6px;
        }
        .cert-highlight strong {
          color: #2563eb;
          font-weight: 600;
        }
        .cert-icon {
          display: none;
        }
        .entry { 
          margin-bottom: 12px;
          page-break-inside: avoid;
        }
        .entry-title { 
          font-weight: 600;
          font-size: 12px;
          color: #2c3e50;
        }
        .entry-subtitle { 
          color: #7f8c8d; 
          font-size: 11px;
          margin-top: 3px;
        }
        .skills-container{
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .skill-item{
          display: inline-block;
          background-color: #ecf0f1;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 500;
          color: #2c3e50;
          border: 1px solid #bdc3c7;
        }
        .profile-text{
          font-size: 11px;
          line-height: 1.7;
          color: #34495e;
          text-align: justify;
        }
        .missions{
          margin: 8px 0 8px 20px;
          font-size: 11px;
          color: #2c3e50;
        }
        .missions li {
          margin-bottom: 4px;
          line-height: 1.5;
        }
        .tech-tags{
          margin-top: 6px;
          font-size: 10px;
          color: #2563eb;
        }
        .lang-item {
          display: inline-block;
          margin-right: 20px;
          font-size: 11px;
          margin-bottom: 6px;
        }
        .lang-item strong {
          color: #2c3e50;
        }
        @media print {
          body { 
            background: white; 
            padding: 0;
          }
          .container { 
            box-shadow: none; 
            padding: 40px;
            max-width: 100%;
          }
          .page-break {
            page-break-after: always;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${cvData.name}</h1>
          <div class="title">${cvData.title}</div>
          <div class="contact">
            <span class="contact-item">📧 ${cvData.email}</span>
            <span class="contact-item">📱 ${cvData.phone}</span>
            <span class="contact-item">📍 ${cvData.location}</span>
            <span class="contact-item">⚡ ${cvData.availability}</span>
          </div>
          <a href="${cvData.portfolio}" target="_blank" class="portfolio-link">Portfolio : ${cvData.portfolio}</a>
        </div>

        ${heroSection}
        ${profileSection}
        ${certificationsSection}
        <div class="section">
          <div class="section-title">${lang === 'fr' ? 'COMPÉTENCES' : 'SKILLS'}</div>
          <div class="skills-container">
            ${skillsHtml}
          </div>
        </div>
        <div class="section">
          <div class="section-title">${lang === 'fr' ? 'EXPÉRIENCES' : 'EXPERIENCE'}</div>
          ${experiencesHtml}
        </div>
        <div class="section">
          <div class="section-title">${lang === 'fr' ? 'LANGUES' : 'LANGUAGES'}</div>
          <div>
            ${languagesHtml}
          </div>
        </div>
        ${careerGoalSection}
        ${interestsSection}
      </div>
      <script>
        window.onload = function() {
          setTimeout(() => {
            window.print();
          }, 500);
        };
      </script>
    </body>
    </html>
  `
  
  const printWindow = window.open('', '', 'width=900,height=800')
  printWindow.document.write(htmlContent)
  printWindow.document.close()
}

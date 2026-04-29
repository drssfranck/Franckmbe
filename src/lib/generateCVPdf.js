import cvDataFR from '../data/cv.json'
import cvDataEN from '../data/cv-en.json'
import jsPDF from 'jspdf'

export async function generateCVPdf(lang = 'fr') {
  const cvData = lang === 'fr' ? cvDataFR : cvDataEN
  generateATSPdf(lang, cvData)
}

// ============================================================
// CV PDF — 100% ATS COMPATIBLE
// ============================================================
// Principes ATS respectés :
//  - Police standard (Helvetica)
//  - Pas de fond coloré, pas de graphiques, pas d'emojis
//  - Pas de colonnes multiples
//  - Pas de tableaux pour la mise en page
//  - Titres de sections en MAJUSCULES + trait de séparation
//  - Texte noir sur blanc uniquement (sauf liens bleus)
//  - Tout le texte est extractible et parsable
//  - Mots-clés techniques répétés naturellement
//  - Format A4, marges standard
// ============================================================

function generateATSPdf(lang = 'fr', cvData) {
  const pdf = new jsPDF('p', 'mm', 'a4')
  const W = pdf.internal.pageSize.getWidth()   // 210
  const H = pdf.internal.pageSize.getHeight()  // 297
  const M = 13  // marge gauche/droite
  const CW = W - 2 * M // largeur utile ~184mm
  let y = M

  // ── Helpers ──────────────────────────────────

  /** Trait noir fin sous le titre de section */
  const sectionTitle = (title) => {
    checkPage(22)
    y += 2
    pdf.setFontSize(10.5)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(0, 0, 0)
    pdf.text(title.toUpperCase(), M, y)
    y += 1.2
    pdf.setDrawColor(0, 0, 0)
    pdf.setLineWidth(0.35)
    pdf.line(M, y, W - M, y)
    y += 4
  }

  /** Vérifie s'il reste assez de place, sinon nouvelle page */
  const checkPage = (needed = 18) => {
    if (y > H - needed) {
      pdf.addPage()
      y = M
    }
  }

  // ═══════════════════════════════════════════════
  //  HEADER — NOM | TITRE | CONTACT
  // ═══════════════════════════════════════════════

  // Nom centré, gras
  pdf.setFontSize(22)
  pdf.setFont('helvetica', 'bold')
  pdf.setTextColor(0, 0, 0)
  pdf.text(cvData.name.toUpperCase(), W / 2, y, { align: 'center' })
  y += 7

  // Titre professionnel
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(50, 50, 50)
  pdf.text(cvData.title, W / 2, y, { align: 'center' })
  y += 6

  // Ligne de contact
  pdf.setFontSize(8.5)
  pdf.setFont('helvetica', 'normal')
  pdf.setTextColor(30, 30, 30)
  const contact = [cvData.email, cvData.phone, cvData.location, cvData.availability].filter(Boolean)
  pdf.text(contact.join('  |  '), W / 2, y, { align: 'center' })
  y += 5

  // Liens cliquables centrés
  pdf.setFontSize(8)
  const links = [
    { label: 'LinkedIn', url: cvData.linkedin },
    { label: 'GitHub', url: cvData.github },
    { label: 'Portfolio', url: cvData.portfolio }
  ].filter(l => l.url)

  const sep = '   |   '
  const fullLabel = links.map(l => l.label).join(sep)
  const fullW = pdf.getTextWidth(fullLabel)
  let lx = (W - fullW) / 2

  links.forEach((link, i) => {
    pdf.setTextColor(0, 0, 170)
    pdf.textWithLink(link.label, lx, y, { url: link.url })
    lx += pdf.getTextWidth(link.label)
    if (i < links.length - 1) {
      pdf.setTextColor(30, 30, 30)
      pdf.text(sep, lx, y)
      lx += pdf.getTextWidth(sep)
    }
  })
  y += 4

  // Séparateur header
  pdf.setDrawColor(0, 0, 0)
  pdf.setLineWidth(0.5)
  pdf.line(M, y, W - M, y)
  y += 5

  // ═══════════════════════════════════════════════
  //  PROFIL PROFESSIONNEL
  // ═══════════════════════════════════════════════
  if (cvData.profile) {
    sectionTitle(lang === 'fr' ? 'Profil professionnel' : 'Professional Summary')
    pdf.setFontSize(8.5)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(20, 20, 20)
    const pLines = pdf.splitTextToSize(cvData.profile, CW)
    pdf.text(pLines, M, y)
    y += pLines.length * 3.6 + 3
  }

  // ═══════════════════════════════════════════════
  //  EXPERIENCES PROFESSIONNELLES
  // ═══════════════════════════════════════════════
  sectionTitle(lang === 'fr' ? 'Experiences professionnelles' : 'Professional Experience')

  const exps = cvData.experiences || []
  exps.forEach((exp, idx) => {
    checkPage(30)

    // Titre poste — Entreprise  (gauche)   |  Période (droite)
    pdf.setFontSize(9.5)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(0, 0, 0)
    pdf.text(`${exp.title} - ${exp.company}`, M, y)

    pdf.setFontSize(8.5)
    pdf.setFont('helvetica', 'italic')
    pdf.setTextColor(70, 70, 70)
    const period = `${exp.period}${exp.type ? '  |  ' + exp.type : ''}`
    pdf.text(period, W - M, y, { align: 'right' })
    y += 4.5

    // Missions (tirets ATS-friendly)
    if (exp.missions && exp.missions.length > 0) {
      pdf.setFontSize(8)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(20, 20, 20)

      // Première expérience : 3 missions max, autres : 2
      const max = idx === 0 ? 3 : 2
      exp.missions.slice(0, max).forEach((m) => {
        checkPage(10)
        const lines = pdf.splitTextToSize(`- ${m}`, CW - 4)
        pdf.text(lines, M + 2, y)
        y += lines.length * 3.1 + 0.8
      })
    }

    // Environnement technique
    if (exp.technologies && exp.technologies.length > 0) {
      pdf.setFontSize(7.5)
      pdf.setFont('helvetica', 'italic')
      pdf.setTextColor(50, 50, 50)
      const tech = `Environnement technique : ${exp.technologies.join(', ')}`
      const tLines = pdf.splitTextToSize(tech, CW - 4)
      pdf.text(tLines, M + 2, y)
      y += tLines.length * 2.8 + 2.5
    }
    y += 1
  })

  // ═══════════════════════════════════════════════
  //  COMPETENCES TECHNIQUES
  // ═══════════════════════════════════════════════
  sectionTitle(lang === 'fr' ? 'Competences techniques' : 'Technical Skills')

  const cats = (cvData.skills && cvData.skills.categories) || []
  cats.forEach((cat) => {
    checkPage(8)
    pdf.setFontSize(8.5)
    pdf.setTextColor(0, 0, 0)

    // "Catégorie : skill1, skill2, skill3" — catégorie en bold, items en normal
    const catLabel = cat.name.replace(/[^\w\s&àâäéèêëïîôùûüÿçœæÀÂÄÉÈÊËÏÎÔÙÛÜŸÇŒÆ'()-]/g, '').trim()
    const items = (cat.items || []).map(i => i.name).join(', ')

    // Écrire catégorie en bold
    pdf.setFont('helvetica', 'bold')
    const catW = pdf.getTextWidth(catLabel + ' : ')
    pdf.text(catLabel + ' : ', M, y)

    // Écrire items en normal, wrap si nécessaire
    pdf.setFont('helvetica', 'normal')
    const itemLines = pdf.splitTextToSize(items, CW - catW)
    if (itemLines.length === 1) {
      pdf.text(itemLines[0], M + catW, y)
      y += 4
    } else {
      // Première ligne à côté de la catégorie
      pdf.text(itemLines[0], M + catW, y)
      y += 3.5
      // Lignes suivantes avec indentation
      for (let i = 1; i < itemLines.length; i++) {
        pdf.text(itemLines[i], M + 2, y)
        y += 3.5
      }
      y += 0.5
    }
  })

  // Soft skills
  if (cvData.skills && cvData.skills.soft_skills && cvData.skills.soft_skills.length > 0) {
    checkPage(8)
    const softLabel = lang === 'fr' ? 'Competences transversales' : 'Soft Skills'
    const softItems = cvData.skills.soft_skills.map(s => s.name).join(', ')

    pdf.setFontSize(8.5)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(0, 0, 0)
    const slW = pdf.getTextWidth(softLabel + ' : ')
    pdf.text(softLabel + ' : ', M, y)

    pdf.setFont('helvetica', 'normal')
    const sLines = pdf.splitTextToSize(softItems, CW - slW)
    if (sLines.length === 1) {
      pdf.text(sLines[0], M + slW, y)
    } else {
      pdf.text(sLines[0], M + slW, y)
      for (let i = 1; i < sLines.length; i++) {
        y += 3.5
        pdf.text(sLines[i], M + 2, y)
      }
    }
    y += 5
  }

  // ═══════════════════════════════════════════════
  //  CERTIFICATIONS — noms réels, cliquables
  // ═══════════════════════════════════════════════
  if (cvData.certifications && cvData.certifications.length > 0) {
    sectionTitle('Certifications')

    cvData.certifications.forEach((cert) => {
      checkPage(10)

      const name = cert.title || cert.displayText
      const url = cert.url || cert.verification_url
      const date = cert.date || ''

      // Nom de la certification — cliquable si URL
      pdf.setFontSize(8.5)
      pdf.setFont('helvetica', 'bold')
      if (url) {
        pdf.setTextColor(0, 0, 170)
        pdf.textWithLink(name, M + 2, y, { url: url })
      } else {
        pdf.setTextColor(0, 0, 0)
        pdf.text(name, M + 2, y)
      }

      // Date à droite
      if (date) {
        pdf.setFontSize(8)
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(70, 70, 70)
        pdf.text(date, W - M, y, { align: 'right' })
      }
      y += 3.8

      // Émetteur + credential ID
      pdf.setFontSize(7.5)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(70, 70, 70)
      let detail = cert.issuer || ''
      if (cert.credential_id) detail += '  |  ID: ' + cert.credential_id
      pdf.text(detail, M + 4, y)
      y += 4.5
    })
  }

  // ═══════════════════════════════════════════════
  //  FORMATION
  // ═══════════════════════════════════════════════
  if (cvData.education && cvData.education.length > 0) {
    sectionTitle(lang === 'fr' ? 'Formation' : 'Education')

    cvData.education.forEach((edu) => {
      checkPage(12)

      // Diplôme (gauche) | Période (droite)
      pdf.setFontSize(9)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(0, 0, 0)
      pdf.text(edu.degree, M, y)

      const per = edu.period || edu.year || ''
      pdf.setFontSize(8.5)
      pdf.setFont('helvetica', 'italic')
      pdf.setTextColor(70, 70, 70)
      pdf.text(per, W - M, y, { align: 'right' })
      y += 4

      // Établissement + statut
      const inst = edu.institution || edu.school || ''
      pdf.setFontSize(8.5)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(30, 30, 30)
      let line = inst
      if (edu.status) line += `  (${edu.status})`
      pdf.text(line, M + 2, y)
      y += 5
    })
  }

  // ═══════════════════════════════════════════════
  //  LANGUES
  // ═══════════════════════════════════════════════
  if (cvData.skills && cvData.skills.langues && cvData.skills.langues.length > 0) {
    sectionTitle(lang === 'fr' ? 'Langues' : 'Languages')
    pdf.setFontSize(8.5)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(20, 20, 20)
    const langLine = cvData.skills.langues.map(l => `${l.language} (${l.level})`).join('  |  ')
    pdf.text(langLine, M, y)
    y += 5
  }

  // ═══════════════════════════════════════════════
  //  CENTRES D'INTERET
  // ═══════════════════════════════════════════════
  if (cvData.interests && cvData.interests.length > 0) {
    sectionTitle(lang === 'fr' ? "Centres d'interet" : 'Interests')
    pdf.setFontSize(8.5)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(20, 20, 20)
    pdf.text(cvData.interests.join(', '), M, y)
    y += 5
  }

  // ── Téléchargement ──
  pdf.save(`CV_${cvData.name.replace(/\s/g, '_')}_${lang.toUpperCase()}.pdf`)
}

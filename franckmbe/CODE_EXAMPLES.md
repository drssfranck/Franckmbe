# 💡 EXEMPLES DE CODE & BEST PRACTICES

Référence rapide pour maintenir votre portfolio avec excellence.

---

## ✨ PATTERNS RECOMMANDÉS

### 1. Ajouter une nouvelle section

```jsx
// features/mysection/pages/MySectionPage.jsx
import { useTranslation } from 'react-i18next'

const MySectionPage = () => {
  const { t } = useTranslation()

  return (
    <section id="mysection">
      <div className="container">
        {/* En-tête */}
        <div className="reveal" style={{marginBottom: 'var(--4xl)'}}>
          <div className="section-label">{t('mysection.label')}</div>
          <h2 className="section-title">
            {t('mysection.title')}<br/>
            <span className=\"gradient-text\">{t('mysection.titleGradient')}</span>
          </h2>
          <p className=\"section-desc\">{t('mysection.description')}</p>
        </div>

        {/* Contenu */}
        <div className=\"my-grid\">
          {/* Vos items */}
        </div>
      </div>
    </section>
  )
}

export default MySectionPage
```

**CSS correspondant:**

```css
#mysection {
  background: var(--bg2);
}

.my-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--lg);
}

.my-card {
  background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(59,130,246,0.01));
  border: 1.5px solid rgba(59,130,246,0.1);
  border-radius: var(--radius-lg);
  padding: var(--2xl);
  transition: all var(--transition-lg);
  backdrop-filter: blur(10px);
}

.my-card:hover {
  border-color: rgba(59,130,246,0.3);
  background: linear-gradient(135deg, rgba(59,130,246,0.06), rgba(6,182,212,0.02));
  transform: translateY(-4px);
  box-shadow: var(--shadow-lift-lg);
}

/* Responsive */
@media (max-width: 768px) {
  .my-grid {
    grid-template-columns: 1fr;
  }
}
```

---

### 2. Ajouter une carte avec contenu

```jsx
// Composant réutilisable
const MyCard = ({ icon, title, description, link }) => {
  return (
    <div className="my-card">
      <div className="card-icon">{icon}</div>
      <h3 style={{marginBottom: 'var(--sm)'}}>{title}</h3>
      <p className="caption">{description}</p>
      {link && <a href={link} className="btn-secondary">En savoir plus</a>}
    </div>
  )
}
```

```css
.card-icon {
  font-size: 2.5rem;
  margin-bottom: var(--lg);
}
```

---

### 3. Formulaire cohérent

```jsx
<form className="contact-form">
  <div className="form-row">
    <div className="form-group">
      <label htmlFor="name">Votre nom</label>
      <input 
        id="name"
        type="text" 
        placeholder="Jean Dupont"
      />
    </div>
    <div className="form-group">
      <label htmlFor="email">Email</label>
      <input 
        id="email"
        type="email" 
        placeholder="jean@example.com"
      />
    </div>
  </div>
  <div className="form-group">
    <label htmlFor="message">Message</label>
    <textarea 
      id="message"
      placeholder="Votre message..."
    ></textarea>
  </div>
  <button className="form-submit">Envoyer</button>
</form>
```

**Styles CSS (déjà inclus):**
```css
.contact-form          /* Container */
.form-row              /* 2 col layout */
.form-group            /* Field wrapper */
.form-group label      /* Field label */
.form-group input      /* Focus states inclus */
.form-submit           /* Primary button */
```

---

## 🎨 SPACING PATTERNS

```jsx
{/* Très compact: badges, petits éléments */}
<div style={{gap: 'var(--xs)'}}>

{/* Compact: items dans une liste */}
<div style={{gap: 'var(--sm)'}}>

{/* Standard: conteneur normal */}
<div style={{gap: 'var(--md)'}}>

{/* Spacieux: groupes/sections */}
<div style={{gap: 'var(--lg)'}}>

{/* Très spacieux: sections majeures */}
<div style={{gap: 'var(--2xl)'}}>

{/* Énorme: sections + padding */}
<div style={{padding: 'var(--4xl) 0'}}>
```

**Pattern à respecter TOUJOURS:**
```css
/* ❌ À ÉVITER */
padding: 20px;
margin-bottom: 30px;
gap: 16px;

/* ✅ À FAIRE */
padding: var(--lg);
margin-bottom: var(--xl);
gap: var(--md);
```

---

## 📱 RESPONSIVE PATTERNS

### Grids adaptatifs

```css
/* Auto-fit: réduit colonnes sur petit écran */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--lg);
}

/* Encore plus petit écran: force 1 col */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

### Layouts flexibles

```css
/* 2 colonnes → 1 colonne sur mobile */
.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--4xl);
}

@media (max-width: 1024px) {
  .two-col {
    grid-template-columns: 1fr;
    gap: var(--2xl);
  }
}
```

### Font sizes adaptatifs

```css
/* Utiliser clamp() pour fluide typography */
h1 {
  font-size: clamp(1.8rem, 5vw, 3.5rem);
  /* Min: 1.8rem | Preferred: 5% viewport | Max: 3.5rem */
}

h2 {
  font-size: clamp(1.4rem, 4vw, 2.8rem);
}

section {
  padding: clamp(2rem, 10vw, 5rem) 0;
  /* Padding adaptatif: 2rem min → 5rem max */
}
```

---

## 🎭 ANIMATION PATTERNS

### Hover states cohérents

```css
/* Cartes */
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lift-lg);
  transition: all var(--transition-lg);
}

/* Texte */
.link:hover {
  color: var(--accent);
  transition: color var(--transition);
}

/* Boutons */
.button:hover {
  background: var(--accent);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lift);
  transition: all var(--transition);
}
```

### Reveal animations

```jsx
{/* Reveal au scroll */}
<div className="reveal">
  <h2>Appears smoothly</h2>
</div>

{/* Avec délai */}
<div className="reveal reveal-delay-1">...</div>
<div className="reveal reveal-delay-2">...</div>
<div className="reveal reveal-delay-3">...</div>
```

```css
/* CSS (déjà inclus) */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1),
              transform 0.7s cubic-bezier(0.4,0,0.2,1);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## ♿ ACCESSIBILITY PATTERNS

### HTML Sémantique

```html
<!-- ✅ BON -->
<section id="projects">
  <h2>Mes Projets</h2>
  <article>
    <h3>Projet 1</h3>
    <p>Description</p>
  </article>
</section>

<!-- ❌ MAUVAIS -->
<div id="projects">
  <div>Mes Projets</div>
  <div>
    <div>Projet 1</div>
    <div>Description</div>
  </div>
</div>
```

### ARIA Attributes

```jsx
{/* Bouton avec label */}
<button 
  onClick={toggleMenu}
  aria-label="Ouvrir le menu"
  aria-expanded={isOpen}
>
  ☰
</button>

{/* Status badge */}
<div role="status" aria-live="polite">
  Disponible dès septembre
</div>

{/* Navigation */}
<nav aria-label="Navigation principale">
  <a href="#home" aria-current="page">Accueil</a>
</nav>
```

### Focus states

```css
/* TOUJOURS inclure focus states */
button:focus,
a:focus,
input:focus {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Ou utilisez box-shadow */
input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
}
```

### Color contrast

```css
/* Vérifier ratio 4.5:1 min (WCAG AA) */
--text: #e8eaf0        /* Sur --bg #080c14 = 11.2:1 ✅ */
--text-muted: #7a8299  /* Sur --bg #080c14 = 4.8:1 ✅ */
--text-dim: #4a5270    /* Sur --bg #080c14 = 3.2:1 ⚠️ (secondary only) */
```

---

## 🔄 WORKFLOW GIT

### Avant de commiter

```bash
# 1. Vérifier que tout compile
npm run build

# 2. Vérifier pas d'erreurs
npm run lint  # Si vous avez ESLint

# 3. Tester responsive
# Ouvrir DevTools, tester <480px, 480-768px, 768-1024px, >1024px

# 4. Commiter avec message clair
git add .
git commit -m "feat: add new section with responsive layout"
# 🎨 design: improve typography hierarchy
# ♿ a11y: add aria-labels to navigation
# 📱 responsive: optimize mobile spacing
```

---

## 🚀 DEPLOYMENT CHECKLIST

Avant de déployer:

```
□ Teste fonctionnellement sur tous les écrans
□ Lighthouse score > 85
□ Pas de console errors
□ Images optimisées (<200KB chacune)
□ Google Fonts chargées correctement
□ Dark/Light mode fonctionne
□ Tous les liens fonctionnent
□ Formulaires testés
□ SEO meta tags présents
□ Favicon configuré
□ Analytics setup (si needed)
```

---

## 📊 PERFORMANCE TIPS

### Fonts
```css
/* Déjà optimisé: */
- Charger SEULEMENT Syne 700/800 (non 400)
- Charger SEULEMENT DM Sans 400/500/600
- font-display: swap activé
```

### Images
```jsx
/* À implémenter si possible */
import Image from 'next/image'  // Si Nextjs

<Image 
  src="/hero.jpg"
  alt="Description"
  width={800}
  height={600}
  priority={true}  // Hero image
/>
```

### CSS
```css
/* Éviter */
✗ @import autres fichiers (cascade)
✗ Vendor prefixes inutiles (autoprefixer gère)
✗ !important (spécificité)

/* Préférer */
✓ CSS variables (--color-primary)
✓ Logical properties (padding-inline vs padding-left)
✓ Modern CSS (grid, flexbox, clamp, etc)
```

---

## 📚 RESSOURCES RAPIDES

```
CSS Variables:
  MDN: https://mdn.io/css-custom-properties
  
Design Tokens:
  Tokens Studio: https://tokens.studio/
  
Responsive:
  Container Queries: https://web.dev/container-queries/
  
Accessibility:
  WCAG Contrast: https://www.tpgi.com/color-contrast-checker/
  ARIA Guide: https://www.w3.org/WAI/ARIA/apg/
  
Typography:
  Fontpair: https://www.fontpair.co/
  What Font: https://www.whatfontis.com/
  
Performance:
  WebVitals: https://web.dev/vitals/
  Lighthouse: https://developers.google.com/web/tools/lighthouse
```

---

## 🎓 QUIZ D'AUTO-VÉRIFICATION

1. **Où modifier la taille de police de tous les titres?**
   - R: Dans les rules `h1, h2, h3` (App.css)

2. **Comment ajouter 16px de margin à un élément?**
   - R: `margin: var(--md)` (JAMAIS px direct)

3. **Sur quel écran faut-il tester les dégâts?**
   - R: <480px réel (pas DevTools), 768px, 1024px+

4. **Quel est le breakpoint tablet?**
   - R: 768px-1024px (media query: 481px à 1024px)

5. **Comment s'appelle le système typographique utilisé?**
   - R: Échelle harmonieuse 1.125^n

---

## ✅ RÉSUMÉ MAINTENANCE

```
✨ Utilisez TOUJOURS les variables CSS
✨ Resp ectez mobile-first (min-width)
✨ Testez sur appareils réels
✨ Maintenez la cohérence design
✨ Documentez les changements
✨ Vérifiez l'accessibilité
✨ Optimisez les performances

Votre portfolio est prêt pour evoluer en professionnel! 🚀
```

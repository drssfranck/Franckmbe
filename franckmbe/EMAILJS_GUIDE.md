# 📧 Guide Intégration EmailJS

## 🎯 Qu'est-ce qu'EmailJS ?

EmailJS permet d'envoyer des emails directement depuis votre application React **sans backend**. C'est un service cloud qui gère :
- L'envoi des emails
- Les templates personnalisés
- Les accusés de réception automatiques

## ✅ Configuration Actuelle

Tes identifiants EmailJS sont configurés :
- **SERVICE_ID**: `service_mq4y0kq`
- **TEMPLATE_NOTIFICATION**: `template_20ijmui` (email vers TOI)
- **TEMPLATE_AUTOREPLY**: `template_1yfdfdq` (accusé de réception au visiteur)
- **PUBLIC_KEY**: `jcTItw5fHQQrBxtKj`

## 📋 Variables du Formulaire

Tes templates EmailJS utilisent ces variables :

```
first_name       → Prénom du visiteur
last_name        → Nom du visiteur
email            → Email du visiteur
company          → Entreprise du visiteur
subject          → Sujet de la demande
message          → Message du visiteur
to_email         → Destinataire (toi ou le visiteur selon le template)
```

## 🚀 Comment Ça Fonctionne

### 1. **Visiteur remplit le formulaire**
```
Jean Dupont
jean@example.com
Tech Solutions
Proposition CDI Data Analyst
Nous cherchons un data analyst...
```

### 2. **Au clic sur "Envoyer"**
- ✅ Validation des champs obligatoires
- ⏳ Loader s'affiche
- 📧 Deux emails sont envoyés en parallèle :
  - **Email #1**: Notification vers TOI (franck@example.com) avec tous les détails
  - **Email #2**: Accusé de réception vers le visiteur (jean@example.com)

### 3. **Résultats**
- ✓ Message de succès affiché
- 🔄 Formulaire réinitialisé après 3 secondes
- ⚠️ Message d'erreur si problème (mauvaise config, limite EmailJS, etc.)

## 🔧 Installation & Setup

### Déjà fait ✅
- `@emailjs/browser` installé
- Service EmailJS créé: `src/services/emailService.js`
- ContactPage.jsx mis à jour
- Validation complète
- Gestion d'erreurs

### À vérifier

1. **Crée compte EmailJS** (si pas déjà fait)
   - https://www.emailjs.com/
   - Connecte avec email/GitHub

2. **Vérifie ton email** dans EmailJS
   - Service → Vérification SMTP
   - Ajoute un email "From Address" (ton email)

3. **Configure tes Templates** (normalement déjà fait)
   - **Template Notification**: Reçoit les détails du visiteur
   - **Template Auto-reply**: Accusé de réception en réponse au visiteur

4. **Variables dans tes templates EmailJS**
   - Utilise `{{first_name}}`, `{{last_name}}`, `{{email}}`, etc.
   - Exemple pour le template notification:
   ```
   Subject: Nouveau message de {{first_name}} {{last_name}}
   
   Prénom: {{first_name}}
   Nom: {{last_name}}
   Email: {{email}}
   Entreprise: {{company}}
   Sujet: {{subject}}
   
   Message:
   {{message}}
   ```

## 🧪 Test du Formulaire

1. Remplis tous les champs:
   - Prénom: Jean
   - Nom: Dupont
   - Email: jean@example.com
   - Entreprise: Test Corp
   - Sujet: Proposition CDI Data Analyst
   - Message: Nous cherchons un data analyst pour notre équipe...

2. Clique sur "Envoyer le message"

3. Attends la confirmation ✓

4. Vérifie:
   - ✉️ Email reçu dans TON adresse email
   - ✉️ Accusé de réception reçu dans jean@example.com
   - ✉️ Les données sont correctes

## 🛡️ Sécurité

- **PUBLIC_KEY**: Visible en frontal (c'est normal, c'est une clé publique)
- **Limite gratuite EmailJS**: 200 emails/mois
- **Protection**: Validation côté client + côté EmailJS

## 📊 Limites et Quotas

- **Plan Gratuit**: 200 emails/mois
- **Fréquence**: Max 1 email par 5 secondes par IP
- **Template limitations**: Max 50 templates

## ⚠️ Troubleshooting

### "Message d'erreur: Invalid Service ID"
→ Vérife que SERVICE_ID dans .env.local est correct

### "Erreur: Template not found"
→ Vérife les IDs des templates dans EmailJS Dashboard

### "Erreur: Invalid sender email"
→ Configure une "From Address" vérifiée dans EmailJS

### "Formulaire ne s'envoie pas"
1. Ouvre la console (F12)
2. Cherche les messages d'erreur
3. Copie l'erreur et vérifie la config EmailJS

## 📝 Code Modifié

- **`src/services/emailService.js`**: Nouveau fichier avec logique EmailJS
- **`src/features/contact/pages/ContactPage.jsx`**: Mise à jour du formulaire
- **`.env.local`**: Variables d'environnement
- **`.env.example`**: Template pour d'autres devs

## 🎓 Fonctionnalités Incluses

✅ Envoi du mail vers le propriétaire du portfolio
✅ Accusé de réception automatique
✅ Validation des champs obligatoires
✅ Messages d'erreur par champ
✅ Loader pendant l'envoi
✅ Message de succès
✅ Gestion complète des erreurs
✅ Reset du formulaire
✅ Support des variables d'environnement
✅ Production-ready

## 🚀 Prochaines Étapes (Optionnel)

1. **Ajouter reCAPTCHA** pour anti-spam
   ```javascript
   import ReCAPTCHA from "react-google-recaptcha"
   ```

2. **Stocker les messages** en base de données
   - Créer une API backend (Node.js/Python)
   - Sauvegarder dans MongoDB/PostgreSQL

3. **Analytics**
   - Tracker quand des messages sont envoyés
   - Analyser les sources (quelle page renvoie le plus de contacts)

4. **Notification en temps réel**
   - Webhook pour la notification mobile/Slack

## 📞 Support EmailJS

- Docs: https://www.emailjs.com/docs/
- FAQ: https://www.emailjs.com/faq/
- Community: https://github.com/emailjs/emailjs-sdk

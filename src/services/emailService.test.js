// Test EmailJS - Utilise ce code pour tester l'intégration
// Copie-colle dans la console du navigateur après avoir rempli le formulaire

// Exemple d'une soumission réussie :
// ✅ Visiteur remplit le formulaire
// ✅ Validation passe
// ✅ Loader s'affiche
// ✅ 2 emails sont envoyés (notification + auto-reply)
// ✅ Message de succès
// ✅ Formulaire se réinitialise

const testEmailJS = async () => {
  const { sendContactEmail, validateContactForm } = await import('./src/services/emailService.js')

  // Données de test
  const testData = {
    firstName: "Test",
    lastName: "User",
    email: "test@example.com",
    company: "Test Company",
    subject: "Test Subject",
    message: "Ceci est un message de test pour vérifier que EmailJS fonctionne correctement.",
    portfolioEmail: "drssfranck@gmail.com"
  }

  console.log('📋 Test data:', testData)

  // Validation
  const validation = validateContactForm(testData)
  console.log('✅ Validation:', validation.valid, validation.errors)

  if (!validation.valid) {
    console.error('❌ Erreurs de validation:', validation.errors)
    return
  }

  try {
    console.log('📤 Envoi en cours...')
    const result = await sendContactEmail(testData)
    console.log('✅ Succès:', result)
  } catch (err) {
    console.error('❌ Erreur:', err)
  }
}

// Lance le test
// testEmailJS()

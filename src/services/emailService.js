import emailjs from '@emailjs/browser'

// Configuration EmailJS - Utiliser les variables d'environnement
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_mq4y0kq'
const TEMPLATE_NOTIFICATION = import.meta.env.VITE_EMAILJS_TEMPLATE_NOTIFICATION || 'template_20ijmui'
const TEMPLATE_AUTOREPLY = import.meta.env.VITE_EMAILJS_TEMPLATE_AUTOREPLY || 'template_1yfdfdq'
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'jcTItw5fHQQrBxtKj'

// Initialiser EmailJS une seule fois
emailjs.init({
  publicKey: PUBLIC_KEY,
  blockHeadless: true
})

/**
 * Envoyer un email de contact via EmailJS
 * @param {Object} formData - Données du formulaire
 * @returns {Promise<Object>} Réponse de EmailJS
 */
export const sendContactEmail = async (formData) => {
  try {
    // 1. Envoyer la notification au propriétaire du portfolio
    const notificationPromise = emailjs.send(
      SERVICE_ID,
      TEMPLATE_NOTIFICATION,
      {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        company: formData.company || 'Non spécifiée',
        subject: formData.subject,
        message: formData.message,
        // Variables supplémentaires utiles
        to_email: formData.portfolioEmail // Email du propriétaire
      }
    )

    // 2. Envoyer un accusé de réception au visiteur
    const autoreplyPromise = emailjs.send(
      SERVICE_ID,
      TEMPLATE_AUTOREPLY,
      {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        company: formData.company || 'Non spécifiée',
        subject: formData.subject,
        message: formData.message,
        // Email du visiteur
        to_email: formData.email
      }
    )

    // Attendre les deux emails
    const [notificationResponse, autoreplyResponse] = await Promise.all([
      notificationPromise,
      autoreplyPromise
    ])

    return {
      success: true,
      notificationId: notificationResponse.status,
      autoreplyId: autoreplyResponse.status,
      message: 'Email envoyé avec succès'
    }
  } catch (error) {
    console.error('Erreur EmailJS:', error)
    throw {
      success: false,
      message: error.text || 'Erreur lors de l\'envoi de l\'email',
      error
    }
  }
}

/**
 * Valider les données du formulaire
 * @param {Object} formData - Données du formulaire
 * @returns {Object} Objet {valid: boolean, errors: {}}
 */
export const validateContactForm = (formData) => {
  const errors = {}

  // Validation prénom
  if (!formData.firstName?.trim()) {
    errors.firstName = 'Le prénom est obligatoire'
  }

  // Validation nom
  if (!formData.lastName?.trim()) {
    errors.lastName = 'Le nom est obligatoire'
  }

  // Validation email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.email?.trim()) {
    errors.email = 'L\'email est obligatoire'
  } else if (!emailRegex.test(formData.email)) {
    errors.email = 'L\'email n\'est pas valide'
  }

  // Validation sujet
  if (!formData.subject?.trim()) {
    errors.subject = 'Le sujet est obligatoire'
  }

  // Validation message
  if (!formData.message?.trim()) {
    errors.message = 'Le message est obligatoire'
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Le message doit contenir au moins 10 caractères'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  }
}

export default {
  sendContactEmail,
  validateContactForm
}

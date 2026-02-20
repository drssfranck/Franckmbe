import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layout/Layout'

// Gestionnaire d'erreur pour les routes inexistantes
const ErrorPage = () => {
  // Rediriger vers la page d'accueil
  window.location.href = '/'
  return null
}

// Création du router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />
  },
  {
    path: '*',
    element: <ErrorPage />
  }
])

// Export par défaut (UN SEUL EXPORT)
export default router
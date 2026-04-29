import { RouterProvider } from 'react-router-dom'
import router from './router'  // Changement ici : import par défaut
import { ThemeProvider } from '../hooks/useTheme'
import '../i18n/i18n'
import './App.css'
import './cv-print.css'

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
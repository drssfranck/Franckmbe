import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { ThemeProvider } from '../hooks/useTheme'
import '../i18n/i18n'

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
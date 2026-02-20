import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import HomePage from '../features/home/pages/HomePage'
import AboutPage from '../features/about/pages/AboutPage'
import SkillsPage from '../features/skills/pages/SkillsPage'
import ExperiencePage from '../features/experience/pages/ExperiencePage'
import ProjectsPage from '../features/projects/pages/ProjectsPage'
import ServicesPage from '../features/services/pages/ServicesPage'
import EducationPage from '../features/education/pages/EducationPage'
import ContactPage from '../features/contact/pages/ContactPage'
import CVPage from '../features/cv/pages/CVPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'skills', element: <SkillsPage /> },
      { path: 'experience', element: <ExperiencePage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'education', element: <EducationPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'cv', element: <CVPage /> },
    ]
  }
])
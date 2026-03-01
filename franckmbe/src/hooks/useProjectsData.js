import { useTranslation } from 'react-i18next'
import projectsFR from '../data/projects.json'
import projectsEN from '../data/projects-en.json'

export const useProjectsData = () => {
  const { i18n } = useTranslation()
  return i18n.language === 'en' ? projectsEN : projectsFR
}

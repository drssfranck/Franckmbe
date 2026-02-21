import { useTranslation } from 'react-i18next'
import cvDataFR from '../data/cv.json'
import cvDataEN from '../data/cv-en.json'

export const useCVData = () => {
  const { i18n } = useTranslation()
  return i18n.language === 'en' ? cvDataEN : cvDataFR
}

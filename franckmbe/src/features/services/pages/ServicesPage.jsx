import { useTranslation } from 'react-i18next'
import { useCVData } from '../../../hooks/useCVData'

const ServicesPage = () => {
  const { t } = useTranslation()
  const cvData = useCVData()
  const services = cvData.services || []

  return (
    <section id="services">
      <div className="container">
        <div className="reveal" style={{marginBottom:'56px'}}>
          <div className="section-label">{t('services.sectionLabel')}</div>
          <h2 className="section-title">{t('services.title')}<br/><span className="gradient-text">{t('services.titleGradient')}</span></h2>
          <p className="section-desc">{t('services.description')}</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div
              className={`service-card reveal ${index === 1 ? 'reveal-delay-1' : index === 2 ? 'reveal-delay-2' : index === 3 ? 'reveal-delay-3' : ''}`}
              key={index}
            >
              <div className="service-icon" style={{background: service.color}}>{service.icon}</div>
              <div className="service-title">{service.title}</div>
              <div className="service-desc">{service.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesPage
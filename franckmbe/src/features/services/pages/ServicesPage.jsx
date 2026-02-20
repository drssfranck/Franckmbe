import cvData from '../../../data/cv.json'

const ServicesPage = () => {
  const services = cvData.services || []

  return (
    <section id="services">
      <div className="container">
        <div className="reveal" style={{marginBottom:'56px'}}>
          <div className="section-label">Consulting & Services</div>
          <h2 className="section-title">Ce que je<br/><span className="gradient-text">peux apporter</span></h2>
          <p className="section-desc">En complément d'un CDI, je propose des services de consulting data aux PME et startups.</p>
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
const ServicesPage = () => {
  const services = [
    {
      icon: '📊',
      title: 'Création de Dashboards BI',
      description: 'Conception et développement de tableaux de bord interactifs Power BI ou Tableau pour piloter votre activité avec des KPI clés, adaptés à vos équipes métier.',
      color: 'rgba(59,130,246,0.12)'
    },
    {
      icon: '🔄',
      title: 'Pipelines ETL & Data Ingestion',
      description: 'Conception et automatisation de pipelines ETL pour centraliser vos données depuis multiple sources (CRM, ERP, APIs) vers votre entrepôt de données.',
      color: 'rgba(16,185,129,0.12)'
    },
    {
      icon: '🐍',
      title: 'Analyse & Scripts Python',
      description: 'Développement de scripts Python pour automatiser l\'analyse, le nettoyage et la transformation de données, avec rapports automatisés.',
      color: 'rgba(245,158,11,0.12)'
    },
    {
      icon: '☁️',
      title: 'Architecture Cloud Data',
      description: 'Mise en place d\'architectures data cloud sur Azure (Data Lake, Synapse, Fabric) adaptées à la taille de votre organisation.',
      color: 'rgba(139,92,246,0.12)'
    },
    {
      icon: '🎯',
      title: 'Audit & Conseil Data',
      description: 'Évaluation de votre maturité data, identification des opportunités d\'amélioration et recommandations stratégiques pour valoriser vos données.',
      color: 'rgba(239,68,68,0.12)'
    },
    {
      icon: '👥',
      title: 'Formation Équipes Métier',
      description: 'Formation et accompagnement de vos équipes à la culture data, aux outils BI et à l\'analyse autonome de données pour gagner en autonomie.',
      color: 'rgba(6,182,212,0.12)'
    }
  ]

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
import cvData from '../../../data/cv.json'

const EducationPage = () => {
  return (
    <section id="education" style={{background: 'var(--bg2)'}}>
      <div className="container">
        <div className="reveal" style={{marginBottom:'48px'}}>
          <div className="section-label">Formation</div>
          <h2 className="section-title">Parcours<br/><span className="gradient-text">Académique</span></h2>
        </div>
        <div className="edu-grid">
          {cvData.education.map((edu, index) => (
            <div
              className={`edu-card reveal ${index === 1 ? 'reveal-delay-1' : index === 2 ? 'reveal-delay-2' : ''}`}
              key={index}
            >
              <div className="edu-year">{edu.year}</div>
              <div className="edu-degree">{edu.degree}</div>
              <div className="edu-school">{edu.school}</div>
              {edu.status && (
                <div className="edu-current">
                  <div className="available-dot"></div>
                  {edu.status}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EducationPage
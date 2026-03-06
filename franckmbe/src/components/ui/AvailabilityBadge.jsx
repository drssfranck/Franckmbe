import { useState, useEffect } from 'react'

/**
 * Badge d'arrant avec compte à rebours jusqu'à la date de disponibilité
 */
function AvailabilityBadge({ targetDate = '2026-09-01', label = 'CDI Disponible' }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    months: 0,
    label: ''
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDate).getTime()
      const now = new Date().getTime()
      const difference = target - now

      if (difference > 0) {
        const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7))
        const days = Math.floor((difference / (1000 * 60 * 60 * 24)) % 7)
        const months = Math.floor(weeks / 4)
        
        let displayLabel = ''
        if (months > 0) {
          displayLabel = `${months} mois`
        } else if (weeks > 0) {
          displayLabel = `${weeks} semaines`
        } else {
          displayLabel = `${days} jours`
        }

        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          months,
          label: displayLabel
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 60000) // Mise à jour chaque minute

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="availability-badge">
      <div className="available-dot pulse"></div>
      <div className="badge-content">
        <div className="badge-label">{label}</div>
        <div className="badge-time">Dans {timeLeft.label}</div>
      </div>
    </div>
  )
}

export default AvailabilityBadge

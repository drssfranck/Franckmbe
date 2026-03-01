import { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import ScrollProgress from './ScrollProgress'

import HomePage from '../../features/home/pages/HomePage'
import AboutPage from '../../features/about/pages/AboutPage'
import SkillsPage from '../../features/skills/pages/SkillsPage'
import ExperiencePage from '../../features/experience/pages/ExperiencePage'
import ProjectsPage from '../../features/projects/pages/ProjectsPage'
import ServicesPage from '../../features/services/pages/ServicesPage'
import EducationPage from '../../features/education/pages/EducationPage'
import CertificationsPage from '../../features/certifications/pages/CertificationsPage'
import ContactPage from '../../features/contact/pages/ContactPage'
import CVPage from '../../features/cv/pages/CVPage'

const Layout = () => {
  // Gestion du défilement vers les ancres
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]')
      if (target) {
        e.preventDefault()
        const id = target.getAttribute('href').slice(1)
        const element = document.getElementById(id)
        if (element) {
          const offset = 80
          const top = element.getBoundingClientRect().top + window.scrollY - offset
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }
    }
    document.addEventListener('click', handleAnchorClick)
    return () => document.removeEventListener('click', handleAnchorClick)
  }, [])

  // Gestion du scroll initial si l'URL contient une ancre
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const id = hash.slice(1)
      const element = document.getElementById(id)
      if (element) {
        setTimeout(() => {
          const offset = 80
          const top = element.getBoundingClientRect().top + window.scrollY - offset
          window.scrollTo({ top, behavior: 'smooth' })
        }, 100)
      }
    }
  }, [])

  // Scroll reveal : ajoute .visible sur les éléments .reveal et .timeline-item
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.reveal, .timeline-item').forEach(el => {
      revealObserver.observe(el)
    })

    return () => revealObserver.disconnect()
  }, [])

  // Skill bars : anime la largeur au scroll
  useEffect(() => {
    const barObservers = []

    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              bar.style.width = bar.dataset.pct || '0%'
              obs.unobserve(bar)
            }
          })
        },
        { threshold: 0.5 }
      )
      obs.observe(bar)
      barObservers.push(obs)
    })

    return () => barObservers.forEach(obs => obs.disconnect())
  }, [])

  // Back to top : affiche le bouton après 300px de scroll
  useEffect(() => {
    const btn = document.getElementById('back-to-top')
    const handleScroll = () => {
      if (btn) {
        btn.classList.toggle('visible', window.scrollY > 300)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <HomePage />
        <AboutPage />
        <SkillsPage />
        <ExperiencePage />
        <ProjectsPage />
        <ServicesPage />
        <EducationPage />
        <CertificationsPage />
        <ContactPage />
        <CVPage />
      </main>
      <Footer />
      <button
        id="back-to-top"
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Retour en haut"
      >
        ↑
      </button>
    </>
  )
}

export default Layout
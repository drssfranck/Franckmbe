// useScrollReveal.js file
import { useEffect } from 'react'

/**
 * Hook pour révéler les éléments au scroll
 * Classes supportées:
 * - .reveal (defaut: fade + slide up)
 * - .reveal-fade (fade only)
 * - .reveal-slide-left (slide from left)
 * - .reveal-slide-right (slide from right)
 * - .reveal-scale (scale up)
 */
export const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            // Optional: unobserve après révélation pour économiser ressources
            // observer.unobserve(entry.target)
          }
        })
      },
      { 
        threshold: 0.1, 
        rootMargin: '0px 0px -40px 0px' 
      }
    )

    // Observer tous les éléments revélables
    const selectorsToObserve = [
      '.reveal',
      '.reveal-fade',
      '.reveal-slide-left',
      '.reveal-slide-right',
      '.reveal-scale'
    ]
    
    selectorsToObserve.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => observer.observe(el))
    })

    return () => observer.disconnect()
  }, [])
}
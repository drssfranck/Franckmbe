import { useState, useEffect, useRef } from 'react'

/**
 * Composant LazyImage avec support Intersection Observer
 * Charge les images uniquement quand elles sont visibles
 * @param {string} src - Source de l'image
 * @param {string} alt - Texte alternatif
 * @param {string} placeholder - Placeholder (base64 ou couleur)
 * @param {string} className - Classes CSS
 */
function LazyImage({ src, alt, placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Crect fill="%23e5e7eb" width="400" height="400"/%3E%3C/svg%3E', className = '' }) {
  const [imageSrc, setImageSrc] = useState(placeholder)
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Image est visible, charger l'image réelle
            const img = new Image()
            img.src = src
            img.onload = () => {
              setImageSrc(src)
              setIsLoaded(true)
            }
            img.onerror = () => {
              // Fallback si l'image ne charge pas
              setImageSrc(placeholder)
            }
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '50px' // Commencer à charger 50px avant d'être visible
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [src, placeholder])

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`${className} ${isLoaded ? 'image-loaded' : 'image-loading'}`}
      loading="lazy"
      decoding="async"
    />
  )
}

export default LazyImage

import { useEffect } from 'react'

const ScrollProgress = () => {
  useEffect(() => {
    const progressBar = document.getElementById('scroll-progress')
    
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      if (progressBar) {
        progressBar.style.width = progress + '%'
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return <div id="scroll-progress"></div>
}

export default ScrollProgress
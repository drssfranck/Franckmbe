import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ScrollProgress from './ScrollProgress'

const Layout = () => {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Outlet />
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
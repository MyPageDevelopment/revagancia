import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Artistas from './components/sections/Artistas'
import Contacto from './components/sections/Contacto'
import Hero from './components/sections/Hero'
import Multimedia from './components/sections/Multimedia'
// import Tour from './components/sections/Tour'

export default function App() {
  return (
    <div className="min-h-dvh bg-neutral-950 text-neutral-100">
      <Navbar />

      <main>
        <Hero />
        <Multimedia />
        {/* <Tour /> */}
        <Artistas />
        <Contacto />
      </main>

      <Footer />
    </div>
  )
}

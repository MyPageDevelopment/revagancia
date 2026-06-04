import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type NavItem = {
  label: string
  href: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Música y Videos', href: '#musica-y-videos' },
  // { label: 'Tour', href: '#tour' },
  { label: 'Artistas', href: '#artistas' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [isSolid, setIsSolid] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsSolid(window.scrollY > 8)
    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsOpen(false)
    setTimeout(() => {
      const id = href.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        const headerOffset = 64
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - headerOffset
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
        window.history.pushState(null, '', href)
      }
    }, 150)
  }

  return (
    <header
      className={
        'fixed top-0 left-0 z-50 w-full transition-all duration-500 ' +
        (isSolid || isOpen
          ? 'bg-gradient-to-b from-neutral-950/95 via-neutral-950/75 to-transparent backdrop-blur-[4px]'
          : 'bg-gradient-to-b from-neutral-950/50 to-transparent')
      }
    >
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4"
      >
        <a
          href="#inicio"
          onClick={(e) => handleLinkClick(e, '#inicio')}
          className="text-sm font-semibold tracking-[0.18em] text-white z-50"
        >
          REVAGANCIA
        </a>

        {/* Menú de Escritorio */}
        <ul
          className="hidden md:flex shrink-0 items-center gap-4 text-sm text-neutral-200"
        >
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="rounded-full px-3 py-2 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-400/70"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Botón Hamburguesa (Móvil) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center p-2 text-neutral-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-400/70 rounded-lg z-50 cursor-pointer"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Menú Desplegable Móvil */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="md:hidden absolute top-16 left-0 w-full bg-neutral-950/95 backdrop-blur-xl border-b border-fuchsia-500/20 overflow-hidden shadow-[0_10px_30px_rgba(217,70,239,0.15)] z-40"
          >
            <ul className="flex flex-col gap-2 p-5 text-center">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="block rounded-xl py-3.5 px-4 text-base font-bold text-neutral-300 hover:text-white hover:bg-gradient-to-r hover:from-fuchsia-500/10 hover:to-amber-500/10 transition-all duration-300 active:scale-98 border border-transparent hover:border-fuchsia-500/20"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

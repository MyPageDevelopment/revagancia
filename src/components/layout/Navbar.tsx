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

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <header
      className={
        'sticky top-0 z-50 w-full border-b transition-colors ' +
        (isSolid || isOpen
          ? 'border-white/10 bg-neutral-950/95 backdrop-blur-md'
          : 'border-transparent bg-transparent')
      }
    >
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4"
      >
        <a
          href="#inicio"
          onClick={handleLinkClick}
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden absolute top-16 left-0 w-full bg-neutral-950/95 backdrop-blur-lg border-b border-white/10 overflow-hidden shadow-2xl"
          >
            <ul className="flex flex-col gap-1 p-4 text-center">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={handleLinkClick}
                    className="block rounded-xl py-3 px-4 text-base font-semibold text-neutral-200 hover:text-white hover:bg-white/5 transition active:bg-white/10"
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

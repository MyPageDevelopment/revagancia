import { useEffect, useState } from 'react'

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

  useEffect(() => {
    const onScroll = () => setIsSolid(window.scrollY > 8)
    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={
        'sticky top-0 z-50 w-full border-b transition-colors ' +
        (isSolid
          ? 'border-white/10 bg-neutral-950/85 backdrop-blur'
          : 'border-transparent bg-transparent')
      }
    >
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4"
      >
        <a
          href="#inicio"
          className="text-sm font-semibold tracking-[0.18em] text-white"
        >
          REVAGANCIA
        </a>

        <ul
          className="flex shrink-0 items-center gap-2 sm:gap-4 overflow-x-auto overflow-y-hidden whitespace-nowrap text-sm text-neutral-200 scrollbar-none [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
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
      </nav>
    </header>
  )
}

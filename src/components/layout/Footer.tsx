const quickLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Música y Videos', href: '#musica-y-videos' },
  // { label: 'Tour', href: '#tour' },
  { label: 'Artistas', href: '#artistas' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-neutral-400">
              © {year} REVAGANCIA. Todos los derechos reservados.
            </p>
            <p className="text-xs text-neutral-500">
              Hecho con cariño por{' '}
              <a
                href="https://mypage.cl"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fuchsia-400 transition-colors underline decoration-fuchsia-500/30 underline-offset-2"
              >
                Mypagedevelopment
              </a>
              ,{' '}
              <a
                href="https://mypage.cl"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fuchsia-400 transition-colors underline decoration-fuchsia-500/30 underline-offset-2"
              >
                mypage.cl
              </a>{' '}
              y{' '}
              <a
                href="mailto:mypagedevelopment@gmail.com"
                className="hover:text-fuchsia-400 transition-colors underline decoration-fuchsia-500/30 underline-offset-2"
              >
                mypagedevelopment@gmail.com
              </a>.
            </p>
          </div>

          <nav aria-label="Enlaces rápidos">
            <ul className="flex flex-wrap gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="rounded-full px-3 py-2 text-sm text-neutral-300 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-400/70"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}

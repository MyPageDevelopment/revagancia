export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-sm text-neutral-400">
              © {year} REVAGANCIA. Todos los derechos reservados.
            </p>
            
            <div className="text-xs text-neutral-400 flex flex-wrap items-center gap-2">
              <span>Hecho con cariño por</span>
              <a
                href="https://mypage.cl"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-950/20 px-3.5 py-1 text-[11px] font-bold text-white transition-all duration-300 hover:border-fuchsia-500/60 hover:bg-fuchsia-900/25 hover:shadow-[0_0_15px_rgba(217,70,239,0.3)] hover:scale-102 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/50"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-fuchsia-500"></span>
                </span>
                <span className="bg-gradient-to-r from-fuchsia-400 to-amber-300 bg-clip-text text-transparent group-hover:from-fuchsia-300 group-hover:to-amber-200">
                  MyPage Development
                </span>
              </a>
              <span className="text-neutral-700 hidden sm:inline">|</span>
              <a
                href="mailto:mypagedevelopment@gmail.com"
                className="text-neutral-500 hover:text-fuchsia-400 transition-colors text-[11px]"
              >
                mypagedevelopment@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

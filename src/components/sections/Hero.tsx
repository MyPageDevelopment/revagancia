import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '../../utils/motion'


export default function Hero() {
  const reduceMotion = useReducedMotion()
  const liveBgUrl = `${import.meta.env.BASE_URL}live-placeholder.svg`

  return (
    <section id="inicio" className="relative overflow-hidden">
      {/* Fondo (placeholder foto/video en vivo) */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${liveBgUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-500/15 via-neutral-950 to-neutral-950" />
      </div>
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-amber-400/20 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -top-10 right-[-10rem] h-64 w-64 rounded-full bg-lime-400/10 blur-3xl pointer-events-none"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-12 pt-28 sm:pt-36 flex flex-col items-start text-left md:items-center md:text-center">
        <motion.div
          variants={fadeUp}
          initial={reduceMotion ? false : 'hidden'}
          animate={reduceMotion ? undefined : 'show'}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full flex flex-col items-start md:items-center"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-[0.22em] text-neutral-200">
            CUMBIA EN VIVO
            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
          </p>

          <h1 className="mt-6 text-4xl xs:text-5xl sm:text-7xl md:text-8xl font-black tracking-tight bg-gradient-to-r from-fuchsia-400 via-amber-300 to-lime-400 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(244,63,94,0.2)] select-none uppercase w-full">
            REVAGANCIA
          </h1>

          <p className="mt-6 text-base leading-relaxed text-neutral-200 sm:text-lg max-w-2xl">
            Somos REVAGANCIA y venimos directos de Villa Alemana para prender tu fiesta y cualquier carrete. Con toda la energía del cuarzo mi gente!
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-2xl w-full justify-start md:justify-center">
            {/* Botón Shows en vivo */}
            <a
              href="#musica-y-videos"
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById('youtube-short-iframe') || document.getElementById('musica-y-videos')
                if (element) {
                  const headerOffset = 64
                  const elementPosition = element.getBoundingClientRect().top
                  const offsetPosition = elementPosition + window.scrollY - headerOffset
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                  })
                }
              }}
              className="inline-flex w-full items-center justify-center rounded-full bg-fuchsia-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-300 focus:ring-offset-2 focus:ring-offset-neutral-950 sm:w-auto cursor-pointer"
            >
              Apaña a ver nuestros eventos!
            </a>

            {/* Botón Temazo 
            <a
              href="#musica-y-videos"
              onClick={(e) => {
                e.preventDefault()
                const isMobile = window.innerWidth < 768
                const targetId = isMobile ? 'youtube-short-iframe' : 'musica-y-videos'
                const element = document.getElementById(targetId) || document.getElementById('musica-y-videos')
                if (element) {
                  const headerOffset = 64
                  const elementPosition = element.getBoundingClientRect().top
                  const offsetPosition = elementPosition + window.scrollY - headerOffset
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                  })
                }
                
                if (!isMobile) {
                  const controller = (window as any).spotifyEmbedController
                  if (controller && typeof controller.play === 'function') {
                    try {
                      controller.play()
                    } catch (err) {
                      console.error('Error playing Spotify track:', err)
                    }
                  }
                }
              }}
              className="inline-flex w-full items-center justify-center rounded-full bg-fuchsia-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-300 focus:ring-offset-2 focus:ring-offset-neutral-950 sm:w-auto cursor-pointer"
            >
              Escucha nuestro último temazo
            </a>
            */}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

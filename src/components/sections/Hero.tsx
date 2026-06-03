import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '../../utils/motion'
import { SPOTIFY_LATEST_SINGLE_URL } from '../../utils/links'

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const liveBgUrl = `${import.meta.env.BASE_URL}live-placeholder.svg`

  return (
    <section id="inicio" className="relative overflow-hidden">
      {/* Fondo (placeholder foto/video en vivo) */}
      <div aria-hidden="true" className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${liveBgUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-500/15 via-neutral-950 to-neutral-950" />
      </div>
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-amber-400/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -top-10 right-[-10rem] h-64 w-64 rounded-full bg-lime-400/10 blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:pt-20">
        <motion.div
          variants={fadeUp}
          initial={reduceMotion ? false : 'hidden'}
          animate={reduceMotion ? undefined : 'show'}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-[0.22em] text-neutral-200">
            CUMBIA EN VIVO
            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
          </p>

          <h1 className="mt-6 text-4xl xs:text-5xl sm:text-7xl md:text-8xl font-black tracking-tight bg-gradient-to-r from-fuchsia-400 via-amber-300 to-lime-400 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(244,63,94,0.2)] select-none uppercase w-full">
            REVAGANCIA
          </h1>

          <p className="mt-6 text-base leading-relaxed text-neutral-200 sm:text-lg max-w-2xl">
            Ritmo, fiesta y energía de barrio. Somos REVAGANCIA: cumbia para
            prender la pista, de punta a punta.
          </p>

          <div className="mt-8 max-w-2xl">
            <a
              href={SPOTIFY_LATEST_SINGLE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full bg-fuchsia-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-300 focus:ring-offset-2 focus:ring-offset-neutral-950 sm:w-auto"
            >
              Escucha el último single
            </a>
            <p className="mt-3 text-xs text-neutral-400">
              CTA directo a Spotify (reemplazar por el link real).
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

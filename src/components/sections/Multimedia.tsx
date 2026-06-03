import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '../../utils/motion'
import { SPOTIFY_POPULAR_EMBED_URL, YOUTUBE_EMBED_URLS } from '../../utils/links'

export default function Multimedia() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      id="musica-y-videos"
      variants={fadeUp}
      initial={reduceMotion ? false : 'hidden'}
      whileInView={reduceMotion ? undefined : 'show'}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="border-t border-white/10"
    >
      <div className="mx-auto max-w-6xl px-4 py-16">
        <header className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Música & Videos
          </h2>
          <p className="mt-2 text-sm text-neutral-300">
            Lo más escuchado y dos clips en vivo (embeds responsivos).
          </p>
        </header>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Columna 1: Spotify */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-neutral-300">
                SPOTIFY
              </p>
              <iframe
                title="Spotify — canciones populares"
                src={SPOTIFY_POPULAR_EMBED_URL}
                width="100%"
                height="450"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="w-full rounded-xl border border-white/5"
              />
            </div>
          </div>

          {/* Columna 2: YouTube Short (Vertical) */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-neutral-300">
                YOUTUBE SHORT
              </p>
              <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-neutral-900 aspect-[9/16]">
                <iframe
                  title="YouTube — Short"
                  src="https://www.youtube.com/embed/OWcG6DmOxKY"
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* Columna 3: Videos Oficiales en Vivo */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:col-span-2 lg:col-span-1 flex flex-col gap-4">
            <p className="text-xs font-semibold tracking-[0.22em] text-neutral-300">
              VIDEOS EN VIVO
            </p>
            {YOUTUBE_EMBED_URLS.map((src, index) => (
              <div
                key={src}
                className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-neutral-900 pt-[56.25%]"
              >
                <iframe
                  title={`YouTube — video ${index + 1}`}
                  src={src}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

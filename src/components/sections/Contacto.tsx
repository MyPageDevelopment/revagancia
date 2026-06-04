import { motion, useReducedMotion } from 'framer-motion'
import { FaEnvelope, FaInstagram, FaTiktok, FaWhatsapp, FaYoutube } from 'react-icons/fa6'
import { fadeUp } from '../../utils/motion'
import { SOCIAL_URLS, WHATSAPP_BOOKING_URL } from '../../utils/links'

export default function Contacto() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      id="contacto"
      variants={fadeUp}
      initial={reduceMotion ? false : 'hidden'}
      whileInView={reduceMotion ? undefined : 'show'}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="border-t border-white/10"
    >
      <div className="mx-auto max-w-6xl px-4 py-12">
        <header className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Pa' que nos llamen!
          </h2>
          <p className="mt-2 text-sm text-neutral-300">
            Para contrataciones y prensa, escribenos.
          </p>
        </header>

        <div className="mt-10 max-w-2xl mx-auto">
          {/*<form
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-neutral-200">
                  Nombre
                </span>
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="h-11 rounded-xl border border-white/10 bg-neutral-950/40 px-4 text-sm text-white outline-none ring-fuchsia-300/40 placeholder:text-neutral-500 focus:ring-2"
                  placeholder="Tu nombre"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-neutral-200">
                  Correo
                </span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="h-11 rounded-xl border border-white/10 bg-neutral-950/40 px-4 text-sm text-white outline-none ring-fuchsia-300/40 placeholder:text-neutral-500 focus:ring-2"
                  placeholder="tu@email.com"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-neutral-200">
                  Mensaje
                </span>
                <textarea
                  name="message"
                  rows={5}
                  className="resize-none rounded-xl border border-white/10 bg-neutral-950/40 px-4 py-3 text-sm text-white outline-none ring-fuchsia-300/40 placeholder:text-neutral-500 focus:ring-2"
                  placeholder="Contanos fecha, ciudad y tipo de evento…"
                />
              </label>

              <button
                type="submit"
                className="mt-2 inline-flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-fuchsia-300/70"
              >
                Enviar (placeholder)
              </button>
            </div>
          </form>*/}

          <aside className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col justify-between">
            <div>
              <p className="text-sm font-semibold tracking-[0.22em] text-neutral-300">
                REDES Y CONTACTO
              </p>
              <p className="mt-1 text-xs text-neutral-400">
                Ponte en contacto para contrataciones o síguenos en nuestras plataformas oficiales.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* WhatsApp */}
                <a
                  href={WHATSAPP_BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="sm:col-span-2 group flex flex-col sm:flex-row items-center justify-center gap-4 rounded-2xl border border-white/10 bg-neutral-950/40 p-5 text-center sm:text-left transition-all duration-300 hover:border-lime-500/50 hover:bg-lime-500/5 focus:outline-none focus:ring-2 focus:ring-lime-400/50 cursor-pointer"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-lime-500/10 text-lime-400 group-hover:bg-lime-500 group-hover:text-neutral-950 transition-all duration-300">
                    <FaWhatsapp className="text-2xl" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white group-hover:text-lime-400 transition-colors">WhatsApp</p>
                    <p className="text-xs text-neutral-400 mt-0.5">Contrataciones oficiales y booking</p>
                  </div>
                </a>

                {/* Correo */}
                <a
                  href="mailto:r3vagancia@gmail.com"
                  className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-neutral-950/40 p-5 text-center transition-all duration-300 hover:border-amber-500/50 hover:bg-amber-500/5 focus:outline-none focus:ring-2 focus:ring-amber-400/50 cursor-pointer"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-neutral-950 transition-all duration-300">
                    <FaEnvelope className="text-2xl" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">Correo</p>
                    <p className="text-xs text-neutral-400 mt-0.5">r3vagancia@gmail.com</p>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href={SOCIAL_URLS.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-neutral-950/40 p-5 text-center transition-all duration-300 hover:border-fuchsia-500/50 hover:bg-fuchsia-500/5 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/50 cursor-pointer"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-fuchsia-500/10 text-fuchsia-400 group-hover:bg-fuchsia-500 group-hover:text-neutral-950 transition-all duration-300">
                    <FaInstagram className="text-2xl" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white group-hover:text-fuchsia-400 transition-colors">Instagram</p>
                    <p className="text-xs text-neutral-400 mt-0.5">Síguenos</p>
                  </div>
                </a>

                {/* YouTube */}
                <a
                  href={SOCIAL_URLS.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-neutral-950/40 p-5 text-center transition-all duration-300 hover:border-red-500/50 hover:bg-red-500/55 focus:outline-none focus:ring-2 focus:ring-red-400/50 cursor-pointer"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400 group-hover:bg-red-500 group-hover:text-neutral-950 transition-all duration-300">
                    <FaYoutube className="text-2xl" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">YouTube</p>
                    <p className="text-xs text-neutral-400 mt-0.5">Videos</p>
                  </div>
                </a>

                {/* TikTok */}
                <a
                  href={SOCIAL_URLS.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-neutral-950/40 p-5 text-center transition-all duration-300 hover:border-sky-500/50 hover:bg-sky-500/5 focus:outline-none focus:ring-2 focus:ring-sky-400/50 cursor-pointer"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 group-hover:bg-sky-500 group-hover:text-neutral-950 transition-all duration-300">
                    <FaTiktok className="text-xl" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white group-hover:text-sky-400 transition-colors">TikTok</p>
                    <p className="text-xs text-neutral-400 mt-0.5">Novedades</p>
                  </div>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </motion.section >
  )
}

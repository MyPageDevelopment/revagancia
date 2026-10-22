import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  FaCheck,
  FaCopy,
  FaEnvelope,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
  FaBolt,
  FaMusic,
  FaSliders,
  FaFire,
} from 'react-icons/fa6'
import { fadeUp } from '../../utils/motion'
import { SOCIAL_URLS, WHATSAPP_PHONE_NUMBER } from '../../utils/links'

const EVENT_TYPES = [
  'Festival / Evento Masivo',
  'Cumpleaños / Fiesta Privada',
  'Matrimonio / Boda',
  'Bar / Discoteca / Club',
]

const LOCATIONS = [
  'Villa Alemana / Quilpué',
  'Viña del Mar / Valparaíso',
  'Santiago / RM',
  'Otra Región de Chile',
]

export default function Contacto() {
  const reduceMotion = useReducedMotion()
  const [selectedType, setSelectedType] = useState(EVENT_TYPES[0])
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0])
  const [copiedEmail, setCopiedEmail] = useState(false)

  // Mensaje dinámico para WhatsApp según selección
  const generateWhatsAppMessage = () => {
    return encodeURIComponent(
      `¡Hola REVAGANCIA! 👋 Me gustaría cotizar su show de Cumbia Villera en vivo para un evento de tipo "${selectedType}" en "${selectedLocation}". ¿Tienen disponibilidad de fechas y cómo podemos coordinar? ¡Muchas gracias!`
    )
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('r3vagancia@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  return (
    <motion.section
      id="contacto"
      variants={fadeUp}
      initial={reduceMotion ? false : 'hidden'}
      whileInView={reduceMotion ? undefined : 'show'}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="border-t border-white/10 relative overflow-hidden py-16 sm:py-24"
    >
      {/* Fondos dinámicos y luces de festival */}
      <div className="absolute -top-24 left-1/4 w-[450px] h-[450px] rounded-full bg-fuchsia-600/20 blur-[130px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 right-10 w-[420px] h-[420px] rounded-full bg-lime-500/15 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-[380px] h-[380px] rounded-full bg-amber-500/15 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 relative z-10">
        {/* Cabecera de alto impacto */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/50 bg-lime-950/40 backdrop-blur-md px-4 py-1.5 text-xs font-black tracking-[0.22em] text-lime-300 shadow-[0_0_25px_rgba(132,204,22,0.3)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400" />
            </span>
            <span>BOOKING & CONTRATACIONES · EN VIVO 2026</span>
          </div>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl md:text-6xl uppercase">
            Pa' que nos{' '}
            <span className="bg-gradient-to-r from-lime-400 via-amber-300 to-fuchsia-400 bg-clip-text text-transparent">
              llamen!
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-neutral-200">
            ¿Quieres contratar una <span className="text-lime-300 font-bold">banda de cumbia en vivo</span> para tu festival, matrimonio, cumpleaños o evento en{' '}
            <span className="text-amber-300 font-semibold">Quilpué, Villa Alemana o la Quinta Región</span>? 7 músicos en escena con la verdadera{' '}
            <span className="text-lime-300 font-bold">Cumbia Villera</span> y toda la fuerza del cuarzo en Chile.
          </p>
        </div>

        {/* Mosaico Principal: Cotizador Exprés + Canales Oficiales */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tarjeta VIP: Cotizador Rápido para WhatsApp (7 columnas en desktop) */}
          <div className="lg:col-span-7 rounded-3xl border border-lime-500/40 bg-gradient-to-br from-neutral-900/90 via-neutral-950/95 to-neutral-900/90 p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(132,204,22,0.15)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-lime-500/20 text-lime-400 flex items-center justify-center border border-lime-400/40">
                <FaFire className="text-xl animate-bounce" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  Cotiza tu Fecha al Toque
                </h3>
                <p className="text-xs text-neutral-400">
                  Selecciona tu tipo de evento y comuna para consultar disponibilidad
                </p>
              </div>
            </div>

            {/* Paso 1: Tipo de Evento */}
            <div className="mb-6">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 block mb-3 flex items-center gap-2">
                <FaMusic className="text-fuchsia-400 text-xs" />
                1. Tipo de Evento
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {EVENT_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-bold text-left transition-all duration-300 border cursor-pointer ${
                      selectedType === type
                        ? 'bg-fuchsia-600/25 border-fuchsia-400 text-white shadow-[0_0_15px_rgba(217,70,239,0.35)]'
                        : 'bg-neutral-950/60 border-white/10 text-neutral-300 hover:border-white/30 hover:bg-white/5'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Paso 2: Lugar / Comuna */}
            <div className="mb-6">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 block mb-3 flex items-center gap-2">
                <FaSliders className="text-amber-400 text-xs" />
                2. Comuna / Zona
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setSelectedLocation(loc)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-bold text-left transition-all duration-300 border cursor-pointer ${
                      selectedLocation === loc
                        ? 'bg-amber-500/25 border-amber-400 text-white shadow-[0_0_15px_rgba(245,158,11,0.35)]'
                        : 'bg-neutral-950/60 border-white/10 text-neutral-300 hover:border-white/30 hover:bg-white/5'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            {/* Vista previa del mensaje */}
            <div className="rounded-xl border border-white/10 bg-neutral-950/80 p-3.5 mb-6 text-xs text-neutral-300">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block mb-1">
                Mensaje preconfigurado para WhatsApp:
              </span>
              <p className="italic text-neutral-200">
                "¡Hola REVAGANCIA! 👋 Me gustaría cotizar su show de Cumbia Villera en vivo para{' '}
                <span className="text-fuchsia-300 font-semibold">{selectedType}</span> en{' '}
                <span className="text-amber-300 font-semibold">{selectedLocation}</span>..."
              </p>
            </div>

            {/* Botón Gigante WhatsApp */}
            <a
              href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${generateWhatsAppMessage()}`}
              target="_blank"
              rel="noreferrer"
              className="group/btn relative w-full flex items-center justify-center gap-3.5 rounded-2xl bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-300 px-6 py-4 text-neutral-950 font-black text-sm sm:text-base tracking-wide shadow-[0_0_30px_rgba(132,204,22,0.5)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(132,204,22,0.8)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-950 text-lime-400 transition-transform duration-300 group-hover/btn:rotate-12">
                <FaWhatsapp className="text-lg" />
              </div>
              <span>¡COTIZAR POR WHATSAPP AHORA!</span>
              <span className="hidden sm:inline-block text-xs bg-neutral-950/20 px-2.5 py-1 rounded-full font-bold">
                Online
              </span>
            </a>

            <p className="mt-3 text-center text-xs text-neutral-400">
              Respuesta directa y rápida con el encargado de contrataciones
            </p>
          </div>

          {/* Columna Lateral: Correo, Redes y Garantías (5 columnas en desktop) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Tarjeta de Correo Oficial */}
            <div className="rounded-3xl border border-white/10 bg-neutral-900/80 p-6 backdrop-blur-xl shadow-xl transition-all duration-300 hover:border-amber-400/40">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center border border-amber-500/30">
                    <FaEnvelope className="text-lg" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Correo Oficial</h4>
                    <p className="text-xs text-neutral-400">Para prensa y contratos formales</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-neutral-950 border border-white/10">
                <a
                  href="mailto:r3vagancia@gmail.com"
                  className="text-xs sm:text-sm font-semibold text-neutral-200 hover:text-amber-400 transition-colors truncate"
                >
                  r3vagancia@gmail.com
                </a>
                <button
                  onClick={handleCopyEmail}
                  type="button"
                  aria-label="Copiar correo"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all duration-200 cursor-pointer shrink-0"
                >
                  {copiedEmail ? (
                    <>
                      <FaCheck className="text-lime-400" />
                      <span className="text-lime-400">¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <FaCopy className="text-neutral-300" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Tarjeta de Redes Sociales Oficiales */}
            <div className="rounded-3xl border border-white/10 bg-neutral-900/80 p-6 backdrop-blur-xl shadow-xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-4">
                Redes Oficiales de la Banda
              </h4>

              <div className="grid grid-cols-3 gap-3">
                {/* Instagram */}
                <a
                  href={SOCIAL_URLS.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl border border-white/10 bg-neutral-950/60 transition-all duration-300 hover:border-fuchsia-500 hover:bg-fuchsia-500/10 hover:shadow-[0_0_20px_rgba(217,70,239,0.3)] hover:-translate-y-1 cursor-pointer group"
                >
                  <FaInstagram className="text-2xl text-fuchsia-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold text-white">Instagram</span>
                </a>

                {/* YouTube */}
                <a
                  href={SOCIAL_URLS.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl border border-white/10 bg-neutral-950/60 transition-all duration-300 hover:border-red-500 hover:bg-red-500/10 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:-translate-y-1 cursor-pointer group"
                >
                  <FaYoutube className="text-2xl text-red-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold text-white">YouTube</span>
                </a>

                {/* TikTok */}
                <a
                  href={SOCIAL_URLS.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl border border-white/10 bg-neutral-950/60 transition-all duration-300 hover:border-sky-400 hover:bg-sky-400/10 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:-translate-y-1 cursor-pointer group"
                >
                  <FaTiktok className="text-xl text-sky-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold text-white">TikTok</span>
                </a>
              </div>
            </div>

            {/* Garantías de Show en Vivo */}
            <div className="rounded-3xl border border-fuchsia-500/20 bg-gradient-to-r from-fuchsia-950/30 to-neutral-950 p-5 space-y-3">
              <div className="flex items-start gap-3">
                <FaBolt className="text-lime-400 mt-1 shrink-0 text-sm" />
                <p className="text-xs text-neutral-300 leading-snug">
                  <strong className="text-white">Show 100% en vivo:</strong> 7 músicos en escena,
                  covers clásicos y todo el descontrol villero sin pistas.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <FaBolt className="text-fuchsia-400 mt-1 shrink-0 text-sm" />
                <p className="text-xs text-neutral-300 leading-snug">
                  <strong className="text-white">Rider técnico propio:</strong> Asesoría en
                  amplificación e iluminación para escenarios de cualquier escala.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

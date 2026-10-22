import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa6'
import { fadeUp } from '../../utils/motion'
import { heroBackgroundImages } from '../../utils/mockData'
import { WHATSAPP_BOOKING_URL } from '../../utils/links'

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const [currentBgIndex, setCurrentBgIndex] = useState(0)
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '')
  const logoUrl = `${baseUrl}/images/logo-oficial.png`

  // Rotación automática de fotos de fondo cada 5 segundos
  useEffect(() => {
    if (reduceMotion) return

    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % heroBackgroundImages.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [reduceMotion])

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 70
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section id="inicio" className="relative min-h-[92dvh] md:min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Carrusel de fotos en vivo de fondo - Ahora vibrantes y visibles */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentBgIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.75, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0 bg-cover bg-center transform-gpu"
            style={{
              backgroundImage: `url(${baseUrl}${heroBackgroundImages[currentBgIndex]})`,
              backgroundPosition: 'center 35%',
            }}
          />
        </AnimatePresence>

        {/* Gradiente sutil y cinematográfico: mantiene la foto visible y legible el contenido */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/45 to-neutral-950/60" />
        <div className="absolute inset-0 bg-radial from-transparent via-neutral-950/20 to-neutral-950/75" />

        {/* Halos de luz de fiesta */}
        <div className="absolute -top-24 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-fuchsia-600/25 blur-3xl" />
        <div className="absolute top-1/4 -left-16 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="absolute top-1/3 -right-16 h-72 w-72 rounded-full bg-lime-400/20 blur-3xl" />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 flex flex-col items-center text-center">
        <motion.div
          variants={fadeUp}
          initial={reduceMotion ? false : 'hidden'}
          animate={reduceMotion ? undefined : 'show'}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full flex flex-col items-center"
        >
          {/* Badge superior */}
          <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/40 bg-neutral-950/85 backdrop-blur-md px-4 py-1.5 text-xs font-bold tracking-[0.22em] text-fuchsia-300 shadow-[0_0_20px_rgba(217,70,239,0.3)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400" />
            </span>
            <span>BANDA DE CUMBIA FUSIÓN VILLERA · QUILPUÉ / VILLA ALEMANA · V REGIÓN</span>
          </div>

          {/* Logo Oficial con animación de hover 100% fluida */}
          <div className="mt-6 md:mt-8 w-full flex justify-center">
            <h1 className="relative flex flex-col items-center">
              <span className="sr-only">REVAGANCIA — Banda de Cumbia Fusión Villera en Vivo | Quilpué, Villa Alemana y Quinta Región Chile</span>
              <motion.img
                src={logoUrl}
                alt="REVAGANCIA — Banda Cumbia Fusión Villera Chile"
                className="w-[290px] xs:w-[350px] sm:w-[460px] md:w-[560px] lg:w-[620px] max-w-[90vw] h-auto object-contain select-none cursor-pointer transform-gpu"
                whileHover={{
                  scale: 1.035,
                  filter: 'drop-shadow(0 14px 45px rgba(217, 70, 239, 0.65))',
                }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  filter: 'drop-shadow(0 8px 30px rgba(217, 70, 239, 0.45))',
                }}
                draggable="false"
              />
            </h1>
          </div>

          {/* Bajada con identidad festiva villera y SEO local */}
          <p className="mt-6 text-base sm:text-lg md:text-xl leading-relaxed text-neutral-100 max-w-2xl font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            Banda de <span className="text-lime-300 font-bold">Cumbia Fusión Villera</span> en vivo originaria de{' '}
            <span className="text-amber-300 font-semibold">Villa Alemana y Quilpué</span>. Llevamos todo el descontrol, los clásicos reversionados y la{' '}
            <span className="bg-gradient-to-r from-fuchsia-400 to-lime-300 bg-clip-text text-transparent font-bold">energía del cuarzo</span> a eventos, matrimonios y festivales en toda la{' '}
            <span className="text-amber-300 font-semibold">Quinta Región y Chile</span>.
          </p>

          {/* Botones de acción principales */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-md sm:max-w-none justify-center items-center">
            {/* Botón Ver Shows y Música */}
            <a
              href="#musica-y-videos"
              onClick={(e) => handleScrollToSection(e, 'musica-y-videos')}
              className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-600 via-fuchsia-500 to-amber-500 px-7 py-3.5 text-sm sm:text-base font-extrabold text-white shadow-[0_0_25px_rgba(217,70,239,0.4)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(217,70,239,0.6)] hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 cursor-pointer"
            >
              <span>Ver Shows y Temazos</span>
              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">🎵</span>
            </a>

            {/* Botón Contratar / WhatsApp */}
            <a
              href={WHATSAPP_BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-lime-400/60 bg-neutral-950/80 backdrop-blur-md px-7 py-3.5 text-sm sm:text-base font-extrabold text-lime-300 shadow-[0_0_20px_rgba(132,204,22,0.25)] transition-all duration-300 hover:border-lime-400 hover:bg-lime-500 hover:text-neutral-950 hover:shadow-[0_0_30px_rgba(132,204,22,0.5)] hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-lime-400 cursor-pointer"
            >
              <FaWhatsapp className="text-xl" />
              <span>Contrataciones / Booking</span>
            </a>
          </div>

          {/* Selector interactivo de fotos de fondo */}
          <div className="mt-10 flex items-center gap-2 rounded-full bg-neutral-950/75 backdrop-blur-md px-3.5 py-1.5 border border-white/15 shadow-xl">
            <span className="text-[11px] font-semibold text-neutral-300 mr-1 hidden sm:inline">En vivo</span>
            {heroBackgroundImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBgIndex(index)}
                aria-label={`Ver foto de show ${index + 1}`}
                className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                  currentBgIndex === index
                    ? 'w-7 bg-gradient-to-r from-fuchsia-400 to-amber-300 shadow-[0_0_10px_rgba(217,70,239,0.9)]'
                    : 'w-2 bg-white/40 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

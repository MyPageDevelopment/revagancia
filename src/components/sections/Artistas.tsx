import { useRef, useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { fadeUp } from '../../utils/motion'
import { bandMembers } from '../../utils/mockData'
import type { BandMember } from '../../utils/types'

function ArtistCard({ member }: { member: BandMember }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className="w-full sm:w-[280px] h-[390px] flex-shrink-0 snap-center [perspective:1000px] cursor-pointer"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full h-full rounded-2xl border border-white/10 bg-white/5 select-none shadow-xl hover:border-white/20 transition-colors"
      >
        {/* Frente de la tarjeta */}
        <div
          className="absolute inset-0 w-full h-full flex flex-col [backface-visibility:hidden] rounded-2xl overflow-hidden bg-neutral-900/60 backdrop-blur-md"
        >
          {/* Contenedor de la Foto */}
          <div className="relative flex-grow overflow-hidden bg-neutral-950">
            {member.photoUrl ? (
              <img
                src={member.photoUrl}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                draggable="false"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-neutral-500">
                Sin foto
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />
            <div className="absolute top-3 right-3 bg-neutral-950/80 backdrop-blur-md rounded-full p-2 border border-white/10 shadow-lg text-[10px] text-neutral-300 font-semibold tracking-wider flex items-center gap-1 select-none">
              <span>Girar</span> 🔄
            </div>
          </div>
          {/* Nombre y Rol abajo de la foto */}
          <div className="p-5 border-t border-white/5 text-center bg-neutral-900/60 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white tracking-wide">{member.name}</h3>
            <p className="text-xs font-semibold tracking-wider text-fuchsia-400 mt-1 uppercase">{member.role}</p>
          </div>
        </div>

        {/* Reverso de la tarjeta */}
        <div
          style={{ transform: 'rotateY(180deg)' }}
          className="absolute inset-0 w-full h-full flex flex-col justify-center items-center p-6 [backface-visibility:hidden] rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border border-fuchsia-500/20 text-center shadow-2xl"
        >
          <div className="text-4xl mb-4 select-none animate-bounce duration-1000">🎵</div>
          <p className="text-neutral-400 font-bold uppercase tracking-widest text-[9px] mb-3">Comentario</p>
          <p className="text-base sm:text-lg italic font-semibold text-white leading-relaxed px-2">
            "{member.comment || '¡Viva la cumbia loco!'}"
          </p>
          <div className="mt-8 border-t border-white/10 w-20 pt-3">
            <p className="text-[10px] uppercase tracking-widest text-fuchsia-400 font-extrabold">{member.role}</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Artistas() {
  const reduceMotion = useReducedMotion()
  const carouselRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      setShowLeftArrow(scrollLeft > 10)
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10)
    }
  }

  useEffect(() => {
    const el = carouselRef.current
    if (el) {
      el.addEventListener('scroll', checkScroll)
      checkScroll()
      window.addEventListener('resize', checkScroll)
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [])

  const handleScroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { scrollLeft } = carouselRef.current
      const offset = direction === 'left' ? -300 : 300
      carouselRef.current.scrollTo({
        left: scrollLeft + offset,
        behavior: 'smooth',
      })
    }
  }

  return (
    <motion.section
      id="artistas"
      variants={fadeUp}
      initial={reduceMotion ? false : 'hidden'}
      whileInView={reduceMotion ? undefined : 'show'}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="border-t border-white/10"
    >
      <div className="mx-auto max-w-6xl px-4 py-16">
        <header className="max-w-2xl mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Integrantes de la Banda
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-300">
            Haz clic en cualquier tarjeta para ver el comentario personal del artista. ¡Conoce al equipo de REVAGANCIA!
          </p>
        </header>

        {/* Contenedor del Carrusel */}
        <div className="relative group px-1">
          {/* Botón Flecha Izquierda */}
          {showLeftArrow && (
            <button
              onClick={() => handleScroll('left')}
              className="absolute left-[-16px] top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-neutral-900/90 text-white hover:bg-neutral-800 hover:scale-105 active:scale-95 transition shadow-2xl cursor-pointer"
              aria-label="Anterior integrante"
            >
              <FaChevronLeft />
            </button>
          )}

          {/* Botón Flecha Derecha */}
          {showRightArrow && (
            <button
              onClick={() => handleScroll('right')}
              className="absolute right-[-16px] top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-neutral-900/90 text-white hover:bg-neutral-800 hover:scale-105 active:scale-95 transition shadow-2xl cursor-pointer"
              aria-label="Siguiente integrante"
            >
              <FaChevronRight />
            </button>
          )}

          {/* Carrusel Deslizable */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-6 px-1 scroll-smooth [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {bandMembers.map((member) => (
              <ArtistCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

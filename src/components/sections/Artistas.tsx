import { useRef, useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FaInstagram } from 'react-icons/fa6'
import { fadeUp } from '../../utils/motion'
import { bandMembers } from '../../utils/mockData'
import type { BandMember } from '../../utils/types'

function ArtistCard({ member }: { member: BandMember }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const touchStartPos = useRef<{ x: number; y: number } | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    touchStartPos.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartPos.current) return
    const touch = e.changedTouches[0]
    const diffX = Math.abs(touch.clientX - touchStartPos.current.x)
    const diffY = Math.abs(touch.clientY - touchStartPos.current.y)

    // Si el movimiento táctil es insignificante, es un tap (click)
    if (diffX < 8 && diffY < 8) {
      setIsFlipped(!isFlipped)
    }
    touchStartPos.current = null
  }

  const handleClick = (e: React.MouseEvent) => {
    // Evitar doble flip en dispositivos con eventos de puntero híbridos
    if (e.nativeEvent instanceof PointerEvent && e.nativeEvent.pointerType === 'touch') {
      return
    }
    setIsFlipped(!isFlipped)
  }

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
      className="w-[280px] h-[390px] flex-shrink-0 snap-center [perspective:1000px] cursor-pointer"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full h-full rounded-2xl border border-white/10 bg-white/5 select-none shadow-xl hover:border-white/20 transition-colors"
      >
        {/* Frente de la tarjeta */}
        <div
          className="absolute inset-0 w-full h-full flex flex-col [backface-visibility:hidden] [-webkit-backface-visibility:hidden] rounded-2xl overflow-hidden bg-neutral-900/60 backdrop-blur-md"
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
          className="absolute inset-0 w-full h-full flex flex-col justify-center items-center p-6 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border border-fuchsia-500/20 text-center shadow-2xl"
        >
          <div className="text-4xl mb-4 select-none animate-bounce duration-1000">🎵</div>
          <p className="text-neutral-400 font-bold uppercase tracking-widest text-[9px] mb-3">Comentario</p>
          <p className="text-base sm:text-lg italic font-semibold text-white leading-relaxed px-2">
            "{member.comment || '¡Viva la cumbia loco!'}"
          </p>
          <div className="mt-6 border-t border-white/10 w-20 pt-3">
            <p className="text-[10px] uppercase tracking-widest text-fuchsia-400 font-extrabold">{member.role}</p>
          </div>
          {member.instagramUrl && (
            <a
              href={member.instagramUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
                e.stopPropagation()
              }}
              className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3.5 py-1.5 text-xs font-bold text-white transition-all duration-300 hover:bg-fuchsia-500 hover:text-neutral-950 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 hover:scale-105 cursor-pointer"
            >
              <FaInstagram className="text-sm" />
              <span>Instagram</span>
            </a>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default function Artistas() {
  const reduceMotion = useReducedMotion()
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null

    const startAutoplay = () => {
      intervalId = setInterval(() => {
        // Evitar autoplay en escritorio
        if (window.innerWidth >= 768) return

        if (carouselRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
          // Si estamos al final, volvemos al principio
          if (scrollLeft + clientWidth >= scrollWidth - 25) {
            carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' })
          } else {
            carouselRef.current.scrollTo({
              left: scrollLeft + 300,
              behavior: 'smooth',
            })
          }
        }
      }, 3500)
    }

    startAutoplay()

    const pauseAutoplay = () => {
      if (intervalId) clearInterval(intervalId)
    }

    const resumeAutoplay = () => {
      pauseAutoplay()
      startAutoplay()
    }

    const el = carouselRef.current
    if (el) {
      el.addEventListener('mouseenter', pauseAutoplay)
      el.addEventListener('mouseleave', resumeAutoplay)
      el.addEventListener('touchstart', pauseAutoplay)
      el.addEventListener('touchend', resumeAutoplay)
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
      if (el) {
        el.removeEventListener('mouseenter', pauseAutoplay)
        el.removeEventListener('mouseleave', resumeAutoplay)
        el.removeEventListener('touchstart', pauseAutoplay)
        el.removeEventListener('touchend', resumeAutoplay)
      }
    }
  }, [])

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
      <div className="mx-auto max-w-6xl px-4 py-12">
        <header className="max-w-2xl mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Nuestros artistas!
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-300">
            Haz clic en cualquier tarjeta para ver el comentario personal del artista. ¡Conoce al equipo de REVAGANCIA!
          </p>
        </header>

        {/* Contenedor del Carrusel / Grilla */}
        <div className="relative group px-1">
          {/* Carrusel Deslizable / Grilla en Escritorio */}
          <div
            ref={carouselRef}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scrollbar-none pb-8 pt-4 md:py-4 px-1 scroll-smooth [&::-webkit-scrollbar]:hidden max-w-5xl mx-auto justify-items-center justify-start md:justify-center"
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

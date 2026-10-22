import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FaInstagram, FaRotate, FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { fadeUp } from '../../utils/motion'
import { bandMembers } from '../../utils/mockData'
import type { BandMember } from '../../utils/types'

function ArtistCard({
  member,
  onFlipChange,
}: {
  member: BandMember
  onFlipChange?: (flipped: boolean) => void
}) {
  const [isFlipped, setIsFlipped] = useState(false)
  const pointerStartPos = useRef<{ x: number; y: number } | null>(null)
  const isDragging = useRef(false)

  const toggleFlip = () => {
    setIsFlipped((prev) => {
      const next = !prev
      onFlipChange?.(next)
      return next
    })
  }

  // Manejo de eventos de puntero compatible 100% con iOS / iPhone y Android
  // No bloquea el swipe nativo del carrusel en Safari móvil
  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartPos.current = { x: e.clientX, y: e.clientY }
    isDragging.current = false
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!pointerStartPos.current) return
    const diffX = Math.abs(e.clientX - pointerStartPos.current.x)
    const diffY = Math.abs(e.clientY - pointerStartPos.current.y)
    // Si se desplazó más de 8px en cualquier dirección, es un swipe o scroll
    if (diffX > 8 || diffY > 8) {
      isDragging.current = true
    }
  }

  const handlePointerUp = () => {
    pointerStartPos.current = null
  }

  const handleClick = (e: React.MouseEvent) => {
    // Si fue un desplazamiento o swipe con el dedo, no voltear la tarjeta
    if (isDragging.current) {
      isDragging.current = false
      return
    }
    e.stopPropagation()
    toggleFlip()
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={handleClick}
      style={{
        touchAction: 'pan-x pan-y',
        WebkitTouchCallout: 'none',
      }}
      className="w-[280px] sm:w-[295px] md:w-[310px] h-[420px] flex-shrink-0 snap-center [perspective:1200px] cursor-pointer group transition-transform duration-500 ease-out hover:-translate-y-2 select-none touch-pan-x"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full h-full rounded-2xl border border-white/10 bg-neutral-900/90 shadow-[0_10px_30px_rgba(0,0,0,0.6)] group-hover:border-fuchsia-500/60 group-hover:shadow-[0_20px_45px_rgba(217,70,239,0.3)] transition-all duration-500 ease-out transform-gpu"
      >
        {/* Frente de la tarjeta */}
        <div className="absolute inset-0 w-full h-full flex flex-col [backface-visibility:hidden] [-webkit-backface-visibility:hidden] rounded-2xl overflow-hidden bg-neutral-900/80 backdrop-blur-md">
          {/* Contenedor de la Foto */}
          <div className="relative flex-grow overflow-hidden bg-neutral-950">
            {member.photoUrl ? (
              <img
                src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}${member.photoUrl}`}
                alt={`${member.name} - ${member.role}`}
                style={{
                  objectPosition: member.photoPosition || 'center top',
                }}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none select-none"
                draggable="false"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-neutral-500">
                Sin foto
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent pointer-events-none" />

            {/* Badge de interacción (Girar) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                toggleFlip()
              }}
              className="absolute top-3 right-3 bg-neutral-950/85 backdrop-blur-md rounded-full px-2.5 py-1 border border-white/15 shadow-lg text-[11px] text-fuchsia-300 font-semibold tracking-wider flex items-center gap-1.5 select-none transition-all duration-300 group-hover:border-fuchsia-400 group-hover:scale-105 cursor-pointer z-10"
            >
              <span>Girar</span>
              <FaRotate className="text-xs transition-transform duration-500 group-hover:rotate-180" />
            </button>

            {/* Badge de rol en la foto */}
            <div className="absolute bottom-3 left-3 bg-fuchsia-950/85 backdrop-blur-md border border-fuchsia-500/40 rounded-lg px-2.5 py-1 text-[11px] font-bold text-fuchsia-300 uppercase tracking-wider shadow-md pointer-events-none">
              {member.role}
            </div>
          </div>

          {/* Nombre y Rol abajo de la foto */}
          <div className="p-4 border-t border-white/10 text-center bg-neutral-950/90 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white tracking-wide transition-colors duration-300 group-hover:text-amber-300">
              {member.name}
            </h3>
            <p className="text-xs font-semibold tracking-wider text-neutral-400 mt-0.5">
              Revagancia Oficial
            </p>
          </div>
        </div>

        {/* Reverso de la tarjeta */}
        <div
          style={{ transform: 'rotateY(180deg)' }}
          className="absolute inset-0 w-full h-full flex flex-col justify-between items-center p-6 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border border-fuchsia-500/40 text-center shadow-2xl"
        >
          <div className="w-full flex justify-between items-center text-xs text-neutral-400 border-b border-white/10 pb-3">
            <span className="font-extrabold text-fuchsia-400 tracking-wider uppercase text-[10px]">
              {member.role}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                toggleFlip()
              }}
              className="text-[11px] flex items-center gap-1 text-neutral-400 hover:text-fuchsia-300 transition-colors cursor-pointer"
            >
              Volver <FaRotate className="text-[9px]" />
            </button>
          </div>

          <div className="my-auto py-2">
            <div className="text-3xl mb-3 select-none">🎹</div>
            <p className="text-fuchsia-400/80 font-bold uppercase tracking-widest text-[9px] mb-2">
              Comentario Villero
            </p>
            <p className="text-base sm:text-lg italic font-semibold text-white leading-relaxed px-1">
              "{member.comment || '¡Aguante la Cumbia Fusión Villera con Revagancia!'}"
            </p>
          </div>

          <div className="w-full pt-3 border-t border-white/10 flex flex-col items-center gap-3">
            <p className="text-xs font-bold text-white">{member.name}</p>
            {member.instagramUrl && (
              <a
                href={member.instagramUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 rounded-full border border-fuchsia-500/40 bg-fuchsia-500/15 px-4 py-2 text-xs font-bold text-white transition-all duration-300 hover:bg-fuchsia-500 hover:text-neutral-950 hover:shadow-[0_0_15px_rgba(217,70,239,0.5)] hover:scale-105 cursor-pointer"
              >
                <FaInstagram className="text-sm" />
                <span>Instagram Oficial</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Artistas() {
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flippedCount, setFlippedCount] = useState(0)
  const isInteracting = useRef(false)
  const isSectionVisible = useRef(false)
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Desplazamiento del carrusel por índice o dirección
  const scrollToIndex = useCallback((index: number) => {
    if (!carouselRef.current) return
    const container = carouselRef.current
    const cards = container.children
    if (!cards || cards.length === 0) return

    const clampedIndex = (index + bandMembers.length) % bandMembers.length
    const targetCard = cards[clampedIndex] as HTMLElement
    if (targetCard) {
      if (clampedIndex === 0) {
        // Para el Cantante (inicio absoluto)
        container.scrollTo({
          left: 0,
          behavior: 'smooth',
        })
      } else {
        const scrollPosition =
          targetCard.offsetLeft - (container.clientWidth - targetCard.clientWidth) / 2
        container.scrollTo({
          left: Math.max(0, scrollPosition),
          behavior: 'smooth',
        })
      }
      setCurrentIndex(clampedIndex)
    }
  }, [])

  // Reiniciar temporizador de 10 segundos
  const resetAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current)
      autoplayTimerRef.current = null
    }

    if (reduceMotion || isInteracting.current || flippedCount > 0 || !isSectionVisible.current) {
      return
    }

    // Intervalo de 10 segundos para dar tiempo suficiente de leer
    autoplayTimerRef.current = setInterval(() => {
      if (isInteracting.current || flippedCount > 0 || !isSectionVisible.current) {
        return
      }
      setCurrentIndex((prev) => {
        const next = (prev + 1) % bandMembers.length
        scrollToIndex(next)
        return next
      })
    }, 10000)
  }, [reduceMotion, flippedCount, scrollToIndex])

  const scrollCarousel = (direction: 'left' | 'right') => {
    const nextIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1
    scrollToIndex(nextIndex)
    resetAutoplay()
  }

  // Asegurar que al montar parta en el Cantante (índice 0)
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'instant' })
      setCurrentIndex(0)
    }
  }, [])

  // Observador para activar autoplay sólo cuando la sección es visible
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        isSectionVisible.current = entry.isIntersecting
        if (entry.isIntersecting) {
          resetAutoplay()
        } else {
          if (autoplayTimerRef.current) {
            clearInterval(autoplayTimerRef.current)
            autoplayTimerRef.current = null
          }
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [resetAutoplay])

  // Detectar el índice activo según el scroll del usuario
  useEffect(() => {
    const container = carouselRef.current
    if (!container) return

    let scrollTimeout: ReturnType<typeof setTimeout> | null = null

    const handleScroll = () => {
      const cards = container.children
      if (!cards || cards.length === 0) return

      // Si está cerca del borde izquierdo, es el cantante
      if (container.scrollLeft <= 40) {
        setCurrentIndex(0)
        return
      }

      const center = container.scrollLeft + container.clientWidth / 2
      let closestIndex = 0
      let minDistance = Infinity

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i] as HTMLElement
        const cardCenter = card.offsetLeft + card.clientWidth / 2
        const distance = Math.abs(center - cardCenter)
        if (distance < minDistance) {
          minDistance = distance
          closestIndex = i
        }
      }

      setCurrentIndex(closestIndex)

      // Reiniciar los 10 segundos cuando el usuario termina de scrollear manualmente
      if (scrollTimeout) clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        resetAutoplay()
      }, 500)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      container.removeEventListener('scroll', handleScroll)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [resetAutoplay])

  // Pausa con mouse hover o toque en pantalla
  useEffect(() => {
    const el = carouselRef.current
    if (!el) return

    const pause = () => {
      isInteracting.current = true
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current)
        autoplayTimerRef.current = null
      }
    }

    const resume = () => {
      isInteracting.current = false
      resetAutoplay()
    }

    el.addEventListener('mouseenter', pause)
    el.addEventListener('mouseleave', resume)
    el.addEventListener('touchstart', pause, { passive: true })
    el.addEventListener('touchend', resume, { passive: true })

    return () => {
      el.removeEventListener('mouseenter', pause)
      el.removeEventListener('mouseleave', resume)
      el.removeEventListener('touchstart', pause)
      el.removeEventListener('touchend', resume)
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current)
        autoplayTimerRef.current = null
      }
    }
  }, [resetAutoplay])

  // Controlar si hay alguna tarjeta volteada para pausar el autoplay
  const handleCardFlipChange = (flipped: boolean) => {
    setFlippedCount((prev) => (flipped ? prev + 1 : Math.max(0, prev - 1)))
  }

  return (
    <motion.section
      ref={sectionRef}
      id="artistas"
      variants={fadeUp}
      initial={reduceMotion ? false : 'hidden'}
      whileInView={reduceMotion ? undefined : 'show'}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="border-t border-white/10 relative overflow-hidden py-16 sm:py-20"
    >
      {/* Luces sutiles de fondo en la sección */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-fuchsia-600/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-[0.22em] text-fuchsia-400 uppercase">
              La Banda en Vivo
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
              Nuestros <span className="bg-gradient-to-r from-fuchsia-400 via-amber-300 to-lime-400 bg-clip-text text-transparent">Artistas</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-neutral-300">
              Desliza por el carrusel o toca cualquier tarjeta para girarla y leer el comentario de cada músico. ¡Los encargados de prender la verdadera Cumbia Fusión Villera!
            </p>
          </div>

          {/* Botones de navegación en cabecera */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-neutral-400 font-mono hidden sm:inline mr-2">
              {currentIndex + 1} / {bandMembers.length}
            </span>
            <button
              onClick={() => scrollCarousel('left')}
              aria-label="Ver artista anterior"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-neutral-900/90 text-white transition-all duration-300 hover:border-fuchsia-400 hover:bg-fuchsia-500/20 hover:scale-105 active:scale-95 cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(217,70,239,0.35)]"
            >
              <FaChevronLeft className="text-sm" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              aria-label="Ver artista siguiente"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-neutral-900/90 text-white transition-all duration-300 hover:border-fuchsia-400 hover:bg-fuchsia-500/20 hover:scale-105 active:scale-95 cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(217,70,239,0.35)]"
            >
              <FaChevronRight className="text-sm" />
            </button>
          </div>
        </header>

        {/* Carrusel interactivo optimizado para iPhone y pantallas táctiles */}
        <div className="relative group px-1">
          {/* Flecha flotante izquierda para Desktop */}
          <button
            onClick={() => scrollCarousel('left')}
            aria-label="Anterior"
            className="hidden xl:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full border border-fuchsia-500/40 bg-neutral-950/90 text-white backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-fuchsia-400 hover:bg-fuchsia-500 hover:text-neutral-950 hover:scale-110 cursor-pointer"
          >
            <FaChevronLeft className="text-base" />
          </button>

          {/* Flecha flotante derecha para Desktop */}
          <button
            onClick={() => scrollCarousel('right')}
            aria-label="Siguiente"
            className="hidden xl:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full border border-fuchsia-500/40 bg-neutral-950/90 text-white backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-fuchsia-400 hover:bg-fuchsia-500 hover:text-neutral-950 hover:scale-110 cursor-pointer"
          >
            <FaChevronRight className="text-base" />
          </button>

          {/* Riel de tarjetas del carrusel con soporte WebKit iOS Safari nativo */}
          <div
            ref={carouselRef}
            className="flex flex-nowrap gap-5 sm:gap-6 md:gap-7 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-8 pt-2 px-3 sm:px-4 scroll-smooth [&::-webkit-scrollbar]:hidden items-stretch touch-pan-x touch-pan-y overscroll-x-contain"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {bandMembers.map((member) => (
              <ArtistCard
                key={member.id}
                member={member}
                onFlipChange={handleCardFlipChange}
              />
            ))}
          </div>
        </div>

        {/* Puntos / Indicadores de navegación interactivos */}
        <div className="flex items-center justify-center gap-2 pt-4">
          {bandMembers.map((member, idx) => (
            <button
              key={member.id}
              onClick={() => {
                scrollToIndex(idx)
                resetAutoplay()
              }}
              aria-label={`Ir al integrante ${member.name} (${member.role})`}
              className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                currentIndex === idx
                  ? 'w-9 bg-gradient-to-r from-fuchsia-400 to-amber-300 shadow-[0_0_12px_rgba(217,70,239,0.7)]'
                  : 'w-2.5 bg-white/20 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

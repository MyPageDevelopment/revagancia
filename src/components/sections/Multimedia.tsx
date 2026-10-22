import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '../../utils/motion'

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void
    onSpotifyIframeApiReady: (IFrameAPI: any) => void
    spotifyEmbedController: any
    SpotifyIFrameAPI: any
    onSpotifyAPIReadyCallbacks: any[]
    YT: any
  }
}

export default function Multimedia() {
  const reduceMotion = useReducedMotion()
  const youtubePlayerRef = useRef<any>(null)
  const spotifyControllerRef = useRef<any>(null)

  useEffect(() => {
    // Función para inicializar Spotify
    const initializeSpotify = (IFrameAPI: any) => {
      const element = document.getElementById('spotify-player-container')
      if (!element) return

      const options = {
        uri: 'spotify:track:7kQDBfIEYEG0dV5GSoPv4J',
        width: '100%',
        height: '100%',
      }

      IFrameAPI.createController(element, options, (EmbedController: any) => {
        spotifyControllerRef.current = EmbedController
        window.spotifyEmbedController = EmbedController // Guardar en window para el botón del Hero

        EmbedController.addListener('playback_update', (e: any) => {
          const isPlaying = !e.data.isPaused
          if (isPlaying) {
            // Pausar YouTube si está reproduciéndose
            if (
              youtubePlayerRef.current &&
              typeof youtubePlayerRef.current.pauseVideo === 'function'
            ) {
              try {
                if (youtubePlayerRef.current.getPlayerState() === 1) { // 1 = PLAYING
                  youtubePlayerRef.current.pauseVideo()
                }
              } catch (err) {
                console.error('Error al pausar reproductor de YouTube:', err)
              }
            }
          }
        })
      })
    }

    // Si la API de Spotify ya está cargada globalmente, inicializar de inmediato
    if (window.SpotifyIFrameAPI) {
      initializeSpotify(window.SpotifyIFrameAPI)
    } else {
      // Registrar el callback para cuando se cargue
      if (!window.onSpotifyAPIReadyCallbacks) {
        window.onSpotifyAPIReadyCallbacks = []
      }
      window.onSpotifyAPIReadyCallbacks.push(initializeSpotify)
    }

    // Inicialización del reproductor de YouTube
    window.onYouTubeIframeAPIReady = () => {
      const iframe = document.getElementById('youtube-short-iframe')
      if (!iframe) return

      youtubePlayerRef.current = new window.YT.Player('youtube-short-iframe', {
        events: {
          onStateChange: (event: any) => {
            if (event.data === 1) { // 1 = PLAYING
              // Pausar Spotify
              if (spotifyControllerRef.current) {
                try {
                  spotifyControllerRef.current.pause()
                } catch (err) {
                  console.error('Error al pausar reproductor de Spotify:', err)
                }
              }
            }
          },
        },
      })
    }

    // Cargar script de YouTube si no existe, o inicializarlo directamente si ya está listo
    if (window.YT && window.YT.Player) {
      window.onYouTubeIframeAPIReady()
    } else {
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const script = document.createElement('script')
        script.src = 'https://www.youtube.com/iframe_api'
        script.async = true
        document.body.appendChild(script)
      }
    }

    return () => {
      // Limpiar el callback para evitar fugas de memoria
      if (window.onSpotifyAPIReadyCallbacks) {
        window.onSpotifyAPIReadyCallbacks = window.onSpotifyAPIReadyCallbacks.filter(
          (cb: any) => cb !== initializeSpotify
        )
      }
    }
  }, [])

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
      <div className="mx-auto max-w-6xl px-4 py-12">
        <header className="max-w-2xl">
          <span className="text-xs font-bold tracking-[0.22em] text-fuchsia-400 uppercase">
            En Vivo y Grabaciones
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            Nuestros Shows y Música — Cumbia Fusión Villera
          </h2>
          <p className="mt-2 text-sm text-neutral-300">
            Disfruta de nuestros registros en vivo, lanzamientos oficiales y covers reversionados con todo el poder de la Cumbia Fusión Villera de Revagancia.
          </p>
        </header>

        <div className="mt-8 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto items-stretch justify-center justify-items-center">
          {/* Columna 2: YouTube Short (Vertical) */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col max-w-[380px] w-full">
            <div className="flex flex-col flex-grow">
              <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-neutral-300">
                YOUTUBE SHORT
              </p>
              <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-neutral-900 aspect-[9/16]">
                <iframe
                  id="youtube-short-iframe"
                  title="YouTube — Short"
                  src="https://www.youtube.com/embed/OWcG6DmOxKY?enablejsapi=1"
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* Columna 1: Spotify */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col max-w-[380px] w-full">
            <div className="flex flex-col flex-grow">
              <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-neutral-300">
                ÚLTIMO LANZAMIENTO
              </p>
              <div
                id="spotify-player-container"
                className="w-full rounded-xl overflow-hidden flex-grow min-h-[450px] bg-neutral-950/40 border border-white/5"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

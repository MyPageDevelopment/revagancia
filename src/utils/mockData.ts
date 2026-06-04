import type { BandMember, TourDate } from './types'

export const tourDates: TourDate[] = [
  {
    id: 'rv-2026-06-21',
    dateIso: '2026-06-21',
    city: 'Buenos Aires',
    venue: 'Niceto Club (mock)',
    ticketsUrl: 'https://example.com/tickets',
  },
  {
    id: 'rv-2026-07-05',
    dateIso: '2026-07-05',
    city: 'La Plata',
    venue: 'Teatro Ópera (mock)',
    ticketsUrl: 'https://example.com/tickets',
  },
  {
    id: 'rv-2026-07-19',
    dateIso: '2026-07-19',
    city: 'Rosario',
    venue: 'Metropolitano (mock)',
    ticketsUrl: 'https://example.com/tickets',
  },
]

export const bandMembers: BandMember[] = [
  {
    id: 'cantante',
    name: 'Cantante',
    role: 'Cantante',
    photoUrl: '/images/cantante.png',
    comment: '¡Viva la cumbia loco, a gozar y bailar con Revagancia!',
    instagramUrl: 'https://instagram.com/revagancia_somosdelcuarzo',
  },
  {
    id: 'guirista',
    name: 'Güirista',
    role: 'Guirista',
    photoUrl: '/images/guirista.png',
    comment: '¡El raspado de la güira es el corazón de la fiesta!',
    instagramUrl: 'https://instagram.com/revagancia_somosdelcuarzo',
  },
  {
    id: 'guitarrista',
    name: 'Guitarrista',
    role: 'Guitarrista',
    photoUrl: '/images/guitarrista.png',
    comment: '¡Cumbia con sentimiento en cada punteo de mi guitarra!',
    instagramUrl: 'https://instagram.com/revagancia_somosdelcuarzo',
  },
  {
    id: 'timbales',
    name: 'Timbalero',
    role: 'Timbales',
    photoUrl: '/images/timbales.png',
    comment: '¡Que suene fuerte el timbal y retumbe el barrio entero!',
    instagramUrl: 'https://instagram.com/revagancia_somosdelcuarzo',
  },
  {
    id: 'bajo',
    name: 'Bajista',
    role: 'Bajo',
    photoUrl: '/images/bajo.png',
    comment: '¡Marcando las frecuencias bajas que hacen mover los pies!',
    instagramUrl: 'https://instagram.com/revagancia_somosdelcuarzo',
  },
  {
    id: 'teclado',
    name: 'Tecladista',
    role: 'Teclado',
    photoUrl: '/images/teclado.png',
    comment: '¡Esas teclas locas que le dan todo el sabor tropical!',
    instagramUrl: 'https://instagram.com/revagancia_somosdelcuarzo',
  },
]

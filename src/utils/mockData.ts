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

export const heroBackgroundImages: string[] = [
  '/images/hero/hero-1.jpg',
  '/images/hero/hero-2.jpg',
  '/images/hero/hero-3.jpg',
  '/images/hero/hero-4.jpg',
  '/images/hero/hero-5.jpg',
  '/images/hero/hero-6.jpg',
  '/images/hero/hero-7.jpg',
]

export const bandMembers: BandMember[] = [
  {
    id: 'cantante',
    name: 'Negroni',
    role: 'Voz Principal',
    photoUrl: '/images/members/cantante.jpg',
    photoPosition: 'center 85%',
    comment: '¡Aguante la Cumbia Fusión Villera loco! Dejamos el alma en la cancha para que la gente cante, salte y baile sin parar.',
    instagramUrl: 'https://www.instagram.com/negroni_rv/',
  },
  {
    id: 'guitarrista1',
    name: 'Tatan',
    role: 'Guitarra',
    photoUrl: '/images/members/guitarrista1.jpg',
    photoPosition: 'center 9%',
    comment: '¡Solo villero con distorsión y sentimiento! Los clásicos reversionados con todo el poder.',
    instagramUrl: 'https://www.instagram.com/tatan.cm/',
  },
  {
    id: 'guitarrista2',
    name: 'Herector',
    role: 'Guitarra',
    photoUrl: '/images/members/guitarrista2.jpg',
    photoPosition: 'center 75%',
    comment: '¡Marcando el ritmo y la cadencia villera para que la bailanta no pare nunca!',
    instagramUrl: 'https://www.instagram.com/_hector.__/',
  },
  {
    id: 'bajista',
    name: 'Diego',
    role: 'Bajo',
    photoUrl: '/images/members/bajista.jpg',
    photoPosition: 'center 38%',
    comment: '¡Esas frecuencias bajas villeras que te hacen temblar el pecho y mover los pies!',
    instagramUrl: 'https://www.instagram.com/vegamnska/',
  },
  {
    id: 'tecladista',
    name: 'Baby Mocka',
    role: 'Teclado',
    photoUrl: '/images/members/tecladista.jpg',
    photoPosition: 'center 35%',
    comment: '100% Negro Cumbiero.',
    instagramUrl: 'https://www.instagram.com/baby.mocka/',
  },
  {
    id: 'timbalero',
    name: 'Enigman',
    role: 'Timbales',
    photoUrl: '/images/members/timbalero.jpg',
    photoPosition: 'center 65%',
    comment: '¡El repique de timbal bien al frente, marcando el pulso y la fiesta de la Cumbia Fusión Villera!',
    instagramUrl: 'https://www.instagram.com/enigman.alejandro.beats/',
  },
  {
    id: 'conguero',
    name: 'Raul Percusiones',
    role: 'Congas y Percusión',
    photoUrl: '/images/members/conguero.jpg',
    photoPosition: 'center 72%',
    comment: '¡El golpe percutivo que le da el empuje y sabor callejero a cada tema!',
    instagramUrl: 'https://www.instagram.com/ahumada_r_/',
  },
]

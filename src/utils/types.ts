export interface TourDate {
  id: string
  /** Formato YYYY-MM-DD */
  dateIso: string
  city: string
  venue: string
  ticketsUrl: string
}

export interface BandMember {
  id: string
  name: string
  role: string
  photoUrl?: string
  comment?: string
  instagramUrl?: string
}

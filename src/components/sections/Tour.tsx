import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '../../utils/motion'
import { tourDates } from '../../utils/mockData'
import { formatShowDate } from '../../utils/format'

export default function Tour() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      id="tour"
      variants={fadeUp}
      initial={reduceMotion ? false : 'hidden'}
      whileInView={reduceMotion ? undefined : 'show'}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="border-t border-white/10"
    >
      <div className="mx-auto max-w-6xl px-4 py-16">
        <header className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Próximas Fechas
          </h2>
          <p className="mt-2 text-sm text-neutral-300">
            Shows confirmados (mock). Actualizá esta lista desde{' '}
            <span className="text-neutral-200">src/utils/mockData.ts</span>.
          </p>
        </header>

        <ul className="mt-8 grid gap-4">
          {tourDates.map((show) => (
            <li
              key={show.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">
                    {formatShowDate(show.dateIso)}
                  </p>
                  <p className="mt-1 text-sm text-neutral-200">
                    {show.city} · <span className="text-neutral-300">{show.venue}</span>
                  </p>
                </div>

                <a
                  href={show.ticketsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-fuchsia-400/40 bg-fuchsia-500/10 px-5 py-2 text-sm font-semibold text-fuchsia-200 transition hover:border-fuchsia-300/70 hover:bg-fuchsia-500/15 focus:outline-none focus:ring-2 focus:ring-fuchsia-300/70"
                >
                  Comprar Tickets
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  )
}

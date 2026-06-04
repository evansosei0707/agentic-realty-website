import { content } from '../../../lib/content'

export function LogoStrip() {
  const c = content.logos

  return (
    <section
      aria-label="Why agencies trust us"
      className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 md:py-14"
    >
      <p className="text-center font-mono uppercase tracking-[0.16em] text-[10.5px] sm:text-[11px] text-text-muted mb-7 md:mb-9">
        {c.caption}
      </p>

      <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-7">
        {c.points.map((point) => (
          <li
            key={point}
            className="inline-flex items-center gap-2 text-[13px] sm:text-[14px] text-text-secondary"
          >
            <span
              aria-hidden
              className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary-soft text-primary text-[10px] shrink-0"
            >
              ✓
            </span>
            <span className="tracking-tight">{point}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

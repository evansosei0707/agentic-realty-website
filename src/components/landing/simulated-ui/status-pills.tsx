import { status_pills } from '../../../lib/fixtures'

const descriptions: Record<string, string> = {
  'pill-qualified':
    'Lead score crossed 78. Ama confirmed budget, neighborhood and timeline, then handed Kofi off as sales-ready.',
  'pill-viewing':
    'Saturday 11:00 viewing locked for the East Legon 2BR. 24h and 2h reminders are already queued.',
  'pill-paused':
    '4 follow-up sequences are on hold so Ama does not double-tap Kofi while a live conversation is in flight.',
}

const icons: Record<string, React.ReactNode> = {
  'pill-qualified': (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <circle cx="16" cy="12" r="5" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M6 27c1.6-4.5 5.5-7 10-7s8.4 2.5 10 7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="24" cy="9" r="4.25" fill="currentColor" />
      <path
        d="m22 9 1.5 1.5L26 8"
        stroke="var(--tile-bg)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  'pill-viewing': (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <rect
        x="5"
        y="7.5"
        width="22"
        height="19"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M10 4.5v6M22 4.5v6M5 13h22"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="16" cy="19.5" r="2.25" fill="currentColor" />
    </svg>
  ),
  'pill-paused': (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M13 11.5v9M19 11.5v9"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  ),
}

export function StatusPills() {
  return (
    <div className="relative">
      <div className="pills-track flex flex-row lg:flex-col gap-4 lg:gap-5 overflow-x-auto snap-x snap-mandatory lg:overflow-visible lg:snap-none -mx-5 px-5 lg:mx-0 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {status_pills.map((p) => (
          <div
            key={p.id}
            data-pill={p.id}
            className={`${p.id} relative rounded-[24px] md:rounded-[28px] border bg-surface-1 p-5 md:p-6 lg:p-7 min-w-[85%] sm:min-w-[60%] lg:min-w-0 snap-center min-h-[240px] md:min-h-[260px] lg:min-h-0 flex flex-col overflow-hidden shrink-0 lg:shrink`}
            // style={
            //   {
            //     '--lit-accent': '#2bcb8d',
            //     '--tile-bg': 'var(--surface-1)',
            //   } as React.CSSProperties
            // }
          >
            <div
              aria-hidden
              className="lit-glow pointer-events-none absolute inset-0 opacity-0"
              style={{
                background:
                  'radial-gradient(circle at 30% 25%, rgba(43,203,141,0.22), transparent 70%)',
              }}
            />

            <div className="relative flex items-start justify-between">
              <div className="lit-icon-tile w-14 h-14 rounded-2xl bg-surface-3 border border-border-subtle flex items-center justify-center">
                <div className="lit-icon text-text-secondary">
                  {icons[p.id]}
                </div>
              </div>
              <div
                data-pill-label={p.id}
                className="lit-label"
                style={{ '--lit-accent': '#2bcb8d' } as React.CSSProperties}
              >
                <span className="lit-label-title font-mono uppercase tracking-[0.16em] text-[10.5px] leading-none text-text-muted">
                  {p.label}
                </span>
              </div>
            </div>

            <div className="relative mt-auto pt-10">
              <p className="lit-desc text-[18px] md:text-[20px] leading-[1.4] tracking-[-0.01em] text-text-secondary">
                {descriptions[p.id]}
              </p>
              <p className="mt-3 font-mono text-[11px] tracking-[0.04em] text-text-muted">
                {p.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

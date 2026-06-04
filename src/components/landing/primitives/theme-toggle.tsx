import { useTheme, type Theme } from '../../../lib/theme'

type Mode = { value: Theme; label: string; icon: React.ReactNode }

const modes: Mode[] = [
  {
    value: 'light',
    label: 'Light',
    icon: (
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="w-3.5 h-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    ),
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: (
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="w-3.5 h-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
      </svg>
    ),
  },
]

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const activeIndex = Math.max(0, modes.findIndex((m) => m.value === theme))

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={`relative inline-flex items-center p-1 rounded-full border border-border-subtle bg-surface-2/70 backdrop-blur-sm ${className}`}
    >
      <span
        aria-hidden
        className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-surface-1 border border-border-subtle shadow-[0_1px_0_rgba(255,255,255,0.06),0_4px_12px_-6px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-out"
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />
      {modes.map((m) => {
        const active = m.value === theme
        return (
          <button
            key={m.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setTheme(m.value)}
            className={`relative z-10 inline-flex items-center gap-1.5 px-3.5 h-7 rounded-full font-mono text-[11px] uppercase tracking-[0.08em] transition-colors ${
              active
                ? 'text-text-primary'
                : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            <span
              className={`transition-colors ${
                active ? 'text-primary' : 'text-text-muted'
              }`}
            >
              {m.icon}
            </span>
            {m.label}
          </button>
        )
      })}
    </div>
  )
}

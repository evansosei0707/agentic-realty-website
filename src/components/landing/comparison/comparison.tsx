import { content } from '../../../lib/content'
import { useReveal } from '../../../lib/use-reveal'

export function Comparison() {
  const ref = useReveal<HTMLElement>()
  const c = content.comparison
  const hi = c.highlightCol

  return (
    <section
      id="comparison"
      ref={ref}
      className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 md:py-24 scroll-mt-20"
    >
      <div className="max-w-2xl mb-10 md:mb-14">
        <div
          data-reveal
          className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-primary/30 bg-primary-soft font-mono text-[10.5px] tracking-[0.16em] uppercase text-primary"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          {c.eyebrow}
        </div>
        <h2
          data-reveal
          className="font-display text-[28px] sm:text-[36px] md:text-[48px] leading-[1.08] tracking-[-0.02em] font-semibold"
        >
          {c.title}
        </h2>
        <p data-reveal className="mt-4 text-[16px] md:text-[18px] text-text-secondary leading-[1.55]">
          {c.subhead}
        </p>
      </div>

      <div data-reveal className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="min-w-[680px] grid grid-cols-[1.3fr_1fr_1fr_1fr] rounded-[24px] border border-border-subtle overflow-hidden">
          {/* Header row */}
          <div className="bg-surface-2 p-4 md:p-5" />
          {c.columns.map((col, ci) => (
            <div
              key={col}
              className={`p-4 md:p-5 flex items-center justify-center text-center font-semibold text-[13px] md:text-[15px] leading-tight ${
                ci === hi
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface-2 text-text-secondary'
              }`}
            >
              {ci === hi ? (
                <span className="flex flex-col items-center gap-1">
                  <span className="font-mono uppercase tracking-[0.12em] text-[9px] opacity-80">
                    Best value
                  </span>
                  {col}
                </span>
              ) : (
                col
              )}
            </div>
          ))}

          {/* Body rows */}
          {c.rows.map((row, ri) => (
            <Row key={row.label} row={row} hi={hi} last={ri === c.rows.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Row({
  row,
  hi,
  last,
}: {
  row: { label: string; values: readonly string[] }
  hi: number
  last: boolean
}) {
  const border = last ? '' : 'border-b border-border-subtle'
  return (
    <>
      <div
        className={`p-4 md:p-5 text-[13px] md:text-[14px] font-medium text-text-primary bg-surface-1 ${border}`}
      >
        {row.label}
      </div>
      {row.values.map((v, ci) => (
        <div
          key={ci}
          className={`p-4 md:p-5 text-center text-[13px] md:text-[14px] leading-snug ${border} ${
            ci === hi
              ? 'bg-primary-soft text-text-primary font-medium'
              : 'bg-surface-1 text-text-secondary'
          }`}
        >
          {ci === hi && (
            <span aria-hidden className="text-primary mr-1.5">
              ✓
            </span>
          )}
          {v}
        </div>
      ))}
    </>
  )
}

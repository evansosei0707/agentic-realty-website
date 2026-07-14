import { useMemo, useState } from 'react'
import { content } from '../../../lib/content'
import { useReveal } from '../../../lib/use-reveal'
import { DemoCTA } from '../primitives/cta'
import { trackEvent } from '../../../lib/analytics'

// Illustrative assumptions, stated openly. Not pilot results.
const RECOVERED_SHARE = 0.5 // after-hours leads Ama wins back vs a slow human reply
const LEAD_TO_DEAL = 0.1 // conservative share of recovered leads that close

function ghs(n: number) {
  return 'GHS ' + Math.round(n).toLocaleString('en-US')
}

export function RoiCalculator() {
  const ref = useReveal<HTMLElement>()
  const c = content.roi

  const [leads, setLeads] = useState<number>(c.inputs.leads.default)
  const [afterHours, setAfterHours] = useState<number>(c.inputs.afterHours.default)
  const [commission, setCommission] = useState<number>(c.inputs.commission.default)

  const r = useMemo(() => {
    const afterHoursLeads = Math.round((leads * afterHours) / 100)
    const recoveredPerMonth = Math.round(afterHoursLeads * RECOVERED_SHARE)
    const extraDealsPerYear = Math.round(recoveredPerMonth * 12 * LEAD_TO_DEAL)
    const recoveredValuePerYear = extraDealsPerYear * commission
    return {
      afterHoursLeads,
      recoveredPerMonth,
      recoveredValuePerYear,
    }
  }, [leads, afterHours, commission])

  return (
    <section
      id="roi"
      ref={ref}
      className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 md:py-24 scroll-mt-20"
    >
      <div className="max-w-2xl mb-10 md:mb-14">
        <div
          data-reveal
          className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-accent-gold/30 bg-accent-gold-soft font-mono text-[10.5px] tracking-[0.16em] uppercase text-accent-gold"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
          {c.eyebrow}
        </div>
        <h2
          data-reveal
          className="font-display text-[28px] sm:text-[36px] md:text-[48px] leading-[1.08] tracking-[-0.02em] font-semibold"
        >
          {c.title}
        </h2>
        <p data-reveal className="mt-4 text-[15px] md:text-[17px] text-text-secondary leading-[1.55]">
          {c.subhead}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
        {/* Inputs */}
        <div
          data-reveal
          className="bg-surface-1 border border-border-subtle rounded-[24px] p-6 sm:p-8 flex flex-col justify-center gap-7"
        >
          <Slider
            label={c.inputs.leads.label}
            value={leads}
            min={c.inputs.leads.min}
            max={c.inputs.leads.max}
            step={c.inputs.leads.step}
            display={leads.toString()}
            onChange={setLeads}
          />
          <Slider
            label={c.inputs.afterHours.label}
            value={afterHours}
            min={c.inputs.afterHours.min}
            max={c.inputs.afterHours.max}
            step={c.inputs.afterHours.step}
            display={`${afterHours}%`}
            onChange={setAfterHours}
          />
          <Slider
            label={c.inputs.commission.label}
            value={commission}
            min={c.inputs.commission.min}
            max={c.inputs.commission.max}
            step={c.inputs.commission.step}
            display={ghs(commission)}
            onChange={setCommission}
          />
        </div>

        {/* Result */}
        <div
          data-reveal
          className="relative overflow-hidden bg-surface-1 border border-primary-line rounded-[24px] p-6 sm:p-8 flex flex-col"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(43,203,141,0.12), transparent 62%)',
            }}
          />
          <div className="relative">
            <p className="font-mono uppercase tracking-[0.12em] text-[10.5px] text-text-muted">
              Estimated commission Ama recovers
            </p>
            <div className="mt-2 font-display text-[40px] sm:text-[52px] md:text-[60px] leading-none font-semibold tracking-[-0.02em] text-primary tabular-nums">
              {ghs(r.recoveredValuePerYear)}
              <span className="text-text-muted text-[18px] font-sans font-normal">
                {' '}
                /year
              </span>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-4">
              <Stat
                value={`~${r.afterHoursLeads}`}
                label="after-hours leads a month"
              />
              <Stat
                value={`~${r.recoveredPerMonth}`}
                label="recovered every month"
              />
            </div>

            <div className="mt-7 pt-6 border-t border-border-subtle">
              <p className="text-[14px] md:text-[15px] text-text-secondary leading-[1.55]">
                That is money already walking through your door and out again.{' '}
                <span className="text-text-primary font-medium">
                  The system pays for itself the month it saves you one deal.
                </span>
              </p>
              <div className="mt-6">
                <DemoCTA
                  variant="primary"
                  size="lg"
                  location="roi"
                  event="roi.book_demo"
                  className="w-full sm:w-auto"
                >
                  See your real numbers on a demo
                  <span aria-hidden className="ml-2 -mr-0.5">
                    →
                  </span>
                </DemoCTA>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p data-reveal className="mt-6 font-mono text-[11px] text-text-muted leading-[1.5] max-w-3xl">
        {c.note}
      </p>
    </section>
  )
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  display: string
  onChange: (n: number) => void
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between gap-3 mb-2.5">
        <span className="text-[14px] text-text-secondary">{label}</span>
        <span className="font-display text-[20px] font-semibold text-text-primary tabular-nums">
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => {
          onChange(Number(e.target.value))
          trackEvent('roi.adjust', { label })
        }}
        className="w-full accent-primary cursor-pointer h-1.5"
        aria-label={label}
      />
    </label>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-surface-2 border border-border-subtle p-4">
      <div className="font-display text-[26px] md:text-[30px] leading-none font-semibold text-text-primary tabular-nums">
        {value}
      </div>
      <p className="mt-2 text-[12px] text-text-muted leading-[1.4]">{label}</p>
    </div>
  )
}

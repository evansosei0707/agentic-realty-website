import {
  viewings_today,
  week_density,
  type Viewing,
} from '../../../lib/fixtures'
import { NestedCard } from '../primitives/card'

const statusMeta: Record<Viewing['status'], { dot: string; label: string }> = {
  confirmed: { dot: 'bg-primary', label: 'confirmed' },
  pending_confirmation: { dot: 'bg-accent-orange', label: 'pending' },
  completed: { dot: 'bg-text-muted', label: 'done' },
  cancelled: { dot: 'bg-accent-red', label: 'cancelled' },
  no_show: { dot: 'bg-accent-red', label: 'no-show' },
}

function timeOnly(iso: string) {
  return new Date(iso).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  })
}

export function TodayViewings() {
  return (
    <NestedCard className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="font-mono uppercase tracking-[0.08em] text-[11px] text-text-muted">
          Today's viewings
        </div>
        <div className="font-mono text-[11px] text-primary">
          {viewings_today.length} today
        </div>
      </div>

      <ul className="space-y-3">
        {viewings_today.map((v) => {
          const s = statusMeta[v.status]
          return (
            <li
              key={v.id}
              className="flex items-center gap-3 sm:gap-4 py-2 border-b border-border-subtle last:border-0"
            >
              <div className="w-[44px] sm:w-[56px] shrink-0 font-mono text-[12.5px] sm:text-[13px] text-text-primary">
                {timeOnly(v.scheduled_datetime)}
              </div>
              {/* status collapses to just the dot on narrow screens */}
              <span className={`sm:hidden w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />
              <div className="hidden sm:flex items-center gap-2 w-[92px] shrink-0">
                <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                <span className="font-mono text-[11px] text-text-secondary">
                  {s.label}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] text-text-primary font-medium truncate">
                  {v.lead_name}
                </div>
                <div className="text-[12px] text-text-muted truncate">
                  {v.property_label}
                </div>
              </div>
              <div className="font-mono text-[10.5px] sm:text-[11px] text-right flex flex-col sm:flex-row gap-0.5 sm:gap-2 shrink-0">
                <span
                  className={
                    v.reminder_sent_24h ? 'text-primary' : 'text-text-muted'
                  }
                >
                  24h {v.reminder_sent_24h ? '✓' : '·'}
                </span>
                <span
                  className={
                    v.reminder_sent_2h ? 'text-primary' : 'text-text-muted'
                  }
                >
                  2h {v.reminder_sent_2h ? '✓' : '·'}
                </span>
              </div>
            </li>
          )
        })}
      </ul>

      {/* Mini week density */}
      <div className="mt-5 pt-4 border-t border-border-subtle">
        <div className="font-mono uppercase tracking-[0.08em] text-[10px] text-text-muted mb-3">
          This week
        </div>
        <div className="flex gap-2">
          {week_density.map((d) => {
            const today = d.day === 'Wed'
            return (
              <div
                key={d.day}
                className={`flex-1 flex flex-col items-center gap-1.5 py-2 rounded-md ${
                  today
                    ? 'bg-primary-soft border border-primary/30'
                    : ''
                }`}
              >
                <div
                  className={`font-mono text-[10px] ${
                    today ? 'text-primary' : 'text-text-muted'
                  }`}
                >
                  {d.day}
                </div>
                <div
                  className={`text-[13px] font-semibold ${
                    today ? 'text-primary' : 'text-text-primary'
                  }`}
                >
                  {d.count}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </NestedCard>
  )
}

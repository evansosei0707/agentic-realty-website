import {
  activity_14d,
  system_health,
  type SystemHealthRow,
} from '../../../lib/fixtures'
import { NestedCard } from '../primitives/card'
import { Sparkline } from './sparkline'

const statusMeta: Record<
  SystemHealthRow['status'],
  { dot: string; label: string; color: string }
> = {
  healthy: {
    dot: 'bg-primary',
    label: 'running',
    color: 'text-primary',
  },
  retry: {
    dot: 'bg-accent-orange',
    label: 'retrying',
    color: 'text-accent-orange',
  },
  failing: {
    dot: 'bg-accent-red',
    label: 'paused',
    color: 'text-accent-red',
  },
}

function ago(iso: string, now = new Date('2026-05-20T13:10:00Z')) {
  const s = Math.round((now.getTime() - new Date(iso).getTime()) / 1000)
  if (s < 60) return `${s}s ago`
  const m = Math.round(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.round(m / 60)
  return `${h}h ago`
}

export function SystemHealth() {
  return (
    <NestedCard className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="font-mono uppercase tracking-[0.08em] text-[11px] text-text-muted">
          System health
        </div>
        <div className="font-mono text-[11px] text-primary inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          All systems running
        </div>
      </div>

      <div className="overflow-hidden">
        <table className="w-full text-[13px]">
          <thead className="text-text-muted">
            <tr className="text-left font-mono uppercase tracking-wider text-[10px]">
              <th className="pb-3 font-medium">What it does</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium text-right">Last run</th>
            </tr>
          </thead>
          <tbody>
            {system_health.map((row) => {
              const s = statusMeta[row.status]
              return (
                <tr key={row.id} className="border-t border-border-subtle">
                  <td className="py-2.5 text-text-primary">{row.label}</td>
                  <td className="py-2.5">
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                      <span className={`font-mono ${s.color}`}>{s.label}</span>
                    </div>
                  </td>
                  <td className="py-2.5 font-mono text-text-muted text-right">
                    {ago(row.last_run)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div
        className="mt-5 pt-4 border-t border-border-subtle"
        aria-label="14 days of activity. Always on."
      >
        <Sparkline data={activity_14d} />
      </div>
    </NestedCard>
  )
}

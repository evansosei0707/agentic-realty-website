import {
  escalations,
  escalationReasonColor,
  escalationReasonLabel,
} from '../../../lib/fixtures'
import { NestedCard } from '../primitives/card'
import { Pill } from '../primitives/pill'

function relativeTime(iso: string, now = new Date('2026-05-20T13:10:00Z')) {
  const diff = (now.getTime() - new Date(iso).getTime()) / 60000
  const m = Math.round(diff)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.round(m / 60)
  return `${h}h ago`
}

export function EscalationInbox() {
  return (
    <NestedCard className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="font-mono uppercase tracking-[0.08em] text-[11px] text-text-muted">
          Escalation inbox
        </div>
        <div className="font-mono text-[11px] text-accent-orange">
          3 active
        </div>
      </div>

      <ul className="divide-y divide-border-subtle -mx-2">
        {escalations.map((e) => (
          <li key={e.lead_name} className="px-2 py-3.5 flex gap-3">
            <div className="w-9 h-9 rounded-full bg-surface-2 border border-border-subtle flex items-center justify-center font-mono text-[13px] text-text-secondary">
              {e.lead_name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="text-[14px] font-medium text-text-primary">
                  {e.lead_name}
                </div>
                <Pill
                  variant={escalationReasonColor[e.reason]}
                  size="sm"
                  dot
                >
                  {escalationReasonLabel[e.reason]}
                </Pill>
                <div className="ml-auto font-mono text-[11px] text-text-muted">
                  {relativeTime(e.occurred_at)}
                </div>
              </div>
              <div className="font-mono text-[11px] text-text-muted mt-0.5">
                {e.phone_masked}
              </div>
              <div className="text-[13px] text-text-secondary mt-1.5 line-clamp-1">
                “{e.last_message}”
              </div>
            </div>
          </li>
        ))}
      </ul>
    </NestedCard>
  )
}

import { telegram_demo, type TelegramMessage } from '../../../lib/fixtures'
import { NestedCard } from '../primitives/card'

const senderLabel: Record<TelegramMessage['sender'], string> = {
  agent: 'You',
  bot: 'Agentic Realty Bot',
}

function formatDuration(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export function TelegramThread() {
  return (
    <NestedCard className="p-3 sm:p-4">
      {/* header */}
      <div className="flex items-center gap-3 px-3 py-2.5 border-b border-border-subtle">
        <div className="w-9 h-9 rounded-full bg-primary-soft border border-primary/30 flex items-center justify-center text-primary font-semibold text-[14px]">
          S
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-medium text-text-primary leading-tight">
            Agentic Realty Bot
          </div>
          <div className="text-[11px] font-mono text-text-muted leading-tight">
            online · Telegram
          </div>
        </div>
        <div className="text-text-muted text-[18px]">⋯</div>
      </div>

      {/* messages */}
      <div className="px-3 py-5 space-y-3 min-h-[280px] md:min-h-[340px]">
        {telegram_demo.map((m, i) => (
          <TelegramBubble key={m.id} msg={m} index={i + 1} />
        ))}
      </div>

      <div className="px-3 pb-2 pt-1 border-t border-border-subtle flex items-center gap-2">
        <div className="flex-1 h-10 rounded-full bg-surface-2 px-4 text-[13px] text-text-muted flex items-center">
          Message Agentic Realty Bot
        </div>
        <button
          type="button"
          aria-label="Send voice note"
          className="w-10 h-10 rounded-full bg-surface-2 border border-border-subtle flex items-center justify-center text-text-secondary"
        >
          <MicIcon />
        </button>
      </div>
    </NestedCard>
  )
}

function TelegramBubble({
  msg,
  index,
}: {
  msg: TelegramMessage
  index: number
}) {
  const isAgent = msg.sender === 'agent'
  const kind = msg.kind ?? 'text'

  return (
    <div
      className={`msg msg-${index} flex ${isAgent ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-[14px] leading-relaxed ${
          isAgent
            ? 'bg-primary-soft text-text-primary rounded-br-md border border-primary/20'
            : 'bg-surface-2 text-text-primary rounded-bl-md border border-border-subtle'
        }`}
      >
        <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1 flex items-center gap-1.5">
          {senderLabel[msg.sender]}
          {kind === 'confirmation' && <CheckIcon />}
        </div>

        {kind === 'voice' ? (
          <VoiceBubble msg={msg} />
        ) : (
          <div>{msg.message}</div>
        )}
      </div>
    </div>
  )
}

function VoiceBubble({ msg }: { msg: TelegramMessage }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
          <PlayIcon />
        </div>
        <Waveform />
        <span className="font-mono text-[11px] text-text-muted">
          {msg.durationSec != null ? formatDuration(msg.durationSec) : '0:00'}
        </span>
      </div>
      {msg.message && (
        <p className="mt-2 text-[12.5px] text-text-muted leading-snug italic">
          “{msg.message}”
        </p>
      )}
    </div>
  )
}

function Waveform() {
  const bars = [4, 8, 5, 11, 6, 9, 4, 7, 10, 5, 8, 6]
  return (
    <div className="flex items-end gap-0.5 h-4 flex-1 min-w-0 max-w-[120px]">
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-[2px] rounded-full bg-primary/50"
          style={{ height: `${h * 1.25}px` }}
        />
      ))}
    </div>
  )
}

function MicIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M6 11a6 6 0 0 0 12 0" />
      <path d="M12 17v4" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="11"
      height="11"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary"
      aria-label="confirmed"
    >
      <path d="M3 8.5 6.5 12 13 4.5" />
    </svg>
  )
}

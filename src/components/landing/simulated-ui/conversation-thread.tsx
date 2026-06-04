import { conversation_script, type ConversationMessage } from '../../../lib/fixtures'

const senderName: Record<ConversationMessage['direction'], string> = {
  inbound: 'Kofi',
  outbound: 'Ama',
}

function formatTime(iso: string) {
  const d = new Date(iso)
  return d.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function ConversationThread() {
  return (
    <div className="whatsapp-section phone-frame relative w-full max-w-[400px] mx-auto rounded-[28px] border border-border-strong bg-surface-1 p-3 shadow-[0_0_0_8px_rgba(255,255,255,0.02)]">
      {/* phone notch */}
      <div className="flex justify-center mb-3">
        <div className="w-24 h-1.5 rounded-full bg-surface-3" />
      </div>

      {/* header */}
      <div className="flex items-center gap-3 px-3 py-2.5 border-b border-border-subtle">
        <div className="w-9 h-9 rounded-full bg-accent-green-soft border border-accent-green/30 flex items-center justify-center text-accent-green font-semibold text-[14px]">
          A
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-medium text-text-primary leading-tight">
            Ama
          </div>
          <div className="text-[11px] font-mono text-text-muted leading-tight">
            online · WhatsApp
          </div>
        </div>
        <div className="text-text-muted text-[18px]">⋯</div>
      </div>

      {/* messages */}
      <div className="px-3 py-5 space-y-3 min-h-[320px] md:min-h-[420px]">
        {conversation_script.map((msg, i) => (
          <Bubble key={msg.id} msg={msg} index={i + 1} />
        ))}
      </div>

      <div className="px-3 pb-2 pt-1 border-t border-border-subtle flex items-center gap-2">
        <div className="flex-1 h-11 rounded-full bg-surface-3 px-4 text-[13px] text-text-muted flex items-center">
          Message
        </div>
        <div className="w-11 h-11 rounded-full bg-accent-green flex items-center justify-center text-black text-[16px]">
          ↑
        </div>
      </div>
    </div>
  )
}

function Bubble({ msg, index }: { msg: ConversationMessage; index: number }) {
  const isInbound = msg.direction === 'inbound'
  return (
    <div
      className={`msg msg-${index} flex ${isInbound ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-[14px] leading-relaxed ${
          isInbound
            ? 'bg-surface-3 text-text-primary rounded-bl-md'
            : 'bg-accent-green-soft text-text-primary rounded-br-md border border-accent-green/20'
        }`}
      >
        <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1">
          {senderName[msg.direction]} · {formatTime(msg.created_at)}
        </div>
        {msg.message}
      </div>
    </div>
  )
}

import type { ReactNode } from 'react'
import type { ServiceMedia } from '../../../lib/content'

/**
 * A framed media slot with a museum-style plaque caption.
 *
 * When `media.src` is set it renders the image or video full-bleed.
 * Until then it shows a drafting-table placeholder (blueprint grid,
 * corner ticks, centred icon) so the page looks finished while the
 * real footage is being produced. Swap media in via lib/content.ts.
 */
export function MediaFrame({
  media,
  num,
  icon,
  className = '',
}: {
  media: ServiceMedia
  num?: string
  icon?: ReactNode
  className?: string
}) {
  return (
    <figure className={`m-0 ${className}`}>
      <div className="relative aspect-[16/10] rounded-[20px] border border-border-subtle bg-surface-2 overflow-hidden">
        {media.src ? (
          media.kind === 'video' ? (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={media.src}
              poster={media.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={media.alt}
            />
          ) : (
            <img
              className="absolute inset-0 w-full h-full object-cover"
              src={media.src}
              alt={media.alt}
              loading="lazy"
            />
          )
        ) : (
          <Placeholder kind={media.kind} icon={icon} />
        )}
      </div>

      <figcaption className="mt-3 flex items-baseline justify-between gap-4 px-1">
        <span className="text-[12.5px] text-text-secondary leading-snug">
          {media.label}
        </span>
        {num && (
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
            Plate {num}
          </span>
        )}
      </figcaption>
    </figure>
  )
}

function Placeholder({
  kind,
  icon,
}: {
  kind: 'image' | 'video'
  icon?: ReactNode
}) {
  return (
    <div className="absolute inset-0">
      {/* drafting grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, var(--border-subtle) 0 1px, transparent 1px 44px), repeating-linear-gradient(90deg, var(--border-subtle) 0 1px, transparent 1px 44px)',
        }}
      />
      {/* soft emerald bloom behind the mark */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(38% 42% at 50% 46%, rgba(43,203,141,0.08), transparent 70%)',
        }}
      />
      {/* corner ticks */}
      <CornerTicks />

      {/* centre mark */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <span className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-border-strong bg-surface-1 text-text-secondary">
          {icon ?? <DefaultMark kind={kind} />}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted">
          {kind === 'video' ? 'Film · 16:10' : 'Still · 16:10'}
        </span>
      </div>
    </div>
  )
}

/** Four hairline L-marks, one per corner, like a mounted print. */
function CornerTicks() {
  const tick = 'absolute w-4 h-4 border-border-strong'
  return (
    <div aria-hidden>
      <span className={`${tick} top-3 left-3 border-t border-l rounded-tl-[3px]`} />
      <span className={`${tick} top-3 right-3 border-t border-r rounded-tr-[3px]`} />
      <span className={`${tick} bottom-3 left-3 border-b border-l rounded-bl-[3px]`} />
      <span className={`${tick} bottom-3 right-3 border-b border-r rounded-br-[3px]`} />
    </div>
  )
}

function DefaultMark({ kind }: { kind: 'image' | 'video' }) {
  return kind === 'video' ? (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden>
      <path
        d="M9.5 8.8v6.4c0 .62.68 1 1.21.68l5.33-3.2a.8.8 0 0 0 0-1.37L10.71 8.1a.8.8 0 0 0-1.21.69Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden>
      <rect x="4.75" y="5.75" width="14.5" height="12.5" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9.5" cy="10" r="1.4" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5.5 16.5l4-3.6 3 2.6 3.4-3 2.6 2.3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

import type { ReactNode } from 'react'
import type { ServiceMedia } from '../../../lib/content'
import { LazyVideo, PhoneFrame } from './device-frame'

/**
 * A framed media slot with a museum-style plaque caption.
 *
 * When `media.src` is set it renders the image or video full-bleed —
 * portrait recordings get mounted inside a phone bezel on a lit stage,
 * landscape ones fill the frame. Until then it shows a drafting-table
 * placeholder (blueprint grid, corner ticks, centred icon) so the page
 * looks finished while the real footage is being produced.
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
  const portrait = media.kind === 'video' && media.orientation === 'portrait'

  return (
    <figure className={`m-0 ${className}`}>
      <div
        className={`relative rounded-[20px] border border-border-subtle bg-surface-2 overflow-hidden ${
          portrait ? 'aspect-[4/4.4] sm:aspect-[16/12]' : 'aspect-[16/10]'
        }`}
      >
        {media.src ? (
          media.kind === 'video' ? (
            portrait ? (
              <PortraitStage media={media} />
            ) : (
              <LazyVideo
                className="absolute inset-0 w-full h-full object-cover"
                src={media.src}
                poster={media.poster}
                alt={media.alt}
              />
            )
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

/** A phone bezel product-shot: real footage centred on a lit backdrop. */
function PortraitStage({ media }: { media: ServiceMedia }) {
  return (
    <div className="absolute inset-0">
      {/* drafting grid backdrop, echoing the placeholder language */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, var(--border-subtle) 0 1px, transparent 1px 44px), repeating-linear-gradient(90deg, var(--border-subtle) 0 1px, transparent 1px 44px)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 60% at 50% 40%, rgba(43,203,141,0.1), transparent 72%)',
        }}
      />
      <div className="absolute inset-0 flex items-start justify-center pt-5 sm:pt-7">
        <PhoneFrame
          src={media.src}
          poster={media.poster}
          alt={media.alt}
          className="w-[46%] sm:w-[38%] max-w-[230px]"
        />
      </div>
      {/* bottom fade so the phone appears to sink into the plinth */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-16"
        style={{
          background: 'linear-gradient(180deg, transparent, var(--surface-2))',
        }}
      />
    </div>
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

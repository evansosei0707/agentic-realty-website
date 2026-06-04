type LogoProps = {
  className?: string
  height?: number
  alt?: string
  /** show the full wordmark lockup (default) or just the house mark */
  wordmark?: boolean
  /** use the dark-wordmark version, for light/print backgrounds */
  onLight?: boolean
}

/**
 * The official Agentic Realty logo. Three artworks live in /public:
 *  - logo.png       full lockup, light wordmark (for dark backgrounds)
 *  - logo-dark.png  full lockup, dark wordmark (for light / print)
 *  - logo-mark.png  the house mark only, square (favicon / avatars / tight spaces)
 */
export function Logo({
  className = '',
  height,
  alt = 'Agentic Realty',
  wordmark = true,
  onLight = false,
}: LogoProps) {
  const src = !wordmark
    ? '/logo-mark.png'
    : onLight
      ? '/logo-dark.png'
      : '/logo.png'

  return (
    <img
      src={src}
      alt={alt}
      style={height ? { height, width: 'auto' } : undefined}
      className={`select-none ${className}`}
      draggable={false}
    />
  )
}

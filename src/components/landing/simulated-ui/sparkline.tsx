export function Sparkline({
  data,
  width = 280,
  height = 60,
  color = '#2bcb8d',
}: {
  data: number[]
  width?: number
  height?: number
  color?: string
}) {
  if (data.length < 2) return null
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const stepX = width / (data.length - 1)
  const points = data.map((v, i) => {
    const x = i * stepX
    const y = height - ((v - min) / range) * (height - 8) - 4
    return [x, y] as const
  })
  const d = points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(' ')
  const lastX = points[points.length - 1][0]
  const lastY = points[points.length - 1][1]

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="block"
    >
      <path d={d} stroke={color} strokeWidth="1.5" fill="none" />
      <circle cx={lastX} cy={lastY} r="3" fill={color} />
    </svg>
  )
}

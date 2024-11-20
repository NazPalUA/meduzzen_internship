export function generateDistinctColors(count: number, saturation = 70, lightness = 50): string[] {
  const hues = Array.from({ length: count }, (_, i) => (i * (360 / count)) % 360)

  return hues.map((hue) => `hsl(${hue}, ${saturation}%, ${lightness}%)`)
}

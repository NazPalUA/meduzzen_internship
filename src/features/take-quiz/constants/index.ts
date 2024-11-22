export const SCORE_COLORS = {
  excellent: "var(--mui-palette-success-main)",
  good: "var(--mui-palette-warning-main)",
  needsPractice: "var(--mui-palette-error-main)",
} as const

export const SCORE_RANGE = {
  excellent: 80,
  good: 60,
  needsPractice: 0,
} as const

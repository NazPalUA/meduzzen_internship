import { SCORE_COLORS, SCORE_RANGE } from "../constants"

type ScoreCategory = keyof typeof SCORE_COLORS

export const getScoreCategory = (result_score: number): ScoreCategory => {
  if (result_score >= SCORE_RANGE.excellent) return "excellent"
  if (result_score >= SCORE_RANGE.good) return "good"
  return "needsPractice"
}

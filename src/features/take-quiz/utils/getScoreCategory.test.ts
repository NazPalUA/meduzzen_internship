import { getScoreCategory } from "./getScoreCategory"

test("returns 'excellent' when score is equal or above the excellent threshold", () => {
  expect(getScoreCategory(80)).toBe("excellent")
  expect(getScoreCategory(100)).toBe("excellent")
})

test("returns 'good' when score is between good and excellent thresholds", () => {
  expect(getScoreCategory(60)).toBe("good")
  expect(getScoreCategory(79)).toBe("good")
})

test("returns 'needsPractice' when score is below the good threshold", () => {
  expect(getScoreCategory(0)).toBe("needsPractice")
  expect(getScoreCategory(59)).toBe("needsPractice")
})

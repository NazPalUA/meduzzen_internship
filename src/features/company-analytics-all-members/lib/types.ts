import { CompanyDataUser } from "@features/company-data"
import { Rating } from "@shared/api"

export type TimeRange = {
  label: string
  value: string
  getDateRange: () => { start: Date; end: Date }
  timeUnit: "minute" | "hour" | "day" | "week" | "month"
}

export type AnalyticsRating = Omit<Rating, "pass_at"> & { pass_at: Date }

export type AnalyticsData = Array<{ rating: AnalyticsRating[]; user: CompanyDataUser }>

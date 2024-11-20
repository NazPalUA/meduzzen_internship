import { AllUsersAnalytics, CompanyDataUser } from "@features/company-data"
import { AnalyticsData } from "./types"

export function getAnalyticsData(analytics: AllUsersAnalytics[], members: CompanyDataUser[]) {
  const membersMap = new Map(members.map((member) => [member.user_id, member]))

  return analytics.reduce<AnalyticsData>((acc, item) => {
    const member = membersMap.get(item.user_id)
    if (member) {
      acc.push({
        rating: item.rating.map((rating) => ({ ...rating, pass_at: new Date(rating.pass_at) })),
        user: member,
      })
    }
    return acc
  }, [])
}

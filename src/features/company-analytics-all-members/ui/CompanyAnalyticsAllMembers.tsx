"use client"

import {
  useGetCompanyMembersListQuery,
  useGetSummaryRatingAnalyticForUsersQuery,
} from "@features/company-data"
import { ErrorMessage, LoadingSpinner } from "@shared/components/ui"
import { useTranslations } from "next-intl"
import { Analytics } from "./Analytics"

export function CompanyAnalyticsAllMembers({ companyId }: { companyId: number }) {
  const {
    data: analytics,
    isLoading: isAnalyticsLoading,
    isError: isAnalyticsError,
  } = useGetSummaryRatingAnalyticForUsersQuery(companyId)

  const {
    data: members,
    isLoading: isMembersLoading,
    isError: isMembersError,
  } = useGetCompanyMembersListQuery(companyId)

  const t = useTranslations("CompanyPage.analytics.allUsers")

  if (isAnalyticsLoading || isMembersLoading) return <LoadingSpinner />
  if (isAnalyticsError || isMembersError) return <ErrorMessage />
  if (!analytics || !members) return <p>{t("noAnalytics")}</p>

  return <Analytics rawAnalyticsData={analytics} membersData={members} />
}

"use client"

import { AllUsersAnalytics as AllUsersAnalyticsType, CompanyDataUser } from "@features/company-data"
import { useMemo } from "react"
import { useTimeRanges } from "../lib/hooks/useTimeRanges"
import { getAnalyticsData } from "../lib/utils"
import { Chart } from "./Chart"
import { TimeRangeSelector } from "./TimeRangeSelector"

export function Analytics({
  rawAnalyticsData,
  membersData,
}: {
  rawAnalyticsData: AllUsersAnalyticsType[]
  membersData: CompanyDataUser[]
}) {
  const analyticsData = useMemo(
    () => getAnalyticsData(rawAnalyticsData, membersData),
    [rawAnalyticsData, membersData],
  )

  const { selectedRange, handleRangeChange, timeRanges } = useTimeRanges()

  return (
    <div>
      <TimeRangeSelector
        selectedRange={selectedRange}
        timeRanges={timeRanges}
        handleRangeChange={handleRangeChange}
      />
      <Chart analyticsData={analyticsData} selectedRange={selectedRange} />
    </div>
  )
}

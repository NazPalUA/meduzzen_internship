import { SelectChangeEvent } from "@mui/material"
import { useTranslations } from "next-intl"
import { useMemo, useState } from "react"
import { TimeRange } from "../types"

export function useTimeRanges() {
  const t = useTranslations("CompanyPage.analytics.allUsers.timeRange")

  const timeRanges = useMemo(() => {
    const HOUR_IN_MS = 3600000
    const DAY_IN_MS = 86400000

    const getStartDate = (milliseconds: number) => new Date(Date.now() - milliseconds)

    const timeRanges: TimeRange[] = [
      {
        label: t("lastHour"),
        value: "hour",
        timeUnit: "minute",
        getDateRange: () => ({
          start: getStartDate(HOUR_IN_MS),
          end: new Date(),
        }),
      },
      {
        label: t("last12Hours"),
        value: "12hours",
        timeUnit: "hour",
        getDateRange: () => ({
          start: getStartDate(12 * HOUR_IN_MS),
          end: new Date(),
        }),
      },
      {
        label: t("lastDay"),
        value: "day",
        timeUnit: "hour",
        getDateRange: () => ({
          start: getStartDate(DAY_IN_MS),
          end: new Date(),
        }),
      },
      {
        label: t("last3Days"),
        value: "3days",
        timeUnit: "day",
        getDateRange: () => ({
          start: getStartDate(3 * DAY_IN_MS),
          end: new Date(),
        }),
      },
      {
        label: t("lastWeek"),
        value: "week",
        timeUnit: "day",
        getDateRange: () => ({
          start: getStartDate(7 * DAY_IN_MS),
          end: new Date(),
        }),
      },
      {
        label: t("lastMonth"),
        value: "month",
        timeUnit: "day",
        getDateRange: () => ({
          start: getStartDate(30 * DAY_IN_MS),
          end: new Date(),
        }),
      },
      {
        label: t("lastYear"),
        value: "year",
        timeUnit: "month",
        getDateRange: () => ({
          start: getStartDate(365 * DAY_IN_MS),
          end: new Date(),
        }),
      },
    ]
    return timeRanges
  }, [t])

  const [selectedRange, setSelectedRange] = useState(timeRanges[2])

  const handleRangeChange = (event: SelectChangeEvent) => {
    const newRange = timeRanges.find((range) => range.value === event.target.value)
    if (newRange) setSelectedRange(newRange)
  }

  return {
    selectedRange,
    handleRangeChange,
    timeRanges,
  }
}

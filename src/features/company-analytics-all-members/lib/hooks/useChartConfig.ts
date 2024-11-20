import { useChartTypography } from "@/src/widgets/User/hooks/useChartTypography"
import { useTranslations } from "next-intl"
import { useMemo } from "react"
import { TimeRange } from "../types"

export function useChartConfig(selectedRange: TimeRange) {
  const t = useTranslations("CompanyPage.analytics.allUsers")

  const { legendLabels, axisTitle, chartTitle } = useChartTypography()

  return useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
          labels: { ...legendLabels },
        },
        title: { ...chartTitle(t("chartTitle")) },
      },
      scales: {
        x: {
          type: "time" as const,
          time: {
            unit: selectedRange.timeUnit,
            tooltipFormat: "Pp",
            displayFormats: {
              hour: "HH:mm",
              day: "MMM d",
              week: "MMM d",
              month: "MMM",
            },
          },
          title: { ...axisTitle(t("dateAxisLabel")) },

          min: selectedRange.getDateRange().start.toISOString(),
          max: selectedRange.getDateRange().end.toISOString(),
        },
        y: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 10,
          },
          title: { ...axisTitle(t("scoreAxisLabel")) },
        },
      },
    }),
    [selectedRange, legendLabels, axisTitle, chartTitle, t],
  )
}

import { useTheme } from "@mui/material"
import { useTranslations } from "next-intl"
import { useMemo } from "react"
import { TimeRange } from "../types"

export function useChartConfig(selectedRange: TimeRange) {
  const t = useTranslations("CompanyPage.analytics.allUsers")
  const theme = useTheme()

  return useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
          labels: {
            color: theme.palette.text.primary,
          },
        },
        title: {
          display: true,
          text: t("chartTitle"),
          color: theme.palette.text.primary,
          font: {
            size: 24,
          },
        },
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
          title: {
            display: true,
            text: t("dateAxisLabel"),
            color: theme.palette.text.primary,
            font: {
              size: 16,
            },
          },

          min: selectedRange.getDateRange().start.toISOString(),
          max: selectedRange.getDateRange().end.toISOString(),
        },
        y: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 10,
          },
          title: {
            display: true,
            text: t("scoreAxisLabel"),
            color: theme.palette.text.primary,
            font: {
              size: 16,
            },
          },
        },
      },
    }),
    [selectedRange, theme, t],
  )
}

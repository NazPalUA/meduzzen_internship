"use client"

import { UserDataRatingAnalyticForQuizResponse } from "@features/user-data"
import { useTheme } from "@mui/material/styles"
import { useChartTypography } from "@shared/hooks"
import { formatDate } from "@shared/utils"
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js"
import { useTranslations } from "next-intl"
import { useMemo } from "react"
import { Line } from "react-chartjs-2"
import styles from "./Styles.module.scss"

const MAX_SHOWN_ATTEMPTS = 10

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export function QuizAnalytics({
  ratingAnalytic,
  label,
}: {
  ratingAnalytic: UserDataRatingAnalyticForQuizResponse["result"]["rating"]
  label: string
}) {
  const t = useTranslations("UserPage.quizzes.analytics")
  const { axisTitle, chartTitle, legendLabels } = useChartTypography()
  const theme = useTheme()

  const sortedAnalytics = useMemo(
    () =>
      [...ratingAnalytic]
        .sort((a, b) => new Date(a.pass_at).getTime() - new Date(b.pass_at).getTime())
        .slice(-MAX_SHOWN_ATTEMPTS),
    [ratingAnalytic],
  )

  const data = useMemo(
    () => ({
      labels: sortedAnalytics.map((entry) => formatDate(entry.pass_at)),
      datasets: [
        {
          label,
          data: sortedAnalytics.map((entry) => entry.average_rating),
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          tension: 0.1,
        },
      ],
    }),
    [sortedAnalytics, label, theme.palette],
  )

  const options = useMemo(
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
        y: {
          max: 100,
          min: 0,
          title: { ...axisTitle(t("scoreAxisLabel")) },
        },
        x: {
          title: { ...axisTitle(t("dateAxisLabel")) },
        },
      },
    }),
    [t, legendLabels, axisTitle, chartTitle],
  )

  return (
    <div>
      <Line className={styles.chart} options={options} data={data} />
    </div>
  )
}

"use client"

import { UserDataRatingAnalyticForQuizResponse } from "@features/user-data"
import { useTheme } from "@mui/material/styles"
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
          borderColor: theme.palette.primary.main,
          backgroundColor: theme.palette.primary.light,
          tension: 0.3,
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
        y: {
          beginAtZero: true,
          max: 100,
          min: 0,
          ticks: {
            stepSize: 5,
            color: theme.palette.text.secondary,
          },
          title: {
            display: true,
            text: t("scoreAxisLabel"),
            color: theme.palette.text.primary,
            font: {
              size: 16,
            },
          },
          grid: {
            color: theme.palette.divider,
          },
        },
        x: {
          title: {
            display: true,
            text: t("dateAxisLabel"),
            color: theme.palette.text.primary,
            font: {
              size: 16,
            },
          },
          ticks: {
            color: theme.palette.text.secondary,
          },
          grid: {
            color: theme.palette.divider,
          },
        },
      },
    }),
    [t, theme.palette],
  )

  return (
    <div className={styles.analyticsContainer}>
      <Line options={options} data={data} />
    </div>
  )
}

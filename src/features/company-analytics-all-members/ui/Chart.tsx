"use client"

import { generateDistinctColors } from "@shared/utils"
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from "chart.js"
import "chartjs-adapter-date-fns"
import { useMemo } from "react"
import { Line } from "react-chartjs-2"
import { useChartConfig } from "../lib/hooks/useChartConfig"
import { AnalyticsData, TimeRange } from "../lib/types"
import styles from "./Styles.module.scss"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
)

export function Chart({
  analyticsData,
  selectedRange,
}: {
  analyticsData: AnalyticsData
  selectedRange: TimeRange
}) {
  const chartData = useMemo(() => {
    const colors = generateDistinctColors(analyticsData.length)
    return {
      datasets: analyticsData.map((dataSet, index) => ({
        label: `${dataSet.user.user_firstname} ${dataSet.user.user_lastname}`,
        data: dataSet.rating.map((value) => ({
          x: value.pass_at,
          y: value.average_rating,
        })),
        borderColor: colors[index],
        backgroundColor: colors[index],
        tension: 0.1,
      })),
    }
  }, [analyticsData])

  const options = useChartConfig(selectedRange)

  return <Line className={styles.chart} data={chartData} options={options} />
}

import { useTheme } from "@mui/material"

export function useChartTypography() {
  const theme = useTheme()

  const legendLabels = () => ({
    color: theme.palette.text.primary,
    font: {
      size: 14,
    },
  })

  const axisTitle = (label: string) => ({
    display: true,
    text: label,
    color: theme.palette.text.primary,
    font: {
      size: 16,
    },
  })

  const chartTitle = (label: string) => ({
    display: true,
    text: label,
    color: theme.palette.text.primary,
    font: {
      size: 24,
    },
  })

  return {
    legendLabels,
    axisTitle,
    chartTitle,
  }
}

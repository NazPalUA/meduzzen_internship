import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useTranslations } from "next-intl"
import { TimeRange } from "../lib/types"
import styles from "./Styles.module.scss"

export function TimeRangeSelector({
  selectedRange,
  timeRanges,
  handleRangeChange,
}: {
  selectedRange: TimeRange
  timeRanges: TimeRange[]
  handleRangeChange: (event: SelectChangeEvent) => void
}) {
  const t = useTranslations("CompanyPage.analytics.allUsers")

  return (
    <FormControl className={styles.timeRangeSelector}>
      <InputLabel size="small">{t("timeRange.label")}</InputLabel>
      <Select
        size="small"
        value={selectedRange.value}
        label={t("timeRange.label")}
        onChange={handleRangeChange}
      >
        {timeRanges.map((range) => (
          <MenuItem key={range.value} value={range.value}>
            {range.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

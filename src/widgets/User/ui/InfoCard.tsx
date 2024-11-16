import clsx from "clsx"
import { ReactNode } from "react"
import styles from "./Styles.module.scss"

type Props = {
  label: string
  value: string | ReactNode | null
  icon: ReactNode
}

export function InfoCard({ label, value, icon }: Props) {
  const isSimpleValue = typeof value === "string" || value === null
  const displayValue = isSimpleValue ? value || "—" : value

  const valueClassName = clsx(styles.info__cardValue, !value && styles.info__noValue)

  return (
    <div className={styles.info__card}>
      {icon}
      <div>
        <strong className={styles.info__cardLabel}>{label}</strong>

        {isSimpleValue ? <span className={valueClassName}>{displayValue}</span> : displayValue}
      </div>
    </div>
  )
}

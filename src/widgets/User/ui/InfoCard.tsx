import clsx from "clsx"
import { ReactNode } from "react"
import styles from "./Styles.module.scss"

type Props = {
  label: string
  value: string | ReactNode | null
  icon: ReactNode
}

export function InfoCard({ label, value, icon }: Props) {
  return (
    <div className={styles.info__card}>
      {icon}
      <div>
        <strong className={styles.info__cardLabel}>{label}</strong>
        {typeof value === "string" || value === null ? (
          <span className={clsx(styles.info__cardValue, !value && styles.info__noValue)}>
            {value || "—"}
          </span>
        ) : (
          value
        )}
      </div>
    </div>
  )
}

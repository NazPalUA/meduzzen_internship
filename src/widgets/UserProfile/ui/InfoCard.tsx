import clsx from "clsx"
import styles from "./InfoCard.module.scss"

type Props = {
  label: string
  value: string | React.ReactNode | null
  icon: React.ReactNode
}

export function InfoCard({ label, value, icon }: Props) {
  return (
    <div className={styles.container}>
      {icon}
      <div>
        <strong className={styles.label}>{label}</strong>
        {typeof value === "string" || value === null ? (
          <span className={clsx(styles.value, !value && styles.noValue)}>{value || "—"}</span>
        ) : (
          value
        )}
      </div>
    </div>
  )
}

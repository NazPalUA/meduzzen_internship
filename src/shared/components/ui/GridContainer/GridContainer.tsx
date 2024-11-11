import styles from "./GridContainer.module.scss"

export function GridContainer({ children }: { children: React.ReactNode }) {
  return <div className={styles.container}>{children}</div>
}

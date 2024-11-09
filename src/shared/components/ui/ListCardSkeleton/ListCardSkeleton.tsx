import { Skeleton } from "@shared/components/ui"
import styles from "./ListCardSkeleton.module.scss"

export function ListCardSkeleton() {
  return (
    <div className={styles.container}>
      <Skeleton className={styles.avatar} />
      <div className={styles.details}>
        <Skeleton className={styles.name} />
        <Skeleton className={styles.email} />
      </div>
    </div>
  )
}

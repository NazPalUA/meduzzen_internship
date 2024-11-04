import { Skeleton } from "@/src/shared/ui/Skeleton"
import styles from "./CardSkeleton.module.scss"

export function CardSkeleton() {
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

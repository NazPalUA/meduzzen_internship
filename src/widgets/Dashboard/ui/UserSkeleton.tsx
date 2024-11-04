import { Skeleton } from "@/src/shared/ui/Skeleton"
import styles from "./UserSkeleton.module.scss"

export function UserSkeleton() {
  return (
    <div className={styles.currentUserContainer}>
      <h3 className={styles.heading}>
        <Skeleton className={styles.headingSkeleton} />
      </h3>
      <div className={styles.userInfo}>
        <FieldSkeleton />
        <FieldSkeleton />
        <FieldSkeleton />
      </div>
    </div>
  )
}

function FieldSkeleton() {
  return (
    <div className={styles.userField}>
      <Skeleton className={styles.labelSkeleton} />
      <Skeleton className={styles.valueSkeleton} />
    </div>
  )
}

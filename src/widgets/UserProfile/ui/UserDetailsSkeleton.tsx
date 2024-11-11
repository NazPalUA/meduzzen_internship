import { Skeleton } from "@shared/components/ui"
import styles from "./UserDetailsSkeleton.module.scss"

export function UserDetailsSkeleton() {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.header}>
        <Skeleton className={styles.avatarSkeleton} />
        <div className={styles.userInfoHeader}>
          <Skeleton className={styles.nameSkeleton} />
          <Skeleton className={styles.badgeSkeleton} />
        </div>
      </div>
      <div className={styles.userInfo}>
        {[...Array(5)].map((_, index) => (
          <div key={index} className={styles.infoCardSkeleton}>
            <Skeleton className={styles.iconSkeleton} />
            <div className={styles.fieldContentSkeleton}>
              <Skeleton className={styles.labelSkeleton} />
              <Skeleton className={styles.valueSkeleton} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

import clsx from "clsx"
import * as React from "react"
import styles from "./Container.module.scss"

export const Container = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={clsx(styles.container, className)} {...props} />
  ),
)

Container.displayName = "Container"

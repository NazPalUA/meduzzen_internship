import { Chip } from "@mui/material"
import styles from "./Styles.module.scss"

export function SubHeader({ title, isVisible }: { title: string | null; isVisible: boolean }) {
  return (
    <>
      {title && <strong className={styles.headerSubTitle}>{title}</strong>}
      <Chip
        size="small"
        label={isVisible ? "Visible" : "Hidden"}
        color={isVisible ? "success" : "warning"}
      />
    </>
  )
}

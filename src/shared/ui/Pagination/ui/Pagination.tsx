"use client"

import { useTranslations } from "next-intl"
import { getPages } from "../utils/getPages"
import styles from "./Pagination.module.scss"

type Props = {
  totalPages: number
  currentPage: number
  setPage: (page: number) => void
}

export function Pagination({ totalPages, currentPage, setPage }: Props) {
  const t = useTranslations("Common")

  const pages = getPages(totalPages, currentPage)

  return (
    <div className={styles.container}>
      <button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.pageButton}
      >
        {t("previousPage")}
      </button>

      {pages.map((page, index) =>
        page === "ellipsis" ? (
          <span key={`ellipsis-${index}`} className={styles.ellipsis}>
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => setPage(page as number)}
            className={`${styles.pageButton} ${page === currentPage ? styles.active : ""}`}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.pageButton}
      >
        {t("nextPage")}
      </button>
    </div>
  )
}

"use client"

import { useRouter } from "@navigation"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { getPages } from "../utils/getPages"
import styles from "./Pagination.module.scss"

type Props = {
  totalPages: number
}

export function Pagination({ totalPages }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPageParam = searchParams.get("page")
  const currentPage = currentPageParam ? parseInt(currentPageParam) : 1
  const t = useTranslations("Common")

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()))
    params.set("page", page.toString())
    router.push(`?${params.toString()}`)
  }

  const pages = getPages(totalPages, currentPage)

  return (
    <div className={styles.container}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
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
            onClick={() => handlePageChange(page as number)}
            className={`${styles.pageButton} ${page === currentPage ? styles.active : ""}`}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.pageButton}
      >
        {t("nextPage")}
      </button>
    </div>
  )
}

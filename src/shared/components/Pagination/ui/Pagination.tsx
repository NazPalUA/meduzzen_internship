"use client"

import Button from "@mui/material/Button"
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
      <Button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
        variant="outlined"
      >
        {t("previousPage")}
      </Button>

      {pages.map((page, index) =>
        page === "ellipsis" ? (
          <Button variant="text" key={`ellipsis-${index}`} disabled>
            ...
          </Button>
        ) : (
          <Button
            key={page}
            onClick={() => setPage(page as number)}
            variant={page === currentPage ? "contained" : "outlined"}
            color={page === currentPage ? "primary" : "inherit"}
          >
            {page}
          </Button>
        ),
      )}

      <Button
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="outlined"
      >
        {t("nextPage")}
      </Button>
    </div>
  )
}

export const getPages = (
  totalPages: number,
  currentPage: number,
  showButtons: 7 | 9 | 11 | 13 = 9,
): (number | "ellipsis")[] => {
  const pages: (number | "ellipsis")[] = []

  // First and Last page numbers
  const numberOfFixedButtons = 2

  // Slots for both pages and ellipses between first and last pages
  const numberOfDynamicButtons = showButtons - numberOfFixedButtons

  let startPage: number
  let endPage: number
  let hasLeftEllipsis = false
  let hasRightEllipsis = false

  if (totalPages <= showButtons) {
    // No ellipses needed, display all pages
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    pages.push(1) // First page

    // Determine if we need ellipses
    if (currentPage <= numberOfDynamicButtons - Math.floor(numberOfDynamicButtons / 2)) {
      // Near the start
      startPage = 2
      endPage = numberOfDynamicButtons
      hasRightEllipsis = true
    } else if (
      currentPage >=
      totalPages - (numberOfDynamicButtons - Math.floor(numberOfDynamicButtons / 2) - 1)
    ) {
      // Near the end
      startPage = totalPages - numberOfDynamicButtons + 1
      endPage = totalPages - 1
      hasLeftEllipsis = true
    } else {
      // Middle range
      const middleButtons = numberOfDynamicButtons - 2 // Subtract potential ellipsis slots
      startPage = currentPage - Math.floor(middleButtons / 2)
      endPage = currentPage + Math.floor(middleButtons / 2)
      hasLeftEllipsis = true
      hasRightEllipsis = true
    }

    // Adjust for ellipsis and total pages
    if (hasLeftEllipsis && startPage > 2) {
      if (startPage === 3) {
        pages.push(2)
      } else {
        pages.push("ellipsis")
      }
    } else {
      startPage = 2
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    if (hasRightEllipsis && endPage < totalPages - 1) {
      if (endPage === totalPages - 2) {
        pages.push(totalPages - 1)
      } else {
        pages.push("ellipsis")
      }
    } else {
      endPage = totalPages - 1
    }

    pages.push(totalPages) // Last page
  }

  return pages
}

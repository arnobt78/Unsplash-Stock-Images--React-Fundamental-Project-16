import { useMemo } from "react";
import { usePaginationContext } from "./paginationContext";

/** Number of page buttons visible at once around the active page. */
const PAGE_WINDOW = 5;

/**
 * Reusable pagination UI.
 * It consumes pagination context so any page/list can reuse this pattern.
 */
const Pagination = () => {
  const {
    currentPage,
    totalPages,
    setCurrentPage,
    goToNextPage,
    goToPreviousPage,
  } = usePaginationContext();

  /**
   * Builds a sliding window of page numbers.
   * Example: with PAGE_WINDOW=5, page 8 might render [6,7,8,9,10].
   */
  const pageNumbers = useMemo(() => {
    const windowSize = Math.min(PAGE_WINDOW, totalPages);
    const half = Math.floor(windowSize / 2);

    let start = Math.max(1, currentPage - half);
    let end = start + windowSize - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - windowSize + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }, [currentPage, totalPages]);

  /** Hide controls when pagination is unnecessary (single page only). */
  if (totalPages <= 1) return null;

  return (
    <nav className="pagination" aria-label="Gallery pagination">
      <button
        type="button"
        className="pagination-btn pagination-nav-btn"
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
      >
        prev
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          type="button"
          className={`pagination-btn ${page === currentPage ? "pagination-btn-active" : ""}`}
          onClick={() => setCurrentPage(page)}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className="pagination-btn pagination-nav-btn"
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
      >
        next
      </button>
    </nav>
  );
};

export default Pagination;

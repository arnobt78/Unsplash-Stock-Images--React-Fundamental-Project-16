/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface PaginationContextValue {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  setTotalPages: (pages: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

const PaginationContext = createContext<PaginationContextValue | undefined>(
  undefined,
);

interface PaginationProviderProps {
  children: ReactNode;
}

/**
 * PaginationProvider centralizes paging rules so components stay simple:
 * clamping boundaries, next/prev behavior, and total-page synchronization.
 */
export const PaginationProvider = ({ children }: PaginationProviderProps) => {
  const [currentPage, setCurrentPageState] = useState(1);
  const [totalPages, setTotalPagesState] = useState(1);

  const setCurrentPage = useCallback(
    (page: number) => {
      // Clamp requested page into [1, totalPages].
      setCurrentPageState((prev) => {
        const nextPage = Number.isFinite(page) ? Math.floor(page) : prev;
        if (nextPage < 1) return 1;
        if (nextPage > totalPages) return totalPages;
        return nextPage;
      });
    },
    [totalPages],
  );

  const setTotalPages = useCallback((pages: number) => {
    // Normalize API totals to a safe positive integer.
    setTotalPagesState(() => {
      const nextTotal = Number.isFinite(pages) ? Math.floor(pages) : 1;
      return nextTotal < 1 ? 1 : nextTotal;
    });
    setCurrentPageState((prev) => {
      const nextTotal = Number.isFinite(pages) ? Math.floor(pages) : 1;
      const safeTotal = nextTotal < 1 ? 1 : nextTotal;
      return prev > safeTotal ? safeTotal : prev;
    });
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPageState((prev) => (prev < totalPages ? prev + 1 : prev));
  }, [totalPages]);

  const goToPreviousPage = useCallback(() => {
    setCurrentPageState((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const value = useMemo(
    () => ({
      currentPage,
      totalPages,
      setCurrentPage,
      setTotalPages,
      goToNextPage,
      goToPreviousPage,
    }),
    [
      currentPage,
      totalPages,
      setCurrentPage,
      setTotalPages,
      goToNextPage,
      goToPreviousPage,
    ],
  );

  /** Provider makes pagination actions/state available to all descendants. */
  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  );
};

export const usePaginationContext = (): PaginationContextValue => {
  const context = useContext(PaginationContext);
  if (context === undefined) {
    throw new Error(
      "usePaginationContext must be used within PaginationProvider",
    );
  }
  return context;
};

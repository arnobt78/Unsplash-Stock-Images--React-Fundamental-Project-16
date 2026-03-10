/**
 * Entry point: mounts the React app and wraps it with providers.
 * - AppProvider: global state (theme, search term) via Context API
 * - QueryClientProvider: React Query for API caching and loading states
 */
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AppProvider } from "./context";
import { PaginationProvider } from "./paginationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/** Single QueryClient instance; holds cache for all useQuery hooks (e.g. in Gallery) */
const queryClient = new QueryClient();

/**
 * Provider tree order:
 * 1) AppProvider for theme/search
 * 2) PaginationProvider for page state
 * 3) QueryClientProvider for API caching/fetch lifecycle
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <PaginationProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </PaginationProvider>
  </AppProvider>,
);

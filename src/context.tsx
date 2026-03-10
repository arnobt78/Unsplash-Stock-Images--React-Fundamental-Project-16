/**
 * Global state via React Context: theme (dark/light) and search term.
 * Any component under AppProvider can read/update these via useGlobalContext().
 */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

/** Shape of the value provided by AppContext (theme + search) */
interface AppContextValue {
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

/** Resolves initial dark mode: use stored preference if set, otherwise system (prefers-color-scheme) */
const getInitialDarkMode = (): boolean => {
  const stored = localStorage.getItem("darkTheme");
  if (stored === "true") return true;
  if (stored === "false") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

interface AppProviderProps {
  children: ReactNode;
}

/**
 * AppProvider exposes app-wide UI state used by multiple components:
 * - theme mode
 * - search keyword
 */
export const AppProvider = ({ children }: AppProviderProps) => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(getInitialDarkMode());
  const [searchTerm, setSearchTerm] = useState<string>("cat");
  /** Flips theme and persists to localStorage so it survives refresh */
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem("darkTheme", String(newDarkTheme));
  };

  /** Keep theme class on <html> in sync with state; theme-color meta for browser UI */
  useEffect(() => {
    document.documentElement.classList.toggle("dark-theme", isDarkTheme);
    document.documentElement.classList.toggle("light-theme", !isDarkTheme);
    // Keeps browser UI color (mobile address bar/tab tint) in sync with theme.
    const meta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]',
    );
    if (meta) meta.setAttribute("content", isDarkTheme ? "#1e1e1e" : "#f8fafc");
  }, [isDarkTheme]);
  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

/** Hook to read/update global state; throws if used outside AppProvider */
export const useGlobalContext = (): AppContextValue => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within AppProvider");
  }
  return context;
};

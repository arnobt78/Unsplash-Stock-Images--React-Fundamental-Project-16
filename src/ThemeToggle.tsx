/**
 * ThemeToggle: one button that switches light/dark. Uses global context;
 * icon shows sun (light mode) or moon (dark mode).
 */
import { useGlobalContext } from "./context";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

/**
 * ThemeToggle is a presentational control that delegates logic to context.
 * Icon reflects current theme state for immediate visual feedback.
 */
const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useGlobalContext();
  return (
    <section className="toggle-container">
      {/* Click toggles global theme state + persisted preference */}
      <button className="dark-toggle" onClick={toggleDarkTheme}>
        {isDarkTheme ? (
          <BsFillMoonFill className="toggle-icon" />
        ) : (
          <BsFillSunFill className="toggle-icon" />
        )}
      </button>
    </section>
  );
};
export default ThemeToggle;

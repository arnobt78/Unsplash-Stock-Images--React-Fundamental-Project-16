/**
 * Root layout component: composes the single page (no routing).
 * Order: header with logo → theme toggle → search form + tagline → image gallery.
 */
import { Images } from "lucide-react";
import Footer from "./Footer.tsx";
import Gallery from "./Gallery.tsx";
import Pagination from "./Pagination.tsx";
import SearchForm from "./SearchForm.tsx";
import ThemeToggle from "./ThemeToggle.tsx";

/**
 * App is the page shell for this project.
 * It composes all reusable UI sections in display order.
 */
const App = () => {
  return (
    <main>
      {/* Top bar: branding + theme action */}
      <header className="app-header">
        <div className="app-logo">
          <Images className="app-logo-icon" aria-hidden />
          <span className="app-logo-text">Unsplash Stock Images</span>
        </div>
        <ThemeToggle />
      </header>
      {/* Search controls update global state */}
      <SearchForm />
      {/* Gallery reads search + pagination state and fetches API data */}
      <Gallery />
      {/* Pagination controls are reusable and state-driven */}
      <Pagination />
      {/* Footer metadata */}
      <Footer />
    </main>
  );
};
export default App;

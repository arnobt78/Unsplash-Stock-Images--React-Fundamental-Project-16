/**
 * Root layout component: composes the single page (no routing).
 * Order: header with logo → theme toggle → search form + tagline → image gallery.
 */
import { Images } from "lucide-react";
import Gallery from "./Gallery.tsx";
import SearchForm from "./SearchForm.tsx";
import ThemeToggle from "./ThemeToggle.tsx";

const App = () => {
  return (
    <main>
      <header className="app-header">
        <div className="app-logo">
          <Images className="app-logo-icon" aria-hidden />
          <span className="app-logo-text">Unsplash Stock Images</span>
        </div>
        <ThemeToggle />
      </header>
      <SearchForm />
      <Gallery />
    </main>
  );
};
export default App;

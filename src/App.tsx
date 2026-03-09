/**
 * Root layout component: composes the single page (no routing).
 * Order: theme toggle (top-right) → search form + tagline → image gallery.
 */
import Gallery from './Gallery.tsx';
import SearchForm from './SearchForm.tsx';
import ThemeToggle from './ThemeToggle.tsx';

const App = () => {
  return (
    <main>
      <ThemeToggle />
      <SearchForm />
      <Gallery />
    </main>
  );
};
export default App;

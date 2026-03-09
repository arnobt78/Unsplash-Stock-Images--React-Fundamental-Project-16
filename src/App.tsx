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

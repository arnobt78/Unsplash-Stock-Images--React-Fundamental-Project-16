/**
 * SearchForm: tagline, title, and search input. On submit updates global searchTerm
 * so Gallery (useQuery) refetches with the new query.
 */
import { useGlobalContext } from "./context";
import { usePaginationContext } from "./paginationContext";

/**
 * SearchForm updates global search state and resets pagination.
 * Gallery reacts to these state changes through React Query keys.
 */
const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const { setCurrentPage } = usePaginationContext();
  /** Read input by name; update context so Gallery's queryKey changes and refetches */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const searchInput = form.elements.namedItem("search") as HTMLInputElement;
    const searchValue = searchInput?.value?.trim();
    // Guard empty input so we avoid unnecessary API requests.
    if (!searchValue) return;
    setSearchTerm(searchValue);
    // New query should always start from the first page.
    setCurrentPage(1);
  };
  return (
    <section>
      <p className="project-tagline">
        Free pics, zero judgment. Your screen deserves better than
        &quot;image.jpg&quot; — search below and thank us later.
      </p>
      <h1 className="title">unsplash images</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-input search-input"
          name="search"
          placeholder="cat"
        />
        <button type="submit" className="btn">
          search
        </button>
      </form>
    </section>
  );
};
export default SearchForm;

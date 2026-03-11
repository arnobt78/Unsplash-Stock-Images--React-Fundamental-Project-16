# Unsplash Stock Images - React, Vite, TypeScript, React Query, Context API Fundamental Project 16

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vite](https://img.shields.io/badge/Vite-4.x-646CFF)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![React Query](https://img.shields.io/badge/React_Query-4-FF4154)](https://tanstack.com/query/latest)

A learning-focused Unsplash image search app built with React, Vite, TypeScript, React Query, and Context API. It demonstrates real-world patterns: fetching from an external API, global state, dark/light theming, skeleton loading, image modal view, and local download—all in a single-page, responsive UI. Use it as a reference for API integration, TypeScript in React, and reusable component design.

- **Live Demo:** [https://unsplash-stock-images.vercel.app/](https://unsplash-stock-images.vercel.app/)

![Screenshot 2026-03-11 at 16 17 34](https://github.com/user-attachments/assets/eef92ab9-b4a5-47c6-a9c4-eb1f97cdd56f)

## Table of Contents

1. [Features](#features)
2. [Project Structure](#project-structure)
3. [Technology Stack](#technology-stack)
4. [Getting Started](#getting-started)
5. [Environment Variables & API Key](#environment-variables--api-key)
6. [Components Overview](#components-overview)
7. [Global Context and State Management](#global-context-and-state-management)
8. [API Endpoints & Backend](#api-endpoints--backend)
9. [Functionality Walkthrough](#functionality-walkthrough)
10. [Styling & Dark Mode](#styling--dark-mode)
11. [Deployment](#deployment)
12. [Reusing Components in Other Projects](#reusing-components-in-other-projects)
13. [Learning Concepts & Keywords](#learning-concepts--keywords)
14. [Code Snippets & Examples](#code-snippets--examples)
15. [Conclusion](#conclusion)
16. [License](#license)

---

## Features

- **Image search:** Search free high-resolution photos from Unsplash by keyword.
- **Dark / light theme:** Toggle theme with preference saved in `localStorage` and optional system preference.
- **Skeleton loading:** Responsive skeleton grid (12 placeholders) while images load; search bar and layout stay visible.
- **Full-size image modal:** Click any image to view it at up to 90vh in a modal; close via overlay, close button, or Escape.
- **Download to device:** Download icon on each image; click to save the image to the local machine.
- **Responsive layout:** Grid adapts (1 → 2 → 3 columns) with a fixed 12 images per search for an even layout.
- **API integration:** Unsplash API used with React Query for fetching, caching, and loading/error states.
- **Global state:** React Context for theme and search term across the app.
- **Developer tooling:** React Query Devtools and ESLint for debugging and code quality.
- **Environment security:** API key kept in `.env` and not committed.

---

## Project Structure

```bash
07-unsplash-images/
├── public/
│   └── vite.svg
├── src/
│   ├── App.tsx                 # Root layout: ThemeToggle, SearchForm, Gallery
│   ├── main.tsx                # Entry: React root, AppProvider, QueryClientProvider
│   ├── context.tsx             # AppProvider, useGlobalContext (theme + searchTerm)
│   ├── Gallery.tsx             # Image grid, skeleton, modal, download
│   ├── SearchForm.tsx          # Search input + tagline
│   ├── ThemeToggle.tsx         # Dark/light toggle button
│   ├── index.css               # Global + component styles, dark theme, skeleton
│   ├── vite-env.d.ts           # Vite + env type declarations
│   └── types/
│       └── unsplash.ts         # UnsplashPhoto, UnsplashSearchResponse, UnsplashUrls
├── .env.example                # Template for required env vars
├── .eslintrc.cjs               # ESLint config (TypeScript, React, React Hooks)
├── index.html                  # HTML shell, meta tags, script to main.tsx
├── package.json
├── tsconfig.json               # TypeScript config for src
├── tsconfig.node.json          # TypeScript config for Vite
├── vercel.json                 # Vercel build/output config
├── vite.config.ts              # Vite + React plugin
├── README.md
└── LICENSE
```

---

## Technology Stack

| Layer      | Technology                                                   |
| ---------- | ------------------------------------------------------------ |
| Build      | Vite 4                                                       |
| UI         | React 18                                                     |
| Language   | TypeScript 5                                                 |
| Data fetch | TanStack React Query 4, Axios                                |
| State      | React Context API                                            |
| Icons      | react-icons (e.g. BsDownload, BsFillSunFill, BsFillMoonFill) |
| Styling    | Plain CSS (variables, grid, responsive)                      |
| Lint       | ESLint + TypeScript + React + React Hooks                    |
| Deployment | Vercel (optional; `vercel.json` included)                    |

---

## Getting Started

### Prerequisites

- Node.js (e.g. 18+)
- npm (or yarn/pnpm)

### 1. Clone and install

```sh
git clone https://github.com/arnobt78/Unsplash-Images--React-Fundamental-Project-17.git
cd Unsplash-Images--React-Fundamental-Project-17
npm install
```

### 2. Environment variables

Create a `.env` file in the project root (see [Environment Variables & API Key](#environment-variables--api-key)):

```sh
VITE_API_KEY=your_unsplash_api_key
```

### 3. Run the app

```sh
npm run dev
```

The app runs at **<http://localhost:5173>** by default.

### 4. Build and preview production

```sh
npm run build
npm run preview
```

### 5. Lint

```sh
npm run lint
```

---

## Environment Variables & API Key

This app uses **one** environment variable: the Unsplash API key. It is read at **build time** by Vite, so it must be prefixed with `VITE_`.

### Required variable

| Variable       | Description             | Example (do not commit real keys) |
| -------------- | ----------------------- | --------------------------------- |
| `VITE_API_KEY` | Unsplash API access key | `VITE_API_KEY=abc123...`          |

### How to get the key

1. Go to [Unsplash Developers](https://unsplash.com/developers).
2. Sign up or log in and create a new application.
3. Copy the **Access Key** and use it as `VITE_API_KEY` in your `.env`.

### Local development

1. In the project root, create a file named `.env`.
2. Add one line:  
   `VITE_API_KEY=your_actual_key_here`
3. Restart the dev server after changing `.env`.
4. **Do not** commit `.env` (it is in `.gitignore`). Use `.env.example` as a template.

### Production (e.g. Vercel)

1. In the Vercel project: **Settings → Environment Variables**.
2. Add **Key:** `VITE_API_KEY`, **Value:** your Unsplash access key.
3. Choose the right environment (Production / Preview / Development).
4. Redeploy so the new variable is used in the build.

`.env.example` in the repo documents this:

```sh
# Unsplash API Key (get one at https://unsplash.com/developers)
# For Vercel: set VITE_API_KEY in Project → Settings → Environment Variables
VITE_API_KEY=your_unsplash_api_key
```

---

## Components Overview

| Component       | File              | Role                                                                                                                                                    |
| --------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **App**         | `App.tsx`         | Root layout: renders ThemeToggle, SearchForm, Gallery inside `<main>`.                                                                                  |
| **AppProvider** | `context.tsx`     | Context provider for `isDarkTheme`, `toggleDarkTheme`, `searchTerm`, `setSearchTerm`.                                                                   |
| **ThemeToggle** | `ThemeToggle.tsx` | Button that toggles dark/light theme using `useGlobalContext()`.                                                                                        |
| **SearchForm**  | `SearchForm.tsx`  | Tagline, title “unsplash images”, search form; on submit updates `searchTerm` via context.                                                              |
| **Gallery**     | `Gallery.tsx`     | Uses `searchTerm` and React Query to fetch 12 images from Unsplash; shows skeleton while loading; grid with per-image download and click-to-open modal. |

There are no client-side routes; the app is a single page. “Routes” in this project mean the single screen and its sections (header/toggle, search, gallery).

---

## Global Context and State Management

All shared UI state lives in React Context provided in `context.tsx`.

- **Provider:** `AppProvider` wraps the app in `main.tsx`.
- **Consumed via:** `useGlobalContext()` (throws if used outside `AppProvider`).

### Context value

| Field / function  | Type / signature          | Purpose                                                       |
| ----------------- | ------------------------- | ------------------------------------------------------------- |
| `isDarkTheme`     | `boolean`                 | Current theme (dark vs light).                                |
| `toggleDarkTheme` | `() => void`              | Flips theme and persists in `localStorage` under `darkTheme`. |
| `searchTerm`      | `string`                  | Current search query (default `'cat'`).                       |
| `setSearchTerm`   | `(value: string) => void` | Updates search query; Gallery refetches when it changes.      |

### Initial dark mode

On load, dark mode is derived from:

1. `localStorage.getItem('darkTheme') === 'true'`, or
2. `window.matchMedia('(prefers-color-scheme: dark)').matches`.

Theme is applied by toggling the `.dark-theme` class on `document.body`, which switches CSS variables used across the app.

---

## API Endpoints & Backend

The app does **not** use a custom backend. It talks directly to the **Unsplash API** from the browser.

### Endpoint used

- **Search photos:**  
  `GET https://api.unsplash.com/search/photos`

### Query parameters

| Parameter   | Source                         | Description                          |
| ----------- | ------------------------------ | ------------------------------------ |
| `client_id` | `import.meta.env.VITE_API_KEY` | Unsplash API key.                    |
| `query`     | `searchTerm` from context      | Search keywords.                     |
| `per_page`  | Hardcoded `12`                 | Number of results (keeps grid even). |

### Example request URL

```bash
https://api.unsplash.com/search/photos?client_id=YOUR_KEY&per_page=12&query=cat
```

### Response shape (used in app)

The app uses `Axios` and types from `src/types/unsplash.ts`:

- **UnsplashSearchResponse:** `{ results: UnsplashPhoto[] }`
- **UnsplashPhoto:** `{ id: string; urls?: UnsplashUrls; alt_description?: string | null }`
- **UnsplashUrls:** `{ raw?, full?, regular?, small?, thumb? }`

Gallery uses `urls.regular` for the grid and `urls.full` for the modal and download when available.

---

## Functionality Walkthrough

### 1. Theme toggle

- User clicks the sun/moon icon in **ThemeToggle**.
- `toggleDarkTheme()` from context runs: state updates, `localStorage` is set, and `document.body` gets or loses `.dark-theme`.
- CSS variables (e.g. `--backgroundColor`, `--textColor`) switch so the whole app (including skeleton and modal) follows the theme.

### 2. Search

- User types in **SearchForm** and submits.
- `handleSubmit` reads the input, calls `setSearchTerm(value)` from context.
- **Gallery** has a `useQuery` with `queryKey: ['images', searchTerm]`, so React Query refetches when `searchTerm` changes.
- While loading, Gallery shows 12 skeleton cards in the same grid layout; after load it shows up to 12 images or error/empty states.

### 3. Viewing an image full-size

- User clicks an image in the grid.
- **Gallery** sets `modalImage` to that photo object and renders a fixed overlay with the image (e.g. `urls.full` or `urls.regular`) at max-height 90vh.
- User can close by clicking the overlay, the “×” button, or pressing Escape. An effect locks body scroll and listens for Escape.

### 4. Downloading an image

- User clicks the download icon on an image.
- **Gallery** calls `downloadImage(fullUrl, filename)`: it tries to `fetch` the URL, turn the response into a blob, create an object URL, and trigger an `<a download>` click so the file is saved locally. On failure it falls back to opening the link in a new tab.

---

## Styling & Dark Mode

- **Global styles and variables:** `src/index.css` (e.g. colors, spacing, typography, shadows).
- **Theme:** `.dark-theme` on `body` overrides variables (e.g. `--backgroundColor`, `--textColor`). Toggle is done in JS; no separate “route” for theme.
- **Layout:** CSS Grid for the gallery (1/2/3 columns via media queries), flex for toggle and form.
- **Skeleton:** `.skeleton-card` uses a pulse animation and matches the image cell height (e.g. 10rem) so the layout doesn’t shift when results load.

---

## Deployment

- **Build:** `npm run build` (Vite outputs to `dist/`).
- **Preview:** `npm run preview` to test the production build locally.
- **Vercel:** Repo includes `vercel.json` (build command, output directory `dist`, framework `vite`). Set `VITE_API_KEY` in the Vercel project’s environment variables and deploy.

---

## Reusing Components in Other Projects

- **Context:** Copy `context.tsx` and the types it needs; wrap your app in `AppProvider` and use `useGlobalContext()` wherever you need theme or search term. You can rename the context or add more fields (e.g. `user`, `locale`).
- **ThemeToggle:** Drop in any tree under `AppProvider`; it only depends on `useGlobalContext()` for `isDarkTheme` and `toggleDarkTheme`. Style with your own classes or keep the existing ones.
- **SearchForm:** Reuse as-is if you want a single search that drives context; or copy and change the tagline/title and where `setSearchTerm` is used (e.g. pass a callback prop instead of context).
- **Gallery:** Tightly coupled to Unsplash and `useGlobalContext().searchTerm`. To reuse: replace the query key and `queryFn` with your own API; keep the skeleton, grid, modal, and download logic and adapt types (e.g. map your API response to `{ id, urls, alt_description }`).
- **Skeleton:** Reuse the `.skeleton-card` and `.image-container` grid in any list/grid; adjust height/columns in CSS.

---

## Learning Concepts & Keywords

- React 18, functional components, hooks (`useState`, `useEffect`, `useContext`)
- TypeScript: interfaces, strict mode, typing props and context
- Context API: provider, consumer, custom hook (`useGlobalContext`)
- React Query (TanStack Query): `useQuery`, `queryKey`, `queryFn`, loading/error/data states, caching
- Unsplash API: REST, API key in env, response shape
- Vite: env variables (`import.meta.env.VITE_*`), build, dev server
- Responsive CSS: grid, media queries, clamp
- Accessibility: `aria-label`, `aria-hidden`, keyboard (Escape), focus
- Local storage: persisting theme preference
- Blob/object URL: triggering file download in the browser

---

## Code Snippets & Examples

### Theme toggle and persistence (context)

```typescript
const toggleDarkTheme = () => {
  const newDarkTheme = !isDarkTheme;
  setIsDarkTheme(newDarkTheme);
  localStorage.setItem("darkTheme", String(newDarkTheme));
};

useEffect(() => {
  document.body.classList.toggle("dark-theme", isDarkTheme);
}, [isDarkTheme]);
```

### Search form submit and context

```typescript
const { setSearchTerm } = useGlobalContext();

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = e.currentTarget;
  const searchInput = form.elements.namedItem("search") as HTMLInputElement;
  const searchValue = searchInput?.value;
  if (!searchValue) return;
  setSearchTerm(searchValue);
};
```

### Fetching images with React Query

```typescript
const response = useQuery({
  queryKey: ["images", searchTerm],
  queryFn: async (): Promise<UnsplashSearchResponse> => {
    const result = await axios.get<UnsplashSearchResponse>(
      `${url}&query=${searchTerm}`,
    );
    return result.data;
  },
});
```

### Skeleton loading state

```typescript
if (response.isLoading) {
  return (
    <section className="image-container">
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} className="skeleton-card" aria-hidden="true" />
      ))}
    </section>
  );
}
```

### Download image helper (blob then anchor)

```typescript
const downloadImage = async (imageUrl: string, filename: string) => {
  try {
    const res = await fetch(imageUrl, { mode: "cors" });
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename || "unsplash-image.jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  } catch {
    // fallback: open in new tab
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = filename || "unsplash-image.jpg";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};
```

---

## Conclusion

This project is a full example of a small React + TypeScript app: Unsplash API integration, React Query for server state, Context for theme and search, skeleton loading, modal, and download. You can use it as a template for similar “search + list + detail” UIs, or copy individual pieces (context, theme toggle, gallery pattern) into other projects. Adjust env vars, API keys, and types to match your own backend or API.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

## Happy Coding! 🎉

This is an **open-source project** - feel free to use, enhance, and extend this project further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://www.arnobmahmud.com](https://www.arnobmahmud.com).

**Enjoy building and learning!** 🚀

Thank you! 😊

---

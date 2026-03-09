# Unsplash Images - React, Vite, Typescript, React Query, Context API Fundamental Project 17

- **Live Demo:** []()

---

## Table of Contents

1. [Features](#features)
2. [Project Structure](#project-structure)
3. [Technology Stack](#technology-stack)
4. [Getting Started](#getting-started)
5. [Environment Variables & API Key](#environment-variables--api-key)
6. [Components Overview](#components-overview)
7. [Global Context and State Management](#global-context-and-state-management)
8. [Functionality Walkthrough](#functionality-walkthrough)
9. [Styling & Dark Mode](#styling--dark-mode)
10. [Deployment](#deployment)
11. [Learning Concepts & Keywords](#learning-concepts--keywords)
12. [Examples & Code Scripts](#examples--code-scripts)
13. [Conclusion](#conclusion)

---

## Features

- **Image Search:** Search for images from Unsplash using keywords.
- **Dark/Light Theme:** Toggle between dark and light UI themes, with preference saved to localStorage.
- **Responsive Design:** Fully responsive and user-friendly interface.
- **API Integration:** Fetches data from Unsplash using React Query for efficient data management and caching.
- **Global State Management:** Utilizes React Context to manage themes and search terms across the application.
- **Developer Tooling:** Integrates React Query Devtools for debugging and learning.
- **Environment Protection:** Uses `.env` variables for API keys, keeping sensitive data secure.

---

## Project Structure

```
Unsplash-Images--React-Fundamental-Project-17/
│
├── public/                  # Static assets
├── src/
│   ├── assets/              # App images, logos, etc.
│   ├── App.jsx              # Main App component
│   ├── Gallery.jsx          # Gallery display and API integration
│   ├── SearchForm.jsx       # Search input and form
│   ├── ThemeToggle.jsx      # Light/Dark mode toggle
│   ├── context.jsx          # Global context (theme, search state)
│   ├── index.css            # Main CSS (including dark mode)
│   └── main.jsx             # App entry point
├── .env                     # API key (excluded from version control)
├── .gitignore
├── index.html
├── package.json
├── README.md
├── vite.config.js
└── Unsplash images.fig      # Figma design (if available)
```

> For a complete list of files, [see the repository content on GitHub.](https://github.com/arnobt78/Unsplash-Images--React-Fundamental-Project-17/tree/main)

---

## Technology Stack

- **React** (Vite, JSX)
- **React Query** (for API requests and caching)
- **React Query Devtools**
- **Unsplash API**
- **CSS Variables** (for theme switching)
- **LocalStorage** (persist theme)
- **Context API** (global state)
- **Netlify** (deployment)

---

## Getting Started

### 1. Clone & Install

```sh
git clone https://github.com/arnobt78/Unsplash-Images--React-Fundamental-Project-17.git
cd Unsplash-Images--React-Fundamental-Project-17
npm install
```

### 2. Start Development Server

```sh
npm run dev
```

The app runs at `http://localhost:5173` by default.

---

## Environment Variables & API Key

1. **Sign up for an Unsplash developer account** at [Unsplash developers](https://unsplash.com/developers) and create a new application to obtain your API key.
2. **Create a `.env` file** in the root directory:

```sh
VITE_API_KEY=your_unsplash_api_key
```

> **Note:** The `.env` file is ignored by git for security.

---

## Components Overview

- **App.jsx:** Main layout that renders child components and provides context.
- **ThemeToggle.jsx:** Button/switch to toggle light/dark mode.
- **SearchForm.jsx:** Controlled input for entering search keywords; submits search.
- **Gallery.jsx:** Fetches images from Unsplash based on search term; displays them in a grid layout.
- **context.jsx:** Manages global state (theme, searchTerm) and exposes context to all components.

---

## Global Context and State Management

The app uses React's Context API to manage:

- `isDarkTheme`: Boolean for dark mode.
- `toggleDarkTheme()`: Function to switch themes.
- `searchTerm`: Current search term for Unsplash.
- `setSearchTerm()`: Function to update search term.

This ensures all components stay in sync and can access or update global state.

---

## Functionality Walkthrough

### 1. Theme Switching (Dark/Light Mode)

- User toggles theme using **ThemeToggle**.
- State is managed by context and changes CSS variables for seamless transition.
- Preference is saved in `localStorage` and respects system dark mode.

---

### 2. Searching Images

- User enters keywords in **SearchForm**.
- On submit, `searchTerm` in context updates.
- **Gallery** listens for `searchTerm` changes and triggers React Query to fetch images via Unsplash API.

---

### 3. API Fetching with React Query

- **Gallery.jsx** uses `useQuery([searchTerm], fetchImages)` to fetch and cache results.
- Shows loading, error, and empty states.
- Integrates **React Query Devtools** for learning and debugging.

---

## Styling & Dark Mode

CSS variables and a `.dark-theme` class enable dark mode. Example:

```css
:root {
  --backgroundColor: var(--grey-50);
  --textColor: var(--grey-900);
  --dark-mode-bg-color: #333;
  --dark-mode-text-color: #f0f0f0;
  --darkModeTransition:
    color 0.3s ease-in-out, background-color 0.3s ease-in-out;
}
.dark-theme {
  --backgroundColor: var(--dark-mode-bg-color);
  --textColor: var(--dark-mode-text-color);
}
body {
  background: var(--backgroundColor);
  color: var(--textColor);
  transition: var(--darkModeTransition);
}
```

Dark mode is toggled in JS by:

```js
document.body.classList.toggle("dark-theme", isDarkTheme);
```

---

## Deployment

- The app is ready for deployment on platforms like **Netlify**.
- Set environment variables (`VITE_API_KEY`) in your deployment settings.
- [Live Demo](https://unsplash-images-arnob.netlify.app/)

---

## Learning Concepts & Keywords

- React functional components and hooks
- Context API for global state
- Controlled forms and event handling
- React Query for fetching and caching
- Environment variables and security
- Dark mode implementation
- Responsive design
- API integration
- LocalStorage for state persistence
- Code splitting and modularization

---

## Examples & Code Scripts

### 1. Theme Toggle Function (JS, from context)

```js
const toggleDarkTheme = () => {
  const newDarkTheme = !isDarkTheme;
  setIsDarkTheme(newDarkTheme);
  document.body.classList.toggle("dark-theme", newDarkTheme);
  localStorage.setItem("darkTheme", newDarkTheme);
};
```

---

### 2. Search Form Submission

```jsx
<form className="form search-form" onSubmit={handleSubmit}>
  <input
    type="text"
    name="search"
    placeholder="cat"
    className="form-input search-input"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <button type="submit" className="btn">
    Search
  </button>
</form>
```

---

### 3. Fetch Images with React Query

```js
const { data, isLoading, isError } = useQuery(
  ["images", searchTerm],
  () => fetchImages(searchTerm),
  { keepPreviousData: true },
);
```

---

### 4. Unsplash API Fetch Example

```js
const fetchImages = async (searchTerm) => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?client_id=${import.meta.env.VITE_API_KEY}&query=${searchTerm}`,
  );
  const data = await response.json();
  return data.results;
};
```

---

## Conclusion

This project is a comprehensive learning tool for React fundamentals, modern API handling with React Query, global state management with Context, and theming with CSS variables. It's designed to teach you best practices for building scalable, maintainable, and user-friendly React applications with real-world features like API integration and theming. Use, modify, or extend it as your own Unsplash-powered image search, or as a template for future React projects. Happy coding!

---

> **For questions, ideas, or contributions, visit the [GitHub repository](https://github.com/arnobt78/Unsplash-Images--React-Fundamental-Project-17).**

---

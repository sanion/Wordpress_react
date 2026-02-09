# WordPress React Theme

A WordPress theme that uses **React** for the front-end and the **WordPress REST API** for content. WordPress remains the CMS; React handles all rendering and routing.

## What's included

- **Theme (PHP):** `style.css`, `index.php`, `functions.php`, `header.php`, `footer.php`
- **React app (Vite):** Home, posts list, single post, and static pages
- **API client:** `src/api/wordpress.js` for `posts` and `pages` with `_embed` support

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Build the React app

```bash
npm run build
```

This writes the bundle into the `build/` folder (CSS and JS in `build/assets/`).

### 3. Install the theme in WordPress

- Copy the whole project into `wp-content/themes/wordpress_react` (or zip the folder and install via **Appearance → Themes → Add New**).
- In **Appearance → Themes**, activate **WordPress React Theme**.

### 4. Permalinks

Use a "pretty" permalink structure (e.g. **Post name**) under **Settings → Permalinks**. The theme uses client-side routes like `/post/my-slug` and `/posts`.

## Development

Run the React app with hot reload (no WordPress needed for UI work):

```bash
npm run dev
```

To have the dev server talk to your WordPress API, run WordPress locally (e.g. at `http://localhost`) and keep the proxy in `vite.config.js` as is. The app will request `/wp-json/...` and Vite will proxy those to your WordPress URL.

When you're done, run `npm run build` again and refresh the theme in WordPress.

## Routes

| Route       | Description        |
|------------|--------------------|
| `/`        | Home (latest posts)|
| `/posts`   | All posts (paginated) |
| `/post/:slug` | Single post   |
| `/page/:slug` | Static page   |

## Customization

- **API base URL / nonce:** Set in `functions.php` via `wp_localize_script('wp-react-theme-app', 'wpReactTheme', ...)`. The React app reads `window.wpReactTheme` in `src/api/wordpress.js`.
- **Styles:** Edit `src/index.css` and component styles; rebuild with `npm run build`.
- **New pages/routes:** Add components and routes in `src/App.jsx` and, if needed, new API helpers in `src/api/wordpress.js`.

## Requirements

- WordPress 5.0+ (REST API and `_embed` support)
- Node 18+ and npm (for building the React app)

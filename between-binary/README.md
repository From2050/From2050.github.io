# Between Binary (Digital Garden)

Welcome to your new Digital Garden & Lab! This project is built with [Astro](https://astro.build), React, and TailwindCSS.

## 🚀 Quick Start (Local)

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start Dev Server**:
    ```bash
    npm run dev
    ```
    Then open `http://localhost:4321` in your browser.

## 📁 Project Structure

*   `src/pages/index.astro`: The entry point (your Lab Homepage).
*   `src/layouts`: The main layout file (Themes, Fonts).
*   `src/styles`: Global CSS (Tailwind).
*   `public/`: Static assets (images, fonts).

## 🚢 Deployment (Cloudflare Pages)

1.  Push this folder to GitHub.
2.  Go to **Cloudflare Dashboard > Pages**.
3.  **Create Application** > Connect to Git.
4.  Select your repository (`From2050.github.io` or a new one).
5.  **Build Settings**:
    *   **Framework**: Astro
    *   **Build command**: `npm run build`
    *   **Output directory**: `dist`
6.  Click **Save and Deploy**.

## 📝 Adding Content

*   Add new pages in `src/pages/`.
*   Add Markdown content in `src/content/` (Setup coming soon).

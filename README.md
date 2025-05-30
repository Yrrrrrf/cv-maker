<h1 align="center">
  <!-- Consider adding a simple icon for your CV generator here if you have one -->
  <!-- <img src="./static/cv-icon.png" alt="Svelte CV Generator Icon" width="128" height="128"> -->
  <div align="center">Svelte CV Generator</div>
</h1>

<div align="center">
  <!-- Optional: Add badges if you plan to version it or host it on GitHub -->
  <!-- [![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](...) -->
  <!-- [![GitHub: Svelte CV Generator](https://img.shields.io/badge/GitHub-Svelte%20CV%20Generator-181717?logo=github)](...) -->
  <!-- [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE) -->
</div>

## 🚀 Overview

The **Svelte CV Generator** is a SvelteKit-based project designed for easily creating and maintaining a professional, modern, and printable Curriculum Vitae (CV). It leverages a data-driven approach, allowing you to manage all CV content from a centralized Svelte store, making updates quick and straightforward without needing to modify component logic.

Inspired by dynamic presentation templates, this project separates CV **data** (personal details, experience, skills, education, etc.) from the **presentation logic** (Svelte components that render the data). This makes it highly adaptable and easy to keep your CV up-to-date.

## ✨ Features

-   **Data-Driven Content:** Manage all CV information (name, title, contact, profile, skills, projects, education, languages) from a single, type-safe TypeScript store (`src/lib/stores/cvData.svelte.ts`).
-   **Component-Based Structure:** Each section of the CV (Header, Profile, Skills, Projects, etc.) is a reusable Svelte component.
-   **Modern Styling with TailwindCSS:** Utilizes TailwindCSS for a utility-first approach to styling, ensuring a clean and professional look.
-   **Print-Optimized Output:** Generates a CV that is well-formatted for printing, including considerations for A4 paper and printer-friendly styles.
-   **Svelte 5 & Runes:** Built with the latest Svelte 5 features for optimal reactivity and component architecture.
-   **TypeScript Integration:** Full type safety for CV data, ensuring consistency and easier refactoring.
-   **Easy to Customize & Extend:** The data store structure and component design make it simple to add new sections or modify existing ones.
-   **Based on [GWA Template](https://github.com/Yrrrrrf/gwa):** Uses the General Web App (GWA) template structure for a robust SvelteKit foundation.

## 🛠️ Technology Stack

### Frontend & CV Logic

-   **[SvelteKit](https://kit.svelte.dev/)** - Full-stack Svelte framework.
-   **[Svelte 5](https://svelte.dev/blog/runes)** - Latest Svelte version featuring Runes.
-   **[TypeScript](https://www.typescriptlang.org/)** - Adds static types to JavaScript.
-   **[Lucide Svelte](https://lucide.dev/guide/packages/lucide-svelte)** - SVG icons for contact details.

### Styling

-   **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS framework.

### Development & Build

-   **[Vite](https://vitejs.dev/)** - Frontend tooling for fast development and optimized builds.
-   **[Deno](https://deno.land/)** (if using GWA's Deno setup) or **[Node.js](https://nodejs.org/)** - JavaScript runtime environment.

## 🚦 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (LTS version, e.g., >=18.x) or [Deno](https://deno.land/) (if applicable)
-   [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), or [yarn](https://classic.yarnpkg.com/) (if using Node.js)

### Quick Start

```bash
# Clone the repository
# git clone [your-repo-url]
# cd [your-repo-name]

# Install dependencies (example with npm)
npm install
# or pnpm install
# or yarn install
# or if using Deno with GWA structure: deno cache --node-modules-dir npm:vite ... (refer to GWA's deno.json)

# Start the development server
npm run dev
# or deno task dev (if using GWA's Deno setup)

# Build for production (static site)
npm run build
# or deno task build

# Preview the production build
npm run preview
# or deno task preview
```

## 🎨 Customizing Your CV

> See some examples of how to customize your CV in the [examples](examples/) directory.

The core of this generator is its data-driven nature. To update your CV:

1.  **Edit [`src/lib/stores/cvData.svelte.ts`](src/lib/stores/cvData.svelte.ts):**
    *   This is the **main configuration file** for all your CV content.
    *   Update the `cv` object within `CvDataStore`.
    *   Modify fields in `header`, `profile`, `skills`, `projects`, `education`, and `languages` with your personal information.
    *   The types for each data structure are defined within this file (e.g., `HeaderData`, `ProjectEntry`). Ensure your data conforms to these types.
    *   For icons (e.g., contact links), ensure they are imported from `lucide-svelte` and potentially wrapped with the `createIcon` helper if you use it.

2.  **Static Assets (Profile Photo):**
    *   Place your profile photo (e.g., [`profile-photo.jpg`](static/images/profile-photo.jpg)) in the [`static/images/`](static/images/) directory.
    *   Ensure the path in `cvData.svelte.ts` (e.g., `header.profileImage: "/images/profile-photo.jpg"`) correctly points to this image.

3.  **Styling (Optional):**
    *   **Global Styles:** Modify `src/app.html` for global HTML attributes or `src/global.css` (if you create one beyond Tailwind's base) for CSS overrides.
    *   **TailwindCSS:** Adjust utility classes directly within Svelte components (`src/lib/components/*.svelte`) or in `src/routes/+page.svelte` for layout and print-specific styles.
    *   **Print Styles:** Fine-tune print-specific CSS within the `<style lang="postcss">` block in `src/routes/+page.svelte`.

## 📄 License

This project is likely under the [MIT License](LICENSE) if based on GWA or similar templates.

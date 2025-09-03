# CV Maker - Internationalization (i18n) Implementation Guide

## 📋 Project Overview

-   **Core Problem Statement:** The current `cv-maker` application is hard-coded with a single language (Spanish) for all UI text and section headers. This prevents the generation of a CV for different audiences (e.g., English-speaking recruiters) and makes adding new languages a manual, error-prone process of duplicating and editing components.

-   **Tagline:** Your Professional Story, Spoken in Any Language.

-   **Target Users:**
    -   **The Developer (Primary):** To provide a seamless, scalable, and type-safe workflow for managing and adding multiple languages to the CV. The goal is to make adding a new language as simple as adding a single translation file, with zero changes to the Svelte components.
    -   **The End-User (CV Recipient/Owner):** To enable the generation and viewing of a professionally formatted CV in the language most appropriate for the target audience (e.g., English, Spanish), enhancing its accessibility and impact.

## 🎯 Project Goals & Success Criteria

-   **Primary Goals:**
    -   **Maintainability:** The system must allow for the addition or modification of languages without altering any Svelte component code.
    -   **Type Safety:** The implementation must guarantee at compile-time that all translation keys are valid and that any required parameters are provided, preventing runtime errors.
    -   **Developer Experience:** Integrating translated text into components must be a simple, intuitive, and consistent process.

-   **Success Metrics:**
    -   All static, user-facing text within the application's UI (e.g., section titles, labels, footer text) is loaded from Inlang message files.
    -   The entire CV's language can be switched between English and Spanish via a defined mechanism.
    -   A new language can be added to the CV Maker solely by creating a new `messages/{lang}.json` file; no modifications to `.svelte` or `.ts` files are required.
    -   The application's build process will fail if a non-existent translation key is referenced in the code, confirming end-to-end type safety.

-   **Key Principles:**
    -   **No Hard-coded Strings:** All user-facing text is strictly forbidden within component markup and logic.
    -   **Single Source of Truth:** The `messages/` directory, managed by Inlang, is the exclusive source for all translated UI strings.

## 🏗️ Technical Architecture Deep Dive

-   **Core Design Principles:**
    -   **Separation of Content and Presentation:** The architecture will enforce a strict separation. Svelte components are responsible *only* for rendering the structure and style, while all displayable text (UI labels, descriptions, titles) is managed externally by the i18n system.
    -   **Centralized String Management:** The Inlang ecosystem will serve as the single source of truth for all user-facing text. This ensures consistency and simplifies the process of adding or editing translations.

-   **Detailed Component Specifications:**

    -   **File Structure:**
        -   A new configuration file, `project.inlang.json`, will be created in the project root to manage the Inlang setup.
        -   A new directory, `messages/`, will be created in the project root.
        -   This directory will contain the JSON files for each language, starting with `en.json` (English) and `es.json` (Spanish).

    -   **Content Migration Strategy:**
        -   All hard-coded, language-specific strings will be removed from Svelte components (e.g., "PERFIL PROFESIONAL").
        -   Language-dependent data currently in `src/data/cv.content.ts` (e.g., profile summary, project descriptions, job titles) will be migrated into the `messages/` JSON files.
        -   The `cv.content.ts` file will be updated to hold translation keys instead of raw strings. For example:
            -   **Before:** `summary: "A concise summary..."`
            -   **After:** `summary: "cv.profile.summary"`
        -   The corresponding `en.json` would then contain: `"cv.profile.summary": "A concise summary..."`

    -   **SvelteKit Integration:**
        -   The primary integration point will be the root layout load function in `src/routes/+layout.ts`.
        -   This file will be responsible for setting up the Inlang runtime, detecting the user's desired language (e.g., from a URL parameter like `?lang=es`), and making the translation functions available to the entire application.

    -   **Component Refactoring Pattern:**
        -   All components will be refactored to use a central translation function, aliased as `i()`. A helper module at `$lib/i18n/index.ts` will be created to export this and other Inlang SDK functions.
        -   **Example Transformation (`Profile.svelte`):**
            -   **Before:** `<h3>PERFIL PROFESIONAL</h3>`
            -   **After:**
                ```svelte
                <script lang="ts">
                  import { i } from '$lib/i1alization'; // Our new helper
                </script>
                <h3>{i('cv.section.profile')}</h3>
                ```

## 🔧 Implementation Strategy

The implementation will be executed in three distinct phases to ensure a structured and verifiable workflow. All package management and script execution will be performed using the **Deno runtime**, in accordance with the project's existing setup in `deno.json`.

### Phases 1 & 2 already completed

### **Phase 3: Language Switching Mechanism & Finalization**

**Goal:** Implement a user-friendly way to switch languages and finalize the integration.

-   **Deliverables:**
    1.  A UI component (e.g., a dropdown or toggle) that allows the user to select their preferred language.
    2.  A robust mechanism for persisting the language selection.

-   **Tasks:**
    1.  **Create Language Selector Component:** Build a new Svelte component that displays the available languages (e.g., "English", "Español").
    2.  **Implement Language Switching Logic:** The selector component will call Inlang's `setLanguage()` function, which will reactively update the entire UI. The current language can be persisted in the URL query parameters (`?lang=...`) or local storage.
    3.  **Update Layout:** Add the new `LanguageSelector.svelte` component to a suitable location in the main layout (`src/routes/+page.svelte`).
    4.  **Final Testing:** Conduct end-to-end testing of the language switching functionality, ensuring a smooth and immediate transition between English and Spanish.
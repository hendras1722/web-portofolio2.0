# Technical Specification: Portofolio - Redesign UI (Move CV to Home)

## 1. Executive Summary

This technical specification outlines the changes required to integrate the content and functionality of the `/curriculum-vitae` page into the home page (`pages/index.vue`) of the MSA Me web portfolio. This redesign aims to streamline user experience by consolidating key information onto the primary landing page. The project will involve modifying page components, content fetching logic, and navigation to reflect this structural change.

## 2. System Architecture

The existing system architecture based on Nuxt 3/4, Nuxt UI, and `@nuxt/content` will be leveraged. No fundamental architectural shifts are anticipated.

-   **Framework**: Nuxt 3/4
-   **UI Framework**: Nuxt UI (Tailwind CSS based)
-   **CMS**: `@nuxt/content` for fetching profile, experience, and skills data.
-   **I18n**: `@nuxtjs/i18n` for multi-language support (English & Indonesian).

## 3. Data Model

The data relevant to the curriculum vitae resides in markdown files within the `content/` directory. These files will continue to be the source of truth but will be rendered on the home page instead of a dedicated CV page.

-   **Source Files**:
    -   `content/en/profile.md`
    -   `content/id/profile.md`
    -   `content/en/experience.md`
    -   `content/id/experience.md`
    -   `content/en/skills.json`
    -   `content/id/skills.json`
-   **Changes**: No changes to the data model or file structure are required. Data fetching logic will be moved to `pages/index.vue`.

## 4. API Design

No new API endpoints will be created. The existing `@nuxt/content` module will be used to fetch and display data.

## 5. UI/UX Components

The primary changes will occur within the UI layer.

-   **Pages**:
    -   `pages/index.vue`: This page will be updated to include sections displaying profile, experience, and skills information. New components or existing ones may be integrated.
    -   `pages/curriculum-vitae.vue`: This page is proposed to be removed. If it contains any unique logic or presentation not directly transferable, that logic should be refactored into reusable components or integrated into `pages/index.vue`. If the route is removed, ensure no critical functionality is lost.

-   **Components**:
    -   Existing components like `HeroSection.vue`, `ExperienceSection.vue`, and `SkillsSection.vue` may be reused or adapted for use within `pages/index.vue`.
    -   A review of components specifically developed for `pages/curriculum-vitae.vue` is necessary to determine if they can be repurposed or if they should be removed.
    -   Consider creating a new dedicated section component within `pages/index.vue` to encapsulate the CV-related content if it becomes too large.

-   **Navigation**:
    -   All navigation links pointing to `/curriculum-vitae` in `AppHeader.vue`, `AppFooter.vue`, or any other navigation components must be updated to point to the home page (`/`) or removed if no longer relevant.

-   **Styling**:
    -   All styling will adhere to the project's established conventions: Tailwind CSS utility classes, Nuxt UI, and Sass. The integration of CV information into the home page should maintain visual consistency.

## 6. Internationalization (I18n)

-   Ensure all text content, especially from `profile.md`, `experience.md`, and `skills.json`, is correctly displayed using the i18n translation keys within `pages/index.vue`.
-   The `$t('key')` syntax must be used for all user-facing strings.
-   Verify that both English and Indonesian versions of the CV content are correctly rendered when the language is switched.

## 7. Testing Strategy

-   **Unit Tests**: Update existing unit tests for components that are modified or reused (e.g., `ExperienceSection.vue`, `SkillsSection.vue`).
-   **Integration Tests**: Update or create integration tests for `pages/index.vue` to ensure the CV information is displayed correctly and accessible.
-   **E2E Tests**: Update or create end-to-end tests for the home page to verify the presence and correct rendering of CV details. Test navigation to ensure the `/curriculum-vitae` link is updated or removed as intended.
-   **Build & Linting**: Run `bun run build` and linting commands (`bun run lint` or equivalent) to ensure code quality and project standards are maintained.

## 8. Deployment

Deployment will continue to be managed via Vercel, leveraging the existing Git integration. No changes to the deployment process are anticipated.

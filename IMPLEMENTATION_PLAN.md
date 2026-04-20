# Implementation Plan - Portofolio - Redesign UI

## Phase 0: Setup & Context
- [x] Check if the current directory is an initialized git repository. (Confirmed, it is.)
- [x] Create and checkout a new branch "feature/portfolio-redesign-ui".
- [x] **Crucial**: Read `GEMINI.md` to understand Nuxt 3/4 standards and project stack. (Already completed.)

## Phase 1: Core Implementation - Move CV to Home Page
- [x] Task 1.1: Analyze `pages/curriculum-vitae.vue` for reusable components and logic. Extract and refactor as necessary.
- [x] Task 1.2: Remove or clear the contents of `pages/curriculum-vitae.vue` as its information will be integrated elsewhere.
- [x] Task 1.3: Modify `pages/index.vue` to incorporate new sections for Profile, Experience, and Skills.
- [x] Task 1.4: Integrate and adapt existing components (e.g., `ExperienceSection.vue`, `SkillsSection.vue`) into `pages/index.vue`, ensuring content is fetched via `@nuxt/content`. (Components are integrated and called with data; further adaptation of content files may be needed for full detail richness.)

## Phase 2: Internationalization (i18n)
- [ ] Task 2.1: Ensure all new CV-related content displayed on `pages/index.vue` uses the `$t('key')` syntax for i18n.
- [ ] Task 2.2: Verify that both English and Indonesian language versions of the CV information render correctly on the home page.

## Phase 3: Unit Testing
- [ ] Task 3.1: Update existing unit tests for `pages/index.vue` to cover the integrated CV sections.
- [ ] Task 3.2: Update unit tests for any components reused or adapted for the home page (e.g., `ExperienceSection.vue`, `SkillsSection.vue`).

## Phase 4: Completion & Version Control
- [ ] Task 4.1: Run `bun run dev` to locally test the application and verify all changes.
- [ ] Task 4.2: Stage all modified and new files using `git add .`.
- [ ] Task 4.3: Commit changes with a descriptive message (e.g., "feat: Integrate CV information into home page").
- [ ] Task 4.4: Push the `feature/portfolio-redesign-ui` branch to the remote repository.

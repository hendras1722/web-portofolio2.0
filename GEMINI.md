# Project Context: MSA Me (Web Portfolio 2.0)

This document provides context for the AI agent to understand the project architecture, tech stack, and coding standards.

## Project Overview
A premium, high-performance web portfolio built with Nuxt 3/4. The application features internationalization, PWA support, animations, and a CMS-like structure for blog posts and stories.

## Technology Stack
- **Framework**: [Nuxt 3/4](https://nuxt.com/) (using [Bun](https://bun.sh/) as runtime/package manager).
- **UI Framework**: [Nuxt UI](https://ui.nuxt.com/) (Tailwind CSS based).
- **Icons**: Iconify (`ic` collection) and FontAwesome.
- **Language**: TypeScript.
- **Styling**: Tailwind CSS + Sass.
- **Animations**: `@vueuse/motion`.
- **Database/Auth**: [Supabase](https://supabase.com/).
- **CMS**: `@nuxt/content`.
- **I18n**: `@nuxtjs/i18n` (Multi-language support: English & Indonesian).
- **PWA**: `@vite-pwa/nuxt`.
- **Deployment**: Vercel.

## Key Directories
- `pages/`: Application routes and views.
- `components/`: Reusable UI components.
- `content/`: Markdown files for blog and other data.
- `composable/`: Custom Vue composables (e.g., `useHttp.ts`).
- `assets/`: Static assets like images and global CSS.
- `server/`: Nitro server routes (API endpoints).
- `plugins/`: Nuxt plugins (e.g., i18n, motion).

## Coding Standards
1. **Composition API**: Always use `<script setup lang="ts">`.
2. **Styling**: Prefer Tailwind CSS utility classes. Use `app.config.ts` for consistent UI themes.
3. **Typography**: Poppins (configured via Google Fonts).
4. **I18n**: Use `$t('key')` for all user-facing strings.
5. **Type Safety**: Define interfaces/types for all data structures in the `types/` directory or locally if specific.
6. **Testing**: Use `bun:test` for unit and integration tests.

## Common Operations
- **Development**: `bun run dev`
- **Build**: `bun run build`
- **Deploy**: Managed via Vercel Git integration.

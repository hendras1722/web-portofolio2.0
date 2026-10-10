# Muh Syahendra Anindyantoro — Portfolio

## Portfolio

The homepage (`/`, or `/en` for English) introduces Muh Syahendra Anindyantoro and links to his developer tools and profiles. Projects and work experience have dedicated pages at `/projects` and `/experience` (`/en/projects` and `/en/experience` in English). The same full-width navigation appears on the portfolio, article archive, and article pages, with links to every section, theme and language controls, and an active Articles link while reading. Article links and back links retain the selected language.

The navbar signature draws once, stays visible for five seconds, erases its strokes in reverse order from A toward M, then draws again. The opening signature animation still runs only once; reduced-motion users see a static signature.

The background uses an Antfu-inspired canvas treatment: short, recursively branching segments grow from the viewport edges, remain as subtle blue traces, and emit a fresh bright energy burst every five seconds. The pause button freezes new pulses without removing completed traces; reduced-motion visitors receive one static render.

The experience page centers the role list beneath low-opacity, outline-only year headings inspired by the posts list on antfu.me. Each date range appears just after its role and company; on narrow screens the date range moves below the title.

The header theme button switches between light and dark across the portfolio, projects, experience, and blog pages. The selection persists across navigation and reloads; new visitors start in dark mode with a `#050505` background. Supporting browsers reveal the new theme with a centered, blurred circular view transition; reduced-motion settings and unsupported browsers switch immediately. To run E2E tests against an already-running server on another port, set `E2E_BASE_URL` to its origin.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

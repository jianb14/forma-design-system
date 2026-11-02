# Forma visual design gallery

A React + TypeScript + Tailwind CSS gallery for browsing brand identity, colors, typography, spacing, motion, and UI designs. Component categories stay separate, and component pages show their variants side by side.

The interface focuses on visual previews. Developer documentation, installation pages, changelogs, code snippets, and token-export controls are not part of the gallery.

## Run locally

```sh
npm install
npm run dev
```

On Windows PowerShell, use `npm.cmd` if script execution blocks `npm.ps1`.

```sh
npm.cmd run dev
npm.cmd run build
npm.cmd test
```

Tests use Playwright with installed Google Chrome. They cover gallery navigation, simultaneous variants, visible overlay designs, form interactions, table controls, keyboard search, themes, local settings, mobile navigation, and page layouts at desktop and mobile widths.

## Source

| Location | Purpose |
| --- | --- |
| `src/App.tsx` | Navigation, theme selection, and gallery search |
| `src/pages/Overview.tsx` | Visual collection overview |
| `src/pages/ComponentGallery.tsx` | Categorized component cards and variant sheets |
| `src/components/VisualPreview.tsx` | Component cover artwork and inline overlay specimens |
| `src/components/ui.tsx` | Shared React UI primitives |
| `src/components/demos.tsx` | Interactive examples used in the visual specimens |
| `src/pages/Foundations.tsx` | Branding, palette, type, spacing, and effects |
| `src/pages/Patterns.tsx` | Visual page patterns |
| `src/lib/catalog.ts` | Gallery categories and variant inventory |
| `src/styles.css` | Theme and responsive styling |

Examples use local state. Sign-in previews do not authenticate an account, and selected files stay on the device. `npm run build` checks TypeScript and produces static assets in `dist`.

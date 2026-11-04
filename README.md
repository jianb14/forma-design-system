# Hulmio · gallery and reusable UI

A React + TypeScript design gallery with a shared local UI package. The library provides 64 core component families with 89 live import examples,
eight named button designs, and shared theme values. The website has a navbar-first
homepage and a sidebar inside the library and documentation.

The selected brand is **Hulmio** and the local package is **`hulmio-ui`**. The
checkout directory is named `hulmio`. Historical research and work-log entries
retain prior names.

GitHub repository: [jianb14/hulmio-design-system](https://github.com/jianb14/hulmio-design-system).

**Owner guide:** [Start here, in Taglish](docs/START-HERE.md).
Read [the work log](docs/WORK-LOG.md) for completed changes and validation, and
[the release guide](docs/RELEASING.md) for the later npm publishing process.
The [skills guide](docs/SKILLS-PLAN.md) lists installed workflows and examples of
how to invoke them in chat.

## Current stage

- Local `hulmio-ui` version 0.1.0, protected with `private: true`.
- All 64 core families have real package exports and live import examples.
- Component pages use Preview/Code tabs and local copy feedback. Demo buttons do
  not create global notifications. The sidebar and page headings use a compact
  docs layout without a top breadcrumb or decorative overlines.
- New composable families: Alert Dialog, Input Group, Item, and simple Table.
- Named designs such as `PillButton`, `BrutalistButton`, and `FilledInput` are reusable
  in other React apps. Old reference compositions are labeled separately.
- See [component coverage](docs/COMPONENT-COVERAGE.md) for the inventory and limits.
- Website fonts: self-hosted Google Sans Flex, Instrument Serif, and IBM Plex Mono.
  The UI package inherits the consuming app's font.
- The **Using Hulmio** page documents local installation and has a live example.
- No npm release or hosted website deployment is part of this local preparation.

## Commands

From the `hulmio` folder:

```sh
npm install
npm run dev
```

On Windows PowerShell, use `npm.cmd` if script execution blocks `npm.ps1`.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Build the library once, then start the gallery with source updates |
| `npm run brand:sync` | Generate the favicon from the same H mark used by the website |
| `npm run build` | Build library, check website TypeScript, and build gallery |
| `npm run build:ui` | Generate shared theme CSS and build package JS, CSS, and types |
| `npm run pack:ui` | Build and create `artifacts/hulmio-ui-0.1.0.tgz` |
| `npm run check:package` | Install the tarball in an independent consumer, build the documented example, and run browser checks |
| `npm test` | Run gallery and usage-guide Playwright checks |
| `npm audit` | Check registry advisories for the installed dependency graph |

`check:package` needs registry access for its consumer's first dependency install
and installed Google Chrome. Gallery tests use Google Chrome too. Generated
artifacts, browser results, and the consumer fixture stay out of Git.

## Source map

| Location | Purpose |
| --- | --- |
| `packages/ui/src/` | Shared component implementations and package styles |
| `packages/ui/src/themes.json` | Source for semantic theme values used by CSS and gallery swatches |
| `packages/ui/README.md` | Installation, component props, themes, and package limits |
| `src/components/ui.tsx` | Re-exports package components; keeps remaining gallery-only primitives |
| `src/components/LibraryExamples.tsx` | Real package examples, design controls, and copyable imports |
| `src/components/demos.tsx` | Earlier reference compositions, labeled separately |
| `src/pages/UsingHulmio.tsx` | Website installation guide and live package example |
| `src/lib/distribution.ts` | Package metadata, availability labels, and quick-start sample |
| `src/lib/brand.json` | Shared H mark geometry, wordmark, and favicon colors |
| `src/lib/preferences.ts` | Migrate previously saved gallery preferences to Hulmio keys |
| `src/styles/website.css` | Navbar, home page, library shell, responsive layout and readability |
| `public/fonts/` | Self-hosted website fonts with OFL notices and source hashes |
| `scripts/` | Build, packing, and independent consumer validation |
| `skills/` | Maintained sources for the installed Hulmio component and release skills |
| `docs/` | Owner guide, work log, and release process |

Examples use local state. Sign-in previews do not authenticate accounts and
selected files stay on the device. App authentication and data security remain the
responsibility of projects using Hulmio. Hosting metadata is retained in `.openai/`;
local builds produce the website in `dist/` and the library in `packages/ui/dist/`.

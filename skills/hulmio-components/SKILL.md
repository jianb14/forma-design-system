---
name: hulmio-components
description: "Add, update, or promote reusable React components in the Hulmio design-system repository while keeping the package, gallery, examples, and documentation consistent. Use for Hulmio component or theme changes."
---

# Hulmio Components

Implement the requested Hulmio component change using the shared library as the
source of truth. Keep the work scoped to the component or theme the user requests.

## Locate the project

Find the repository whose root package is `hulmio-design-system` and whose UI
workspace is `packages/ui`. The checkout folder may still be named `forma`.
Resolve the project from the current workspace rather than hardcoding a user's
home directory. Read its current `README.md`, manifests, and relevant existing
component before choosing an implementation. These instructions apply to Hulmio,
not to similarly named external projects.

## Use the shared implementation

- Public component source, styles, and exports belong in `packages/ui/src`.
  `src/components/ui.tsx` re-exports these for the gallery; do not create a second
  implementation there for an exported component.
- The website resolves `hulmio-ui` to source through Vite and TypeScript aliases.
  A working gallery alone does not prove the built package is consumable.
- Many catalog entries are gallery previews. Promote only the requested component
  into a reusable API, replace demo-specific content with appropriate props, and
  export its useful TypeScript types. Update `src/lib/distribution.ts` availability
  only when the package actually exports the advertised component.
- Follow the existing native-prop, ref, and controlled/uncontrolled conventions
  where applicable. Keep labels, descriptions, disabled/loading behavior, and
  keyboard/focus behavior consistent between examples and the real component.
  Use the existing Radix primitives for matching interaction patterns.

## Keep themes and branding consistent

Use `--hulmio-*` variables and scoped `data-hulmio-ui` styling. Package components
must work without the gallery's CSS or a consumer Tailwind setup. Keep resets
scoped to the components and avoid introducing font/network requests into the UI
package merely to match a gallery preview.

Edit semantic theme values in `packages/ui/src/themes.json`; the build generates
`tokens.css`. Document `data-hulmio-theme` on `html` when portaled content must
inherit a theme. Brand changes use `src/lib/brand.json` and `npm run brand:sync`
rather than independent edits to the mark and generated favicon.

## Update the connected examples and docs

Adjust the relevant gallery entry/demo and `packages/ui/README.md` with the actual
API and limits. The website quick-start in `src/lib/distribution.ts` and package
README are compared by `scripts/verify-package.mjs`; keep them identical when
changing that example. Update owner guidance when installation or usage changes,
and record the completed work and validation in `docs/WORK-LOG.md`.

Keep authentication, persistence, and application business logic in the consuming
app unless the user explicitly expands the task. Gallery examples currently use
local state and do not authenticate accounts.

## Verify the changed behavior

Run commands from the repository root; on Windows PowerShell use `npm.cmd` if the
PowerShell npm shim is blocked.

- For runtime, styling, or type changes, run `npm run build` and the relevant
  existing Playwright checks. Use the full `npm test` suite for shared theme,
  navigation, or layout changes that affect many pages.
- When public APIs, exports, package CSS, dependencies, or declarations change,
  run `npm run check:package`. It packs a tarball, installs it in a fresh consumer,
  compiles the documented example, and exercises the distributed code in Chrome.
  This check needs registry access for the consumer install and installed Chrome.
- Add meaningful behavior coverage for a new interaction or regression. Choose
  checks proportional to the change; documentation-only edits do not require
  rerunning unchanged browser suites.

Report what changed, which checks actually passed, and any verification limits.
Preserve the current local/publication stage; ordinary component work does not
publish an npm package or deploy the website.

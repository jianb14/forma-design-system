# Hulmio work log

Ito ang tala ng mga pagbabago para maintindihan ng owner ang bawat milestone.
Dates use Asia/Manila.

## 2026-11-04 · Control states, custom select and sidebar hierarchy

Pantay na ang Getting started / Foundations headings at category headings; may
14px extra indentation ang component links. Rounded at softer na ang control
borders. Input at Input Group use one tight outline with no focus shadow or
duplicate inner outline. Error text, border and focus outline stay red, including
hover on invalid controls. Added a visible invalid-input import example; the
inventory is now **64 families / 89 examples**.

Buttons scale to 97% on press instead of translating. Every named design has a
visible hover change; the default Classic preview and catalog cover have no arrow
icon. Outline-button borders use the softer control tone. Gallery covers now use
matching heights, and phone button controls have room for full labels.

`Select` now uses [Radix Select](https://www.radix-ui.com/primitives/docs/components/select)
with custom options, selected checkmarks, disabled states, keyboard/typeahead and
portals. Select and dropdown triggers use border-color focus; options use a quiet
background highlight instead of outlines. Gallery and homepage design pickers,
and the older gallery Select wrapper, use the shared implementation. Dropdown
items accept `checked` / `onCheckedChange` for persistent checkbox choices.

The previous native API remains exported as `NativeSelect` / `NativeSelectProps`.
Custom Select uses `onValueChange` and an HTMLButtonElement ref. These differences,
nonempty option values, form attributes and portal theming are documented.
Added `@radix-ui/react-select` ^2.4.1 to the UI workspace.

Review found a canceled-reset bug in the primitive's native form handler. The
wrapper now captures resets before Radix, suppresses its reset callbacks and
waits until the event has fully bubbled before changing uncontrolled state. A
trusted browser click proved that a microtask runs before React's cancellation;
a deferred task honors `defaultPrevented`. Canceled and controlled resets preserve
selection, external form resets work, and validation focuses the first invalid
control. The temporary probe was removed after the behavior was covered in the
independent consumer. Final focused code review found no remaining issues.

Validation:

- Final `npm.cmd test`: **23 passed**. The six new browser regressions cover
  sidebar geometry, single input rings, red errors, custom keyboard selection,
  option focus, button hover/scale and checked dropdown items.
- `npm.cmd run check:package`: passed for the final tarball, including controlled,
  required, canceled-reset, external-form and multiple-invalid Select cases,
  descriptions, native fallback, error CSS and existing package coverage.
- UI build/declarations passed through the package check; final website
  `tsc -b` and `vite build` passed. The earlier combined `npm.cmd run build`
  also passed. Vite reports a non-failing 500.07 kB main-chunk warning; consumer
  builds retain the existing non-failing dependency `use client` warnings.
- Production captures: passed; eight interaction screenshots reviewed across
  desktop/phone/dark states, with no browser errors or horizontal page overflow.
- Production visual inspector: **0 FAIL / 1 WARN** at 1440, 768 and 390px. The
  remaining warning is deliberate empty space in the centered component canvas.
  All six inspector screenshots were reviewed.
- `git diff --check`: passed.

Final local tarball: `artifacts/hulmio-ui-0.1.0.tgz`, SHA-256
`7EF7CA5756C15999A8BD1255051F0E7032E911A61A3CBEDB4C40AE4E3ABA7FA6`.
Existing local changes, hosting state, version 0.1.0 and private publication guard
remain in place.

## 2026-11-04 · Quiet component docs and four new reusable families

Hiniling ng owner ang mas malinis na shadcn/ui-style component library. Inalis
ang top breadcrumb, heading overlines (kasama ang Tailwind `overline` decoration),
back/category captions, package banner, repeated introduction, decorative numbering
at extra design counts. Mas compact ang navbar, sidebar, page title at spacing.
Components come before Foundations in the sidebar; the shared top search remains.

May keyboard-accessible **Preview / Code** tabs ang bawat importable example.
Nananatili ang preview state kapag nagpapalit ng tab; Reset remounts the examples.
Inline **Copied** feedback na ang code-copy action. Ordinary demo buttons,
dropdown actions and reference compositions do not call the global notification.
Forms and confirmation examples show meaningful results inline. Tinanggal din ang
`alert()` at print popups mula sa copyable import examples. Form labels and focus
indicators stay available.

Dinagdag ang **AlertDialog**, **InputGroup / InputGroupInput / InputGroupAddon**,
**Item / ItemGroup / ItemContent / ItemTitle / ItemDescription / ItemActions**, at
**Table / TableHeader / TableBody / TableFooter / TableRow / TableHead / TableCell /
TableCaption**. Nasa `packages/ui/src` ang implementations, native prop/ref types,
scoped CSS and exports. May live examples at full import snippets. **64 families
at 88 examples** na ang inventory. The existing DataTable stays on `components/table`;
the simpler native table lives on `components/simple-table`.

AlertDialog focuses Cancel first, blocks outside-click dismissal, cancels on
Escape, and restores trigger focus. Its synchronous confirmation and controlled
usage limits are documented. Light-theme secondary text now has better contrast.
Stepper uses a vertical layout on phones instead of wrapping the last step into
a separate partial row. A code-review finding about obsolete mobile process-grid
columns was fixed and verified in the final production screenshot helper.

Validation:

- `npm.cmd run build`: passed, public package and website TypeScript/build.
- `npm.cmd test`: **17 passed**, final isolated run. Covers all 64 family routes
  on desktop/phone, keyboard navigation, themes, previews, new primitives and
  existing forms, tables and usage guide. One earlier run overlapped build activity
  and lost a browser navigation context; the final run had no such interruption.
- `npm.cmd run check:package`: passed for the final tarball. The independent React
  consumer additionally imports and exercises the new public APIs and styles.
  Vite emits its existing non-failing dependency `use client` bundling warnings.
- Production browser capture: passed, mobile process-heading widths, no page
  overflow or runtime errors, new components, homepage and dark dialog.
- Final visual inspector: **0 FAIL / 1 WARN** at 1440, 768 and 390px, down from
  0 FAIL / 6 WARN before. The remaining warning is intentional centered preview
  space; rationale and screenshot review are in
  [the visual review](superpowers/plans/2026-11-04-library-visual-review.md).
- `git diff --check`: passed.

Final local artifact: `artifacts/hulmio-ui-0.1.0.tgz`, SHA-256
`61DD5CE6D660122F73FFE12FAD359B3C268669E3F6C9BB831CC931D78B08F214`.
No dependencies were added. Existing uncommitted work and the local preview /
unpublished package stage were preserved.

## 2026-11-04 · Named UI library, wider coverage, and a website-first layout

Hiniling ng owner ang maraming reusable designs na mapipili sa gallery at
mai-import sa ibang React app. Dinagdagan ang package mula sa Button/Input/Modal
foundation tungo sa **60 core component families** at **84 live package examples**.
May **8 named button designs**: ClassicButton, PillButton, SoftButton,
OutlineButton, ElevatedButton, GradientButton, BrutalistButton, at GlassButton.
May named Input, Card, Badge at Tabs presets din.

Magkaiba ang **design**, **variant**, at **state**. Halimbawa:

```tsx
import { PillButton, BrutalistButton } from "hulmio-ui";
import "hulmio-ui/styles.css";

<PillButton variant="primary" size="lg">Continue</PillButton>
<BrutalistButton variant="destructive" loading>Deleting</BrutalistButton>
```

Ang design ang itsura; ang variant ang semantic treatment; ang loading/disabled
ang state. May sariling variant, size at state controls at copyable imports ang
bawat button design sa website. Lahat ng 60 families ay may public export at
working example. Nananatiling hiwalay at malinaw ang label ng mas lumang
**Reference compositions**, dahil hindi buong app workflow ang bawat import.

Kasama sa additions ang forms/selections, tables, cards, charts, navigation,
overlays, feedback, at layout helpers. Ang 15 bagong catalog families ay Toggle,
ToggleGroup, NumberInput, Field, Label, Separator, Collapsible, ScrollArea,
AspectRatio, Kbd, Typography, Toolbar, Navbar, Sidebar at ButtonLink.
Nasa [component coverage](COMPONENT-COVERAGE.md) ang buong inventory, research
sources at eksaktong limits. Inihambing ang inventory sa official Radix,
shadcn/ui at React Aria references. Core library ang target; hindi ipinapangakong
may lahat ng specialist enterprise widget o backend integration.

**Website:** navbar-first na ang homepage. Nasa library, foundations at docs ang
sidebar, na may listahan ng individual components. Bagong homepage ang nagpapakita
ng tunay na package components at named-import workbench. Google Sans Flex ang
primary font, Instrument Serif ang display accent, at IBM Plex Mono ang code font.
Self-hosted ang website fonts, may OFL notices at source hashes sa `public/fonts/`.
16px ang body text; 14–15px ang main navigation; itinaas din ang maliliit na labels.
Hindi kasama ang website fonts sa package; puwedeng gumamit ng sariling app font.
Lazy-loaded ang supporting pages para mas maliit ang initial website bundle.

**Review fixes:** magkakaibang description IDs na ang nested Fields; tama na ang
native mixed-checkbox announcement pagkatapos i-click; nalilinis na ang upload
custom validity sa native form reset; tugma ang Slider output sa native step.
Readable na ang modal/drawer body at mobile descriptions, at natatakpan ng
overlays ang navbar. Gumagamit ang Popover ng existing Radix positioning primitive
para manatili sa tabi ng trigger kahit transformed ang portal container. Nilalaktawan
ng Toolbar keyboard navigation ang disabled controls. Hindi nagsa-submit ng outer
form ang Enter sa CommandPalette search. Kasama ang mga relevant regression checks
sa independent installed-package verification.

May stale dependency requests na nakita habang nagsalo ang development at review
servers sa Vite cache. Inihiwalay ang Playwright server sa port 5174 at
`node_modules/.vite-playwright`; nananatili sa port 5173 ang developer website.
Verified na naglo-load muli ang developer homepage at 60-family library nang
walang failed dependency requests. Focus-return checks now wait for Radix's
asynchronous focus restoration rather than sampling before it finishes.

| Final validation | Result |
| --- | --- |
| `npm.cmd run build` | Passed: UI package, public declarations, TypeScript, production website; initial JS about 475 kB |
| `npm.cmd test` | Passed: 13 browser tests, including all 60 routes at desktop/mobile widths, named designs/copy, typography, overlays, themes and saved settings |
| `npm.cmd run check:package` | Passed: fresh tarball install, public types, standalone production consumer, advertised exports, new control regressions, transformed popover, keyboard toolbar, themes, focus, mobile and reduced motion |
| `node artifacts/check-gallery.mjs` | Passed: 60 families, 15 new IDs, 8 named button designs, 84 complete examples plus the quick start compile against public types |
| Actions/control checks | Passed: SSR/API and Chrome behavior, refs, form values, keyboard and required-state handling |
| Display/navigation checks | Passed: stable table IDs, edits/filter/page/select/expand, tabs, Kanban, carousel, themed overlays/focus and mobile width |
| Desktop/mobile screenshots | Inspected homepage and named button gallery; generated previews are under `artifacts/` |
| `git diff --check` | Passed |

Final local artifact: `artifacts/hulmio-ui-0.1.0.tgz`, **34,410 bytes**, **15 files**.
SHA-256: `889adaa7603e589601afae6f087bbe7d4fa355d201616085599447037cea00c0`.
The independent Vite SPA build reports that it ignores `use client` directives
from the library/Radix modules; the build and browser checks pass. This does not
verify framework-specific SSR integration.

Updated ang repository README, [owner guide](START-HERE.md),
[package guide](../packages/ui/README.md), coverage at release instructions.
Version **0.1.0 local preview** pa rin ito, protected by `private: true` and
`UNLICENSED`. Hindi pa npm registry installation ang `npm install hulmio-ui`;
gamitin ang generated `.tgz` ayon sa owner guide. Walang publication, deployment,
commit o push sa milestone na ito. Existing user staging was preserved.

## 2026-11-04 · Local folder and GitHub repository renamed

Hiniling ng owner na itugma ang local folder at GitHub repository sa Hulmio.
Ang local checkout ay `Design System/hulmio` na, mula sa dating `forma` folder.
Ang existing GitHub repository ay
[`jianb14/hulmio-design-system`](https://github.com/jianb14/hulmio-design-system)
na rin. Verified na pareho pa rin ang repository ID (`1443030715`), at ang
local `origin` fetch/push URL ay
`https://github.com/jianb14/hulmio-design-system.git`. Gumagana ang `git ls-remote`
sa bagong URL. Existing Git Credential Manager authentication was used without
printing or storing credentials in project files.

Magkaibang hakbang ang folder rename, remote GitHub rename, at local Git remote
update. Hindi binabago ng mga ito ang npm package name na `hulmio-ui`.
GitHub redirects old repository URLs after a rename; local clones should still
use the current URL. [GitHub rename documentation](https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository)

Updated ang README, owner/release guides, package README, at website installation
copy para `hulmio` ang folder sa instructions. Historical name research, old work
log entries, screenshots/archives, and the legacy preference migration keep their
original names as applicable.

VS Code initially held the nested `.git` directory and Windows rejected the
folder rename. A temporary workspace-only `git.enabled: false` setting released
the watcher; the setting was removed immediately after the rename. No editor
restart or process termination was needed. The npm workspace junction also needed
refreshing: `node_modules/hulmio-ui` now points at `hulmio/packages/ui`.

There are two Git repositories in the workspace. The nested project retains
its commit (`9f44151e58c3645d8e7a6e749a0622ddafa79442`), staged contents, and worktree
status. The parent's 23 staged project paths were changed from `forma/` to
`hulmio/`, preserving their staged blob contents and the staged/unstaged split.
Rename evidence and parent-index backups are under ignored `artifacts/`.

| Validation from the renamed checkout | Result |
| --- | --- |
| `npm.cmd run build` | Passed: UI library, TypeScript, and production gallery |
| `npm.cmd test` | 9 passed: desktop/mobile gallery, usage guide, interactions, branding, and saved preferences |
| `npm.cmd run check:package` | Passed: a fresh consumer installs the tarball and verifies documented examples, public types, CSS, themes, and interactions |
| GitHub and Git remote | Repository identity verified through the API; `git ls-remote` works at the new URL |
| Git state | Nested project commit/staging retained; parent staged blob contents retained under the new path prefix |
| Editor setting | Temporary workspace Git-disable setting removed |
| `git diff --check` | Passed |

Refreshed local package: `artifacts/hulmio-ui-0.1.0.tgz`, 8,845 bytes, 10 files.
Its README now names the `hulmio` folder. SHA-256:
`5F97CEC470F29127EF33DD627DA0D1DF5845574AFDBE1B539FA426B9CB738259`.

This task renames the existing GitHub repository; it does not commit or push the
pending local source changes, publish an npm package, or deploy the website.

## 2026-11-04 · Additional owner-selected skills installed

Hiniling ng owner ang Superpowers, Ponytail, Cloudflare Security Audit, Taste Skill,
UI UX Pro Max, selected Vercel Agent Skills, at selected Matt Pocock Skills.
Installed na ang 26 new user-scoped Codex skill folders:

- Superpowers: all 15 skills in the reviewed collection.
- Ponytail: the core `ponytail` skill.
- Cloudflare: `security-audit` with references, schemas, and validators.
- Taste: `design-taste-frontend` with scripts, library, and assets.
- UI UX Pro Max: `ui-ux-pro-max` with search scripts and data.
- Vercel: `vercel-react-best-practices` and `vercel-composition-patterns`.
- Matt Pocock: `diagnosing-bugs`, `tdd`, and `code-review`; plus supporting
  `codebase-design` and `setup-matt-pocock-skills`.

The official skill-installer helper staged pinned upstream revisions. All files
matched the corresponding upstream git-blob hashes. Three minimal compatibility
adjustments handle Ponytail metadata, the Matt setup helper's explicit invocation
policy, and UI UX Pro Max's Claude-only command paths. All installed folders pass
the structural validator and match their prepared copies by hash. Existing
`hulmio-components`, `hulmio-release`, and `security-best-practices` files were
preserved. Vercel's already-available web-design-guidelines was not duplicated.

| Check | Result |
| --- | --- |
| Installed skill structure and hashes | 26 passed |
| Python/Node syntax | 19 Python and 15 Node files passed |
| UI UX Pro Max smoke checks | UX and React searches both returned matching data |
| Taste smoke check | Bundled library generated a direction sheet in ignored artifacts |
| Cloudflare validator tests | 46 passed, 7 failed, 12 skipped out of 65; Windows lacks required no-follow/nonblocking file protections |
| Existing user skill preservation | All three existing skill folders retain their hashes |

The Cloudflare skill is available for guidance, but full audit execution is not
verified on this Windows environment; safeguards remain intact. No full security
audit was run. The Taste browser inspector was not exercised. The Matt setup helper
is installed; per-repo issue-tracker/domain configuration was not invoked.

The [skills guide](SKILLS-PLAN.md) explains selection, usage, and limitations.
[Source manifest](SKILLS-SOURCES.json) records all pinned revisions, paths, hashes,
adaptations, and verification results. New skills become available next turn.
Application code, package dependencies, Codex global configuration, and lifecycle
hooks were not changed. No app build/test rerun was needed for this skills/docs
installation, and no npm publication or website deployment occurred.

## 2026-11-04 · Skills installed and Hulmio workflows created

Inaprubahan ng owner ang recommended skill setup. Installed na ang official
`security-best-practices` mula sa `openai/skills`, kasama ang bagong custom
`hulmio-components` at `hulmio-release` skills sa user Codex skills folder.

| Skill | Gamit at maintained source |
| --- | --- |
| `security-best-practices` | Official JavaScript/TypeScript security-review guidance; installed from the curated repository |
| `hulmio-components` | Shared component, gallery, package API, docs, and appropriate checks; source: `skills/hulmio-components/` |
| `hulmio-release` | Artifact preparation, consumer verification, release documentation, and requested publication workflow; source: `skills/hulmio-release/` |

All three passed the skill creator's `quick_validate.py`. The two custom skills
include UI display metadata and example invocation prompts, with normal automatic
selection enabled. Repository and installed custom-skill files match by hash.
They become available on the next conversation turn. The [skills guide](SKILLS-PLAN.md)
now includes chat examples and explains how to maintain the installed copies.

Only skills and documentation changed in this step. No full security audit,
application feature change, npm publication, website deployment, or CI/accessibility
pipeline setup was performed as part of skill installation.

## 2026-11-04 · Skills and workflow recommendations

Sinuri ang session skills, official curated catalog, at kasalukuyang Hulmio checks.
Nasa [skills plan](SKILLS-PLAN.md) ang available skills, recommended additions,
proposed project workflows, at priorities. Playwright tooling is already present;
the browser CLI skill is optional. Recommended ang explicit security-review skill,
component/docs workflow, at release-readiness workflow. Wala pang ini-install o
ginagawang bagong skill sa recommendation step na ito.

## 2026-11-04 · Hulmio rename and new H identity

Pinili ng owner ang **Hulmio** at humiling ng bagong favicon at magkakatugmang
branding. `hulmio-ui` na ang local package name. Historical sections below retain
the old Forma names and artifact hashes as records of those earlier milestones.

| Binago | Dahilan |
| --- | --- |
| Website title, wordmark, navigation, guide route, demo copy, and downloads | Hulmio na ang nakikita at ginagamit sa website |
| New modular H mark and `hulmio-icon.svg` | Malinaw na identity sa browser tab at sa branding page |
| Shared `src/lib/brand.json` plus `brand:sync` command | Iisang geometry ang website mark, downloaded SVG, at generated favicon |
| Package name, workspace reference, imports, aliases, and pack/check scripts | Gumagana ang installable `hulmio-ui` package sa bagong pangalan |
| `--hulmio-*`, `data-hulmio-ui`, `data-hulmio-theme`, and animation names | Consistent ang public styling API |
| Current README and owner/release/API guides | Tugma ang actual commands, imports, and artifact names |
| Local preference migration | Nababasa pa ang theme at settings na na-save sa dating pangalan |

| Validation | Result |
| --- | --- |
| `npm.cmd run build` | Passed: renamed library, TypeScript, website, and generated favicon |
| `npm.cmd run check:package` | Passed: fresh install of `hulmio-ui`, documented examples, types, standalone styles, themes, and modal/input behavior |
| `npm.cmd test` | 9 passed: all gallery routes at desktop/mobile sizes, usage guide, H logo/favicon/download consistency, and legacy preference migration |
| `git diff --check` | Passed |

The branding test checks the actual favicon response, matches its H geometry to
the rendered sidebar mark and downloaded SVG, and confirms the 16px preview loads.
It also verifies a newly chosen theme overrides the migrated old preference and
previously saved workspace/notification settings survive the rename. Desktop and
mobile branding screenshots were reviewed.

New package artifact: `artifacts/hulmio-ui-0.1.0.tgz`, 8,841 bytes, 10 files.
SHA-256: `A69627EAF67DCAE83EEF92CDA40CD27D1D8000949C4FA7B9C8CFC10B65243510`.
Visual evidence: `artifacts/hulmio-branding-desktop.png`,
`artifacts/hulmio-branding-mobile.png`, and `artifacts/hulmio-brand-mark.svg`.
The old Forma archive is historical; current installation uses the Hulmio archive.

The checkout folder remains `forma`. No npm publication or hosted website
deployment is part of this local rename.

## 2026-11-04 · Replacement-name shortlist

Sinuri ang candidate names sa web, public npm registry, at GitHub repository search.
Recommended ang **Hulmio UI**; backup ang **Tugmio UI**. Parehong HTTP 404 ang base
at `-ui` npm package names, at 0 repository-name matches ang direct GitHub queries
sa oras ng check. Nasa [name research](NAME-RESEARCH.md) ang sources at limits.
Wala pang name selection o code rename; domain/trademark checks are outstanding.

## 2026-11-04 · Existing-name research

Hiniling ng owner na hanapin kung may existing Forma design system. May nahanap
na published React library na `@aryan_sehgal/forma-ui`, Forma 36 ng Contentful,
at iba pang Forma UI/design-system projects. Nasa [name research](NAME-RESEARCH.md)
ang sources, verification limits, at recommendation tungkol sa public naming.
Pangalan at category overlap ang confirmed; hindi pa full visual/code comparison.

## 2026-11-04 · Unang local package at website guide

### Ano ang binago at bakit

| Pagbabago | Dahilan |
| --- | --- |
| Idinagdag ang npm workspace na `packages/ui` | May hiwalay na installable library ang gallery |
| Inilipat ang Button, Input, at Modal source; nagre-re-export ang gallery | Parehong implementation ang website at package |
| Inilipat ang shared component CSS; scoped ang package resets | Gumagana sa consumer kahit walang Tailwind o gallery CSS |
| Iisang `themes.json` ang pinanggagalingan ng shared themes at semantic swatches | Tugma ang actual colors at color documentation |
| Idinagdag ang “Using Forma” page, nav link, at live example | May malinaw na local installation steps sa website |
| May package-availability labels sa component pages | Malinaw kung importable o gallery preview pa |
| Build, pack, at independent consumer scripts | Nasusubukan ang mismong file na mai-install ng ibang project |
| Owner guide, package API guide, at release process | Nakasulat ang nagawa, paano gamitin, at susunod na steps |

### Kasalukuyang hangganan

- Public component APIs ng local package: Button, Input, Modal; may DialogClose helper.
- React/React DOM `^19.1.1`, ES modules, bundler-based web applications.
- Other gallery components remain previews. React 18, React Native, Vue, and
  framework-specific SSR are not verified by this milestone.
- Working name lang ang `@forma/ui`; wala pang registry publication.
- `private: true` ang publish guard at `UNLICENSED` ang temporary license metadata.
- Walang npm account credentials, actual publishing, o hosted website deployment.

### Validation

| Check | Result |
| --- | --- |
| `npm.cmd run build` | Passed: library JS/CSS/types, website TypeScript, and final production website build |
| `npm.cmd test` | 8 passed: gallery interactions, all 45 component pages, usage guide, desktop/mobile layouts, themes, keyboard controls, and browser errors |
| `npm.cmd test -- --grep "usage guide shows"` | 1 passed after stabilizing desktop/mobile screenshot capture |
| `npm.cmd run check:package` | Passed: actual tarball install into a fresh React app, website/README example match, public types with library checking enabled, standalone CSS, and browser behavior |
| `npm.cmd audit --json` | 0 reported known vulnerabilities in the current repository dependency graph on 2026-11-04 |
| `git diff --check` | Passed |

The independent consumer checks the host page's styles are preserved, controlled
input clearing, password visibility, error-message associations, loading-button
state, dark/contrast colors, portaled modal theme, focus handling, Escape and close
actions, mobile bounds, and reduced motion. Its app has no Tailwind plugin or
gallery CSS. CSS color assertions wait for the actual transition to finish.

Verified environment: Node 24.21.0, npm 11.19.0, React/React DOM 19.3.1,
TypeScript 5.9.3, Vite 7.3.7, and installed Google Chrome. The declared React peer
range is `^19.1.1`; this run did not test every React version in that range.

Consumer builds show dependency `use client` directive warnings from Vite's
client bundling; builds and browser checks pass. Framework-specific SSR support
has not been claimed. The dependency audit reports known registry advisories;
it is not a complete security review of this library or apps using it.

### Local artifacts

- `artifacts/forma-ui-0.1.0.tgz`: 8,822 bytes; 10 packaged files, reviewed against
  the package allowlist. Includes the JSON needed by the public theme types.
- SHA-256: `CF2C478DFE8A1E24E33BD44C0F81D34AC9C96B86080FC378AA51E8A7BB4392FC`.
- `artifacts/using-forma-desktop.png` and `artifacts/using-forma-mobile.png`:
  reviewed website guide screenshots.
- `artifacts/package-consumer-mobile.png`: independent consumer browser capture.

Generated artifacts and consumer fixtures are ignored by Git. Rebuilding the
package after future source changes requires a new pack/check run; the hash above
identifies this milestone's exact tested archive.

### Susunod na may owner input

Subukan ang local artifact sa isang tunay na React project. Bago npm publishing,
piliin ang npm namespace na kontrolado mo, public/private visibility, at license;
kumpletuhin ang account verification at 2FA. Palawakin ang exported components
bilang magkakahiwalay na documented milestones.

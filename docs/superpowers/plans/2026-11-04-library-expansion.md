# Hulmio expansion implementation plan

Spec: ../specs/2026-11-04-library-expansion-design.md
Execution: the owner requested implementation and delegated design decisions.
Use independent file ownership for package controls, display components, gallery,
and the website shell; integrate in this checkout, preserving existing work.

Status: completed locally on 2026-11-04. Build, 13 Playwright tests, 84 example
type checks, and a fresh installed-package consumer pass. Review findings were
addressed; final details and supported limits are in docs/WORK-LOG.md and
docs/COMPONENT-COVERAGE.md. No commit, push, publication or deployment was performed.

## Global constraints

- Source of truth: packages/ui/src; no duplicate implementation advertised as shipped.
- Retain Button/Input/Modal API, theme scopes, native props/refs, and consumer font inheritance.
- Sixty catalog families, eight named button designs, real React named imports.
- Primary Google Sans Flex, secondary Instrument Serif; readable body/navigation text.
- Navbar-first homepage; sidebar confined to library/docs; maintain mobile focus handling.
- No commit, push, publish, deployment, or user staging changes.

## Task 1: Actions and controls

Implement the spec's actions/forms contracts in the owned package files. Use
data-hulmio-ui with scoped standalone styles. Preserve controlled/uncontrolled
behavior and labels. Verify with package TypeScript/build after export integration.
Report the exact public exports and any consumer-relevant limitations.

## Task 2: Display, navigation and overlays

Implement the remaining package contracts in the owned files. Prefer existing
Radix dialog/menu/tooltip behavior and native details/forms. Include actual table
sort/filter/pagination, chart data alternatives, and explicit keyboard controls.
Report exact exports and supported behaviors. Leave package index/CSS imports to
the controller to avoid concurrent edits.

## Task 3: Catalog and importable examples

Expand the existing 45 entries to 60 with the spec's exact new IDs. Preserve old
variant demos, add package-backed examples/import snippets for all entries, and
give button designs individual names with semantic variant/size controls and
copyable code. Add src/styles/library.css for gallery-specific styling, keeping
package styles separate. Controller integrates CSS and shared exports.

## Task 4: Website shell, home and typography

Build navbar-first navigation and library-only sidebar. Redesign the homepage
around actual UI previews. Self-host verified font binaries and licenses. Increase
small type consistently and update the typography foundation. Retain brand, themes,
search, saved settings and mobile accessibility.

## Task 5: Integration and verification

Merge exports/CSS, dependency declarations, accurate availability and documentation.
Run build; update and run meaningful Playwright checks plus the independent consumer
check. Inspect desktop/mobile screenshots. Review the task diff with a fresh agent,
fix material findings, and record actual coverage/tests in docs/WORK-LOG.md.

## Review focus

- Named designs remain different across variants, focus, disabled/loading, and themes.
- Consumer CSS stays scoped; no Tailwind or website font request is required.
- Controlled changes, IDs/labels, keyboard behavior, and overlay focus return work.
- Navbar/home/sidebar transitions and mobile navigation retain the right focus and scroll.
- Every package availability claim corresponds to a real exported implementation.

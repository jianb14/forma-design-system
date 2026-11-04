# Hulmio library cleanup

Goal: make the existing React library easier to browse and reuse, following the user's shadcn/ui reference while keeping Hulmio's branding.

Approach: keep the current React, CSS and Radix stack. Simplify the shared website shell and component pages rather than replacing the site or changing package APIs. Add four distinct missing families after comparing the official shadcn/ui catalog: Alert Dialog, Input Group, Item and Table primitives. Existing DataTable keeps its route and API; the simple Table gets `simple-table`.

- [x] Add browser regressions for quiet demo clicks, inline code-copy feedback and keyboard-operable Preview/Code views. Capture the current Stepper page.
- [x] Remove the top breadcrumb, heading overlines, redundant component-page banners and decorative numbering. Compact the header and sidebar; keep form labels and keyboard focus indicators.
- [x] Present each example with Preview/Code tabs, a local copy action and optional reset. Keep reference compositions collapsed. Remove demo-only global notifications; preserve real copy errors and saved-settings behavior.
- [x] Add reusable, typed, ref-friendly AlertDialog, InputGroup, Item and Table primitives to `packages/ui/src`, with scoped CSS, live examples, export metadata and usage documentation.
- [x] Exercise dialog cancellation/confirmation/focus, grouped-input submission and native table semantics. Verify the packed consumer as well as the gallery.
- [x] Run build, full Playwright suite and package consumer check. Inspect desktop, tablet, mobile and dark screenshots; document outcomes in the work log.

Review focus: preserve the developer's existing uncommitted work; previews must not call global notifications; code remains keyboard accessible; alert dialogs require an explicit choice and focus Cancel first; labels and semantic markup survive visual simplification; exported components must work without gallery CSS.

Work stays local, matching the repository's current documented stage.

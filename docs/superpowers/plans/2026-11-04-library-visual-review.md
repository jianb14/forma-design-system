# Hulmio library visual review

Direction: the user's requested shadcn/ui documentation pattern, retaining Hulmio's existing green palette, Google Sans Flex, and H mark. No random direction was drawn because the reference and existing identity determine this cleanup.

ROUND 1
Seen in one second: a Stepper title buried under navigation, package banners and repeated explanations.
Idea (one sentence): Hulmio's reusable components should be the main content of their own documentation.
Live thing: working package previews and copyable imports.
Layout words by section: shell=compact navigation / title=name and purpose / example=preview or code / detail=optional disclosure.
Scores (self-review): design 6 · usability 6 · creativity 6 · content 8 → overall 6.2.
Caps applied: app-screen conventions; the requested documentation layout does not need photography or decorative motion.
Top three problems (most visible first), each with its screenshot and fix:
1. `artifacts/design-before/desktop-fold.jpg`: breadcrumb, back link, overline, package banner and second introduction push the component to the bottom of the viewport. Remove duplicated framing.
2. `artifacts/hulmio-home-mobile.png` from the first test run: removing process numbers left headings in a 38px grid column. Remove the obsolete grid and let each heading use the full column.
3. `artifacts/design-after/mobile-fold.jpg` from the first inspection: Stepper wraps its last step into a second row. Stack steps at phone widths in the shared package and improve muted light-theme text contrast.

ROUND 2 — final production build
Seen in one second: Stepper, its purpose, and the working component.
Idea (one sentence): Hulmio's component becomes the center of a quiet documentation canvas.
Live thing: stateful previews; keyboard-accessible Preview/Code tabs; local Copy feedback; Reset; real confirmation and form examples.
Layout words by section: shell=compact navigation / title=name and purpose / example=preview or code / detail=optional disclosure / next=related components.
Scores (self-review): design 8 · usability 8.5 · creativity 7 · content 8 → overall 8.0.
Caps applied: app-screen conventions; existing named Gradient, Elevated, Brutalist and Glass button designs intentionally retain their public visuals.
Top three problems (most visible first), each with its screenshot and disposition:
1. `artifacts/design-after/desktop-fold.jpg`: inspector reports a 105px blank band around the centered Stepper. Accepted: the bounded preview canvas provides room to demonstrate the component and focus states; the component is already in the first screen.
2. `artifacts/button-mobile-final.png`: eight independently configurable button designs still produce a long page. Accepted: code is collapsed and each named design stays independently testable and copyable.
3. `artifacts/home-desktop-final.png`: the original expressive headline remains different from the compact docs typography. Accepted: it belongs to the existing product homepage and the library uses the requested restrained layout.

Inspection: 1440px, 768px and 390px, production build. Before: 0 FAIL / 6 WARN. After: 0 FAIL / 1 WARN, with the preview-space warning accepted above. All six final inspector fold/page images were opened. Additional production screenshots cover the homepage, button page, new Input Group and Item, phone Table and Alert Dialog, and a dark Alert Dialog. The mobile process heading widths and page overflow were checked in `artifacts/capture-cleanup.mjs`; that helper is an ignored local QA artifact.

No new photography, image generation, external fonts, dependencies, hosting changes or fabricated usage claims were added.

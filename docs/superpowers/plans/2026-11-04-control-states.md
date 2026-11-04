# Hulmio control states

The user specified the visual behavior: aligned sidebar headings with indented component children; softer rounded borders; one tight outline around focused inputs, no focus shadows; red error text, border and input focus outline; custom selects and dropdown choices with selected checkmarks; select/dropdown triggers use border-only focus; buttons visibly scale down on press, have distinct hover colors, and the default Classic example has no icon.

Keep the current stack and shared package as the source of truth. Use Radix Select for its keyboard, selection and portal behavior. Keep the existing native select under the explicit `NativeSelect` export; custom `Select` refs target the trigger button and use `onValueChange`. Preserve native form submission and reset behavior in the custom control. Keep normal, hover, focus, error and disabled states separate.

- [x] Reproduce sidebar alignment, double focus outlines and old button states in browser checks.
- [x] Fix shared input/control focus and error styles, outline tones, radii and button interactions.
- [x] Add custom Select and selectable dropdown items; replace gallery and homepage native design selectors.
- [x] Update examples, package docs and meaningful browser/consumer coverage.
- [x] Build, run gallery and packed-consumer checks sequentially, inspect desktop/mobile/dark screenshots, and record results.

ROUND 1
Seen in one second: uneven sidebar hierarchy, duplicated input outlines and native dropdown pickers.
Idea: the same control state should look the same throughout Hulmio and in an installed consumer.
Live thing: working keyboard selection, error fields and button press states.
Layout: preserve the existing docs shell; refine the sidebar and controls.
Top three problems: double outline in Input Group; global focus outline leaking onto Select options; narrow option text and phone design controls. Each was reproduced and fixed in shared CSS or gallery framing.

ROUND 2 — final production
Seen in one second: aligned navigation, indented children and quiet controls with clear state changes.
Idea: Hulmio's own green tokens carry focus while errors retain the danger color.
Live thing: custom selection and checked menu options, code previews and pressed buttons.
Self-review: design 8 · usability 8.5 · creativity 7 · content 8 → overall 8.0.
Inspection: 0 FAIL / 1 WARN across desktop/tablet/phone; the bounded preview canvas intentionally leaves space around the component. Reviewed all six inspector images and eight state captures in `artifacts/`.
No direction draw: the user supplied the interaction design and existing brand. No images or decorative motion were needed.

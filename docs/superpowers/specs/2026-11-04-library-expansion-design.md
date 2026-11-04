# Hulmio: named designs, complete core library, and website navigation

Date: 2026-11-04, Asia/Manila. The owner requested implementation and delegated
design/font decisions. This document records implementation choices for review;
it does not authorize publishing or committing existing pending work.

## Intent

People browse multiple UI designs, choose one by name, import it in another React
app, and choose variants/states within that design. The website should introduce
Hulmio as a product, with a top navbar and a component sidebar in the library.
Text should be comfortably readable. Existing green/lime branding remains.

## Approach

Keep the existing npm workspace and expose named React exports. This directly
fits the requested import workflow and preserves existing Button/Input/Modal
consumers. Use shared behavior under distinct visual presets. A copy/paste registry
or separate package per visual design adds distribution steps to this request, so
the selected approach is one package with tree-shakeable named exports.

The current 45 catalog families become functional package components. Add 15 core
families: toggle, toggle-group, number-input, field, label, separator, collapsible,
scroll-area, aspect-ratio, kbd, typography, toolbar, navbar, sidebar, button-link.
This is a researched core coverage target, not a claim that every possible widget
or specialist enterprise behavior has been implemented.

## Public interfaces and ownership

1. Actions/forms implementation owns `packages/ui/src/Button.tsx`,
   `Actions.tsx`, `Controls.tsx`, `actions.css`, `controls.css`, and optional
   additions to `Input.tsx` only. Exported types are included alongside components.
2. Presentation/navigation/overlays implementation owns `Display.tsx`,
   `Navigation.tsx`, `Overlays.tsx`, `Modal.tsx`, `display.css`, `navigation.css`, `overlays.css`.
3. Gallery implementation owns `src/lib/catalog.ts`, `src/lib/distribution.ts`,
   `src/pages/ComponentGallery.tsx`, `src/components/LibraryExamples.tsx`, and
   `src/styles/library.css`. It preserves the old demos as examples, but the
   importable component preview and code on every page use the actual package.
4. Controller owns package exports/CSS imports/manifests, website shell/homepage,
   fonts/typography/foundations, independent consumer tests and documentation.

No agents edit another owner's files. Do not commit, push, publish, deploy, or
revert existing changes. No additional subagents from implementers.

### Actions and forms contracts

- `Button` keeps existing `ButtonProps`, Variant, Size, refs, loading, and native
  props. Add `design?: 'classic'|'pill'|'soft'|'outline'|'elevated'|'gradient'|'brutalist'|'glass'`.
  Named wrappers: `ClassicButton`, `PillButton`, `SoftButton`, `OutlineButton`,
  `ElevatedButton`, `GradientButton`, `BrutalistButton`, `GlassButton`.
- `IconButton`: ButtonProps plus required `label: string`; children is the icon.
- `ButtonGroup`: children, optional label; `Toggle`: children, pressed/defaultPressed,
  onPressedChange, disabled; `ToggleGroup`: label, options `{value,label,disabled?}[]`,
  value/defaultValue string, onValueChange.
- `ButtonLink`: native anchor props, variant and size.
- Preserve `Input`; `OutlineInput`, `FilledInput`, `UnderlineInput` reuse InputProps.
- `Textarea`: native textarea props, label, hint, error, showCount.
- `Checkbox`/`Radio`: native input props plus label; Checkbox supports indeterminate.
- `RadioGroup`: label, options, value/defaultValue, onValueChange, name, disabled.
- `Switch`: label, checked/defaultChecked, onCheckedChange, disabled.
- `Select`/`Combobox`: label, options `{value,label,disabled?}[]`, value/defaultValue,
  onValueChange, disabled; Select is native, Combobox uses native datalist.
- `MultiSelect`: label, options, value/defaultValue string[], onValueChange, disabled.
- `Slider`: label, value/defaultValue number, onValueChange, min/max/step, disabled.
- `Rating`: label, value/defaultValue number, onValueChange, max, readOnly, disabled.
- `OtpInput`: label, length, value/defaultValue, onValueChange, masked, disabled.
- `TagInput`: label, value/defaultValue string[], onValueChange, disabled.
- `ColorPicker`: label, value/defaultValue string, onValueChange, disabled.
- `DatePicker`: native input type date/time/datetime-local/month/week, label and native
  props; `DateRangePicker`: label, start/end, onRangeChange({start,end}).
- `FileUpload`: label, accept, multiple, disabled, maxSize, onFilesChange(File[]).
  It selects/validates files; transport belongs to the consumer.
- `NumberInput`: native number input plus label and props; `Form`: native form props;
  `Field`: label, htmlFor, hint, error, children; `Label`: native label props.

Native controls forward refs and accept native name/id/required/aria attributes.
Composite controls accept name/id/disabled/required where meaningful; form value
behavior is documented. Field clones a single form-control child when needed to
connect htmlFor/id, aria-describedby and aria-invalid; it does not merely place
unassociated text beside an input. Combobox permits free text like native datalist.

### Display, navigation and overlay contracts

Export `Badge`, `SoftBadge`, `OutlineBadge` (children, tone, dot, outline);
`Avatar` (name, src, size, status), `AvatarGroup` (names, max);
`Card`, `SoftCard`, `OutlinedCard`, `ElevatedCard` (children, title?, description?);
`Accordion` (items {id,title,content,disabled?}[], multiple?);
`Collapsible` (title, children, defaultOpen?);
`Timeline` (items {id,title,description?,date?}[]);
`Chart` (label, data {label,value}[], variant bar/line/area/donut/heatmap/scatter,
including a readable data table);
`Carousel` (items ReactNode[], label?);
`DataTable` (columns {key,label,sortable?}[], rows Record<string,string|number>[],
caption?, pageSize?, selectable?, editable?, expandable?, rowKey default 'id',
onRowsChange(updatedRows), onSelectionChange(selectedRowIds), renderExpanded(row)).
Row identity remains stable across sorting/filtering/pagination. Without an id
column consumers supply rowKey. Editable cells and row selection act on IDs.
`Tabs`, `PillTabs`, `UnderlineTabs` (items {value,label,content?,disabled?}[],
value/defaultValue, onValueChange, label?, orientation?);
`Breadcrumbs` (items {label,href?}[]);
`Pagination` (page, totalPages, onPageChange);
`Stepper` (steps string[], current, onStepChange?);
`DropdownMenu` (trigger ReactNode, items {label,onSelect?,disabled?,destructive?,shortcut?}[]);
`CommandPalette` (open,onOpenChange,items {id,label,onSelect}[]);
`Alert` (title, children, tone, onDismiss?);
`Toast` (title, description?, tone?, onDismiss?);
`Progress` (value, label?, circular?, indeterminate?);
`Skeleton` (width?, height?, className?);
`Spinner` (label?, size?);
`EmptyState` (title, description?, action?);
`Drawer` (title, description?, trigger?, open?, onOpenChange?, side?, children);
`Tooltip` (content, children, side?);
`Popover` (title, trigger, children);
`Container`, `Stack`, `Grid`, `Split`, `AspectRatio`, `ScrollArea`, `Separator`,
`Kbd`, `Text`, `Heading`, `Toolbar`, `Navbar`, `Sidebar` as semantic layout primitives;
`Kanban` (columns {id,title}[], items {id,title,column,description?}[], onMove?).
Preserve the existing `Modal` and export `Dialog` as an alias.

Chart scatter/heatmap variants use indexed categorical values and document this
limit; arbitrary x/y or 2D matrices are outside this public data contract. New
overlays and Modal expose optional portalContainer so consumers can retain subtree
theme inheritance; test a dark container in a light document. Radix asChild
triggers accept one ref-capable interactive React element. The controller adds
direct dropdown-menu and tooltip dependencies to the UI package.

The gallery owns an explicit family-to-exports/designs/example map. Existing
reference demos are labeled separately and do not imply extra package features
such as interval sliders, file transport/progress, or advanced select grouping.

## Website

- Homepage: full-width top navbar, comfortable max-width, no persistent sidebar.
  Product introduction plus real named component previews and browse/docs links.
- Navbar remains on every route: brand, Components, Foundations, Patterns, Docs,
  search and theme controls. Mobile menu is accessible and dismissible.
- Sidebar appears in the component library and supporting docs/foundations. List
  individual components grouped by category, with current-page indication.
- Component detail pages lead with named designs and working import examples.
  Distinguish design, semantic variant, size, and state. Avoid preview-only claims.
- Google Sans Flex is the primary UI/body font; Instrument Serif is a restrained
  secondary display accent. Body 16px minimum; navigation 14–15px; secondary labels
  12–14px. Fonts are self-hosted by the website with OFL notices. Library inherits
  consumer fonts and makes no font/network requests.
- Preserve working routes, search, themes, dialogs, saved preferences, and mobile
  focus behavior. Remove obsolete dashboard framing from the homepage.

## Quality and scope

Components use native semantics and the already available Radix primitives for
dialog/menu/tooltip behaviors. CSS is scoped to data-hulmio-ui and h-* classes,
works without gallery/Tailwind styles, and supports light/dark/contrast and reduced
motion. No backend, authentication, upload service, or automatic npm publication.
Complex widgets document their actual supported behavior and limits.

## Verification

Build the UI declarations and website. Browser tests cover navigation/no sidebar
on home/sidebar in library, actual font loading/readability, named button designs,
and representative forms, selections, tables, overlays and mobile layouts. A fresh
consumer installs the tarball and compiles/runs the new API without gallery CSS.
Record completed coverage, actual test results, screenshots, sources and remaining
limitations in documentation. Existing user Git staging is preserved.

## Research sources

- https://www.radix-ui.com/primitives/docs/overview/introduction
- https://ui.shadcn.com/docs/components
- https://react-aria.adobe.com/
- https://github.com/google/fonts/tree/main/ofl/googlesansflex
- https://github.com/googlefonts/googlesans-flex
- https://github.com/google/fonts/tree/main/ofl/instrumentserif

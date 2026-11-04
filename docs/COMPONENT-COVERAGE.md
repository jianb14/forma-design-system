# Hulmio component coverage

Updated: 2026-11-04, Asia/Manila.

The package implements 64 core families with 89 package-backed examples.
Eight button designs share semantic variants, sizes, states and native props.
Named Input/Card/Badge/Tabs presets add alternatives to their respective families.
This is a core-library inventory, not a claim that every possible UI or specialist
enterprise behavior exists. Every family has a real export and live import example.

| Family | Named exports | Examples |
| --- | --- | --- |
| Button | `Button`, `ClassicButton`, `PillButton`, `SoftButton`, `OutlineButton`, `ElevatedButton`, `GradientButton`, `BrutalistButton`, `GlassButton` | 8 |
| Icon button | `IconButton` | 1 |
| Button group | `ButtonGroup` | 1 |
| Input | `Input`, `OutlineInput`, `FilledInput`, `UnderlineInput` | 4 |
| Textarea | `Textarea` | 1 |
| OTP input | `OtpInput` | 1 |
| Form | `Form` | 1 |
| Date & time | `DatePicker`, `DateRangePicker` | 2 |
| File upload | `FileUpload` | 1 |
| Tag input | `TagInput` | 1 |
| Color picker | `ColorPicker` | 1 |
| Checkbox | `Checkbox` | 1 |
| Radio group | `Radio`, `RadioGroup` | 1 |
| Switch | `Switch` | 1 |
| Select | `Select`, `NativeSelect` | 1 |
| Combobox | `Combobox` | 1 |
| Multi-select | `MultiSelect` | 1 |
| Slider | `Slider` | 1 |
| Rating | `Rating` | 1 |
| Badge & tag | `Badge`, `SoftBadge`, `OutlineBadge` | 3 |
| Avatar | `Avatar`, `AvatarGroup` | 2 |
| Card | `Card`, `SoftCard`, `OutlinedCard`, `ElevatedCard` | 4 |
| Data table | `DataTable` | 1 |
| Accordion | `Accordion` | 1 |
| Timeline | `Timeline` | 1 |
| Chart | `Chart` | 6 |
| Carousel | `Carousel` | 1 |
| Tabs | `Tabs`, `PillTabs`, `UnderlineTabs` | 3 |
| Breadcrumbs | `Breadcrumbs` | 1 |
| Pagination | `Pagination` | 1 |
| Stepper | `Stepper` | 1 |
| Dropdown menu | `DropdownMenu` | 1 |
| Command palette | `CommandPalette` | 1 |
| Alert | `Alert` | 1 |
| Toast | `Toast` | 1 |
| Progress | `Progress` | 2 |
| Skeleton | `Skeleton` | 1 |
| Spinner | `Spinner` | 1 |
| Empty state | `EmptyState` | 1 |
| Dialog | `Dialog`, `Modal`, `DialogClose` | 1 |
| Drawer & sheet | `Drawer` | 1 |
| Tooltip | `Tooltip` | 1 |
| Popover | `Popover` | 1 |
| Layout primitives | `Container`, `Stack`, `Grid`, `Split` | 1 |
| Kanban board | `Kanban` | 1 |
| Toggle | `Toggle` | 1 |
| Toggle group | `ToggleGroup` | 1 |
| Number input | `NumberInput` | 1 |
| Field | `Field` | 1 |
| Label | `Label` | 1 |
| Separator | `Separator` | 1 |
| Collapsible | `Collapsible` | 1 |
| Scroll area | `ScrollArea` | 1 |
| Aspect ratio | `AspectRatio` | 1 |
| Keyboard key | `Kbd` | 1 |
| Typography | `Text`, `Heading` | 1 |
| Toolbar | `Toolbar` | 1 |
| Navbar | `Navbar` | 1 |
| Sidebar | `Sidebar` | 1 |
| Button link | `ButtonLink` | 1 |
| Alert dialog | `AlertDialog` | 1 |
| Input group | `InputGroup`, `InputGroupInput`, `InputGroupAddon` | 1 |
| Item | `ItemGroup`, `Item`, `ItemContent`, `ItemTitle`, `ItemDescription`, `ItemActions` | 1 |
| Table | `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption` | 1 |

## Research basis

Coverage was compared with [Radix primitives](https://www.radix-ui.com/primitives/docs/overview/introduction),
[shadcn/ui's component index](https://ui.shadcn.com/docs/components), and
[React Aria](https://react-aria.adobe.com/). They informed the inventory and behavior
expectations; Hulmio retains its own green/lime design language and named presets.

## Distinguish design, variant, state and composition

- Design: an import such as PillButton or BrutalistButton; both accept common variants.
- Variant: a semantic treatment such as primary, outline or destructive.
- State: loading, disabled, focus, selection or invalid data as appropriate.
- Reference composition: an earlier gallery arrangement or app workflow, labeled
  separately. Its appearance does not silently expand the package API.

## Supported limits

- Native MultiSelect is a multiple select; native datalist Combobox allows free text.
- Date/time pickers follow browser/platform UI and ISO values; no timezone engine.
- Slider is single-value; an interval slider is not advertised by its package API.
- Upload chooses/validates files; apps provide transport, progress and server checks.
- Stateful composite form controls keep React state on native reset; reset controlled
  values or remount. Native selection controls retain browser reset behavior.
- Field associates a single direct native/ref-capable child; wire grouped/nested
  descriptions explicitly. Native attributes/ref types are in exported Props.
- DataTable is client-side and requires stable rowKey values; supplied callbacks
  handle edits/selection. No virtualized/server-side enterprise grid is claimed.
- Chart scatter/heatmap are categorical visualizations; every chart includes a data table.
- Kanban moves use explicit native controls. Backend persistence and pointer dragging
  are app integrations. Carousel has manual controls, without automatic rotation.
- Toast is a surface; apps own notification queues/lifetimes. Layout primitives are
  structural helpers; app routing, menu state and business workflows remain app-owned.
- PortalContainer retains explicitly selected subtree themes. Without it, set the
  theme on html. The package inherits fonts and requires no website/Tailwind CSS.
- Compatibility target is React/React DOM ^19.1.1 with bundler-based React apps.
  SSR-framework integrations, assistive-technology certification, other React majors,
  and an exhaustive security audit are not implied by the browser checks.

## Typography sources

Google Sans Flex is primary and Instrument Serif is the secondary display accent.
Font binaries are self-hosted for the website with the corresponding OFL notices.
See public/fonts/SOURCES.json for URLs/hashes and the official
[Google Sans Flex metadata](https://github.com/google/fonts/tree/main/ofl/googlesansflex).
The library tarball contains no website fonts.

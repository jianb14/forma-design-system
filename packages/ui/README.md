# Hulmio UI

Named React components for considered interfaces. This local preview includes
**64 component families**, **89 working examples**, and eight named button
designs. Version 0.1.0 is **not published on npm**; the local package name
does not reserve a registry name.

## Install locally

From the `hulmio` repository folder, run `npm install` then `npm run pack:ui`.
Copy `artifacts/hulmio-ui-0.1.0.tgz` to your other React project:

```sh
npm install ./hulmio-ui-0.1.0.tgz
```

Import the stylesheet once. React and React DOM `^19.1.1` are peer dependencies.
The package uses ES modules, includes TypeScript declarations, and works without
Tailwind or gallery CSS. Other React versions and SSR-framework integrations have
not been verified. Native form controls support refs and native attributes.

```tsx
import { PillButton, Input, Modal, DialogClose } from "hulmio-ui";
import "hulmio-ui/styles.css";

export default function App() {
  return (
    <div>
      <Input label="Email" type="email" placeholder="you@example.com" />
      <Modal
        title="Your first Hulmio modal"
        description="The same components you see in the gallery."
        trigger={<PillButton>Open example</PillButton>}
      >
        <DialogClose asChild>
          <PillButton variant="outline">Got it</PillButton>
        </DialogClose>
      </Modal>
    </div>
  );
}
```

## Pick a named design

Import a design by name, then choose its semantic variant, size, or state:

```tsx
import { PillButton, BrutalistButton, FilledInput, SoftCard } from "hulmio-ui";
import "hulmio-ui/styles.css";

<PillButton variant="primary" size="lg">Continue</PillButton>
<BrutalistButton variant="destructive" loading>Deleting</BrutalistButton>
<FilledInput label="Project name" placeholder="Something good" />
<SoftCard title="A place for your next idea"><p>Your content.</p></SoftCard>
```

Button designs: `ClassicButton`, `PillButton`, `SoftButton`, `OutlineButton`, `ElevatedButton`, `GradientButton`, `BrutalistButton`, `GlassButton`.
The base `Button` also accepts `design`. All eight preserve the shared native
button props/ref, `variant`, `size`, `loading`, and `disabled` behavior.
An explicitly supplied `shape` can override a design's default corners.

Variants: `primary`, `secondary`, `outline`, `ghost`, `link`,
`destructive`, `soft`, `success`, `warning`, `information`.
Sizes: `xs`, `sm`, `md`, `lg`, `xl`. Use `ButtonLink` for navigation.

Other named visual presets include `OutlineInput`, `FilledInput`,
`UnderlineInput`, `SoftCard`, `OutlinedCard`, `ElevatedCard`,
`SoftBadge`, `OutlineBadge`, `PillTabs`, and `UnderlineTabs`.
Badge/alert tones are `neutral | primary | success | warning | danger | info`.

## Component index

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

The website's component pages contain full copyable React examples and supported
behavior notes. Reference compositions are labeled separately from package examples.
Use the exported `*Props` and supporting types for each component's exact API.

## Composable building blocks

`InputGroup` wraps `InputGroupInput` and optional `InputGroupAddon` elements in
source order. Addons accept icons, prefix/suffix text, or real buttons. Supply a
label with `htmlFor`/`id`, or an `aria-label` on the input; name and native form
validation work normally. Input refs target the native input. Decorative icons
should use `aria-hidden`. Group styles reflect focus, disabled and invalid states.

`ItemGroup` is a native `ul` and `Item` is an `li`. Compose content with
`ItemContent`, `ItemTitle`, `ItemDescription`, and `ItemActions`. Choose
`variant="default"`, `"outline"`, or `"muted"` on each Item. Use real links or
buttons for actions; the row itself does not impersonate an interactive element.

`Table` wraps a native table in a keyboard-focusable horizontal scroll container.
Build its structure with the exported Table parts. Give it a `TableCaption`;
`TableHead` defaults to `scope="col"` and accepts `scope="row"` for row headers.
Native attributes, children and refs are forwarded. Use `DataTable` when you need
built-in filtering, sorting, selection, editing or pagination.

`AlertDialog` accepts required `title`, `description`, and `onConfirm`, an
optional ref-capable `trigger`, `confirmLabel`, `cancelLabel`, `destructive`,
children, and `open`/`defaultOpen`/`onOpenChange`. Focus starts on Cancel. Outside
clicks do not dismiss it; Escape and Cancel close without calling `onConfirm`.
Confirm invokes the synchronous callback and closes. Async mutations, loading and
error handling belong in the consuming app: keep a controlled dialog open while
the operation runs. `portalContainer` supports a themed subtree. With no trigger,
the app should restore focus to its own opener when the controlled dialog closes.

The additions take inspiration from the [shadcn/ui component catalog](https://ui.shadcn.com/docs/components)
and use Hulmio's own implementation, APIs, tokens and existing Radix dependency.

## Forms and controlled values

Input uses native `value/onChange`; custom composite values use the matching
`onValueChange`, `onCheckedChange`, `onRangeChange`, or `onFilesChange`
callback. Native controls accept `name`, `id`, validation and ARIA attributes.
Field connects one direct native/ref-capable control to its label, hint and error.
For nested or multiple controls, use a group component or wire descriptions explicitly.

MultiSelect is a native multiple select. Combobox uses datalist and permits free
text. DatePicker uses native browser date/time/month/week inputs. DateRangePicker
uses ISO date strings and native validity; it performs no timezone conversion.
OtpInput accepts text codes and respects its length; it is not server validation.
TagInput submits committed tags through repeated hidden named fields. Stateful
composites retain React state on native form reset: reset their controlled values
or remount them. FileUpload selects files and can validate maxSize in bytes;
upload transport/progress and server validation belong to the consuming app.

`Select` is a custom Radix control with styled options, selected checkmarks,
disabled options, typeahead, arrow-key navigation, Escape and focus return.
Use `value`/`onValueChange` or `defaultValue`. Supply `name`, `required`, `form`
and `autoComplete` for form integration. Uncontrolled selects reset with their
associated form, including an external `form` attribute; canceled resets preserve
the selection, and controlled values stay app-owned. Validation focuses the first
invalid field. Option values must be nonempty strings; use `placeholder` for an
empty selection. It accepts `label`, `hint`, `error`, `placeholder`, trigger button props,
and `portalContainer` for a themed subtree. Its ref targets `HTMLButtonElement`.
This replaces the preview's previous native Select; use the exported
`NativeSelect`/`NativeSelectProps` for the original `HTMLSelectElement` ref,
native `onChange` event, and native-only attributes.

`DropdownMenu` items may include `checked` and `onCheckedChange` for checkbox
choices with selected checkmarks. Regular action items keep `onSelect`. Menu
and select triggers use a border-color focus state; text inputs use one tight
outline without a focus shadow. An invalid input's text, border and focus outline
use the danger color. Hover is a lighter border/surface change, distinct from focus.
Buttons scale to 97% while pressed and retain their label's position.

## Data and navigation

DataTable supports local sorting/filtering/pagination, selection, inline editing,
and expanded details. Supply a unique string or finite number in `rowKey`
(default `id`). Callbacks use those identities. `onRowsChange` makes rows
controlled; without it, edits remain local until the rows prop is replaced.
Charts include a readable data table; scatter/heatmap use indexed categorical
values, not arbitrary x/y points or matrices. Kanban uses explicit keyboard-friendly
move controls; persistence belongs to the app. Carousel is manually navigated.
Toast is a status surface; your app controls its lifetime and notification queue.

## Themes and typography

Set `data-hulmio-theme="light"`, `"dark"`, or `"contrast"` on `html`
so default portals inherit the theme. Modal, Drawer, DropdownMenu, Tooltip, Popover
and CommandPalette accept `portalContainer` for an explicitly themed subtree.
Triggers using Radix asChild take a single ref-capable interactive React element.

The package inherits your app's fonts and makes no font/network requests. Set
`--hulmio-font-family` to override. The website uses self-hosted Google Sans Flex
as primary, Instrument Serif as secondary display, and IBM Plex Mono for code;
website font files/licenses are separate from the UI tarball. CSS is scoped to
Hulmio components, with keyboard focus, disabled states and reduced-motion rules.

## Preview status

Publication remains guarded by `private: true` and `UNLICENSED`. Choose the
publication license and registry/account settings before a public release.
Backend/authentication/authorization, payment processing, upload services and
specialist enterprise features are outside this UI library. See the repository's
owner guide, coverage notes and work log for current verification and limitations.

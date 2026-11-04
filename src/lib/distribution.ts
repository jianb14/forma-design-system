import manifest from "../../packages/ui/package.json";

export const localPackage = {
  name: manifest.name,
  version: manifest.version,
  filename: `hulmio-ui-${manifest.version}.tgz`,
  stage: "Local preview",
};

export type LibraryDesign = { name: string; exportName: string; code: string };
export type LibraryFamily = { exports: string[]; designs: LibraryDesign[]; limit?: string };

const example = (imports: string, content: string, setup = "") =>
  `${setup.includes("useState") ? 'import { useState } from "react";\n' : ""}import { ${imports} } from "hulmio-ui";\nimport "hulmio-ui/styles.css";\n\nexport default function App() {\n${setup ? `  ${setup}\n` : ""}  return (\n    ${content}\n  );\n}`;
const design = (name: string, exportName: string, content: string, extras = "", setup = ""): LibraryDesign => ({
  name, exportName, code: example([exportName, extras].filter(Boolean).join(", "), content, setup),
});
const family = (exports: string[], designs: LibraryDesign[], limit?: string): LibraryFamily => ({ exports, designs, limit });

export const buttonDesigns = [
  { name: "Classic", exportName: "ClassicButton", design: "classic", description: "The everyday Hulmio button. Clear color, balanced corners." },
  { name: "Pill", exportName: "PillButton", design: "pill", description: "A rounded silhouette for a softer next step." },
  { name: "Soft", exportName: "SoftButton", design: "soft", description: "A quiet tinted surface with a clear label." },
  { name: "Outline", exportName: "OutlineButton", design: "outline", description: "A light footprint, defined by its border." },
  { name: "Elevated", exportName: "ElevatedButton", design: "elevated", description: "A little depth for actions that deserve attention." },
  { name: "Gradient", exportName: "GradientButton", design: "gradient", description: "A richer green surface for a more expressive moment." },
  { name: "Brutalist", exportName: "BrutalistButton", design: "brutalist", description: "Firm edges and an offset shadow with a graphic feel." },
  { name: "Glass", exportName: "GlassButton", design: "glass", description: "A translucent surface for layered compositions." },
] as const;

/** Public exports, named designs and runnable examples, kept explicit for every family. */
export const libraryFamilies: Record<string, LibraryFamily> = {
  button: family(["Button", ...buttonDesigns.map(d => d.exportName)], buttonDesigns.map(d => design(`${d.name} button`, d.exportName, `<${d.exportName} variant="primary" size="md">Get started</${d.exportName}>`))),
  "icon-button": family(["IconButton"], [design("Icon button", "IconButton", '<IconButton label="Add item"><span aria-hidden="true">+</span></IconButton>')]),
  "button-group": family(["ButtonGroup"], [design("Joined actions", "ButtonGroup", '<ButtonGroup label="Document actions">\n      <Button variant="outline">Print</Button>\n      <Button>Save</Button>\n    </ButtonGroup>', "Button")]),
  input: family(["Input", "OutlineInput", "FilledInput", "UnderlineInput"], [
    design("Outline input", "OutlineInput", '<OutlineInput label="Email" type="email" placeholder="you@example.com" />'),
    design("Filled input", "FilledInput", '<FilledInput label="Email" type="email" placeholder="you@example.com" />'),
    design("Underline input", "UnderlineInput", '<UnderlineInput label="Email" type="email" placeholder="you@example.com" />'),
    design("Invalid input", "Input", '<Input label="Invalid email" type="email" defaultValue="alex@" error="Enter a valid email address." />'),
  ]),
  textarea: family(["Textarea"], [design("Textarea", "Textarea", '<Textarea label="Your message" placeholder="Tell us a little more…" maxLength={240} showCount />')]),
  "otp-input": family(["OtpInput"], [design("One-time code", "OtpInput", '<OtpInput label="Verification code" length={6} name="code" />')], "A local code input. Code delivery and verification belong to your app."),
  form: family(["Form"], [design("Native form", "Form", '<Form onSubmit={event => { event.preventDefault(); setSubmitted(true); }}>\n      <Input name="name" label="Your name" required placeholder="Alex Morgan" />\n      <Input name="email" label="Email address" type="email" required placeholder="you@example.com" />\n      <Button type="submit">Submit example</Button>\n      {submitted && <p role="status">Form submitted.</p>}\n    </Form>', "Input, Button", 'const [submitted, setSubmitted] = useState(false);')], "Uses native form validation and submission events. Authentication and multi-step workflows belong to your app."),
  calendar: family(["DatePicker", "DateRangePicker"], [
    design("Native date picker", "DatePicker", '<DatePicker label="Start date" name="date" type="date" />'),
    design("Date range", "DateRangePicker", '<DateRangePicker label="Trip dates" start={range.start} end={range.end} onRangeChange={setRange} />', "", 'const [range, setRange] = useState({ start: "2026-11-04", end: "2026-11-08" });'),
  ], "Native date, time, date-time, month and week inputs follow browser and device behavior."),
  upload: family(["FileUpload"], [design("Local file selection", "FileUpload", '<div>\n      <FileUpload label="Choose images" accept="image/*" multiple maxSize={5 * 1024 * 1024} onFilesChange={files => setCount(files.length)} />\n      <output>{count ? `${count} file(s) selected. Files stay on your device.` : "Images up to 5 MB each. Files stay on your device."}</output>\n    </div>', "", 'const [count, setCount] = useState(0);')], "Selects and validates local files. maxSize is bytes; upload transport and progress belong to your app."),
  "tag-input": family(["TagInput"], [design("Editable tags", "TagInput", '<TagInput label="Project tags" defaultValue={["Design", "React"]} name="tags" />')]),
  "color-picker": family(["ColorPicker"], [design("Native color picker", "ColorPicker", '<ColorPicker label="Brand color" defaultValue="#284c3f" name="color" />')]),
  checkbox: family(["Checkbox"], [design("Checkbox", "Checkbox", '<Checkbox label="Send me product updates" name="updates" defaultChecked />')]),
  radio: family(["Radio", "RadioGroup"], [design("Radio group", "RadioGroup", '<RadioGroup label="Delivery" name="delivery" defaultValue="standard" options={[{ value: "standard", label: "Standard" }, { value: "express", label: "Express" }]} />')]),
  switch: family(["Switch"], [design("Switch", "Switch", '<Switch label="Email notifications" name="notifications" defaultChecked />')]),
  select: family(["Select", "NativeSelect"], [design("Custom select", "Select", '<Select label="Workspace" name="workspace" defaultValue="studio" options={[{ value: "studio", label: "Design studio" }, { value: "personal", label: "Personal" }, { value: "archive", label: "Archive", disabled: true }]} />')]),
  combobox: family(["Combobox"], [design("Native autocomplete", "Combobox", '<Combobox label="Find a city" name="city" options={[{ value: "Manila", label: "Manila" }, { value: "Cebu", label: "Cebu" }, { value: "Davao", label: "Davao" }]} />')], "Uses native datalist autocomplete and permits free text. Suggestion display and keyboard behavior vary by browser."),
  "multi-select": family(["MultiSelect"], [design("Native multiple select", "MultiSelect", '<MultiSelect label="Your interests" name="interests" defaultValue={["design"]} options={[{ value: "design", label: "Design" }, { value: "code", label: "Code" }, { value: "writing", label: "Writing" }]} />')], "A native multiple select. Keyboard and modifier-key selection follow your browser and operating system; no virtualized list or nested option groups."),
  slider: family(["Slider"], [design("Single-value slider", "Slider", '<Slider label="Volume" name="volume" min={0} max={100} step={5} defaultValue={60} />')], "One numeric value per slider. Interval/range selection requires separate controls."),
  rating: family(["Rating"], [design("Star rating", "Rating", '<Rating label="Your rating" name="rating" max={5} defaultValue={4} />')]),
  badge: family(["Badge", "SoftBadge", "OutlineBadge"], [
    design("Classic badge", "Badge", '<Badge tone="success" dot>Available</Badge>'),
    design("Soft badge", "SoftBadge", '<SoftBadge tone="success" dot>Available</SoftBadge>'),
    design("Outline badge", "OutlineBadge", '<OutlineBadge tone="success" dot>Available</OutlineBadge>'),
  ]),
  avatar: family(["Avatar", "AvatarGroup"], [
    design("Initial avatar", "Avatar", '<Avatar name="Alex Morgan" size="lg" status="online" />'),
    design("Avatar group", "AvatarGroup", '<AvatarGroup names={["Alex Morgan", "Jules Santos", "Morgan Lee", "Riley Chen"]} max={3} />'),
  ]),
  card: family(["Card", "SoftCard", "OutlinedCard", "ElevatedCard"], [
    design("Classic card", "Card", '<Card title="A place for your next idea" description="Bring the details together."><p>Made for the way you work.</p></Card>'),
    design("Soft card", "SoftCard", '<SoftCard title="A place for your next idea" description="Bring the details together."><p>Made for the way you work.</p></SoftCard>'),
    design("Outlined card", "OutlinedCard", '<OutlinedCard title="A place for your next idea" description="Bring the details together."><p>Made for the way you work.</p></OutlinedCard>'),
    design("Elevated card", "ElevatedCard", '<ElevatedCard title="A place for your next idea" description="Bring the details together."><p>Made for the way you work.</p></ElevatedCard>'),
  ]),
  table: family(["DataTable"], [design("Interactive data table", "DataTable", '<DataTable caption="Project tasks" columns={[{ key: "title", label: "Task", sortable: true }, { key: "status", label: "Status", sortable: true }]} rows={rows} onRowsChange={setRows} rowKey="id" pageSize={3} selectable editable expandable renderExpanded={row => <p>Details for {row.title}</p>} />', "", 'const [rows, setRows] = useState<Record<string, string | number>[]>([{ id: "1", title: "Review designs", status: "In progress" }, { id: "2", title: "Build components", status: "Planned" }, { id: "3", title: "Write guidelines", status: "Done" }, { id: "4", title: "Check accessibility", status: "Planned" }]);')], "Client-side sorting, filtering and pagination. Use stable row IDs; edits and selections refer to those IDs."),
  accordion: family(["Accordion"], [design("Native accordion", "Accordion", '<Accordion items={[{ id: "install", title: "How do I install Hulmio?", content: "Install the local package and import its stylesheet." }, { id: "fonts", title: "Can I use my own font?", content: "Yes. Components inherit your app’s font." }]} />')]),
  timeline: family(["Timeline"], [design("Activity timeline", "Timeline", '<Timeline items={[{ id: "1", title: "Project created", date: "2026-11-01", description: "The first small step." }, { id: "2", title: "Design reviewed", date: "2026-11-04", description: "Ready to build." }]} />')]),
  chart: family(["Chart"], ["bar", "line", "area", "donut", "heatmap", "scatter"].map(variant => design(`${variant[0].toUpperCase() + variant.slice(1)} chart`, "Chart", `<Chart label="Weekly completed tasks" variant="${variant}" data={[{ label: "Mon", value: 12 }, { label: "Tue", value: 19 }, { label: "Wed", value: 15 }, { label: "Thu", value: 24 }, { label: "Fri", value: 21 }]} />`)), "Includes a readable data table. Scatter and heatmap use indexed categorical values; arbitrary x/y points and 2D matrices are outside this data contract."),
  carousel: family(["Carousel"], [design("Manual carousel", "Carousel", '<Carousel label="Project highlights" items={[<p key="1">Start with a good idea.</p>, <p key="2">Make room for the details.</p>, <p key="3">Build something useful.</p>]} />')], "Manual navigation. No automatic rotation."),
  tabs: family(["Tabs", "PillTabs", "UnderlineTabs"], [
    design("Classic tabs", "Tabs", '<Tabs label="Project sections" defaultValue="overview" items={[{ value: "overview", label: "Overview", content: <p>Everything in one place.</p> }, { value: "details", label: "Details", content: <p>A closer look at the project.</p> }]} />'),
    design("Pill tabs", "PillTabs", '<PillTabs label="Project sections" defaultValue="overview" items={[{ value: "overview", label: "Overview", content: <p>Everything in one place.</p> }, { value: "details", label: "Details", content: <p>A closer look at the project.</p> }]} />'),
    design("Underline tabs", "UnderlineTabs", '<UnderlineTabs label="Project sections" defaultValue="overview" items={[{ value: "overview", label: "Overview", content: <p>Everything in one place.</p> }, { value: "details", label: "Details", content: <p>A closer look at the project.</p> }]} />'),
  ]),
  breadcrumbs: family(["Breadcrumbs"], [design("Breadcrumb trail", "Breadcrumbs", '<Breadcrumbs items={[{ label: "Home", href: "#/" }, { label: "Components", href: "#/components" }, { label: "Breadcrumbs" }]} />')]),
  pagination: family(["Pagination"], [design("Numbered pagination", "Pagination", '<Pagination page={page} totalPages={5} onPageChange={setPage} />', "", 'const [page, setPage] = useState(1);')]),
  stepper: family(["Stepper"], [design("Project stepper", "Stepper", '<Stepper steps={["Details", "Review", "Complete"]} current={step} onStepChange={setStep} />', "", 'const [step, setStep] = useState(0);')]),
  dropdown: family(["DropdownMenu"], [design("Action menu", "DropdownMenu", '<DropdownMenu trigger={<Button variant="outline">Project actions</Button>} items={[{ label: "Show completed", checked: showCompleted, onCheckedChange: setShowCompleted }, { label: "Duplicate" }, { label: "Archive" }, { label: "Delete", destructive: true }]} />', "Button", 'const [showCompleted, setShowCompleted] = useState(false);')]),
  command: family(["CommandPalette"], [design("Command palette", "CommandPalette", '<>\n      <Button onClick={() => setOpen(true)}>Open commands</Button>\n      <CommandPalette open={open} onOpenChange={setOpen} items={[{ id: "components", label: "Browse components", onSelect: () => { location.hash = "/components"; } }, { id: "docs", label: "Read the docs", onSelect: () => { location.hash = "/using-hulmio"; } }]} />\n    </>', "Button", 'const [open, setOpen] = useState(false);')], "Your app owns the open state and any global keyboard shortcut."),
  alert: family(["Alert"], [design("Inline alert", "Alert", '<Alert title="Your changes are saved" tone="success">You can continue where you left off.</Alert>')]),
  toast: family(["Toast"], [design("Status toast", "Toast", '<Toast title="Project saved" description="Everything is up to date." tone="success" />')], "A status notification surface. Your app controls its lifetime and notification queue."),
  progress: family(["Progress"], [design("Linear progress", "Progress", '<Progress label="Preparing files" value={64} />'), design("Circular progress", "Progress", '<Progress label="Preparing files" value={64} circular />')]),
  skeleton: family(["Skeleton"], [design("Loading placeholder", "Skeleton", '<div aria-busy="true" aria-label="Loading content"><Skeleton width="100%" height={24} /><Skeleton width="70%" height={16} /></div>')]),
  spinner: family(["Spinner"], [design("Loading spinner", "Spinner", '<Spinner label="Loading content" />')]),
  "empty-state": family(["EmptyState"], [design("Empty collection", "EmptyState", '<EmptyState title="A fresh start" description="Your projects will appear here." action={<Button>Create project</Button>} />', "Button")]),
  dialog: family(["Dialog", "Modal", "DialogClose"], [design("Modal dialog", "Dialog", '<Dialog title="A focused moment" description="Keep the next step clear." trigger={<Button>Open dialog</Button>}>\n      <p>Your project is ready for a final look.</p>\n      <DialogClose asChild><Button variant="outline">Done</Button></DialogClose>\n    </Dialog>', "Button, DialogClose")]),
  drawer: family(["Drawer"], [design("Side drawer", "Drawer", '<Drawer title="Project details" description="Everything you need, close at hand." side="right" trigger={<Button>Open drawer</Button>}><p>Space for a little more context.</p></Drawer>', "Button")]),
  tooltip: family(["Tooltip"], [design("Focus and hover tooltip", "Tooltip", '<Tooltip content="Add a new project" side="top"><Button variant="outline">New project</Button></Tooltip>', "Button")], "Use one ref-capable interactive child. Essential information belongs in persistent text."),
  popover: family(["Popover"], [design("Context popover", "Popover", '<Popover title="A little more context" trigger={<Button variant="outline">Project info</Button>}><p>This project is shared with your design team.</p></Popover>', "Button")]),
  layout: family(["Container", "Stack", "Grid", "Split"], [design("Responsive composition", "Container", '<Container>\n      <Stack>\n        <Heading as="h3">A place for good ideas</Heading>\n        <Grid columns={2}><Card title="Design"><p>Make it clear.</p></Card><Card title="Build"><p>Make it work.</p></Card></Grid>\n      </Stack>\n    </Container>', "Stack, Grid, Heading, Card")]),
  kanban: family(["Kanban"], [design("Keyboard-friendly board", "Kanban", '<Kanban columns={[{ id: "planned", title: "Planned" }, { id: "active", title: "In progress" }, { id: "done", title: "Done" }]} items={items} onMove={(id, column) => setItems(items.map(item => item.id === id ? { ...item, column } : item))} />', "", 'const [items, setItems] = useState([{ id: "1", title: "Review designs", column: "active" }, { id: "2", title: "Write guidelines", column: "planned" }]);')], "Move controls provide a keyboard-accessible workflow. Persistence and drag-and-drop integrations belong to your app."),
  toggle: family(["Toggle"], [design("Pressable toggle", "Toggle", '<Toggle defaultPressed>Show grid</Toggle>')]),
  "toggle-group": family(["ToggleGroup"], [design("Single-selection toggles", "ToggleGroup", '<ToggleGroup label="View" defaultValue="grid" options={[{ value: "grid", label: "Grid" }, { value: "list", label: "List" }, { value: "board", label: "Board", disabled: true }]} />')]),
  "number-input": family(["NumberInput"], [design("Native number input", "NumberInput", '<NumberInput label="Team members" name="members" min={1} max={50} step={1} defaultValue={4} />')]),
  field: family(["Field"], [design("Connected field", "Field", '<Field label="Project name" hint="Choose a short, useful name."><input name="project" placeholder="Untitled project" required /></Field>')]),
  label: family(["Label"], [design("Native label", "Label", '<div><Label htmlFor="project-name">Project name</Label><input id="project-name" name="project" placeholder="Untitled project" /></div>')]),
  separator: family(["Separator"], [design("Semantic separator", "Separator", '<div><p>Project overview</p><Separator /><p>Project details</p></div>')]),
  collapsible: family(["Collapsible"], [design("Native disclosure", "Collapsible", '<Collapsible title="About this project"><p>Built with space for the details that matter.</p></Collapsible>')]),
  "scroll-area": family(["ScrollArea"], [design("Contained scrolling", "ScrollArea", '<ScrollArea maxHeight={180} aria-label="Project notes">{Array.from({ length: 8 }, (_, index) => <p key={index}>Note {index + 1}: Keep the next step clear.</p>)}</ScrollArea>')]),
  "aspect-ratio": family(["AspectRatio"], [design("Landscape frame", "AspectRatio", '<AspectRatio ratio={16 / 9}><div style={{ height: "100%", display: "grid", placeItems: "center", background: "#edf2e4", color: "#284c3f" }}>16 : 9</div></AspectRatio>')]),
  kbd: family(["Kbd"], [design("Keyboard notation", "Kbd", '<p>Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to search your app.</p>')], "Keyboard notation only. Register shortcut behavior in your app."),
  typography: family(["Text", "Heading"], [design("Semantic typography", "Heading", '<div><Heading as="h3">Clarity in every line.</Heading><Text>A comfortable rhythm for the things you want to say.</Text><Text tone="muted">The library inherits your app’s font.</Text></div>', "Text")]),
  toolbar: family(["Toolbar"], [design("Action toolbar", "Toolbar", '<Toolbar label="Document tools"><Button variant="outline">Print</Button><Button>Save</Button></Toolbar>', "Button")]),
  navbar: family(["Navbar"], [design("Navigation bar", "Navbar", '<Navbar label="Example navigation"><a href="#/">Hulmio</a><a href="#/components">Components</a><a href="#/using-hulmio">Docs</a></Navbar>')]),
  sidebar: family(["Sidebar"], [design("Section navigation", "Sidebar", '<Sidebar label="Example sections"><a href="#/components">All components</a><a href="#/components/button">Buttons</a><a href="#/components/input">Inputs</a></Sidebar>')]),
  "button-link": family(["ButtonLink"], [design("Navigation link", "ButtonLink", '<ButtonLink href="#/components" variant="primary" size="md">Browse components</ButtonLink>')]),
  "alert-dialog": family(["AlertDialog"], [design("Delete confirmation", "AlertDialog", '<div>\n      <AlertDialog title="Delete this project?" description="This removes the project and its files. This action cannot be undone." trigger={<Button variant="outline">Delete project</Button>} confirmLabel="Delete" destructive onConfirm={() => setDeleted(true)} />\n      {deleted && <p role="status">Project deleted.</p>}\n    </div>', "Button", 'const [deleted, setDeleted] = useState(false);')], "onConfirm is synchronous. Perform asynchronous deletion and handle errors in your app before closing a controlled dialog."),
  "input-group": family(["InputGroup", "InputGroupInput", "InputGroupAddon"], [design("Search with an action", "InputGroup", '<form onSubmit={event => { event.preventDefault(); const query = new FormData(event.currentTarget).get("query"); setMessage(query ? `Results for ${query}` : "Enter a project name."); }}>\n      <InputGroup>\n        <InputGroupAddon aria-hidden="true">⌕</InputGroupAddon>\n        <InputGroupInput type="search" aria-label="Search projects" name="query" placeholder="Search projects…" />\n        <InputGroupAddon><Button size="sm" variant="secondary" type="submit">Search</Button></InputGroupAddon>\n      </InputGroup>\n      {message && <p role="status">{message}</p>}\n    </form>', "InputGroupInput, InputGroupAddon, Button", 'const [message, setMessage] = useState("");')]),
  item: family(["Item", "ItemGroup", "ItemContent", "ItemTitle", "ItemDescription", "ItemActions"], [design("Project files", "ItemGroup", '<ItemGroup aria-label="Project files">\n      <Item>\n        <ItemContent><ItemTitle>Getting started</ItemTitle><ItemDescription>Install Hulmio in your React project.</ItemDescription></ItemContent>\n        <ItemActions><ButtonLink href="#/using-hulmio" variant="outline" size="sm">Open</ButtonLink></ItemActions>\n      </Item>\n      <Item>\n        <ItemContent><ItemTitle>Design tokens</ItemTitle><ItemDescription>Shared colors, spacing, and typography.</ItemDescription></ItemContent>\n        <ItemActions><Badge tone="neutral">CSS</Badge></ItemActions>\n      </Item>\n    </ItemGroup>', "Item, ItemContent, ItemTitle, ItemDescription, ItemActions, ButtonLink, Badge")]),
  "simple-table": family(["Table", "TableHeader", "TableBody", "TableFooter", "TableRow", "TableHead", "TableCell", "TableCaption"], [design("Recent invoices", "Table", '<Table>\n      <TableCaption>Recent invoices</TableCaption>\n      <TableHeader><TableRow><TableHead>Invoice</TableHead><TableHead>Status</TableHead><TableHead style={{ textAlign: "right" }}>Amount</TableHead></TableRow></TableHeader>\n      <TableBody>{[{ id: "INV-001", status: "Paid", amount: "$250.00" }, { id: "INV-002", status: "Pending", amount: "$150.00" }, { id: "INV-003", status: "Paid", amount: "$350.00" }].map(row => <TableRow key={row.id}><TableHead scope="row">{row.id}</TableHead><TableCell>{row.status}</TableCell><TableCell style={{ textAlign: "right" }}>{row.amount}</TableCell></TableRow>)}</TableBody>\n    </Table>', "TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption")]),
};

export const packageComponents: Record<string, string> = Object.fromEntries(
  Object.entries(libraryFamilies).map(([id, value]) => [id, value.exports[0]]),
);

export const firstExample = `import { PillButton, Input, Modal, DialogClose } from "hulmio-ui";
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
}`;

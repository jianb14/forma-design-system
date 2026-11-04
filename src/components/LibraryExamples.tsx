import { useId, useState } from "react";
import type { ReactNode } from "react";
import {
  Accordion, Alert, AspectRatio, Avatar, AvatarGroup, Badge, Breadcrumbs, Button,
  ButtonGroup, ButtonLink, Card, Carousel, Chart, Checkbox, ClassicButton,
  Collapsible, ColorPicker, Combobox, CommandPalette, Container, DataTable,
  DatePicker, DateRangePicker, Dialog, DialogClose, Drawer, DropdownMenu,
  ElevatedButton, ElevatedCard, EmptyState, Field, FileUpload, FilledInput,
  Form, GlassButton, GradientButton, Grid, Heading, IconButton, Input, Kbd,
  Kanban, Label, MultiSelect, Navbar, NumberInput, OtpInput, OutlineBadge,
  OutlineButton, OutlinedCard, OutlineInput, Pagination, PillButton, PillTabs,
  Popover, Progress, RadioGroup, Rating, ScrollArea, Select, Separator,
  Sidebar, Skeleton, Slider, SoftBadge, SoftButton, SoftCard, Spinner,
  Stack, Stepper, Switch, Tabs, TagInput, Text, Textarea, Timeline,
  Toast, Toggle, ToggleGroup, Toolbar, Tooltip, UnderlineInput,
  UnderlineTabs, BrutalistButton, AlertDialog, InputGroup, InputGroupAddon,
  InputGroupInput, Item, ItemGroup, ItemContent, ItemTitle, ItemDescription,
  ItemActions, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption,
} from "hulmio-ui";
import type { Size, Variant } from "hulmio-ui";
import { ArrowRight, Check, Copy, Plus, Search } from "lucide-react";
import { buttonDesigns } from "../lib/distribution";
import type { LibraryDesign } from "../lib/distribution";

const namedButtons = { ClassicButton, PillButton, SoftButton, OutlineButton, ElevatedButton, GradientButton, BrutalistButton, GlassButton };
const variants: Variant[] = ["primary", "secondary", "outline", "ghost", "link", "destructive", "soft", "success", "warning", "information"];
const sizes: Size[] = ["xs", "sm", "md", "lg", "xl"];

function CopyExample({ code }: { code: string }) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const copied = copiedCode === code;
  const [copyFailed, setCopyFailed] = useState(false);
  const copy = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setCopyFailed(false);
    } catch {
      setCopyFailed(true);
    }
  };
  return <div className="library-copy-action"><button type="button" onClick={copy} aria-label="Copy import example">{copied ? <Check size={15} /> : <Copy size={15} />}<span aria-live="polite">{copied ? "Copied" : "Copy"}</span></button>{copyFailed && <span className="library-copy-help" role="status">Open Code and select the example to copy.</span>}</div>;
}

export function ExamplePreview({ code, label, children }: { code: string; label: string; children: ReactNode }) {
  const id = useId();
  const [view, setView] = useState("preview");
  return <div className="library-example">
    <div className="library-example-bar">
      <div role="tablist" aria-label={`${label} example`} className="library-example-tabs" onKeyDown={event => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === "Home" ? "preview" : event.key === "End" ? "code" : view === "preview" ? "code" : "preview";
        setView(next);
        document.getElementById(`${id}-${next}-tab`)?.focus();
      }}>
        {(["preview", "code"] as const).map(value => <button key={value} id={`${id}-${value}-tab`} type="button" role="tab" aria-selected={view === value} aria-controls={`${id}-${value}-panel`} tabIndex={view === value ? 0 : -1} onClick={() => setView(value)}>{value === "preview" ? "Preview" : "Code"}</button>)}
      </div>
      <CopyExample code={code} />
    </div>
    <div id={`${id}-preview-panel`} role="tabpanel" aria-labelledby={`${id}-preview-tab`} hidden={view !== "preview"}>{children}</div>
    <div id={`${id}-code-panel`} className="library-code" role="tabpanel" aria-labelledby={`${id}-code-tab`} hidden={view !== "code"}><pre tabIndex={0} aria-label="Import example"><code>{code}</code></pre></div>
  </div>;
}

export function ButtonDesignExample({ design }: { design: (typeof buttonDesigns)[number] }) {
  const [variant, setVariant] = useState<Variant>("primary");
  const [size, setSize] = useState<Size>("md");
  const [state, setState] = useState("default");
  const ButtonDesign = namedButtons[design.exportName];
  const code = `import { ${design.exportName} } from "hulmio-ui";\nimport "hulmio-ui/styles.css";\n\nexport default function App() {\n  return (\n    <${design.exportName}\n      variant="${variant}"\n      size="${size}"${state === "disabled" ? "\n      disabled" : ""}${state === "loading" ? "\n      loading" : ""}\n    >\n      Get started\n    </${design.exportName}>\n  );\n}`;
  return <article className={`library-design library-button-design library-design-${design.design}`} data-library-design={design.design}>
    <header><h2>{design.name}</h2><p>{design.description}</p></header>
    <ExamplePreview code={code} label={`${design.name} button`}>
    <div className="library-button-stage"><ButtonDesign variant={variant} size={size} disabled={state === "disabled"} loading={state === "loading"}>Get started{design.design !== "classic" && <ArrowRight size={16} aria-hidden="true" />}</ButtonDesign></div>
    <div className="library-design-controls">
      <Select label="Variant" aria-label={`${design.name} button variant`} value={variant} onValueChange={value => setVariant(value as Variant)} options={variants.map(value => ({ value, label: value }))} />
      <Select label="Size" aria-label={`${design.name} button size`} value={size} onValueChange={value => setSize(value as Size)} options={sizes.map(value => ({ value, label: value.toUpperCase() }))} />
      <Select label="State" aria-label={`${design.name} button state`} value={state} onValueChange={setState} options={[{ value: "default", label: "Default" }, { value: "disabled", label: "Disabled" }, { value: "loading", label: "Loading" }]} />
    </div>
    </ExamplePreview>
  </article>;
}

const workspaceOptions = [{ value: "studio", label: "Design studio" }, { value: "personal", label: "Personal" }, { value: "archive", label: "Archive", disabled: true }];
const interestOptions = [{ value: "design", label: "Design" }, { value: "code", label: "Code" }, { value: "writing", label: "Writing" }];
const tabItems = [{ value: "overview", label: "Overview", content: <p>Everything in one place. A clear view of what comes next.</p> }, { value: "details", label: "Details", content: <p>A closer look at the decisions, people and small details.</p> }, { value: "archive", label: "Archive", disabled: true, content: <p>Archived projects.</p> }];
const chartData = [{ label: "Mon", value: 12 }, { label: "Tue", value: 19 }, { label: "Wed", value: 15 }, { label: "Thu", value: 24 }, { label: "Fri", value: 21 }];

/** Every branch renders the real public package. Only example data lives here. */
export function LibraryExample({ id, design }: { id: string; design?: LibraryDesign }) {
  const uid = useId();
  const [range, setRange] = useState({ start: "2026-11-04", end: "2026-11-08" });
  const [page, setPage] = useState(1);
  const [step, setStep] = useState(0);
  const [commandOpen, setCommandOpen] = useState(false);
  const [fileCount, setFileCount] = useState(0);
  const [selectionCount, setSelectionCount] = useState(0);
  const [color, setColor] = useState("#284c3f");
  const [alertVisible, setAlertVisible] = useState(true);
  const [message, setMessage] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
  const [rows, setRows] = useState<Record<string, string | number>[]>([
    { id: "1", title: "Review designs", status: "In progress" },
    { id: "2", title: "Build components", status: "Planned" },
    { id: "3", title: "Write guidelines", status: "Done" },
    { id: "4", title: "Check accessibility", status: "Planned" },
  ]);
  const [tasks, setTasks] = useState([
    { id: "1", title: "Review designs", column: "active", description: "Check every detail." },
    { id: "2", title: "Write guidelines", column: "planned", description: "Make the next step clear." },
    { id: "3", title: "Choose a direction", column: "done", description: "A shared starting point." },
  ]);
  const exportName = design?.exportName;
  switch (id) {
    case "button": return <ClassicButton>Get started</ClassicButton>;
    case "icon-button": return <IconButton label="Add item"><Plus size={20} /></IconButton>;
    case "button-group": return <ButtonGroup label="Document actions"><Button variant="outline">Print</Button><Button>Save</Button></ButtonGroup>;
    case "input": {
      if (design?.name === "Invalid input") return <Input label="Invalid email" type="email" defaultValue="alex@" error="Enter a valid email address." />;
      const InputDesign = exportName === "FilledInput" ? FilledInput : exportName === "UnderlineInput" ? UnderlineInput : OutlineInput;
      return <InputDesign label="Email" type="email" placeholder="you@example.com" helper="A little space for a useful hint." />;
    }
    case "textarea": return <Textarea label="Your message" placeholder="Tell us a little more…" maxLength={240} showCount />;
    case "otp-input": return <OtpInput label="Verification code" length={6} name="code" />;
    case "form": return <Form className="library-example-form" onSubmit={event => { event.preventDefault(); setMessage("Form submitted."); }}><Input name="name" label="Your name" required placeholder="Alex Morgan" /><Input name="email" label="Email address" type="email" required placeholder="you@example.com" /><Button type="submit">Submit example</Button>{message && <p role="status">{message}</p>}</Form>;
    case "calendar": return exportName === "DateRangePicker" ? <DateRangePicker label="Trip dates" start={range.start} end={range.end} onRangeChange={setRange} /> : <DatePicker label="Start date" name="date" type="date" />;
    case "upload": return <div className="library-example-stack"><FileUpload label="Choose images" accept="image/*" multiple maxSize={5 * 1024 * 1024} onFilesChange={files => setFileCount(files.length)} /><output>{fileCount ? `${fileCount} file(s) selected. Files stay on your device.` : "Images up to 5 MB each. Files stay on your device."}</output></div>;
    case "tag-input": return <TagInput label="Project tags" name="tags" defaultValue={["Design", "React"]} />;
    case "color-picker": return <div className="library-example-stack"><ColorPicker label="Brand color" name="color" value={color} onValueChange={setColor} /><output>Selected color: {color}</output></div>;
    case "checkbox": return <div className="library-example-stack"><Checkbox label="Send me product updates" name="updates" defaultChecked /><Checkbox label="Include all teams" indeterminate /><Checkbox label="This option is unavailable" disabled /></div>;
    case "radio": return <RadioGroup label="Delivery" name={uid} defaultValue="standard" options={[{ value: "standard", label: "Standard" }, { value: "express", label: "Express" }]} />;
    case "switch": return <Switch label="Email notifications" name="notifications" defaultChecked />;
    case "select": return <Select label="Workspace" name="workspace" defaultValue="studio" options={workspaceOptions} />;
    case "combobox": return <Combobox label="Find a city" name="city" options={[{ value: "Manila", label: "Manila" }, { value: "Cebu", label: "Cebu" }, { value: "Davao", label: "Davao" }]} />;
    case "multi-select": return <MultiSelect label="Your interests" name="interests" defaultValue={["design"]} options={interestOptions} />;
    case "slider": return <Slider label="Volume" name="volume" min={0} max={100} step={5} defaultValue={60} />;
    case "rating": return <Rating label="Your rating" name={uid} max={5} defaultValue={4} />;
    case "badge": {
      const BadgeDesign = exportName === "SoftBadge" ? SoftBadge : exportName === "OutlineBadge" ? OutlineBadge : Badge;
      return <div className="library-example-row"><BadgeDesign tone="success" dot>Available</BadgeDesign><BadgeDesign tone="warning">In review</BadgeDesign><BadgeDesign tone="neutral">Draft</BadgeDesign></div>;
    }
    case "avatar": return exportName === "AvatarGroup" ? <AvatarGroup names={["Alex Morgan", "Jules Santos", "Morgan Lee", "Riley Chen"]} max={3} /> : <Avatar name="Alex Morgan" size="lg" status="online" />;
    case "card": {
      const CardDesign = exportName === "SoftCard" ? SoftCard : exportName === "OutlinedCard" ? OutlinedCard : exportName === "ElevatedCard" ? ElevatedCard : Card;
      return <CardDesign title="A place for your next idea" description="Bring the details together."><p>Made for the way you work, with space for what matters.</p></CardDesign>;
    }
    case "table": return <div className="library-example-stack"><DataTable caption="Project tasks" columns={[{ key: "title", label: "Task", sortable: true }, { key: "status", label: "Status", sortable: true }]} rows={rows} onRowsChange={setRows} rowKey="id" pageSize={3} selectable editable expandable onSelectionChange={ids => setSelectionCount(ids.length)} renderExpanded={row => <p>Details for {row.title}. Edit cells or select a row to explore the table.</p>} /><output>{selectionCount} selected</output></div>;
    case "accordion": return <Accordion items={[{ id: "install", title: "How do I install Hulmio?", content: "Install the local package and import its stylesheet." }, { id: "fonts", title: "Can I use my own font?", content: "Yes. Components inherit your app’s font." }, { id: "coming", title: "An unavailable section", content: "Not available.", disabled: true }]} />;
    case "timeline": return <Timeline items={[{ id: "1", title: "Project created", date: "2026-11-01", description: "The first small step." }, { id: "2", title: "Design reviewed", date: "2026-11-04", description: "Ready to build." }]} />;
    case "chart": {
      const variant = design?.name.split(" ")[0].toLowerCase() as "bar" | "line" | "area" | "donut" | "heatmap" | "scatter" | undefined;
      return <Chart label="Weekly completed tasks" variant={variant || "bar"} data={chartData} />;
    }
    case "carousel": return <Carousel label="Project highlights" items={[<div className="library-carousel-item" key="1"><span>01</span><h3>Start with a good idea.</h3><p>A clear beginning makes the next step easier.</p></div>, <div className="library-carousel-item" key="2"><span>02</span><h3>Make room for the details.</h3><p>The small things shape the whole experience.</p></div>, <div className="library-carousel-item" key="3"><span>03</span><h3>Build something useful.</h3><p>Good design becomes something people can use.</p></div>]} />;
    case "tabs": {
      const TabsDesign = exportName === "PillTabs" ? PillTabs : exportName === "UnderlineTabs" ? UnderlineTabs : Tabs;
      return <TabsDesign label="Project sections" defaultValue="overview" items={tabItems} />;
    }
    case "breadcrumbs": return <Breadcrumbs items={[{ label: "Home", href: "#/" }, { label: "Components", href: "#/components" }, { label: "Breadcrumbs" }]} />;
    case "pagination": return <div className="library-example-stack"><Pagination page={page} totalPages={5} onPageChange={setPage} /><output>Page {page} of 5</output></div>;
    case "stepper": return <Stepper steps={["Details", "Review", "Complete"]} current={step} onStepChange={setStep} />;
    case "dropdown": return <DropdownMenu trigger={<Button variant="outline">Project actions</Button>} items={[{ label: "Show completed", checked: showCompleted, onCheckedChange: setShowCompleted }, { label: "Duplicate" }, { label: "Archive" }, { label: "Delete", destructive: true }]} />;
    case "command": return <><Button onClick={() => setCommandOpen(true)}>Open commands</Button><CommandPalette open={commandOpen} onOpenChange={setCommandOpen} items={[{ id: "components", label: "Browse components", onSelect: () => { location.hash = "/components"; } }, { id: "docs", label: "Read the docs", onSelect: () => { location.hash = "/using-hulmio"; } }]} /></>;
    case "alert": return alertVisible ? <Alert title="Your changes are saved" tone="success" onDismiss={() => setAlertVisible(false)}>You can continue where you left off.</Alert> : <Button variant="outline" onClick={() => setAlertVisible(true)}>Show alert again</Button>;
    case "toast": return alertVisible ? <Toast title="Project saved" description="Everything is up to date." tone="success" onDismiss={() => setAlertVisible(false)} /> : <Button variant="outline" onClick={() => setAlertVisible(true)}>Show toast again</Button>;
    case "progress": return <Progress label="Preparing files" value={64} circular={design?.name === "Circular progress"} />;
    case "skeleton": return <div className="library-example-stack" aria-busy="true" aria-label="Loading content"><Skeleton width="100%" height={24} /><Skeleton width="85%" height={16} /><Skeleton width="60%" height={16} /></div>;
    case "spinner": return <Spinner label="Loading content" />;
    case "empty-state": return <EmptyState title="A fresh start" description="Your projects will appear here." action={<Button>Create project</Button>} />;
    case "dialog": return <Dialog title="A focused moment" description="Keep the next step clear." trigger={<Button>Open dialog</Button>}><p>Your project is ready for a final look.</p><DialogClose asChild><Button variant="outline">Done</Button></DialogClose></Dialog>;
    case "drawer": return <Drawer title="Project details" description="Everything you need, close at hand." side="right" trigger={<Button>Open drawer</Button>}><p>Space for a little more context.</p><p>Use Escape or the close button to return to the page.</p></Drawer>;
    case "tooltip": return <Tooltip content="Add a new project" side="top"><Button variant="outline">New project</Button></Tooltip>;
    case "popover": return <Popover title="A little more context" trigger={<Button variant="outline">Project info</Button>}><p>This project is shared with your design team.</p></Popover>;
    case "layout": return <Container><Stack><Heading as="h3">A place for good ideas</Heading><Grid columns={2}><Card title="Design"><p>Make it clear.</p></Card><Card title="Build"><p>Make it work.</p></Card></Grid></Stack></Container>;
    case "kanban": return <Kanban columns={[{ id: "planned", title: "Planned" }, { id: "active", title: "In progress" }, { id: "done", title: "Done" }]} items={tasks} onMove={(id, column) => setTasks(tasks.map(task => task.id === id ? { ...task, column } : task))} />;
    case "toggle": return <Toggle defaultPressed>Show grid</Toggle>;
    case "toggle-group": return <ToggleGroup label="View" defaultValue="grid" options={[{ value: "grid", label: "Grid" }, { value: "list", label: "List" }, { value: "board", label: "Board", disabled: true }]} />;
    case "number-input": return <NumberInput label="Team members" name="members" min={1} max={50} step={1} defaultValue={4} />;
    case "field": return <Field label="Project name" hint="Choose a short, useful name."><input name="project" placeholder="Untitled project" required /></Field>;
    case "label": return <div className="library-example-stack"><Label htmlFor={`${uid}-project`}>Project name</Label><input className="library-native-input" id={`${uid}-project`} name="project" placeholder="Untitled project" /></div>;
    case "separator": return <div className="library-example-stack"><p>Project overview</p><Separator /><p>Project details</p></div>;
    case "collapsible": return <Collapsible title="About this project"><p>Built with space for the details that matter.</p></Collapsible>;
    case "scroll-area": return <ScrollArea maxHeight={180} aria-label="Project notes">{Array.from({ length: 8 }, (_, index) => <p key={index}>Note {index + 1}: Keep the next step clear.</p>)}</ScrollArea>;
    case "aspect-ratio": return <AspectRatio ratio={16 / 9}><div className="library-ratio-content"><span>16 : 9</span><small>A little space, in proportion.</small></div></AspectRatio>;
    case "kbd": return <p>Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to search your app.</p>;
    case "typography": return <div className="library-example-stack"><Heading as="h3">Clarity in every line.</Heading><Text>A comfortable rhythm for the things you want to say.</Text><Text tone="muted">The library inherits your app’s font.</Text></div>;
    case "toolbar": return <Toolbar label="Document tools"><Button variant="outline">Print</Button><Button>Save</Button></Toolbar>;
    case "navbar": return <Navbar label="Example navigation"><a href="#/">Hulmio</a><a href="#/components">Components</a><a href="#/using-hulmio">Docs</a></Navbar>;
    case "sidebar": return <Sidebar label="Example sections"><a href="#/components">All components</a><a href="#/components/button">Buttons</a><a href="#/components/input">Inputs</a></Sidebar>;
    case "button-link": return <ButtonLink href="#/components" variant="primary" size="md">Browse components</ButtonLink>;
    case "alert-dialog": return <div className="library-example-stack library-centered-example"><AlertDialog title="Delete this project?" description="This removes the project and its files. This action cannot be undone." trigger={<Button variant="outline">Delete project</Button>} confirmLabel="Delete" destructive onConfirm={() => setMessage("Project deleted.")} />{message && <p role="status">{message}</p>}</div>;
    case "input-group": return <form className="library-example-stack" onSubmit={event => { event.preventDefault(); const value = new FormData(event.currentTarget).get("query"); setMessage(value ? `Results for ${value}` : "Enter a project name."); }}><InputGroup><InputGroupAddon><Search size={16} aria-hidden="true" /></InputGroupAddon><InputGroupInput type="search" aria-label="Search projects" name="query" placeholder="Search projects…" /><InputGroupAddon><Button size="sm" type="submit" variant="secondary">Search</Button></InputGroupAddon></InputGroup>{message && <p role="status">{message}</p>}</form>;
    case "item": return <ItemGroup aria-label="Project files"><Item><ItemContent><ItemTitle>Getting started</ItemTitle><ItemDescription>Install Hulmio in your React project.</ItemDescription></ItemContent><ItemActions><ButtonLink href="#/using-hulmio" variant="outline" size="sm" aria-label="Open installation guide">Open <ArrowRight size={14} aria-hidden="true" /></ButtonLink></ItemActions></Item><Item><ItemContent><ItemTitle>Design tokens</ItemTitle><ItemDescription>Shared colors, spacing, and typography.</ItemDescription></ItemContent><ItemActions><Badge tone="neutral">CSS</Badge></ItemActions></Item></ItemGroup>;
    case "simple-table": return <Table><TableCaption>Recent invoices</TableCaption><TableHeader><TableRow><TableHead>Invoice</TableHead><TableHead>Status</TableHead><TableHead style={{ textAlign: "right" }}>Amount</TableHead></TableRow></TableHeader><TableBody>{[{ id: "INV-001", status: "Paid", amount: "$250.00" }, { id: "INV-002", status: "Pending", amount: "$150.00" }, { id: "INV-003", status: "Paid", amount: "$350.00" }].map(row => <TableRow key={row.id}><TableHead scope="row">{row.id}</TableHead><TableCell>{row.status}</TableCell><TableCell style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{row.amount}</TableCell></TableRow>)}</TableBody></Table>;
    default: return <p>This component example is being prepared.</p>;
  }
}

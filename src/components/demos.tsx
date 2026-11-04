import { useId, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Plus,
  Search,
  Mail,
  Heart,
  MoreHorizontal,
  ArrowUpDown,
  ChevronRight,
  ChevronLeft,
  Check,
  CloudUpload,
  File,
  X,
  Star,
  SlidersHorizontal,
  Command,
  FolderPlus,
  Trash2,
  Download,
  ArrowUpRight,
  Minus,
  CheckCircle2,
  Image,
  GripVertical,
} from "lucide-react";
import {
  Accordion,
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Checkbox,
  DialogClose,
  Dropdown,
  BrandMark,
  Input,
  Modal,
  Progress,
  Radio,
  Select,
  Switch,
  Tabs,
  Tooltip,
} from "./ui";
import type { Size, Variant } from "./ui";
import { downloadFile } from "../lib/tokens";
export interface DemoProps {
  id: string;
  variant?: string;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  shape?: "rounded" | "pill" | "square";
  notify?: (text: string) => void;
  onCommand?: () => void;
}
const names = [
  "Alex Morgan",
  "Jules Santos",
  "Sam Rivera",
  "Morgan Lee",
  "Robin Chen",
  "Jamie Park",
  "Casey Cruz",
  "Taylor Lim",
];
export function ComponentDemo({
  id,
  variant = "Primary",
  size = "md",
  disabled = false,
  loading = false,
  shape = "rounded",
  notify = () => {},
  onCommand,
}: DemoProps) {
  const [toggle, setToggle] = useState(
    id === "switch" ? variant !== "Off" : true,
  );
  const [value, setValue] = useState(64);
  const [tab, setTab] = useState("Overview");
  const [page, setPage] = useState(1);
  const [text, setText] = useState("");
  const [selected, setSelected] = useState(["Design"]);
  const [rating, setRating] = useState(3);
  const [color, setColor] = useState("#284c3f");
  const uid = useId();
  const lower = variant.toLowerCase();
  switch (id) {
    case "button":
      return (
        <Button
          size={size}
          shape={shape}
          variant={
            (lower === "default" || lower === "loading" || lower === "disabled"
              ? "primary"
              : lower) as Variant
          }
          loading={loading || lower === "loading"}
          disabled={disabled || lower === "disabled"}
          onClick={() => notify("Your action is complete. Nicely done!")}
        >
          Get started <ArrowRight size={15} />
        </Button>
      );
    case "icon-button":
      return (
        <div className="flex items-center gap-4">
          <Tooltip
            content={toggle ? "Remove from favorites" : "Add to favorites"}
          >
            <Button
              className="icon-button"
              aria-label={toggle ? "Remove from favorites" : "Add to favorites"}
              aria-pressed={toggle}
              shape={lower === "circle" ? "circle" : "rounded"}
              variant={
                lower === "ghost"
                  ? "ghost"
                  : lower === "outline"
                    ? "outline"
                    : toggle
                      ? "primary"
                      : "outline"
              }
              disabled={disabled || lower === "disabled"}
              onClick={() => setToggle(!toggle)}
            >
              <Heart size={18} fill={toggle ? "currentColor" : "none"} />
            </Button>
          </Tooltip>
          <Button
            className="icon-button"
            variant="outline"
            aria-label="Add item"
            disabled={disabled || lower === "disabled"}
            onClick={() => notify("Item added")}
          >
            <Plus size={18} />
          </Button>
          <Dropdown
            onAction={notify}
            trigger={
              <Button
                variant="ghost"
                className="icon-button"
                aria-label="More actions"
                disabled={disabled || lower === "disabled"}
              >
                <MoreHorizontal size={20} />
              </Button>
            }
          />
        </div>
      );
    case "button-group":
      if (lower === "split")
        return (
          <div className="button-group">
            <Button onClick={() => notify("Project saved locally")}>
              Save project
            </Button>
            <Dropdown
              onAction={notify}
              trigger={
                <Button aria-label="More save options">
                  <ChevronRight size={15} />
                </Button>
              }
            />
          </div>
        );
      return (
        <div
          className={lower === "segmented" ? "segmented-group" : "button-group"}
          role="group"
          aria-label="Calendar view"
        >
          {["Day", "Week", "Month"].map((t) => (
            <Button
              key={t}
              variant={
                (text || "Week") === t
                  ? "primary"
                  : lower === "toggle"
                    ? "ghost"
                    : "outline"
              }
              aria-pressed={(text || "Week") === t}
              onClick={() => setText(t)}
            >
              {t}
            </Button>
          ))}
        </div>
      );
    case "input": {
      const types: Record<string, string> = {
        email: "email",
        password: "password",
        number: "number",
        search: "search",
        telephone: "tel",
        url: "url",
        currency: "number",
        masked: "password",
      };
      const type = types[lower] || "text";
      return (
        <Input
          className="demo-field"
          label={
            lower === "email"
              ? "Email address"
              : lower === "password"
                ? "Password"
                : lower === "currency"
                  ? "Amount"
                  : "Your name"
          }
          type={type}
          placeholder={
            type === "email"
              ? "you@example.com"
              : type === "password"
                ? "Enter your password"
                : type === "number"
                  ? "0.00"
                  : "e.g. Alex Morgan"
          }
          helper="A little detail makes all the difference."
          error={
            lower === "invalid" ? "Please enter a valid value." : undefined
          }
          disabled={disabled || lower === "disabled"}
          readOnly={lower === "read-only"}
          defaultValue={lower === "read-only" ? "Alex Morgan" : undefined}
          required={lower === "required"}
          clearable={lower === "clearable"}
          leading={
            ["prefix", "currency"].includes(lower) ? (
              "₱"
            ) : lower === "search" ? (
              <Search size={16} />
            ) : lower === "email" ? (
              <Mail size={16} />
            ) : undefined
          }
          trailing={lower === "suffix" ? ".com" : undefined}
        />
      );
    }
    case "textarea":
      return (
        <div className="field demo-field">
          <label htmlFor={uid}>A few words about your project</label>
          <textarea
            id={uid}
            maxLength={240}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Every great thing starts with an idea…"
            rows={4}
            disabled={disabled || lower === "disabled"}
            required={lower === "required"}
          />
          {lower === "counter" && (
            <p className="field-helper text-right">
              {text.length} / 240 characters
            </p>
          )}
        </div>
      );
    case "otp-input":
      return (
        <Otp
          masked={lower === "masked" || lower === "pin"}
          length={lower === "pin" ? 4 : 6}
        />
      );
    case "form":
      return (
        <FormDemo
          notify={notify}
          wizard={lower === "multi-step"}
          inline={lower === "inline"}
          validated={lower === "validated"}
        />
      );
    case "calendar":
      return (
        <div className="flex flex-wrap gap-4 w-full max-w-lg">
          <Input
            label={lower === "range" ? "Start date" : "Choose a date"}
            type={
              lower === "date-time"
                ? "datetime-local"
                : lower === "month"
                  ? "month"
                  : lower === "time"
                    ? "time"
                    : lower === "week"
                      ? "week"
                      : "date"
            }
          />
          {lower === "range" && <Input label="End date" type="date" />}
        </div>
      );
    case "upload":
      return (
        <Upload notify={notify} image={["image", "avatar"].includes(lower)} />
      );
    case "tag-input":
      return (
        <div className="field demo-field">
          <label htmlFor={uid}>Project tags</label>
          <div className="tag-input">
            {selected.map((s) => (
              <span key={s} className="removable-tag">
                {s}
                {lower !== "default" && (
                  <button
                    aria-label={`Remove ${s}`}
                    onClick={() => setSelected(selected.filter((v) => v !== s))}
                    disabled={disabled || lower === "disabled"}
                  >
                    <X size={12} />
                  </button>
                )}
              </span>
            ))}
            <input
              id={uid}
              value={text}
              disabled={disabled || lower === "disabled"}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add a tag…"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (text.trim() && !selected.includes(text.trim()))
                    setSelected([...selected, text.trim()]);
                  setText("");
                }
                if (e.key === "Backspace" && !text)
                  setSelected(selected.slice(0, -1));
              }}
            />
          </div>
          <p className="field-helper">Press Enter to add a tag.</p>
        </div>
      );
    case "color-picker":
      return (
        <div className="color-picker-demo">
          <div className="flex items-end gap-4">
            <div className="field">
              <label htmlFor={uid}>Brand color</label>
              <input
                type="color"
                id={uid}
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <Input
              label="Hex value"
              value={color}
              onChange={(e) => {
                if (/^#[0-9a-f]{6}$/i.test(e.target.value))
                  setColor(e.target.value);
              }}
            />
            <div className="color-preview" style={{ background: color }} />
          </div>
          {lower !== "native" && (
            <div className="color-picker-palette">
              {["#284c3f", "#d9ed92", "#e8ad8d", "#d6cfe4", "#436fa4"].map(
                (hex) => (
                  <button
                    key={hex}
                    aria-label={`Choose ${hex}`}
                    aria-pressed={color === hex}
                    onClick={() => setColor(hex)}
                    style={{ background: hex }}
                  />
                ),
              )}
            </div>
          )}
        </div>
      );
    case "checkbox":
      return (
        <fieldset className="space-y-4">
          <legend className="demo-legend">Your workspace, your way</legend>
          <Checkbox
            label="Product updates"
            defaultChecked={lower === "checked" || lower === "group"}
            disabled={disabled || lower === "disabled"}
            indeterminate={lower === "indeterminate"}
          />
          {lower === "group" && (
            <>
              <Checkbox label="Design inspiration" defaultChecked />
              <Checkbox label="Community news" />
            </>
          )}
        </fieldset>
      );
    case "radio":
      return (
        <fieldset
          className={lower === "card" ? "space-y-4 radio-cards" : "space-y-4"}
        >
          <legend className="demo-legend">Choose your workspace</legend>
          {["Personal", "Team", "Enterprise"].map((v, i) => (
            <Radio
              key={v}
              name={uid}
              value={v}
              label={v}
              defaultChecked={lower === "selected" ? i === 1 : i === 0}
              disabled={disabled || (lower === "disabled" && i === 2)}
            />
          ))}
        </fieldset>
      );
    case "switch":
      return (
        <Switch
          label="Email notifications"
          checked={toggle}
          onChange={setToggle}
          disabled={disabled || lower === "disabled"}
          small={lower === "small"}
        />
      );
    case "select":
      if (lower === "grouped")
        return (
          <div className="field demo-field">
            <label htmlFor={uid}>Your role</label>
            <div className="select-shell">
              <select id={uid}>
                <option>Choose your role</option>
                <optgroup label="Design">
                  <option>Product designer</option>
                  <option>Brand designer</option>
                </optgroup>
                <optgroup label="Engineering">
                  <option>Frontend developer</option>
                  <option>Backend developer</option>
                </optgroup>
              </select>
            </div>
          </div>
        );
      return (
        <div className="demo-field">
          <Select
            label="Your role"
            options={[
              "Choose your role",
              "Designer",
              "Developer",
              "Product manager",
              "Something else",
            ]}
            disabled={disabled || lower === "disabled"}
          />
        </div>
      );
    case "combobox":
      return (
        <div className="field demo-field">
          <label htmlFor={uid}>Find a framework</label>
          <input
            id={uid}
            list={`${uid}-list`}
            placeholder={
              lower === "empty" ? "No frameworks added yet" : "Type to search…"
            }
          />
          <datalist id={`${uid}-list`}>
            {(lower === "empty"
              ? []
              : ["React", "Next.js", "Vue", "Svelte", "Astro", "Angular"]
            ).map((t) => (
              <option key={t} value={t} />
            ))}
          </datalist>
          <p className="field-helper">
            {lower === "empty"
              ? "Add frameworks to your workspace to start choosing."
              : "Start typing to see matching options."}
          </p>
        </div>
      );
    case "multi-select":
      return (
        <fieldset className="multi-select demo-field">
          <legend>What are you working on?</legend>
          {["Design", "Development", "Research", "Strategy"].map((t) => (
            <Checkbox
              key={t}
              label={t}
              checked={selected.includes(t)}
              disabled={disabled || lower === "disabled"}
              onChange={() =>
                setSelected(
                  selected.includes(t)
                    ? selected.filter((s) => s !== t)
                    : [...selected, t],
                )
              }
            />
          ))}
          <p className="field-helper">{selected.length} selected</p>
          {lower === "chips" && (
            <div className="flex flex-wrap gap-2 mt-3">
              {selected.map((s) => (
                <span className="removable-tag" key={s}>
                  {s}
                  <button
                    aria-label={`Remove ${s}`}
                    onClick={() => setSelected(selected.filter((v) => v !== s))}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </fieldset>
      );
    case "slider":
      return (
        <div className="field demo-field">
          <label htmlFor={uid}>
            Workspace capacity{" "}
            <span className="float-right mono">{value}%</span>
          </label>
          <input
            id={uid}
            type="range"
            min={lower === "range" ? page : 0}
            max={100}
            value={value}
            step={lower === "stepped" ? 10 : 1}
            onChange={(e) => setValue(+e.target.value)}
            disabled={disabled || lower === "disabled"}
          />
          {lower === "range" && (
            <>
              <label htmlFor={`${uid}-low`}>Minimum: {page}%</label>
              <input
                id={`${uid}-low`}
                type="range"
                min={0}
                max={value}
                value={page}
                onChange={(e) => setPage(+e.target.value)}
              />
            </>
          )}
        </div>
      );
    case "rating":
      return (
        <fieldset className="rating">
          <legend className="sr-only">Rate your experience</legend>
          {[1, 2, 3, 4, 5].map((v) => (
            <label key={v}>
              <input
                type="radio"
                name={uid}
                className="sr-only"
                value={v}
                checked={rating === v}
                disabled={lower === "read-only"}
                onChange={() => setRating(v)}
              />
              <span className="sr-only">{v} stars</span>
              <Star
                size={lower === "small" ? 20 : 28}
                className={v <= rating ? "star-filled" : ""}
                fill={v <= rating ? "currentColor" : "none"}
              />
            </label>
          ))}
          <span>{rating} of 5</span>
        </fieldset>
      );
    case "badge":
      return (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Badge
            tone={lower === "dot" ? "success" : lower}
            dot={lower === "dot"}
            outline={lower === "outline"}
          >
            {lower === "success" || lower === "dot"
              ? "Published"
              : lower === "warning"
                ? "In review"
                : lower === "danger"
                  ? "Archived"
                  : lower === "information"
                    ? "New update"
                    : "Design system"}
          </Badge>
        </div>
      );
    case "avatar":
      return (
        <div className="flex items-center flex-wrap gap-5">
          {lower === "group" ? (
            <AvatarGroup />
          ) : lower === "sizes" ? (
            <>
              <Avatar name="Alex Morgan" size="sm" />
              <Avatar name="Jules Santos" color={1} />
              <Avatar name="Sam Rivera" color={2} size="lg" />
            </>
          ) : (
            <Avatar
              name={lower === "fallback" ? "Unknown Person" : "Alex Morgan"}
              status={lower === "status"}
            />
          )}
        </div>
      );
    case "card":
      if (lower === "statistic")
        return (
          <div className="demo-card">
            <span className="overline">COMPONENT ADOPTION</span>
            <h3 style={{ fontSize: 42 }}>74.2%</h3>
            <p className="text-success">↗ 18.4% from last month</p>
            <Progress value={74} label="Team adoption" />
          </div>
        );
      if (lower === "profile")
        return (
          <div className="demo-card text-center">
            <div className="flex justify-center">
              <Avatar name="Alex Morgan" size="lg" status />
            </div>
            <h3>Alex Morgan</h3>
            <p>Product designer. A fan of thoughtful details.</p>
            <Button
              size="sm"
              variant="outline"
              className="mt-5"
              onClick={() => notify("You are now following Alex in this demo.")}
            >
              Follow Alex <Plus size={13} />
            </Button>
          </div>
        );
      if (lower === "product")
        return (
          <div className="demo-card">
            <div className="product-art">
              <BrandMark size={75} />
            </div>
            <div className="flex items-center justify-between mt-5">
              <h3 className="!mt-0">The everyday journal</h3>
              <Badge>₱480</Badge>
            </div>
            <p>A little space for your next good idea.</p>
            <Button
              fullWidth
              className="mt-5"
              onClick={() => notify("Journal added to the demo cart.")}
            >
              Add to cart <Plus size={14} />
            </Button>
          </div>
        );
      if (lower === "interactive")
        return (
          <button
            className="demo-card interactive-card"
            onClick={() => notify("Your project is open. Make it yours.")}
          >
            <BrandMark size={30} />
            <h3>A space for your next idea.</h3>
            <p>Open your project and make something good.</p>
            <span className="text-link mt-5">
              Open project <ArrowUpRight size={14} />
            </span>
          </button>
        );
      return (
        <div className="demo-card">
          <div className="flex justify-between items-center">
            <span className="mono overline">YOUR WORKSPACE</span>
            <BrandMark size={24} />
          </div>
          <h3>Room for good ideas.</h3>
          <p>A shared space to create something worth caring about.</p>
          <div className="flex items-center justify-between mt-5">
            <AvatarGroup />
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                notify(
                  "Invitation preview opened. Add your team integration to send invites.",
                )
              }
            >
              Invite <Plus size={13} />
            </Button>
          </div>
        </div>
      );
    case "table":
      return (
        <TableDemo
          notify={notify}
          editable={lower === "editable"}
          expandable={lower === "expandable"}
        />
      );
    case "accordion":
      return (
        <div className="w-full max-w-lg">
          <Accordion
            multiple={lower !== "single"}
            disabled={lower === "disabled"}
            items={[
              {
                title: "What is Hulmio?",
                content:
                  "A shared space for your projects, your team, and the ideas you have yet to make.",
              },
              {
                title: "Can I make it my own?",
                content:
                  lower === "nested" ? (
                    <Accordion
                      items={[
                        {
                          title: "Your workspace",
                          content:
                            "Choose a name, add a little personality, and make yourself at home.",
                        },
                        {
                          title: "Your team",
                          content:
                            "Invite the people you work with and make room for shared ideas.",
                        },
                      ]}
                    />
                  ) : (
                    "Absolutely. Set up your workspace, invite your people, and find a way of working that feels right."
                  ),
              },
              {
                title: "Can I change the appearance?",
                content:
                  "Choose a light, dark, or high-contrast appearance. You can change it whenever the mood changes.",
              },
            ]}
          />
        </div>
      );
    case "timeline":
      return (
        <ol className="timeline">
          {[
            {
              title: "Design system published",
              time: "Today, 10:30 AM",
              text: "A fresh foundation for everything we build.",
            },
            {
              title: "Components reviewed",
              time: "Yesterday, 3:45 PM",
              text: "A considered collection, one shared language.",
            },
            {
              title: "Brand direction approved",
              time: "Oct 30, 9:00 AM",
              text: "Warm, intentional, and a little unexpected.",
            },
          ].map((v, i) => (
            <li key={v.title}>
              <span
                className={
                  i === 0 ? "timeline-marker active" : "timeline-marker"
                }
              />
              <div>
                <strong>{v.title}</strong>
                <time dateTime={`2026-11-0${2 - Math.min(i, 1)}`}>
                  {v.time}
                </time>
                <p>{v.text}</p>
              </div>
            </li>
          ))}
        </ol>
      );
    case "chart":
      return <ChartDemo variant={lower} />;
    case "carousel":
      return (
        <div className="carousel">
          <div className={`carousel-slide slide-${page % 3}`}>
            <BrandMark size={70} />
            <span className="overline">PRINCIPLE 0{page}</span>
            <h3>
              {
                [
                  "Make room for clarity.",
                  "Find the human side.",
                  "Build with intention.",
                ][page - 1]
              }
            </h3>
          </div>
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              size="sm"
              aria-label="Previous slide"
              onClick={() => setPage(page === 1 ? 3 : page - 1)}
            >
              <ArrowLeft size={15} />
            </Button>
            <span className="mono">{page} / 3</span>
            <Button
              variant="outline"
              size="sm"
              aria-label="Next slide"
              onClick={() => setPage(page === 3 ? 1 : page + 1)}
            >
              <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      );
    case "tabs":
      return (
        <div className="w-full max-w-md">
          <Tabs
            items={["Overview", "Activity", "Settings"]}
            value={tab}
            onChange={setTab}
            variant={
              lower === "pill"
                ? "pill"
                : lower === "vertical"
                  ? "vertical"
                  : "underline"
            }
            panelId={`${uid}-tabs-panel`}
            disabledItems={lower === "disabled" ? ["Settings"] : []}
          />
          <div
            role="tabpanel"
            className="tab-demo-panel"
            id={`${uid}-tabs-panel`}
            aria-label={tab}
            tabIndex={0}
          >
            <h3>{tab}</h3>
            <p>
              {tab === "Overview"
                ? "Everything you need to see the bigger picture."
                : tab === "Activity"
                  ? "Your latest updates, all in one place."
                  : "A workspace that works the way you do."}
            </p>
          </div>
        </div>
      );
    case "breadcrumbs":
      return (
        <nav aria-label="Breadcrumb" className="breadcrumbs">
          <a href="#/overview">Home</a>
          <ChevronRight size={13} />
          {lower === "collapsed" ? (
            <Dropdown
              trigger={
                <Button
                  variant="ghost"
                  size="xs"
                  aria-label="Show hidden breadcrumb levels"
                >
                  …
                </Button>
              }
            />
          ) : (
            <a href="#/components">Components</a>
          )}
          <ChevronRight size={13} />
          <span aria-current="page">Breadcrumbs</span>
        </nav>
      );
    case "pagination":
      return (
        <nav className="pagination" aria-label="Pagination">
          <Button
            aria-label="Previous page"
            variant="ghost"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            <ChevronLeft size={16} />
          </Button>
          {(lower === "previous / next"
            ? []
            : lower === "compact"
              ? [page]
              : [1, 2, 3, 4, 5]
          ).map((n) => (
            <Button
              key={n}
              variant={page === n ? "primary" : "ghost"}
              size="sm"
              aria-current={page === n ? "page" : undefined}
              aria-label={`Page ${n}`}
              onClick={() => setPage(n)}
            >
              {n}
            </Button>
          ))}
          <Button
            aria-label="Next page"
            variant="ghost"
            size="sm"
            disabled={page === 5}
            onClick={() => setPage(page + 1)}
          >
            <ChevronRight size={16} />
          </Button>
        </nav>
      );
    case "stepper":
      return (
        <div
          className={`stepper ${lower === "vertical" ? "stepper-vertical" : ""}`}
        >
          {["Details", "Preferences", "Review"].map((s, i) => (
            <button
              key={s}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "step" : undefined}
              className={
                lower === "completed" || page >= i + 1 ? "step-active" : ""
              }
            >
              <span>
                {lower === "completed" || page > i + 1 ? (
                  <Check size={14} />
                ) : (
                  i + 1
                )}
              </span>
              {s}
              {i < 2 && <i />}
            </button>
          ))}
        </div>
      );
    case "dropdown":
      return (
        <Dropdown
          onAction={(action) => {
            if (action === "Export")
              downloadFile(
                "hulmio-project.json",
                JSON.stringify(
                  { name: "My Hulmio project", version: "1.0.0" },
                  null,
                  2,
                ),
              );
            notify(
              action === "Export" ? "Project exported" : `${action} selected`,
            );
          }}
        />
      );
    case "command":
      if (lower === "empty")
        return (
          <div className="empty-state">
            <Search size={28} />
            <h3>No matching commands.</h3>
            <p>Try a component name like “Button”.</p>
            <Button variant="outline" onClick={onCommand}>
              Search the system
            </Button>
          </div>
        );
      return (
        <Button variant="outline" onClick={onCommand}>
          <Search size={15} />
          Search the system<kbd>⌘ K</kbd>
        </Button>
      );
    case "alert":
      return (
        <div className="w-full max-w-lg">
          <Alert
            title={
              lower === "success"
                ? "A little progress. A big difference."
                : lower === "danger"
                  ? "Something needs your attention."
                  : lower === "warning"
                    ? "You are almost at your limit."
                    : "A fresh start for your next project."
            }
            tone={
              ["success", "danger", "warning"].includes(lower)
                ? lower
                : "information"
            }
            dismissible={lower === "dismissible"}
          >
            Your workspace is ready. Let’s make something good.
          </Alert>
        </div>
      );
    case "toast":
      return (
        <div className="space-y-5">
          {text && (
            <div
              className="toast-demo"
              role={lower === "error" ? "alert" : "status"}
            >
              <Alert
                tone={
                  lower === "error"
                    ? "danger"
                    : lower === "information"
                      ? "information"
                      : "success"
                }
                title={text}
              />
              {lower === "dismissible" && (
                <button
                  aria-label="Dismiss demo toast"
                  onClick={() => setText("")}
                >
                  <X size={15} />
                </button>
              )}
            </div>
          )}
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() =>
                setText(
                  lower === "error"
                    ? "Could not save. Please try again."
                    : lower === "information"
                      ? "Your workspace has a new update."
                      : "Changes saved. You are all set!",
                )
              }
            >
              <CheckCircle2 size={15} />
              Show toast
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                downloadFile(
                  "hulmio-sample.json",
                  JSON.stringify({ message: "Something good." }, null, 2),
                );
                setText("Your download is ready.");
              }}
            >
              <Download size={15} />
              Download toast
            </Button>
          </div>
        </div>
      );
    case "progress":
      return (
        <div className="demo-field">
          <Progress
            value={value}
            label="Building something good"
            circular={lower === "circular"}
            indeterminate={lower === "indeterminate"}
          />
          <Button
            variant="ghost"
            size="sm"
            className="mt-3"
            onClick={() =>
              setValue(value >= 100 ? 0 : Math.min(100, value + 12))
            }
          >
            Advance progress <ArrowRight size={14} />
          </Button>
        </div>
      );
    case "skeleton":
      return (
        <div
          className={`skeleton-demo ${lower !== "shimmer" ? "skeleton-static" : ""} ${lower === "card" ? "skeleton-card" : ""}`}
          aria-label="Loading content"
          role="status"
        >
          <span className="sr-only">Loading…</span>
          {lower !== "text" && (
            <div className="skeleton skeleton-avatar" aria-hidden="true" />
          )}
          {lower !== "avatar" && (
            <div className="flex-1 space-y-3" aria-hidden="true">
              <div className="skeleton h-3 w-3/4" />
              <div className="skeleton h-3 w-full" />
              <div className="skeleton h-3 w-1/2" />
            </div>
          )}
        </div>
      );
    case "spinner":
      return (
        <div className="flex items-center gap-5" role="status">
          <span className={`spinner spinner-${lower}`} />
          <span className="muted">A good thing is on its way…</span>
        </div>
      );
    case "empty-state":
      return (
        <div className="empty-state">
          <span className="empty-icon">
            {lower === "error" ? (
              <X size={25} />
            ) : lower === "success" ? (
              <Check size={25} />
            ) : (
              <FolderPlus size={25} />
            )}
          </span>
          <h3>
            {lower === "error"
              ? "A little bump in the road."
              : lower === "success"
                ? "You are all set."
                : lower === "search"
                  ? "No matches just yet."
                  : "A little room for possibility."}
          </h3>
          <p>
            {lower === "search"
              ? "Try a different word or clear your filters."
              : "Your next great project can start right here."}
          </p>
          <Button
            size="sm"
            onClick={() =>
              notify(
                lower === "error"
                  ? "Ready to try again."
                  : "Your new project is ready.",
              )
            }
          >
            {lower === "error" ? "Try again" : "Create a project"}
            <Plus size={14} />
          </Button>
        </div>
      );
    case "dialog":
      return (
        <Modal
          fullscreen={lower === "fullscreen"}
          title={
            lower === "destructive"
              ? "Delete this project?"
              : "Make room for something new."
          }
          description={
            lower === "destructive"
              ? "This demo does not delete any real data."
              : "Give your next good idea a place to grow."
          }
          trigger={
            <Button
              variant={lower === "destructive" ? "destructive" : "outline"}
            >
              Open {lower === "confirmation" ? "confirmation" : "dialog"}{" "}
              <ArrowUpRight size={14} />
            </Button>
          }
        >
          <Input label="Project name" placeholder="Something good" />
          <div className="dialog-actions">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant={lower === "destructive" ? "destructive" : "primary"}
                onClick={() =>
                  notify(
                    lower === "destructive"
                      ? "Demo project deleted."
                      : "Project created. Make it yours!",
                  )
                }
              >
                {lower === "destructive" ? "Delete project" : "Create project"}
              </Button>
            </DialogClose>
          </div>
        </Modal>
      );
    case "drawer":
      return (
        <Modal
          drawer
          side={lower === "left" || lower === "bottom" ? lower : "right"}
          title="Make yourself at home."
          description="A few preferences for your workspace."
          trigger={
            <Button variant="outline">
              Open drawer <SlidersHorizontal size={15} />
            </Button>
          }
        >
          <div className="space-y-6 mt-6">
            <Input label="Workspace name" placeholder="My workspace" />
            <Select
              label="Default view"
              options={["Overview", "Projects", "Activity"]}
            />
            <Switch
              label="Email notifications"
              checked={toggle}
              onChange={setToggle}
            />
            <DialogClose asChild>
              <Button
                fullWidth
                onClick={() => notify("Workspace preferences saved")}
              >
                Save preferences
              </Button>
            </DialogClose>
          </div>
        </Modal>
      );
    case "tooltip":
      return (
        <div className="flex gap-5">
          {[lower as "top" | "bottom" | "left" | "right"].map((side) => (
            <Tooltip key={side} content="A little more context." side={side}>
              <Button variant="outline" size="sm">
                {side[0].toUpperCase() + side.slice(1)}
              </Button>
            </Tooltip>
          ))}
        </div>
      );
    case "popover":
      return (
        <Modal
          nonModal
          title="A familiar face."
          description="Designer, builder, and a fan of thoughtful details."
          trigger={
            <Button variant="outline">
              Meet Alex <ArrowUpRight size={14} />
            </Button>
          }
        >
          <div className="flex items-center gap-4 mt-5">
            <Avatar name="Alex Morgan" size="lg" status />
            <div>
              <strong>Alex Morgan</strong>
              <p className="muted">Product designer · Hulmio</p>
            </div>
          </div>
        </Modal>
      );
    case "layout":
      return (
        <div
          className={`layout-demo ${lower === "stack" ? "layout-stack" : lower === "split" ? "layout-split" : lower === "container" ? "layout-container" : lower === "aspect ratio" ? "layout-aspect" : lower === "scroll area" ? "layout-scroll" : ""}`}
        >
          {["Header", "Sidebar", "Main content", "Footer"].map((s) => (
            <div key={s}>{s}</div>
          ))}
        </div>
      );
    case "kanban":
      return <Kanban />;
    default:
      return <BrandMark size={48} />;
  }
}
function Otp({ masked, length = 6 }: { masked: boolean; length?: number }) {
  const [digits, setDigits] = useState(Array.from({ length }, () => ""));
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  return (
    <div>
      <fieldset className="otp-fields">
        <legend>Enter your verification code</legend>
        {digits.map((v, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type={masked ? "password" : "text"}
            aria-label={`Digit ${i + 1}`}
            inputMode="numeric"
            maxLength={1}
            value={v}
            autoComplete={i === 0 ? "one-time-code" : "off"}
            onChange={(e) => {
              const s = e.target.value.replace(/\D/g, "").slice(-1);
              setDigits(digits.map((d, k) => (k === i ? s : d)));
              if (s) refs.current[i + 1]?.focus();
            }}
            onPaste={(e) => {
              e.preventDefault();
              const chars = e.clipboardData
                .getData("text")
                .replace(/\D/g, "")
                .slice(0, length)
                .split("");
              setDigits(Array.from({ length }, (_, n) => chars[n] || ""));
              refs.current[Math.min(chars.length, length - 1)]?.focus();
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !v) refs.current[i - 1]?.focus();
              if (e.key === "ArrowLeft") refs.current[i - 1]?.focus();
              if (e.key === "ArrowRight") refs.current[i + 1]?.focus();
            }}
          />
        ))}
      </fieldset>
      <p className="field-helper mt-3">
        {length === 4
          ? "Your four-digit personal code."
          : "A six-digit code, sent to your inbox."}
      </p>
    </div>
  );
}
function FormDemo({
  notify,
  wizard,
  inline,
  validated,
}: {
  notify: (t: string) => void;
  wizard?: boolean;
  inline?: boolean;
  validated?: boolean;
}) {
  const [done, setDone] = useState(false);
  const [step, setStep] = useState(1);
  const [attempted, setAttempted] = useState(false);
  if (done)
    return (
      <div className="empty-state">
        <CheckCircle2 size={36} />
        <h3>You are on the list.</h3>
        <p>Good things are coming your way.</p>
        <Button
          variant="outline"
          onClick={() => {
            setDone(false);
            setStep(1);
          }}
        >
          Start again
        </Button>
      </div>
    );
  return (
    <form
      className={inline ? "demo-inline-form" : "demo-field space-y-4"}
      onInvalid={() => setAttempted(true)}
      onSubmit={(e) => {
        e.preventDefault();
        if (wizard && step < 3) setStep(step + 1);
        else {
          setDone(true);
          notify("Form submitted successfully");
        }
      }}
    >
      <h3>{wizard ? `Step ${step} of 3` : "Stay in the loop."}</h3>
      {validated && attempted && (
        <Alert title="A little more detail is needed." tone="danger">
          Check the required fields below.
        </Alert>
      )}
      {step === 1 ? (
        <>
          <Input label="Your name" placeholder="Alex Morgan" required />
          <Input
            label="Email address"
            type="email"
            placeholder="alex@example.com"
            required
          />
        </>
      ) : step === 2 ? (
        <Select
          label="Your role"
          options={["Designer", "Developer", "Product manager"]}
        />
      ) : (
        <Alert title="Ready for something good?" tone="success">
          Your details are ready to submit.
        </Alert>
      )}
      {!inline && <Checkbox label="I would like to receive product updates" />}
      <Button type="submit" fullWidth={!inline}>
        {wizard && step < 3 ? "Continue" : "Keep me posted"}
        <ArrowRight size={14} />
      </Button>
    </form>
  );
}
function Upload({
  notify,
  image,
}: {
  notify: (t: string) => void;
  image?: boolean;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const id = useId();
  const handle = (list: File[]) => {
    const valid = list.filter(
      (f) =>
        f.size <= 10 * 1024 * 1024 && (!image || f.type.startsWith("image/")),
    );
    setError(
      valid.length < list.length
        ? "Some files were skipped. Use files under 10 MB in the accepted format."
        : "",
    );
    setFiles((prev) => [...prev, ...valid]);
    if (valid.length)
      notify(
        `${valid.length} file${valid.length > 1 ? "s" : ""} selected locally`,
      );
  };
  return (
    <div className="demo-field">
      <label
        className={`upload-zone ${dragging ? "dragging" : ""}`}
        htmlFor={id}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handle(Array.from(e.dataTransfer.files));
        }}
      >
        <CloudUpload size={30} />
        <strong>Drop a little something here.</strong>
        <span>
          or <u>browse files</u>
        </span>
        <small>{image ? "Images" : "Any file"} up to 10 MB · local demo</small>
        <input
          id={id}
          type="file"
          multiple
          accept={image ? "image/*" : undefined}
          onChange={(e) => handle(Array.from(e.target.files || []))}
        />
      </label>
      {error && (
        <p role="alert" className="field-error">
          {error}
        </p>
      )}
      {files.map((f, i) => (
        <div key={`${f.name}-${i}`} className="uploaded-file">
          <File size={16} />
          <span>
            {f.name}
            <small>{(f.size / 1024).toFixed(0)} KB</small>
          </span>
          <button
            aria-label={`Remove ${f.name}`}
            onClick={() => setFiles(files.filter((_, n) => n !== i))}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
function TableDemo({
  notify,
  editable,
  expandable,
}: {
  notify: (t: string) => void;
  editable?: boolean;
  expandable?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [desc, setDesc] = useState(false);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [customNames, setCustomNames] = useState<Record<string, string>>({});
  const rows = names
    .filter((n) => n.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => (desc ? b.localeCompare(a) : a.localeCompare(b)));
  const pages = Math.max(1, Math.ceil(rows.length / 4));
  return (
    <div className="table-demo">
      <div className="table-toolbar">
        <Input
          type="search"
          placeholder="Find a member…"
          aria-label="Filter members"
          leading={<Search size={14} />}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
        />
        <Badge>
          {selected.length || rows.length}{" "}
          {selected.length ? "selected" : "members"}
        </Badge>
      </div>
      <div className="table-scroll">
        <table>
          <caption className="sr-only">Workspace members</caption>
          <thead>
            <tr>
              <th>
                <Checkbox
                  label="Select all members"
                  className="select-check"
                  aria-label="Select all members"
                  checked={selected.length === rows.length && !!rows.length}
                  indeterminate={
                    selected.length > 0 && selected.length < rows.length
                  }
                  onChange={(e) => setSelected(e.target.checked ? rows : [])}
                />
              </th>
              <th aria-sort={desc ? "descending" : "ascending"}>
                <button onClick={() => setDesc(!desc)}>
                  Name <ArrowUpDown size={12} />
                </button>
              </th>
              <th>Role</th>
              <th>Status</th>
              {expandable && <th>Details</th>}
            </tr>
          </thead>
          <tbody>
            {rows
              .slice((Math.min(page, pages) - 1) * 4, Math.min(page, pages) * 4)
              .map((n, i) => (
                <TableRow
                  key={n}
                  name={customNames[n] || n}
                  original={n}
                  index={i}
                  editable={editable}
                  expandable={expandable}
                  expanded={expanded.includes(n)}
                  checked={selected.includes(n)}
                  onCheck={() =>
                    setSelected(
                      selected.includes(n)
                        ? selected.filter((s) => s !== n)
                        : [...selected, n],
                    )
                  }
                  onExpand={() =>
                    setExpanded(
                      expanded.includes(n)
                        ? expanded.filter((s) => s !== n)
                        : [...expanded, n],
                    )
                  }
                  onEdit={(value) => {
                    setCustomNames({ ...customNames, [n]: value });
                    notify("Member name updated locally");
                  }}
                />
              ))}
          </tbody>
        </table>
        {!rows.length && (
          <p className="p-8 text-center muted">No members match “{query}”.</p>
        )}
      </div>
      <div className="table-footer">
        <span>
          Page {Math.min(page, pages)} of {pages}
        </span>
        <div className="flex gap-2">
          <Button
            size="xs"
            variant="outline"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <Button
            size="xs"
            variant="outline"
            disabled={page >= pages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
function TableRow({
  name,
  original,
  index,
  editable,
  expandable,
  expanded,
  checked,
  onCheck,
  onExpand,
  onEdit,
}: {
  name: string;
  original: string;
  index: number;
  editable?: boolean;
  expandable?: boolean;
  expanded: boolean;
  checked: boolean;
  onCheck: () => void;
  onExpand: () => void;
  onEdit: (v: string) => void;
}) {
  return (
    <>
      <tr>
        <td>
          <Checkbox
            label={`Select ${original}`}
            className="select-check"
            checked={checked}
            onChange={onCheck}
          />
        </td>
        <td>
          <div className="flex items-center gap-2">
            <Avatar name={name} size="sm" color={index} />
            {editable ? (
              <input
                aria-label={`Edit ${original}`}
                defaultValue={name}
                className="table-edit"
                onBlur={(e) => onEdit(e.target.value)}
              />
            ) : (
              <span>{name}</span>
            )}
          </div>
        </td>
        <td>{["Designer", "Developer", "Admin", "Designer"][index]}</td>
        <td>
          <Badge tone={index === 2 ? "warning" : "success"} dot>
            {index === 2 ? "Invited" : "Active"}
          </Badge>
        </td>
        {expandable && (
          <td>
            <button
              aria-label={`Details for ${name}`}
              aria-expanded={expanded}
              onClick={onExpand}
            >
              <ChevronRight size={16} />
            </button>
          </td>
        )}
      </tr>
      {expanded && (
        <tr>
          <td colSpan={5}>
            Member of the Hulmio workspace. Updates are enabled.
          </td>
        </tr>
      )}
    </>
  );
}
function ChartDemo({ variant }: { variant: string }) {
  const data = [42, 65, 48, 88, 72, 96, 80];
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [show, setShow] = useState(false);
  return (
    <div className="chart-demo">
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="muted text-xs">COMPONENT ADOPTION</span>
          <h3>
            491{" "}
            <span className="text-xs text-success font-normal">↗ 18.4%</span>
          </h3>
        </div>
        <Badge>This week</Badge>
      </div>
      {variant === "donut" ? (
        <div
          className="donut-chart"
          role="img"
          aria-label="Adoption: 74 percent"
        >
          <span>
            74%<small>adoption</small>
          </span>
        </div>
      ) : variant === "heatmap" ? (
        <div
          className="heatmap"
          role="img"
          aria-label="Component usage heatmap"
        >
          {Array.from({ length: 49 }, (_, i) => (
            <span key={i} style={{ opacity: 0.15 + ((i * 17) % 85) / 100 }} />
          ))}
        </div>
      ) : ["line", "area", "scatter"].includes(variant) ? (
        <svg
          viewBox="0 0 350 120"
          className="line-chart"
          role="img"
          aria-label="Usage increases from 42 on Monday to 80 on Sunday"
        >
          {[20, 60, 100].map((y) => (
            <line key={y} x1="0" x2="350" y1={y} y2={y} />
          ))}
          {variant === "area" && (
            <polygon
              points={`0,120 ${data.map((v, i) => `${i * 58},${120 - v}`).join(" ")} 348,120`}
              fill="var(--lime)"
              opacity=".4"
            />
          )}
          {variant !== "scatter" && (
            <polyline
              points={data.map((v, i) => `${i * 58},${120 - v}`).join(" ")}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="3"
            />
          )}
          {data.map((v, i) => (
            <circle
              key={i}
              cx={i * 58}
              cy={120 - v}
              r={variant === "scatter" ? 6 : 4}
              fill="var(--primary)"
            >
              <title>
                {labels[i]}: {v}
              </title>
            </circle>
          ))}
        </svg>
      ) : (
        <div
          className="bar-chart"
          role="img"
          aria-label="Component adoption over a week"
        >
          {data.map((v, i) => (
            <div key={i}>
              <span
                style={{ height: `${v}%` }}
                className={i === 5 ? "bar-highlight" : ""}
              >
                <b>{v}</b>
              </span>
              <small>{labels[i]}</small>
            </div>
          ))}
        </div>
      )}
      <button className="text-link mt-4" onClick={() => setShow(!show)}>
        {show ? "Hide" : "View"} data table
      </button>
      {show && (
        <table className="chart-data">
          <thead>
            <tr>
              {labels.map((l) => (
                <th key={l}>{l}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {data.map((v, i) => (
                <td key={i}>{v}</td>
              ))}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
function Kanban() {
  const [cards, setCards] = useState([
    { title: "Define the good stuff", status: 0 },
    { title: "Build with intention", status: 1 },
    { title: "Make it feel like home", status: 1 },
    { title: "Share something good", status: 2 },
  ]);
  return (
    <div className="kanban">
      {["To do", "In progress", "Done"].map((s, column) => (
        <section key={s}>
          <h4>
            <span className={`kanban-dot dot-${column}`} />
            {s}
            <span>{cards.filter((c) => c.status === column).length}</span>
          </h4>
          {cards.map(
            (c, i) =>
              c.status === column && (
                <div className="kanban-card" key={c.title}>
                  <GripVertical size={13} className="muted" />
                  <p>{c.title}</p>
                  <div className="flex justify-between items-center">
                    <Avatar name={names[i]} size="sm" color={i} />
                    <div>
                      {column > 0 && (
                        <button
                          aria-label={`Move ${c.title} back`}
                          onClick={() =>
                            setCards(
                              cards.map((v, n) =>
                                n === i ? { ...v, status: column - 1 } : v,
                              ),
                            )
                          }
                        >
                          <ArrowLeft size={14} />
                        </button>
                      )}
                      {column < 2 && (
                        <button
                          aria-label={`Move ${c.title} forward`}
                          onClick={() =>
                            setCards(
                              cards.map((v, n) =>
                                n === i ? { ...v, status: column + 1 } : v,
                              ),
                            )
                          }
                        >
                          <ArrowRight size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ),
          )}
        </section>
      ))}
    </div>
  );
}

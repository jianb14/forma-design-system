import { useId, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Edit3,
  Heart,
  Mail,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  BrandMark,
  Input,
  Progress,
  cn,
} from "./ui";
import type { Size } from "./ui";
import { ComponentDemo } from "./demos";

type PreviewProps = {
  id: string;
  variant: string;
  size?: Size;
  shape?: "rounded" | "pill" | "square";
  notify?: (text: string) => void;
  onCommand?: () => void;
};

/** Inline specimens make overlay designs visible without opening each example. */
export function VisualPreview({
  id,
  variant,
  size,
  shape,
  notify = () => {},
  onCommand,
}: PreviewProps) {
  const lower = variant.toLowerCase();
  const uid = useId();
  const [open, setOpen] = useState(false);
  if (id === "dialog")
    return (
      <div
        className={cn(
          "inline-overlay-scene",
          lower === "fullscreen" && "inline-fullscreen",
        )}
      >
        <div className="inline-dialog">
          <div className="inline-dialog-top">
            <span className="specimen-symbol">
              <BrandMark size={22} />
            </span>
            <button
              aria-label="Preview close action"
              onClick={() => notify("Dialog closed.")}
            >
              <X size={14} />
            </button>
          </div>
          <h3>
            {lower === "destructive"
              ? "Delete this project?"
              : lower === "confirmation"
                ? "Ready to make it happen?"
                : "A place for your next idea."}
          </h3>
          <p>
            {lower === "destructive"
              ? "This project will be permanently removed."
              : "Give something good a little room to grow."}
          </p>
          {lower === "default" && (
            <Input label="Project name" placeholder="Something good" />
          )}
          <div className="inline-dialog-actions">
            <Button
              variant="outline"
              size="sm"
              onClick={() => notify("Cancelled.")}
            >
              Cancel
            </Button>
            <Button
              variant={lower === "destructive" ? "destructive" : "primary"}
              size="sm"
              onClick={() =>
                notify(
                  lower === "destructive"
                    ? "Project removed in this preview."
                    : "Your project is ready.",
                )
              }
            >
              {lower === "destructive"
                ? "Delete project"
                : lower === "confirmation"
                  ? "Confirm"
                  : "Create project"}
            </Button>
          </div>
        </div>
      </div>
    );
  if (id === "drawer")
    return (
      <div className={cn("inline-drawer-scene", `inline-drawer-${lower}`)}>
        <div className="drawer-scene-background" aria-hidden="true">
          <span />
          <i />
          <i />
          <i />
        </div>
        <div className="inline-drawer">
          <span className="drawer-handle" />
          <BrandMark size={22} />
          <h3>A little more detail.</h3>
          <p>Your workspace, your way.</p>
          <div className="drawer-faux-field" />
          <div className="drawer-faux-field short" />
          <Button
            size="sm"
            fullWidth
            onClick={() => notify("Preferences saved.")}
          >
            Save changes
          </Button>
        </div>
      </div>
    );
  if (id === "dropdown")
    return (
      <div
        className="inline-dropdown"
        role="group"
        aria-label={`${variant} menu preview`}
      >
        {lower === "grouped" && (
          <span className="inline-menu-label">PROJECT ACTIONS</span>
        )}
        {[
          { text: "Edit project", icon: Edit3, key: "E" },
          { text: "Duplicate", icon: Copy, key: "D" },
          { text: "Download", icon: Download, key: "↓" },
        ].map(({ text, icon: Icon, key }) => (
          <button key={text} onClick={() => notify(`${text} selected.`)}>
            <Icon size={14} />
            <span>{text}</span>
            {lower === "shortcut" && <kbd>{key}</kbd>}
          </button>
        ))}
        {["destructive", "grouped"].includes(lower) && (
          <>
            <hr />
            <button
              className="text-danger"
              onClick={() => notify("Project deleted in this preview.")}
            >
              <Trash2 size={14} />
              <span>Delete project</span>
            </button>
          </>
        )}
      </div>
    );
  if (id === "tooltip")
    return (
      <div className={cn("tooltip-specimen", `tooltip-specimen-${lower}`)}>
        <span className="visible-tooltip" role="tooltip">
          A little more context.
        </span>
        <Button variant="outline" size="sm">
          A helpful detail
        </Button>
      </div>
    );
  if (id === "popover")
    return (
      <div className="inline-popover">
        <div className="flex gap-3 items-center">
          <Avatar name="Alex Morgan" status />
          <div>
            <h3>Alex Morgan</h3>
            <span>Product designer</span>
          </div>
          <Badge tone="success">Online</Badge>
        </div>
        <p>A fan of thoughtful details and good ideas.</p>
        {lower === "actions" ? (
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => notify("You are now following Alex.")}
            >
              Follow <Plus size={12} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => notify("Message preview opened.")}
            >
              Message <Mail size={12} />
            </Button>
          </div>
        ) : (
          <div className="popover-meta">
            <span>
              <strong>12</strong> projects
            </span>
            <span>
              <strong>8</strong> teammates
            </span>
          </div>
        )}
      </div>
    );
  if (id === "command")
    return (
      <div className="inline-command">
        <label htmlFor={uid}>
          <Search size={16} />
          <input
            id={uid}
            placeholder="Find something good…"
            aria-label="Search command preview"
            onChange={(event) => setOpen(!!event.target.value)}
          />
        </label>
        {lower === "empty" || open ? (
          <div className="inline-command-empty">
            <Search size={23} />
            <p>No matching results.</p>
            <span>Try another search.</span>
          </div>
        ) : (
          <div className="inline-command-results">
            {["Create a project", "Explore colors", "View components"].map(
              (text, i) => (
                <button
                  key={text}
                  onClick={() =>
                    text === "Explore colors"
                      ? (window.location.hash = "/colors")
                      : text === "View components"
                        ? (window.location.hash = "/components")
                        : notify("A fresh project is ready.")
                  }
                >
                  <span>
                    {i === 0 ? <Plus size={14} /> : <BrandMark size={14} />}
                    {text}
                  </span>
                  {lower === "keyboard" ? (
                    <kbd>⌘ {i + 1}</kbd>
                  ) : (
                    <ArrowUpRight size={12} />
                  )}
                </button>
              ),
            )}
          </div>
        )}
        <div className="inline-command-footer">
          {lower === "keyboard"
            ? "↑ ↓ Navigate · ↵ Select · Esc Close"
            : "Find your next good idea."}
        </div>
      </div>
    );
  if (id === "toast")
    return (
      <div className={cn("visible-toast", `visible-toast-${lower}`)}>
        <span className="visible-toast-icon">
          {lower === "error" ? <X size={16} /> : <Check size={16} />}
        </span>
        <div>
          <strong>
            {lower === "error"
              ? "Could not save changes."
              : lower === "information"
                ? "A fresh update is ready."
                : "Changes saved."}
          </strong>
          <p>
            {lower === "error"
              ? "Please give it another try."
              : "You are all set. Carry on creating."}
          </p>
        </div>
        {lower === "dismissible" && (
          <button
            aria-label="Dismiss toast preview"
            onClick={() => notify("Notification dismissed.")}
          >
            <X size={15} />
          </button>
        )}
      </div>
    );
  return (
    <ComponentDemo
      id={id}
      variant={variant}
      size={size}
      shape={shape}
      notify={notify}
      onCommand={onCommand}
    />
  );
}

/** Small, non-interactive cover compositions used in the category cards. */
export function ComponentCover({
  id,
  category,
}: {
  id: string;
  category: string;
}) {
  const inputLike = [
    "input",
    "textarea",
    "select",
    "combobox",
    "multi-select",
    "tag-input",
    "color-picker",
    "calendar",
    "upload",
    "form",
    "otp-input",
  ];
  return (
    <div
      className={`component-thumbnail thumbnail-${category.toLowerCase()}`}
      aria-hidden="true"
    >
      {id === "button" ? (
        <span className="mini-primary">
          Something good <ArrowRight size={13} />
        </span>
      ) : id === "icon-button" ? (
        <div className="cover-icons">
          <span>
            <Heart size={17} />
          </span>
          <span>
            <Plus size={18} />
          </span>
          <span>
            <MoreHorizontal size={19} />
          </span>
        </div>
      ) : id === "button-group" ? (
        <div className="cover-button-group">
          <span>Day</span>
          <span>Week</span>
          <span>Month</span>
        </div>
      ) : id === "switch" ? (
        <span className="mini-switch large">
          <i />
        </span>
      ) : id === "avatar" ? (
        <AvatarGroup />
      ) : id === "badge" ? (
        <div className="flex gap-2">
          <Badge tone="success" dot>
            Published
          </Badge>
          <Badge tone="warning">In review</Badge>
        </div>
      ) : id === "checkbox" || id === "radio" ? (
        <div className="cover-choices">
          <span>
            <i className={id === "radio" ? "round" : ""}>
              <Check size={11} />
            </i>
            A little possibility
          </span>
          <span>
            <i className={id === "radio" ? "round empty" : "empty"} />
            Something good
          </span>
        </div>
      ) : id === "slider" || id === "progress" ? (
        <div className="thumbnail-progress">
          <span />
          {id === "slider" && <i className="cover-slider-thumb" />}
        </div>
      ) : id === "spinner" ? (
        <span className="spinner" />
      ) : id === "rating" ? (
        <div className="thumbnail-rating">
          ★★★★<span>★</span>
        </div>
      ) : id === "table" ? (
        <div className="cover-table">
          <div>
            <span>Name</span>
            <span>Status</span>
          </div>
          {["Alex Morgan", "Jules Santos", "Sam Rivera"].map((n) => (
            <div key={n}>
              <span>{n}</span>
              <i />
            </div>
          ))}
        </div>
      ) : id === "chart" ? (
        <div className="cover-chart">
          {[36, 65, 48, 88, 62, 100, 80].map((h, i) => (
            <i key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
      ) : id === "tabs" ||
        id === "pagination" ||
        id === "stepper" ||
        id === "breadcrumbs" ? (
        <div className={`cover-navigation cover-${id}`}>
          {(id === "tabs"
            ? ["Overview", "Activity", "Settings"]
            : id === "breadcrumbs"
              ? ["Home", "Projects", "Details"]
              : ["1", "2", "3"]
          ).map((v, i) => (
            <span key={v} className={i === 0 ? "active" : ""}>
              {v}
            </span>
          ))}
        </div>
      ) : [
          "dialog",
          "popover",
          "drawer",
          "dropdown",
          "command",
          "toast",
          "alert",
          "tooltip",
        ].includes(id) ? (
        <div className={`cover-overlay cover-${id}`}>
          <span className="cover-overlay-heading">
            <BrandMark size={14} />
            <i />
          </span>
          {id === "dropdown" || id === "command" ? (
            <>
              <span className="cover-menu-row" />
              <span className="cover-menu-row short" />
            </>
          ) : (
            <>
              <strong>
                {id === "alert" || id === "toast"
                  ? "Looking good."
                  : id === "tooltip"
                    ? "A helpful detail."
                    : "Room for good ideas."}
              </strong>
              {id !== "tooltip" && (
                <span className="cover-mini-action">
                  {id === "alert" || id === "toast"
                    ? "Your changes are saved."
                    : "Make it happen"}
                </span>
              )}
            </>
          )}
        </div>
      ) : inputLike.includes(id) ? (
        id === "otp-input" ? (
          <div className="cover-otp">
            {[2, 4, 0, 8].map((n, i) => (
              <span key={i}>{n}</span>
            ))}
          </div>
        ) : id === "color-picker" ? (
          <div className="mini-palette">
            {["#284c3f", "#d9ed92", "#e8ad8d", "#d6cfe4"].map((c) => (
              <span key={c} style={{ background: c }} />
            ))}
          </div>
        ) : (
          <div className={`cover-field cover-field-${id}`}>
            <span>
              {id === "upload"
                ? "Add your files"
                : id === "calendar"
                  ? "Choose a date"
                  : id === "textarea"
                    ? "A few good ideas…"
                    : "Your next good idea"}
            </span>
            <i>
              {id === "upload" ? (
                <Plus size={13} />
              ) : id === "calendar" || id === "select" ? (
                "⌄"
              ) : (
                <Mail size={12} />
              )}
            </i>
            {id === "form" && <span className="cover-form-action" />}
          </div>
        )
      ) : id === "accordion" ? (
        <div className="cover-accordion">
          {["A little more detail", "Made to be yours", "Room to grow"].map(
            (s) => (
              <span key={s}>
                {s}
                <Plus size={10} />
              </span>
            ),
          )}
        </div>
      ) : id === "timeline" ? (
        <div className="cover-timeline">
          {["Published", "Reviewed", "Created"].map((s) => (
            <span key={s}>
              <i />
              {s}
            </span>
          ))}
        </div>
      ) : id === "skeleton" ? (
        <div className="thumbnail-skeleton">
          <i />
          <span>
            <b />
            <b />
            <b />
          </span>
        </div>
      ) : id === "layout" || id === "kanban" ? (
        <div className={`cover-layout cover-layout-${id}`}>
          <span />
          <span />
          <span />
        </div>
      ) : id === "empty-state" ? (
        <div className="cover-empty">
          <BrandMark size={30} />
          <span>Room for possibility.</span>
        </div>
      ) : (
        <div className="cover-content-card">
          <div className="cover-card-art">
            <BrandMark size={28} />
          </div>
          <strong>
            {id === "carousel"
              ? "Make room for good things."
              : "A place for your ideas."}
          </strong>
          <div>
            <i />
            <i />
          </div>
        </div>
      )}
    </div>
  );
}

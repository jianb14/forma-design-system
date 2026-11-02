import { forwardRef, useId, useRef, useState } from "react";
import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as MenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import {
  X,
  LoaderCircle,
  Eye,
  EyeOff,
  ChevronDown,
  Check,
  Copy,
  ArrowUpRight,
  Download,
  Pencil,
  Trash2,
} from "lucide-react";
export const cn = (...values: Parameters<typeof clsx>) => twMerge(clsx(values));
export type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "link"
  | "destructive"
  | "soft"
  | "success"
  | "warning"
  | "information";
export type Size = "xs" | "sm" | "md" | "lg" | "xl";
const buttonStyles = cva(
  "f-button inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors disabled:pointer-events-none disabled:opacity-45",
  {
    variants: {
      variant: {
        primary: "button-primary",
        secondary: "button-secondary",
        outline: "button-outline",
        ghost: "button-ghost",
        link: "button-link",
        destructive: "button-destructive",
        soft: "button-soft",
        success: "button-success",
        warning: "button-warning",
        information: "button-information",
      },
      size: {
        xs: "button-xs",
        sm: "button-sm",
        md: "button-md",
        lg: "button-lg",
        xl: "button-xl",
      },
      shape: {
        rounded: "rounded-lg",
        pill: "rounded-full",
        square: "rounded-none",
        circle: "rounded-full aspect-square p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md", shape: "rounded" },
  },
);
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  shape?: "rounded" | "pill" | "square" | "circle";
  loading?: boolean;
  fullWidth?: boolean;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      shape,
      loading,
      fullWidth,
      disabled,
      className,
      children,
      type = "button",
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        buttonStyles({ variant, size, shape }),
        fullWidth && "w-full",
        className,
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <LoaderCircle className="animate-spin" size={15} />}
      {children}
    </button>
  ),
);
Button.displayName = "Button";
export function Flower({
  className,
  size = 32,
  ...props
}: {
  className?: string;
  size?: number;
  "aria-hidden"?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M32 32C4 32 4-2 23 7c9 4 9 18 9 25Zm0 0C32 4 66 4 57 23c-4 9-18 9-25 9Zm0 0c28 0 28 34 9 25-9-4-9-18-9-25Zm0 0C32 60-2 60 7 41c4-9 18-9 25-9Z" />
    </svg>
  );
}
export function Brand({
  vertical = false,
  iconOnly = false,
  className = "",
}: {
  vertical?: boolean;
  iconOnly?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("brand", vertical && "brand-vertical", className)}>
      <Flower size={34} />
      {!iconOnly && (
        <span>
          forma<span className="brand-period">.</span>
        </span>
      )}
    </span>
  );
}
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helper?: string;
  error?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  clearable?: boolean;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helper,
      error,
      leading,
      trailing,
      clearable,
      type = "text",
      id,
      className,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref,
  ) => {
    const autoId = useId();
    const inputId = id || autoId;
    const [show, setShow] = useState(false);
    const [inner, setInner] = useState(defaultValue ?? "");
    const inputRef = useRef<HTMLInputElement | null>(null);
    const current = value ?? inner;
    return (
      <div className={cn("field", className)}>
        {label && (
          <label htmlFor={inputId}>
            {label}
            {props.required && (
              <span className="required" aria-hidden="true">
                {" "}
                *
              </span>
            )}
          </label>
        )}
        <div
          className={cn(
            "input-shell",
            error && "input-invalid",
            props.disabled && "is-disabled",
          )}
        >
          {leading && <span className="input-affix">{leading}</span>}
          <input
            {...props}
            ref={(node) => {
              inputRef.current = node;
              if (typeof ref === "function") ref(node);
              else if (ref) ref.current = node;
            }}
            id={inputId}
            type={type === "password" && show ? "text" : type}
            value={current}
            onChange={(e) => {
              setInner(e.target.value);
              onChange?.(e);
            }}
            aria-invalid={error ? true : props["aria-invalid"]}
            aria-describedby={
              [
                props["aria-describedby"],
                error || helper ? `${inputId}-help` : null,
              ]
                .filter(Boolean)
                .join(" ") || undefined
            }
          />
          {clearable && current && !props.disabled && !props.readOnly && (
            <button
              type="button"
              aria-label="Clear input"
              className="input-action"
              onClick={() => {
                const input = inputRef.current;
                if (!input) return;
                Object.getOwnPropertyDescriptor(
                  HTMLInputElement.prototype,
                  "value",
                )?.set?.call(input, "");
                input.dispatchEvent(new Event("input", { bubbles: true }));
                setInner("");
                input.focus();
              }}
            >
              <X size={14} />
            </button>
          )}
          {type === "password" ? (
            <button
              type="button"
              aria-label={show ? "Hide password" : "Show password"}
              className="input-action"
              disabled={props.disabled}
              onClick={() => setShow(!show)}
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          ) : (
            trailing && <span className="input-affix">{trailing}</span>
          )}
        </div>
        {(error || helper) && (
          <p
            id={`${inputId}-help`}
            className={error ? "field-error" : "field-helper"}
          >
            {error || helper}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";
export function Badge({
  children,
  tone = "default",
  dot = false,
  outline = false,
}: {
  children: ReactNode;
  tone?: string;
  dot?: boolean;
  outline?: boolean;
}) {
  return (
    <span className={cn("badge", `badge-${tone}`, outline && "badge-outline")}>
      {dot && <span className="status-dot" />}
      {children}
    </span>
  );
}
export function Avatar({
  name = "Alex Morgan",
  size = "md",
  status = false,
  color = 0,
}: {
  name?: string;
  size?: string;
  status?: boolean;
  color?: number;
}) {
  return (
    <span
      role="img"
      aria-label={name}
      title={name}
      className={cn("avatar", `avatar-${size}`, `avatar-color-${color % 4}`)}
    >
      {name
        .split(" ")
        .slice(0, 2)
        .map((s) => s[0])
        .join("")}
      {status && <span className="avatar-status" />}
    </span>
  );
}
export function AvatarGroup() {
  return (
    <div className="avatar-group">
      <Avatar name="Jules Santos" color={1} />
      <Avatar name="Alex Chen" color={2} />
      <Avatar name="Morgan Lee" color={3} />
      <span
        className="avatar avatar-md avatar-extra"
        aria-label="5 more people"
      >
        +5
      </span>
    </div>
  );
}
export function Switch({
  label,
  checked,
  onChange,
  disabled = false,
  small = false,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  small?: boolean;
}) {
  return (
    <label className={cn("switch-label", disabled && "is-disabled")}>
      <input
        className="switch-input"
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <span
        className={cn(
          "switch-track",
          checked && "switch-on",
          small && "switch-small",
        )}
      >
        <span />
      </span>
      <span>{label}</span>
    </label>
  );
}
export function Checkbox({
  label,
  indeterminate = false,
  ...props
}: {
  label: string;
  indeterminate?: boolean;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="check-label">
      <input
        type="checkbox"
        ref={(el) => {
          if (el) el.indeterminate = indeterminate;
        }}
        {...props}
      />
      <span>{label}</span>
    </label>
  );
}
export function Radio({
  label,
  ...props
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="check-label">
      <input type="radio" {...props} />
      <span>{label}</span>
    </label>
  );
}
export function Select({
  label,
  options,
  value,
  onChange,
  disabled,
  id,
}: {
  label: string;
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  id?: string;
}) {
  const auto = useId();
  return (
    <div className="field">
      <label htmlFor={id || auto}>{label}</label>
      <div className="select-shell">
        <select
          id={id || auto}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
        >
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <ChevronDown size={14} />
      </div>
    </div>
  );
}
export function Progress({
  value = 64,
  label = "Progress",
  circular = false,
  indeterminate = false,
}: {
  value?: number;
  label?: string;
  circular?: boolean;
  indeterminate?: boolean;
}) {
  if (circular)
    return (
      <div
        className="circular-progress"
        role="progressbar"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <svg viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20" className="circle-track" />
          <circle
            cx="24"
            cy="24"
            r="20"
            className="circle-value"
            strokeDasharray={`${value * 1.257} 125.7`}
          />
        </svg>
        <span>{value}%</span>
      </div>
    );
  return (
    <div className="progress-wrap">
      <div className="flex justify-between gap-4">
        <span>{label}</span>
        {!indeterminate && <span className="mono">{value}%</span>}
      </div>
      <progress
        aria-label={label}
        max={100}
        value={indeterminate ? undefined : value}
      />
    </div>
  );
}
export function Tabs({
  items,
  value,
  onChange,
  variant = "underline",
  label = "Sections",
  panelId,
  disabledItems = [],
}: {
  items: string[];
  value: string;
  onChange: (v: string) => void;
  variant?: string;
  label?: string;
  panelId?: string;
  disabledItems?: string[];
}) {
  const uid = useId();
  return (
    <div
      className={cn("tabs", `tabs-${variant}`)}
      role="tablist"
      aria-label={label}
      aria-orientation={variant === "vertical" ? "vertical" : "horizontal"}
    >
      {items.map((i, index) => (
        <button
          key={i}
          role="tab"
          id={`${panelId || uid}-tab-${index}`}
          aria-controls={panelId}
          aria-selected={value === i}
          disabled={disabledItems.includes(i)}
          tabIndex={value === i ? 0 : -1}
          onClick={() => onChange(i)}
          onKeyDown={(e) => {
            let next = index;
            if (e.key === "ArrowRight" || e.key === "ArrowDown")
              next = (index + 1) % items.length;
            else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
              next = (index - 1 + items.length) % items.length;
            else if (e.key === "Home") next = 0;
            else if (e.key === "End") next = items.length - 1;
            else return;
            const direction =
              e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "End"
                ? -1
                : 1;
            let attempts = 0;
            while (
              disabledItems.includes(items[next]) &&
              attempts++ < items.length
            )
              next = (next + direction + items.length) % items.length;
            e.preventDefault();
            onChange(items[next]);
            (
              e.currentTarget.parentElement?.children[next] as HTMLElement
            )?.focus();
          }}
        >
          {i}
        </button>
      ))}
    </div>
  );
}
export function Alert({
  title,
  children,
  tone = "information",
  dismissible = false,
}: {
  title: string;
  children?: ReactNode;
  tone?: string;
  dismissible?: boolean;
}) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div
      className={cn("alert", `alert-${tone}`)}
      role={tone === "danger" ? "alert" : "status"}
    >
      <span className="alert-symbol">
        {tone === "success" ? <Check size={16} /> : "!"}
      </span>
      <div>
        <strong>{title}</strong>
        {children && <p>{children}</p>}
      </div>
      {dismissible && (
        <button onClick={() => setVisible(false)} aria-label="Dismiss alert">
          <X size={16} />
        </button>
      )}
    </div>
  );
}
export function Tooltip({
  children,
  content,
  side = "top",
}: {
  children: ReactNode;
  content: string;
  side?: "top" | "bottom" | "left" | "right";
}) {
  return (
    <TooltipPrimitive.Provider delayDuration={250}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={7}
            className="tooltip"
          >
            {content}
            <TooltipPrimitive.Arrow className="tooltip-arrow" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
export function Modal({
  trigger,
  title,
  description,
  children,
  drawer = false,
  side = "right",
  open,
  onOpenChange,
  nonModal = false,
  fullscreen = false,
}: {
  trigger?: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
  drawer?: boolean;
  side?: string;
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
  nonModal?: boolean;
  fullscreen?: boolean;
}) {
  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      modal={!nonModal}
    >
      {trigger && (
        <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      )}
      <DialogPrimitive.Portal>
        {!nonModal && <DialogPrimitive.Overlay className="dialog-overlay" />}
        <DialogPrimitive.Content
          className={cn(
            "dialog-content",
            drawer && `drawer drawer-${side}`,
            nonModal && "popover-content",
            fullscreen && "dialog-fullscreen",
          )}
        >
          <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
          <DialogPrimitive.Description
            className={description ? "dialog-description" : "sr-only"}
          >
            {description || `Details for ${title}`}
          </DialogPrimitive.Description>
          {children}
          <DialogPrimitive.Close
            className="dialog-close"
            aria-label="Close dialog"
          >
            <X size={18} />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
export const DialogClose = DialogPrimitive.Close;
export function Dropdown({
  onAction,
  trigger,
}: {
  onAction?: (action: string) => void;
  trigger?: ReactNode;
}) {
  return (
    <MenuPrimitive.Root>
      <MenuPrimitive.Trigger asChild>
        {trigger || (
          <Button variant="outline">
            Options <ChevronDown size={14} />
          </Button>
        )}
      </MenuPrimitive.Trigger>
      <MenuPrimitive.Portal>
        <MenuPrimitive.Content className="dropdown-menu" sideOffset={6}>
          <MenuPrimitive.Label>Project actions</MenuPrimitive.Label>
          {[
            { label: "Edit project", icon: Pencil },
            { label: "Duplicate", icon: Copy },
            { label: "Export", icon: Download },
          ].map(({ label, icon: Icon }) => (
            <MenuPrimitive.Item key={label} onSelect={() => onAction?.(label)}>
              <Icon size={14} />
              {label}
              <ArrowUpRight size={12} className="ml-auto opacity-40" />
            </MenuPrimitive.Item>
          ))}
          <MenuPrimitive.Separator />
          <MenuPrimitive.Item
            className="text-danger"
            onSelect={() => onAction?.("Delete project")}
          >
            <Trash2 size={14} />
            Delete project
          </MenuPrimitive.Item>
        </MenuPrimitive.Content>
      </MenuPrimitive.Portal>
    </MenuPrimitive.Root>
  );
}
export function CodeBlock({
  code,
  language = "tsx",
  onCopy,
  wrap = false,
}: {
  code: string;
  language?: string;
  onCopy?: (text: string) => void;
  wrap?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      onCopy?.("Code copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      onCopy?.("Select the code to copy it manually");
    }
  };
  return (
    <div className="code-block">
      <div className="code-bar">
        <span>{language}</span>
        <button onClick={copy} aria-label="Copy code">
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre
        style={
          wrap
            ? { whiteSpace: "pre-wrap", overflowWrap: "anywhere" }
            : undefined
        }
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
export function Accordion({
  items,
  multiple = true,
  disabled = false,
}: {
  items: { title: string; content: ReactNode }[];
  multiple?: boolean;
  disabled?: boolean;
}) {
  const id = useId();
  return (
    <div className="accordion">
      {items.map((item, i) => (
        <details key={i} name={multiple ? undefined : id}>
          <summary
            aria-disabled={disabled || undefined}
            tabIndex={disabled ? -1 : undefined}
            onClick={disabled ? (event) => event.preventDefault() : undefined}
          >
            {item.title}
            <ChevronDown size={16} />
          </summary>
          <div>{item.content}</div>
        </details>
      ))}
    </div>
  );
}

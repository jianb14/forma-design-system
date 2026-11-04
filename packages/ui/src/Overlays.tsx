import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as MenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as PopperPrimitive from "@radix-ui/react-popper";
import { Check } from "lucide-react";
import { Modal } from "./Modal";
import type { ModalProps } from "./Modal";
import type { Tone } from "./Display";
import { cn } from "./utils";

export const Dialog = Modal;
export interface DrawerProps extends Omit<ModalProps, "drawer" | "nonModal" | "fullscreen"> {}
export function Drawer({ side = "right", ...props }: DrawerProps) { return <Modal {...props} drawer side={side} />; }

export interface DropdownMenuItem { label: string; onSelect?: () => void; disabled?: boolean; destructive?: boolean; shortcut?: string; checked?: boolean; onCheckedChange?: (checked: boolean) => void }
export interface DropdownMenuProps { trigger: ReactNode; items: DropdownMenuItem[]; portalContainer?: HTMLElement | null }
export function DropdownMenu({ trigger, items, portalContainer }: DropdownMenuProps) {
  return <MenuPrimitive.Root><MenuPrimitive.Trigger asChild className="h-dropdown-trigger">{trigger}</MenuPrimitive.Trigger><MenuPrimitive.Portal container={portalContainer}><MenuPrimitive.Content data-hulmio-ui="dropdown-menu" className="h-dropdown-menu" sideOffset={4} collisionPadding={12}>{items.map((item, index) => typeof item.checked === "boolean" ?
    <MenuPrimitive.CheckboxItem key={index} className="h-dropdown-item" disabled={item.disabled} checked={item.checked} onCheckedChange={item.onCheckedChange} onSelect={item.onSelect}><span>{item.label}</span><MenuPrimitive.ItemIndicator className="h-menu-check"><Check size={15} aria-hidden="true" /></MenuPrimitive.ItemIndicator></MenuPrimitive.CheckboxItem> :
    <MenuPrimitive.Item key={index} className="h-dropdown-item" disabled={item.disabled} data-destructive={item.destructive || undefined} onSelect={item.onSelect}><span>{item.label}</span>{item.shortcut && <span className="h-menu-shortcut" aria-hidden="true">{item.shortcut}</span>}</MenuPrimitive.Item>)}</MenuPrimitive.Content></MenuPrimitive.Portal></MenuPrimitive.Root>;
}

export interface TooltipProps { content: ReactNode; children: ReactNode; side?: "top" | "right" | "bottom" | "left"; portalContainer?: HTMLElement | null }
export function Tooltip({ content, children, side = "top", portalContainer }: TooltipProps) { return <TooltipPrimitive.Provider delayDuration={350}><TooltipPrimitive.Root><TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger><TooltipPrimitive.Portal container={portalContainer}><TooltipPrimitive.Content data-hulmio-ui="tooltip" className="h-tooltip" side={side} sideOffset={7} collisionPadding={12}>{content}<TooltipPrimitive.Arrow className="h-tooltip-arrow" /></TooltipPrimitive.Content></TooltipPrimitive.Portal></TooltipPrimitive.Root></TooltipPrimitive.Provider>; }

export interface PopoverProps { title: string; trigger: ReactNode; children: ReactNode; portalContainer?: HTMLElement | null }
export function Popover({ title, trigger, children, portalContainer }: PopoverProps) {
  return <DialogPrimitive.Root modal={false}><PopperPrimitive.Root>
    <PopperPrimitive.Anchor asChild><DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger></PopperPrimitive.Anchor>
    <DialogPrimitive.Portal container={portalContainer}>
      <PopperPrimitive.Content asChild align="start" sideOffset={8} collisionPadding={12}>
        <DialogPrimitive.Content data-hulmio-ui="popover" className="h-popover" style={{ position: "relative" }} aria-describedby={undefined}>
          <DialogPrimitive.Title className="h-overlay-title">{title}</DialogPrimitive.Title>{children}
          <DialogPrimitive.Close className="h-overlay-close" aria-label="Close popover">×</DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </PopperPrimitive.Content>
    </DialogPrimitive.Portal>
  </PopperPrimitive.Root></DialogPrimitive.Root>;
}

export interface CommandItem { id: string; label: string; onSelect: () => void }
export interface CommandPaletteProps { open: boolean; onOpenChange: (open: boolean) => void; items: CommandItem[]; portalContainer?: HTMLElement | null }
export function CommandPalette({ open, onOpenChange, items, portalContainer }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const id = useId();
  const listRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const filtered = items.filter(item => item.label.toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  useEffect(() => { if (!open) setQuery(""); }, [open]);
  return <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}><DialogPrimitive.Portal container={portalContainer}><DialogPrimitive.Overlay data-hulmio-ui="overlay" className="dialog-overlay" /><DialogPrimitive.Content data-hulmio-ui="modal" className="dialog-content" onOpenAutoFocus={() => { returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null; }} onCloseAutoFocus={event => { event.preventDefault(); returnFocusRef.current?.focus(); }}><DialogPrimitive.Title>Commands</DialogPrimitive.Title><DialogPrimitive.Description className="dialog-description">Search and select a command.</DialogPrimitive.Description><div data-hulmio-ui="command-palette" className="h-command-palette"><label htmlFor={id} className="h-visually-hidden">Search commands</label><input ref={inputRef} id={id} type="search" placeholder="Search commands…" value={query} onChange={event => setQuery(event.target.value)} onKeyDown={event => {
    if (event.nativeEvent.isComposing) return;
    if (event.key === "ArrowDown") { event.preventDefault(); listRef.current?.querySelector("button")?.focus(); }
    if (event.key === "Enter") { event.preventDefault(); if (filtered[0]) { filtered[0].onSelect(); onOpenChange(false); } }
  }} /><ul ref={listRef} aria-label="Commands" onKeyDown={event => {
    const controls = Array.from(event.currentTarget.querySelectorAll("button"));
    const index = controls.indexOf(event.target as HTMLButtonElement);
    if (index < 0) return;
    if (event.key === "ArrowDown") { event.preventDefault(); controls[(index + 1) % controls.length]?.focus(); }
    if (event.key === "ArrowUp") { event.preventDefault(); if (index === 0) inputRef.current?.focus(); else controls[index - 1]?.focus(); }
    if (event.key === "Home" || event.key === "End") { event.preventDefault(); controls[event.key === "Home" ? 0 : controls.length - 1]?.focus(); }
  }}>{filtered.map(item => <li key={item.id}><button type="button" onClick={() => { item.onSelect(); onOpenChange(false); }}>{item.label}</button></li>)}</ul>{!filtered.length && <p role="status">No commands found</p>}</div><DialogPrimitive.Close className="dialog-close" aria-label="Close commands">×</DialogPrimitive.Close></DialogPrimitive.Content></DialogPrimitive.Portal></DialogPrimitive.Root>;
}

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> { title: ReactNode; tone?: Tone; onDismiss?: () => void }
export function Alert({ title, children, tone = "info", onDismiss, className, ...props }: AlertProps) { return <div {...props} role={tone === "danger" || tone === "warning" ? "alert" : "status"} data-hulmio-ui="alert" data-tone={tone} className={cn("h-alert", className)}><div><div className="h-notice-title">{title}</div>{children && <div className="h-notice-description">{children}</div>}</div>{onDismiss && <button type="button" className="h-notice-close" aria-label="Dismiss alert" onClick={onDismiss}>×</button>}</div>; }
export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> { title: ReactNode; description?: ReactNode; tone?: Tone; onDismiss?: () => void }
export function Toast({ title, description, tone = "neutral", onDismiss, className, ...props }: ToastProps) { return <div {...props} role="status" data-hulmio-ui="toast" data-tone={tone} className={cn("h-toast", className)}><span className="h-toast-indicator" aria-hidden="true" /><div><div className="h-notice-title">{title}</div>{description && <div className="h-notice-description">{description}</div>}</div>{onDismiss && <button type="button" className="h-notice-close" aria-label="Dismiss notification" onClick={onDismiss}>×</button>}</div>; }
export interface ProgressProps extends HTMLAttributes<HTMLDivElement> { value?: number; label?: string; circular?: boolean; indeterminate?: boolean }
export function Progress({ value = 0, label = "Progress", circular, indeterminate, className, ...props }: ProgressProps) {
  const percent = Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 0;
  return <div {...props} data-hulmio-ui="progress" className={cn("h-progress", circular && "h-progress-circular", className)} role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={indeterminate ? undefined : percent} data-indeterminate={indeterminate || undefined}>{circular ? <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="42" className="h-progress-ring-track" /><circle cx="50" cy="50" r="42" pathLength="100" strokeDasharray={`${indeterminate ? 28 : percent} 100`} transform="rotate(-90 50 50)" className="h-progress-ring-value" />{!indeterminate && <text x="50" y="56" textAnchor="middle">{Math.round(percent)}%</text>}</svg> : <><span className="h-progress-label">{label}{!indeterminate && <span>{Math.round(percent)}%</span>}</span><span className="h-progress-track"><span className="h-progress-value" style={{ width: indeterminate ? "35%" : `${percent}%` }} /></span></>}</div>;
}
export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> { width?: number | string; height?: number | string }
export function Skeleton({ width = "100%", height = 20, className, style, ...props }: SkeletonProps) { return <span {...props} data-hulmio-ui="skeleton" aria-hidden="true" className={cn("h-skeleton", className)} style={{ width, height, ...style }} />; }
export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> { label?: string; size?: "sm" | "md" | "lg" | number }
export function Spinner({ label = "Loading", size = "md", className, style, ...props }: SpinnerProps) { const pixels = typeof size === "number" ? size : { sm: 16, md: 24, lg: 36 }[size]; return <span {...props} data-hulmio-ui="spinner" role="status" className={cn("h-spinner", className)} style={{ "--h-spinner-size": `${pixels}px`, ...style } as CSSProperties}><span aria-hidden="true" className="h-spinner-ring" /><span className="h-visually-hidden">{label}</span></span>; }
export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> { title: ReactNode; description?: ReactNode; action?: ReactNode }
export function EmptyState({ title, description, action, className, ...props }: EmptyStateProps) { return <div {...props} data-hulmio-ui="empty-state" className={cn("h-empty-state", className)}><span className="h-empty-symbol" aria-hidden="true">◇</span><h3>{title}</h3>{description && <p>{description}</p>}{action && <div className="h-empty-action">{action}</div>}</div>; }

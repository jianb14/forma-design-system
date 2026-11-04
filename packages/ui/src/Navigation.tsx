import { forwardRef, useId, useRef, useState } from "react";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "./utils";

export interface TabItem { value: string; label: ReactNode; content?: ReactNode; disabled?: boolean }
export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> { items: TabItem[]; value?: string; defaultValue?: string; onValueChange?: (value: string) => void; label?: string; orientation?: "horizontal" | "vertical"; design?: "classic" | "pill" | "underline" }
export function Tabs({ items, value, defaultValue, onValueChange, label = "Tabs", orientation = "horizontal", design = "classic", className, ...props }: TabsProps) {
  const id = useId();
  const [internal, setInternal] = useState(defaultValue ?? items.find(item => !item.disabled)?.value ?? "");
  const buttons = useRef(new Map<string, HTMLButtonElement>());
  const selected = items.find(item => item.value === (value ?? internal) && !item.disabled)?.value ?? items.find(item => !item.disabled)?.value;
  const activate = (next: string) => { if (value === undefined) setInternal(next); if (next !== selected) onValueChange?.(next); };
  return <div {...props} data-hulmio-ui="tabs" data-orientation={orientation} className={cn("h-tabs", `h-tabs-${design}`, className)}><div role="tablist" aria-label={label} aria-orientation={orientation} className="h-tab-list" onKeyDown={event => {
    const enabled = items.filter(item => !item.disabled);
    const targetIndex = enabled.findIndex(item => buttons.current.get(item.value) === event.target);
    if (targetIndex < 0) return;
    const nextKey = orientation === "vertical" ? "ArrowDown" : "ArrowRight";
    const previousKey = orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
    let index: number;
    if (event.key === nextKey) index = (targetIndex + 1) % enabled.length;
    else if (event.key === previousKey) index = (targetIndex - 1 + enabled.length) % enabled.length;
    else if (event.key === "Home") index = 0;
    else if (event.key === "End") index = enabled.length - 1;
    else return;
    event.preventDefault();
    buttons.current.get(enabled[index].value)?.focus();
    activate(enabled[index].value);
  }}>{items.map((item, index) => <button key={item.value} ref={node => { if (node) buttons.current.set(item.value, node); else buttons.current.delete(item.value); }} id={`${id}-tab-${index}`} type="button" role="tab" aria-selected={selected === item.value} aria-controls={`${id}-panel-${index}`} disabled={item.disabled} tabIndex={selected === item.value ? 0 : -1} onClick={() => activate(item.value)}>{item.label}</button>)}</div>{items.map((item, index) => <div key={item.value} id={`${id}-panel-${index}`} role="tabpanel" aria-labelledby={`${id}-tab-${index}`} hidden={selected !== item.value} tabIndex={0} className="h-tab-panel">{item.content}</div>)}</div>;
}
export function PillTabs(props: TabsProps) { return <Tabs {...props} design="pill" />; }
export function UnderlineTabs(props: TabsProps) { return <Tabs {...props} design="underline" />; }

export interface BreadcrumbItem { label: ReactNode; href?: string }
export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> { items: BreadcrumbItem[]; label?: string }
export function Breadcrumbs({ items, label = "Breadcrumb", className, ...props }: BreadcrumbsProps) { return <nav {...props} aria-label={label} data-hulmio-ui="breadcrumbs" className={cn("h-breadcrumbs", className)}><ol>{items.map((item, index) => <li key={index}>{index > 0 && <span aria-hidden="true" className="h-breadcrumb-divider">/</span>}{item.href ? <a href={item.href} aria-current={index === items.length - 1 ? "page" : undefined}>{item.label}</a> : <span aria-current={index === items.length - 1 ? "page" : undefined}>{item.label}</span>}</li>)}</ol></nav>; }
export interface PaginationProps extends HTMLAttributes<HTMLElement> { page: number; totalPages: number; onPageChange: (page: number) => void; label?: string }
export function Pagination({ page, totalPages, onPageChange, label = "Pagination", className, ...props }: PaginationProps) {
  const total = Number.isFinite(totalPages) ? Math.max(1, Math.floor(totalPages)) : 1;
  const current = Number.isFinite(page) ? Math.max(1, Math.min(total, Math.floor(page))) : 1;
  const pages = [...new Set([1, total, current - 1, current, current + 1].filter(item => item > 0 && item <= total))].sort((a, b) => a - b);
  return <nav {...props} data-hulmio-ui="pagination" aria-label={label} className={cn("h-pagination", className)}><button type="button" disabled={current === 1} onClick={() => onPageChange(current - 1)} aria-label="Previous page">Previous</button>{pages.map((item, index) => <span key={item} className="h-page-slot">{index > 0 && pages[index - 1] < item - 1 && <span className="h-pagination-gap" aria-hidden="true">…</span>}<button type="button" aria-label={`Page ${item}`} aria-current={item === current ? "page" : undefined} onClick={() => { if (item !== current) onPageChange(item); }}>{item}</button></span>)}<button type="button" disabled={current === total} onClick={() => onPageChange(current + 1)} aria-label="Next page">Next</button></nav>;
}
export interface StepperProps extends HTMLAttributes<HTMLOListElement> { steps: string[]; current: number; onStepChange?: (step: number) => void }
export function Stepper({ steps, current, onStepChange, className, ...props }: StepperProps) { return <ol {...props} data-hulmio-ui="stepper" className={cn("h-stepper", className)}>{steps.map((step, index) => <li key={index} data-complete={index < current || undefined} aria-current={index === current ? "step" : undefined}>{onStepChange ? <button type="button" onClick={() => onStepChange(index)} aria-current={index === current ? "step" : undefined}><span className="h-step-number" aria-hidden="true">{index < current ? "✓" : index + 1}</span>{step}</button> : <span className="h-step-label"><span className="h-step-number" aria-hidden="true">{index < current ? "✓" : index + 1}</span>{step}</span>}</li>)}</ol>; }

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> { maxWidth?: number | string }
export const Container = forwardRef<HTMLDivElement, ContainerProps>(({ maxWidth = "72rem", className, style, ...props }, ref) => <div {...props} ref={ref} data-hulmio-ui="container" className={cn("h-container", className)} style={{ maxWidth, ...style }} />);
Container.displayName = "Container";
export interface StackProps extends HTMLAttributes<HTMLDivElement> { direction?: "row" | "column"; gap?: number | string; align?: CSSProperties["alignItems"]; justify?: CSSProperties["justifyContent"] }
export const Stack = forwardRef<HTMLDivElement, StackProps>(({ direction = "column", gap = 16, align, justify, className, style, ...props }, ref) => <div {...props} ref={ref} data-hulmio-ui="stack" className={cn("h-stack", className)} style={{ flexDirection: direction, gap, alignItems: align, justifyContent: justify, ...style }} />);
Stack.displayName = "Stack";
export interface GridProps extends HTMLAttributes<HTMLDivElement> { columns?: number; gap?: number | string; minWidth?: number | string }
export const Grid = forwardRef<HTMLDivElement, GridProps>(({ columns = 3, gap = 16, minWidth, className, style, ...props }, ref) => <div {...props} ref={ref} data-hulmio-ui="grid" className={cn("h-grid", className)} style={{ "--h-grid-columns": Math.max(1, columns), gridTemplateColumns: minWidth ? `repeat(auto-fit, minmax(min(100%, ${typeof minWidth === "number" ? `${minWidth}px` : minWidth}), 1fr))` : undefined, gap, ...style } as CSSProperties} />);
Grid.displayName = "Grid";
export interface SplitProps extends HTMLAttributes<HTMLDivElement> { ratio?: string; gap?: number | string }
export const Split = forwardRef<HTMLDivElement, SplitProps>(({ ratio = "1fr 1fr", gap = 24, className, style, ...props }, ref) => <div {...props} ref={ref} data-hulmio-ui="split" className={cn("h-split", className)} style={{ "--h-split-ratio": ratio, gap, ...style } as CSSProperties} />);
Split.displayName = "Split";
export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> { ratio?: number }
export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(({ ratio = 16 / 9, className, style, ...props }, ref) => <div {...props} ref={ref} data-hulmio-ui="aspect-ratio" className={cn("h-aspect-ratio", className)} style={{ aspectRatio: ratio, ...style }} />);
AspectRatio.displayName = "AspectRatio";
export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> { maxHeight?: number | string; label?: string }
export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(({ maxHeight = 320, label = "Scrollable content", className, style, ...props }, ref) => <div role="region" aria-label={label} tabIndex={0} {...props} ref={ref} data-hulmio-ui="scroll-area" className={cn("h-scroll-area", className)} style={{ maxHeight, ...style }} />);
ScrollArea.displayName = "ScrollArea";
export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> { orientation?: "horizontal" | "vertical"; decorative?: boolean }
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(({ orientation = "horizontal", decorative = true, className, ...props }, ref) => <div {...props} ref={ref} data-hulmio-ui="separator" className={cn("h-separator", className)} role={decorative ? "none" : "separator"} aria-orientation={decorative ? undefined : orientation} data-orientation={orientation} />);
Separator.displayName = "Separator";
export interface KbdProps extends HTMLAttributes<HTMLElement> {}
export const Kbd = forwardRef<HTMLElement, KbdProps>(({ className, ...props }, ref) => <kbd {...props} ref={ref} data-hulmio-ui="kbd" className={cn("h-kbd", className)} />);
Kbd.displayName = "Kbd";
export interface TextProps extends HTMLAttributes<HTMLElement> { as?: "p" | "span" | "div"; tone?: "default" | "muted" | "primary"; size?: "sm" | "md" | "lg" }
export const Text = forwardRef<HTMLElement, TextProps>(({ as: Component = "p", tone = "default", size = "md", className, ...props }, ref) => <Component {...props} ref={ref as never} data-hulmio-ui="text" data-tone={tone} data-size={size} className={cn("h-text", className)} />);
Text.displayName = "Text";
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> { as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" }
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(({ as: Component = "h2", className, ...props }, ref) => <Component {...props} ref={ref} data-hulmio-ui="heading" className={cn("h-heading", className)} />);
Heading.displayName = "Heading";
export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> { label?: string }
export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(({ label = "Toolbar", className, onKeyDown, ...props }, ref) => <div {...props} ref={ref} role="toolbar" aria-label={label} data-hulmio-ui="toolbar" className={cn("h-toolbar", className)} onKeyDown={event => { onKeyDown?.(event); if (event.defaultPrevented || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key) || (event.target as HTMLElement).matches("input,textarea,select")) return; const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled),a[href],input:not(:disabled),select:not(:disabled),[tabindex="0"]')).filter(node => !node.closest('[hidden]') && !node.matches(':disabled,[aria-disabled="true"]')); const index = controls.indexOf(event.target as HTMLElement); if (index < 0) return; event.preventDefault(); const next = event.key === "Home" ? 0 : event.key === "End" ? controls.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + controls.length) % controls.length; controls[next]?.focus(); }} />);
Toolbar.displayName = "Toolbar";
export interface NavbarProps extends HTMLAttributes<HTMLElement> { label?: string }
export const Navbar = forwardRef<HTMLElement, NavbarProps>(({ label = "Main navigation", className, ...props }, ref) => <nav {...props} ref={ref} aria-label={label} data-hulmio-ui="navbar" className={cn("h-navbar", className)} />);
Navbar.displayName = "Navbar";
export interface SidebarProps extends HTMLAttributes<HTMLElement> { label?: string }
export const Sidebar = forwardRef<HTMLElement, SidebarProps>(({ label = "Sidebar", className, ...props }, ref) => <aside {...props} ref={ref} aria-label={label} data-hulmio-ui="sidebar" className={cn("h-sidebar", className)} />);
Sidebar.displayName = "Sidebar";

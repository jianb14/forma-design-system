import { Fragment, forwardRef, useEffect, useId, useMemo, useState } from "react";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "./utils";

export type Tone = "neutral" | "primary" | "success" | "warning" | "danger" | "info";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  dot?: boolean;
  outline?: boolean;
}
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({ children, tone = "neutral", dot, outline, className, ...props }, ref) => (
  <span {...props} ref={ref} data-hulmio-ui="badge" data-tone={tone} className={cn("h-badge", outline && "h-badge-outline", className)}>
    {dot && <span className="h-badge-dot" aria-hidden="true" />}{children}
  </span>
));
Badge.displayName = "Badge";
export const SoftBadge = forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => <Badge {...props} ref={ref} outline={false} />);
SoftBadge.displayName = "SoftBadge";
export const OutlineBadge = forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => <Badge {...props} ref={ref} outline />);
OutlineBadge.displayName = "OutlineBadge";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg" | number;
  status?: "online" | "offline" | "busy" | "away";
}
export function Avatar({ name, src, size = "md", status, className, style, ...props }: AvatarProps) {
  const [failedSource, setFailedSource] = useState<string>();
  const pixels = typeof size === "number" ? size : { sm: 28, md: 40, lg: 56 }[size];
  return <span {...props} data-hulmio-ui="avatar" className={cn("h-avatar", className)} role="img" aria-label={`${name}${status ? `, ${status}` : ""}`} style={{ "--h-avatar-size": `${pixels}px`, ...style } as CSSProperties}>
    {src && src !== failedSource ? <img src={src} alt="" onError={() => setFailedSource(src)} /> : <span aria-hidden="true">{name.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join("").toUpperCase() || "?"}</span>}
    {status && <span className="h-avatar-status" data-status={status} aria-hidden="true" />}
  </span>;
}
export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> { names: string[]; max?: number }
export function AvatarGroup({ names, max = 4, className, ...props }: AvatarGroupProps) {
  const count = Math.max(0, Math.floor(max));
  return <div {...props} data-hulmio-ui="avatar-group" className={cn("h-avatar-group", className)}>{names.slice(0, count).map((name, i) => <Avatar key={`${name}-${i}`} name={name} />)}{names.length > count && <span className="h-avatar-overflow" aria-label={`${names.length - count} more people`}>+{names.length - count}</span>}</div>;
}

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> { title?: ReactNode; description?: ReactNode }
export const Card = forwardRef<HTMLDivElement, CardProps>(({ children, title, description, className, ...props }, ref) => <div {...props} ref={ref} data-hulmio-ui="card" className={cn("h-card", className)}>{title && <h3 className="h-card-title">{title}</h3>}{description && <p className="h-card-description">{description}</p>}{children}</div>);
Card.displayName = "Card";
export const SoftCard = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => <Card {...props} ref={ref} className={cn("h-card-soft", className)} />);
SoftCard.displayName = "SoftCard";
export const OutlinedCard = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => <Card {...props} ref={ref} className={cn("h-card-outlined", className)} />);
OutlinedCard.displayName = "OutlinedCard";
export const ElevatedCard = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => <Card {...props} ref={ref} className={cn("h-card-elevated", className)} />);
ElevatedCard.displayName = "ElevatedCard";

export interface AccordionItem { id: string; title: ReactNode; content: ReactNode; disabled?: boolean }
export interface AccordionProps extends HTMLAttributes<HTMLDivElement> { items: AccordionItem[]; multiple?: boolean }
export function Accordion({ items, multiple, className, ...props }: AccordionProps) {
  const name = useId();
  return <div {...props} data-hulmio-ui="accordion" className={cn("h-accordion", className)}>{items.map(item => <details key={item.id} name={multiple ? undefined : name} className="h-disclosure" data-disabled={item.disabled || undefined}><summary aria-disabled={item.disabled || undefined} onClick={event => { if (item.disabled) event.preventDefault(); }}>{item.title}<span aria-hidden="true">+</span></summary><div className="h-disclosure-content">{item.content}</div></details>)}</div>;
}
export interface CollapsibleProps extends Omit<HTMLAttributes<HTMLDetailsElement>, "title"> { title: ReactNode; defaultOpen?: boolean }
export function Collapsible({ title, children, defaultOpen = false, className, onToggle, ...props }: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen);
  return <details {...props} data-hulmio-ui="collapsible" open={open} onToggle={event => { setOpen(event.currentTarget.open); onToggle?.(event); }} className={cn("h-disclosure", className)}><summary>{title}<span aria-hidden="true">+</span></summary><div className="h-disclosure-content">{children}</div></details>;
}
export interface TimelineItem { id: string; title: ReactNode; description?: ReactNode; date?: string }
export interface TimelineProps extends HTMLAttributes<HTMLOListElement> { items: TimelineItem[] }
export function Timeline({ items, className, ...props }: TimelineProps) {
  return <ol {...props} data-hulmio-ui="timeline" className={cn("h-timeline", className)}>{items.map(item => <li key={item.id}><span className="h-timeline-marker" aria-hidden="true" /><div>{item.date && <span className="h-timeline-date">{item.date}</span>}<div className="h-timeline-title">{item.title}</div>{item.description && <p>{item.description}</p>}</div></li>)}</ol>;
}

export interface ChartDatum { label: string; value: number }
export type ChartVariant = "bar" | "line" | "area" | "donut" | "heatmap" | "scatter";
export interface ChartProps extends HTMLAttributes<HTMLElement> { label: string; data: ChartDatum[]; variant?: ChartVariant }
export function Chart({ label, data, variant = "bar", className, ...props }: ChartProps) {
  const clean = data.map(item => ({ ...item, value: Number.isFinite(item.value) ? item.value : 0 }));
  const min = Math.min(0, ...clean.map(item => item.value));
  const max = Math.max(1, ...clean.map(item => item.value));
  const y = (value: number) => 170 - (value - min) / (max - min) * 150;
  const x = (index: number) => 30 + (index + 0.5) / Math.max(1, clean.length) * 540;
  const points = clean.map((item, index) => `${x(index)},${y(item.value)}`).join(" ");
  const positiveTotal = clean.reduce((sum, item) => sum + Math.max(0, item.value), 0);
  let offset = 0;
  return <figure {...props} data-hulmio-ui="chart" className={cn("h-chart", className)}><figcaption>{label}</figcaption>
    <svg viewBox="0 0 600 200" aria-hidden="true" className={cn("h-chart-visual", `h-chart-${variant}`)}>
      {variant !== "donut" && variant !== "heatmap" && <line x1="30" x2="570" y1={y(0)} y2={y(0)} className="h-chart-axis" />}
      {variant === "area" && clean.length > 0 && <polygon points={`${x(0)},${y(0)} ${points} ${x(clean.length - 1)},${y(0)}`} className="h-chart-area-fill" />}
      {(variant === "line" || variant === "area") && <polyline points={points} className="h-chart-line-stroke" />}
      {clean.map((item, index) => {
        const width = Math.max(1, Math.min(50, 440 / Math.max(1, clean.length)));
        const colorStyle = { "--h-chart-index": index % 5 } as CSSProperties;
        if (variant === "donut") {
          const fraction = positiveTotal ? Math.max(0, item.value) / positiveTotal : 0;
          const start = offset;
          offset += fraction * 100;
          return <circle key={index} cx="300" cy="100" r="70" fill="none" pathLength="100" strokeWidth="30" strokeDasharray={`${fraction * 100} ${100 - fraction * 100}`} strokeDashoffset={-start} transform="rotate(-90 300 100)" className={`h-chart-segment h-chart-color-${index % 5}`} style={colorStyle} />;
        }
        if (variant === "heatmap") return <rect key={index} x={30 + index % 12 * 45} y={20 + Math.floor(index / 12) * Math.min(35, 160 / Math.max(1, Math.ceil(clean.length / 12)))} width="38" height={Math.min(28, 145 / Math.max(1, Math.ceil(clean.length / 12)))} rx="4" className="h-chart-mark" opacity={0.2 + (item.value - min) / (max - min) * 0.8} />;
        if (variant === "bar") return <rect key={index} x={x(index) - width / 2} y={Math.min(y(0), y(item.value))} width={width} height={Math.max(1, Math.abs(y(item.value) - y(0)))} rx="3" className="h-chart-mark" />;
        return <circle key={index} cx={x(index)} cy={y(item.value)} r={variant === "scatter" ? 6 : 4} className="h-chart-mark" />;
      })}
      {variant === "donut" && <text x="300" y="106" textAnchor="middle" className="h-chart-total">{positiveTotal.toLocaleString()}</text>}
    </svg>
    {(variant === "heatmap" || variant === "scatter") && <p className="h-chart-note">Categories appear in data order; values determine {variant === "scatter" ? "vertical position" : "color intensity"}.</p>}
    {variant === "donut" && clean.some(item => item.value < 0) && <p className="h-chart-note">Donut segments show positive values only.</p>}
    <div className="h-table-scroll"><table className="h-chart-data"><caption className="h-visually-hidden">{label} data</caption><thead><tr><th scope="col">Category</th><th scope="col">Value</th></tr></thead><tbody>{data.map((item, i) => <tr key={i}><th scope="row">{item.label}</th><td>{Number.isFinite(item.value) ? item.value.toLocaleString() : "Unavailable"}</td></tr>)}</tbody></table></div>
  </figure>;
}

export interface CarouselProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> { items: ReactNode[]; label?: string }
export function Carousel({ items, label = "Slideshow", className, ...props }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const current = Math.min(index, Math.max(0, items.length - 1));
  return <div {...props} data-hulmio-ui="carousel" className={cn("h-carousel", className)} role="region" aria-roledescription="carousel" aria-label={label}>
    <div className="h-carousel-stage" aria-live="polite">{items.length ? items.map((item, i) => <div key={i} hidden={i !== current} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${items.length}`}>{item}</div>) : <p>No slides</p>}</div>
    <div className="h-carousel-controls"><button type="button" className="h-small-button" disabled={current === 0} aria-label="Previous slide" onClick={() => setIndex(current - 1)}>Previous</button><span>{items.length ? current + 1 : 0} / {items.length}</span><button type="button" className="h-small-button" disabled={current >= items.length - 1} aria-label="Next slide" onClick={() => setIndex(current + 1)}>Next</button></div>
  </div>;
}

export type DataTableRow = Record<string, string | number>;
export type DataTableRowId = string | number;
export interface DataTableColumn { key: string; label: string; sortable?: boolean }
export interface DataTableProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  caption?: string;
  pageSize?: number;
  selectable?: boolean;
  editable?: boolean;
  expandable?: boolean;
  rowKey?: string;
  onRowsChange?: (rows: DataTableRow[]) => void;
  onSelectionChange?: (selectedRowIds: DataTableRowId[]) => void;
  renderExpanded?: (row: DataTableRow) => ReactNode;
}
export function DataTable({ columns, rows, caption = "Data", pageSize = 5, selectable, editable, expandable, rowKey = "id", onRowsChange, onSelectionChange, renderExpanded, className, ...props }: DataTableProps) {
  const tableId = useId();
  const [localRows, setLocalRows] = useState(rows);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState<{ key: string; direction: "asc" | "desc" }>();
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<DataTableRowId>>(new Set());
  const [expanded, setExpanded] = useState<Set<DataTableRowId>>(new Set());
  useEffect(() => { setLocalRows(rows); }, [rows]);
  const currentRows = onRowsChange ? rows : localRows;
  const ids = new Set<DataTableRowId>();
  currentRows.forEach(row => {
    const id = row[rowKey];
    if ((typeof id !== "string" && typeof id !== "number") || (typeof id === "number" && !Number.isFinite(id))) throw new Error(`DataTable requires a string or number in rowKey "${rowKey}" for every row.`);
    if (ids.has(id)) throw new Error(`DataTable rowKey "${rowKey}" must be unique. Duplicate: ${id}`);
    ids.add(id);
  });
  const visibleRows = useMemo(() => {
    const query = filter.toLocaleLowerCase();
    const result = currentRows.filter(row => columns.some(column => String(row[column.key] ?? "").toLocaleLowerCase().includes(query)));
    if (sort) result.sort((a, b) => {
      const left = a[sort.key], right = b[sort.key];
      const order = typeof left === "number" && typeof right === "number" ? left - right : String(left ?? "").localeCompare(String(right ?? ""), undefined, { numeric: true });
      return sort.direction === "asc" ? order : -order;
    });
    return result;
  }, [currentRows, columns, filter, sort]);
  const limit = Number.isFinite(pageSize) ? Math.max(1, Math.floor(pageSize)) : 5;
  const totalPages = Math.max(1, Math.ceil(visibleRows.length / limit));
  const currentPage = Math.min(page, totalPages);
  const pageRows = visibleRows.slice((currentPage - 1) * limit, currentPage * limit);
  const selectedOnPage = pageRows.filter(row => selected.has(row[rowKey])).length;
  const changeSelection = (next: Set<DataTableRowId>) => {
    const valid = new Set([...next].filter(id => ids.has(id)));
    setSelected(valid);
    onSelectionChange?.([...valid]);
  };
  const editCell = (id: DataTableRowId, key: string, text: string) => {
    const source = currentRows.find(row => row[rowKey] === id);
    if (!source || text === String(source[key] ?? "")) return;
    const value = typeof source[key] === "number" ? Number(text) : text;
    if (typeof value === "number" && (!text.trim() || !Number.isFinite(value))) return;
    const updated = currentRows.map(row => row[rowKey] === id ? { ...row, [key]: value } : row);
    setLocalRows(updated);
    onRowsChange?.(updated);
  };
  return <div {...props} data-hulmio-ui="data-table" className={cn("h-data-table", className)}>
    <div className="h-table-tools"><label htmlFor={`${tableId}-filter`}>Filter {caption.toLocaleLowerCase()}</label><input id={`${tableId}-filter`} type="search" value={filter} onChange={event => { setFilter(event.target.value); setPage(1); }} placeholder="Search rows…" /></div>
    <div className="h-table-scroll"><table><caption>{caption}</caption><thead><tr>
      {selectable && <th scope="col"><input type="checkbox" aria-label="Select all rows on this page" checked={pageRows.length > 0 && selectedOnPage === pageRows.length} disabled={!pageRows.length} ref={node => { if (node) node.indeterminate = selectedOnPage > 0 && selectedOnPage < pageRows.length; }} onChange={event => { const next = new Set(selected); pageRows.forEach(row => { if (event.target.checked) next.add(row[rowKey]); else next.delete(row[rowKey]); }); changeSelection(next); }} /></th>}
      {expandable && <th scope="col"><span className="h-visually-hidden">Details</span></th>}
      {columns.map(column => <th key={column.key} scope="col" aria-sort={sort?.key === column.key ? sort.direction === "asc" ? "ascending" : "descending" : undefined}>{column.sortable ? <button type="button" className="h-table-sort" onClick={() => { setSort({ key: column.key, direction: sort?.key === column.key && sort.direction === "asc" ? "desc" : "asc" }); setPage(1); }}>{column.label}<span aria-hidden="true">{sort?.key === column.key ? sort.direction === "asc" ? " ↑" : " ↓" : " ↕"}</span></button> : column.label}</th>)}
    </tr></thead><tbody>{pageRows.map(row => {
      const id = row[rowKey];
      const key = `${typeof id}:${id}`;
      const expandedId = `${tableId}-row-${encodeURIComponent(key)}`;
      return <Fragment key={key}><tr data-row-id={String(id)}>
        {selectable && <td><input type="checkbox" aria-label={`Select row ${id}`} checked={selected.has(id)} onChange={event => { const next = new Set(selected); if (event.target.checked) next.add(id); else next.delete(id); changeSelection(next); }} /></td>}
        {expandable && <td><button className="h-small-button h-table-expand" type="button" aria-label={`${expanded.has(id) ? "Collapse" : "Expand"} row ${id}`} aria-expanded={expanded.has(id)} aria-controls={expandedId} onClick={() => setExpanded(previous => { const next = new Set(previous); if (next.has(id)) next.delete(id); else next.add(id); return next; })}>{expanded.has(id) ? "−" : "+"}</button></td>}
        {columns.map(column => <td key={column.key}>{editable && column.key !== rowKey ? <input key={String(row[column.key])} className="h-table-edit" aria-label={`Edit ${column.label} for row ${id}`} type={typeof row[column.key] === "number" ? "number" : "text"} defaultValue={row[column.key] ?? ""} onBlur={event => { editCell(id, column.key, event.target.value); event.target.value = String(currentRows.find(item => item[rowKey] === id)?.[column.key] ?? ""); }} onKeyDown={event => { if (event.key === "Enter") event.currentTarget.blur(); if (event.key === "Escape") { event.currentTarget.value = String(row[column.key] ?? ""); event.currentTarget.blur(); } }} /> : row[column.key]}</td>)}
      </tr><tr id={expandedId} hidden={!expandable || !expanded.has(id)} className="h-table-expanded"><td colSpan={columns.length + Number(!!selectable) + Number(!!expandable)}>{renderExpanded ? renderExpanded(row) : <dl>{Object.entries(row).map(([name, value]) => <Fragment key={name}><dt>{name}</dt><dd>{value}</dd></Fragment>)}</dl>}</td></tr></Fragment>;
    })}{!pageRows.length && <tr><td colSpan={Math.max(1, columns.length + Number(!!selectable) + Number(!!expandable))} className="h-table-empty">No matching rows</td></tr>}</tbody></table></div>
    <div className="h-table-pagination"><span role="status">{visibleRows.length} rows · Page {currentPage} of {totalPages}{selectable ? ` · ${[...selected].filter(id => ids.has(id)).length} selected` : ""}</span><div><button className="h-small-button" type="button" aria-label="Previous table page" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>Previous</button><button className="h-small-button" type="button" aria-label="Next table page" disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)}>Next</button></div></div>
  </div>;
}

export interface KanbanColumn { id: string; title: string }
export interface KanbanItem { id: string; title: string; column: string; description?: string }
export interface KanbanProps extends HTMLAttributes<HTMLDivElement> { columns: KanbanColumn[]; items: KanbanItem[]; onMove?: (itemId: string, columnId: string) => void }
export function Kanban({ columns, items, onMove, className, ...props }: KanbanProps) {
  const boardId = useId();
  const [message, setMessage] = useState("");
  return <div {...props} data-hulmio-ui="kanban" className={cn("h-kanban", className)}><p role="status" className="h-visually-hidden">{message}</p>{columns.map((column, index) => <section key={column.id} className="h-kanban-column" aria-labelledby={`${boardId}-${index}`}><h3 id={`${boardId}-${index}`}>{column.title}<span>{items.filter(item => item.column === column.id).length}</span></h3><ul>{items.filter(item => item.column === column.id).map(item => <li key={item.id} className="h-kanban-item"><h4>{item.title}</h4>{item.description && <p>{item.description}</p>}<label>Move {item.title}<select aria-label={`Move ${item.title}`} value={item.column} disabled={!onMove} onChange={event => { onMove?.(item.id, event.target.value); setMessage(`${item.title} moved to ${columns.find(next => next.id === event.target.value)?.title ?? event.target.value}`); }}>{columns.map(next => <option key={next.id} value={next.id}>{next.title}</option>)}</select></label></li>)}</ul></section>)}</div>;
}

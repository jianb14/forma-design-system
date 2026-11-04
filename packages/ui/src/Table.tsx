import { forwardRef } from "react";
import type { HTMLAttributes, TableHTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from "react";
import { cn } from "./utils";

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {}
export const Table = forwardRef<HTMLTableElement, TableProps>(({ className, ...props }, ref) =>
  <div data-hulmio-ui="table-container" className="h-table-container" tabIndex={0}><table {...props} ref={ref} data-hulmio-ui="table" className={cn("h-table", className)} /></div>);
Table.displayName = "Table";

export interface TableSectionProps extends HTMLAttributes<HTMLTableSectionElement> {}
export const TableHeader = forwardRef<HTMLTableSectionElement, TableSectionProps>((props, ref) => <thead {...props} ref={ref} />);
TableHeader.displayName = "TableHeader";
export const TableBody = forwardRef<HTMLTableSectionElement, TableSectionProps>((props, ref) => <tbody {...props} ref={ref} />);
TableBody.displayName = "TableBody";
export const TableFooter = forwardRef<HTMLTableSectionElement, TableSectionProps>((props, ref) => <tfoot {...props} ref={ref} />);
TableFooter.displayName = "TableFooter";

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {}
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>((props, ref) => <tr {...props} ref={ref} />);
TableRow.displayName = "TableRow";

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {}
export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(({ scope = "col", ...props }, ref) => <th {...props} ref={ref} scope={scope} />);
TableHead.displayName = "TableHead";
export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {}
export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>((props, ref) => <td {...props} ref={ref} />);
TableCell.displayName = "TableCell";

export interface TableCaptionProps extends HTMLAttributes<HTMLTableCaptionElement> {}
export const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>((props, ref) => <caption {...props} ref={ref} />);
TableCaption.displayName = "TableCaption";

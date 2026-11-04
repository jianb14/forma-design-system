import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import { cn } from "./utils";

export interface ItemProps extends HTMLAttributes<HTMLLIElement> { variant?: "default" | "outline" | "muted" }
export const Item = forwardRef<HTMLLIElement, ItemProps>(({ className, variant = "default", ...props }, ref) =>
  <li {...props} ref={ref} data-hulmio-ui="item" data-variant={variant} className={cn("h-item", className)} />);
Item.displayName = "Item";

export interface ItemGroupProps extends HTMLAttributes<HTMLUListElement> {}
export const ItemGroup = forwardRef<HTMLUListElement, ItemGroupProps>(({ className, ...props }, ref) =>
  <ul {...props} ref={ref} data-hulmio-ui="item-group" className={cn("h-item-group", className)} />);
ItemGroup.displayName = "ItemGroup";

export interface ItemContentProps extends HTMLAttributes<HTMLDivElement> {}
export const ItemContent = forwardRef<HTMLDivElement, ItemContentProps>(({ className, ...props }, ref) =>
  <div {...props} ref={ref} data-hulmio-ui="item-content" className={cn("h-item-content", className)} />);
ItemContent.displayName = "ItemContent";

export interface ItemTitleProps extends HTMLAttributes<HTMLParagraphElement> {}
export const ItemTitle = forwardRef<HTMLParagraphElement, ItemTitleProps>(({ className, ...props }, ref) =>
  <p {...props} ref={ref} data-hulmio-ui="item-title" className={cn("h-item-title", className)} />);
ItemTitle.displayName = "ItemTitle";

export interface ItemDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}
export const ItemDescription = forwardRef<HTMLParagraphElement, ItemDescriptionProps>(({ className, ...props }, ref) =>
  <p {...props} ref={ref} data-hulmio-ui="item-description" className={cn("h-item-description", className)} />);
ItemDescription.displayName = "ItemDescription";

export interface ItemActionsProps extends HTMLAttributes<HTMLDivElement> {}
export const ItemActions = forwardRef<HTMLDivElement, ItemActionsProps>(({ className, ...props }, ref) =>
  <div {...props} ref={ref} data-hulmio-ui="item-actions" className={cn("h-item-actions", className)} />);
ItemActions.displayName = "ItemActions";

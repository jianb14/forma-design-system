import { forwardRef } from "react";
import type { HTMLAttributes, InputHTMLAttributes } from "react";
import { cn } from "./utils";

export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {}
export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(({ className, ...props }, ref) =>
  <div {...props} ref={ref} data-hulmio-ui="input-group" className={cn("h-input-group", className)} />);
InputGroup.displayName = "InputGroup";

export interface InputGroupAddonProps extends HTMLAttributes<HTMLDivElement> {}
export const InputGroupAddon = forwardRef<HTMLDivElement, InputGroupAddonProps>(({ className, ...props }, ref) =>
  <div {...props} ref={ref} data-hulmio-ui="input-group-addon" className={cn("h-input-group-addon", className)} />);
InputGroupAddon.displayName = "InputGroupAddon";

export interface InputGroupInputProps extends InputHTMLAttributes<HTMLInputElement> {}
export const InputGroupInput = forwardRef<HTMLInputElement, InputGroupInputProps>(({ className, type = "text", ...props }, ref) =>
  <input {...props} ref={ref} type={type} data-hulmio-ui="input-group-input" className={cn("h-input-group-input", className)} />);
InputGroupInput.displayName = "InputGroupInput";

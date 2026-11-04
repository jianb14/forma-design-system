import { forwardRef, useId, useState } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes } from "react";
import { Button } from "./Button";
import type { ButtonDesign, ButtonProps, Size, Variant } from "./Button";
import { Input } from "./Input";
import type { InputProps } from "./Input";
import { cn } from "./utils";

export type NamedButtonProps = Omit<ButtonProps, "design">;
function namedButton(design: ButtonDesign, name: string) {
  const Component = forwardRef<HTMLButtonElement, NamedButtonProps>((props, ref) => <Button {...props} ref={ref} design={design} />);
  Component.displayName = name;
  return Component;
}
export const ClassicButton = namedButton("classic", "ClassicButton");
export const PillButton = namedButton("pill", "PillButton");
export const SoftButton = namedButton("soft", "SoftButton");
export const OutlineButton = namedButton("outline", "OutlineButton");
export const ElevatedButton = namedButton("elevated", "ElevatedButton");
export const GradientButton = namedButton("gradient", "GradientButton");
export const BrutalistButton = namedButton("brutalist", "BrutalistButton");
export const GlassButton = namedButton("glass", "GlassButton");

export interface IconButtonProps extends ButtonProps { label: string }
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({ label, className, shape, ...props }, ref) => (
  <Button {...props} ref={ref} shape={shape} className={cn("h-icon-button", className)} aria-label={label} />
));
IconButton.displayName = "IconButton";

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> { label?: string }
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(({ label, className, ...props }, ref) => (
  <div {...props} ref={ref} data-hulmio-ui="button-group" role="group" aria-label={label ?? props["aria-label"]} className={cn("h-button-group", className)} />
));
ButtonGroup.displayName = "ButtonGroup";

export interface ToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(({ pressed, defaultPressed = false, onPressedChange, onClick, className, type = "button", ...props }, ref) => {
  const [inner, setInner] = useState(defaultPressed);
  const current = pressed ?? inner;
  return <button {...props} ref={ref} type={type} data-hulmio-ui="toggle" className={cn("h-toggle", className)} aria-pressed={current} onClick={(event) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (pressed === undefined) setInner(!current);
    onPressedChange?.(!current);
  }} />;
});
Toggle.displayName = "Toggle";

export interface ToggleOption { value: string; label: string; disabled?: boolean }
export interface ToggleGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  label: string;
  options: ToggleOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  form?: string;
}
export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(({ label, options, value, defaultValue, onValueChange, name, disabled, required, form, id, className, ...props }, ref) => {
  const autoId = useId();
  const groupId = id ?? autoId;
  return <div {...props} id={groupId} ref={ref} role="radiogroup" aria-label={label} aria-required={required || undefined} aria-disabled={disabled || undefined} data-hulmio-ui="toggle-group" className={cn("h-toggle-group", className)}>
    {options.map((option, index) => <label className="h-toggle-option" key={option.value}>
      <input type="radio" name={name ?? `${groupId}-value`} form={form} value={option.value} required={required} disabled={disabled || option.disabled} checked={value === undefined ? undefined : value === option.value} defaultChecked={value === undefined ? defaultValue === option.value : undefined} onChange={(event) => { if (event.target.checked) onValueChange?.(option.value); }} aria-label={option.label} id={`${groupId}-${index}`} />
      <span>{option.label}</span>
    </label>)}
  </div>;
});
ToggleGroup.displayName = "ToggleGroup";

export interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> { variant?: Variant; size?: Size; design?: ButtonDesign }
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(({ variant = "primary", size = "md", design = "classic", className, ...props }, ref) => (
  <a {...props} ref={ref} data-hulmio-ui="button-link" data-design={design} data-variant={variant} className={cn("h-button f-button", design === "classic" && "rounded-lg", `button-${variant}`, `button-${size}`, className)} />
));
ButtonLink.displayName = "ButtonLink";

function namedInput(design: string, name: string) {
  const Component = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => <Input {...props} ref={ref} className={cn(`h-input-${design}`, className)} />);
  Component.displayName = name;
  return Component;
}
export const OutlineInput = namedInput("outline", "OutlineInput");
export const FilledInput = namedInput("filled", "FilledInput");
export const UnderlineInput = namedInput("underline", "UnderlineInput");

import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cva } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { cn } from "./utils";

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
export type ButtonDesign = "classic" | "pill" | "soft" | "outline" | "elevated" | "gradient" | "brutalist" | "glass";
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
  design?: ButtonDesign;
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
      design = "classic",
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
      data-hulmio-ui="button"
      data-design={design}
      data-variant={variant ?? "primary"}
      ref={ref}
      type={type}
      className={cn(
        buttonStyles({ variant, size, shape: shape ?? (design === "classic" ? "rounded" : null) }),
        "h-button",
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

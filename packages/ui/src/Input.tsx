import { forwardRef, useId, useRef, useState } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { cn } from "./utils";

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
      <div data-hulmio-ui="input" className={cn("field", className)}>
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
            role={error ? "alert" : undefined}
          >
            {error || helper}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

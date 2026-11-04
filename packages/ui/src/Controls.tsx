import { Children, cloneElement, forwardRef, isValidElement, useEffect, useId, useRef, useState } from "react";
import type { FormHTMLAttributes, HTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes, ReactElement, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes, FieldsetHTMLAttributes } from "react";
import { Input } from "./Input";
import type { InputProps } from "./Input";
import { cn } from "./utils";

type Descriptions = { hint?: ReactNode; error?: ReactNode };
function describedBy(id: string, hint: ReactNode, error: ReactNode, existing?: string) {
  return [...new Set([existing, hint ? `${id}-hint` : undefined, error ? `${id}-error` : undefined].filter(Boolean).join(" ").split(/\s+/).filter(Boolean))].join(" ") || undefined;
}
function useValue<T>(value: T | undefined, defaultValue: T, onChange?: (value: T) => void) {
  const [inner, setInner] = useState(defaultValue);
  const current = value === undefined ? inner : value;
  return [current, (next: T) => { if (value === undefined) setInner(next); onChange?.(next); }] as const;
}

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> { required?: boolean }
export const Label = forwardRef<HTMLLabelElement, LabelProps>(({ required, className, children, ...props }, ref) => <label {...props} ref={ref} data-hulmio-ui="label" className={cn("h-label", className)}>{children}{required && <span className="h-required" aria-hidden="true"> *</span>}</label>);
Label.displayName = "Label";

export interface FieldProps extends HTMLAttributes<HTMLDivElement>, Descriptions { label?: ReactNode; htmlFor?: string; required?: boolean }
export const Field = forwardRef<HTMLDivElement, FieldProps>(({ label, htmlFor, hint, error, required, children, className, ...props }, ref) => {
  const autoId = useId();
  const child = Children.count(children) === 1 && isValidElement(children) ? children as ReactElement<{ id?: string; required?: boolean; "aria-describedby"?: string; "aria-invalid"?: boolean | "true" | "false" | "grammar" | "spelling" }> : undefined;
  const canConnect = child && (typeof child.type === "function" || typeof child.type === "object" || (typeof child.type === "string" && ["input", "select", "textarea", "button"].includes(child.type)));
  const inputId = htmlFor ?? (canConnect ? child.props.id : undefined) ?? autoId;
  // Each connected Field owns its descriptions, even when Fields share a control.
  // Grouped controls wire descriptions explicitly through htmlFor.
  const descriptionId = canConnect ? `${autoId}-description` : inputId;
  const connected = canConnect ? cloneElement(child, {
    id: inputId,
    "aria-describedby": describedBy(descriptionId, hint, error, child.props["aria-describedby"]),
    "aria-invalid": error ? true : child.props["aria-invalid"],
  }) : children;
  return <div {...props} ref={ref} data-hulmio-ui="field" className={cn("h-field", className)}>
    {label != null && <Label htmlFor={inputId} required={required ?? child?.props.required}>{label}</Label>}
    {connected}
    {hint && <p id={`${descriptionId}-hint`} className="h-hint">{hint}</p>}
    {error && <p id={`${descriptionId}-error`} className="h-error" role="alert">{error}</p>}
  </div>;
});
Field.displayName = "Field";

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {}
export const Form = forwardRef<HTMLFormElement, FormProps>(({ className, ...props }, ref) => <form {...props} ref={ref} data-hulmio-ui="form" className={cn("h-form", className)} />);
Form.displayName = "Form";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, Descriptions { label?: string; showCount?: boolean }
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ label, hint, error, showCount, id, className, value, defaultValue, onChange, ...props }, ref) => {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [length, setLength] = useState(String(defaultValue ?? "").length);
  return <Field label={label} htmlFor={inputId} hint={hint} error={error} required={props.required}>
    <textarea {...props} ref={ref} id={inputId} value={value} defaultValue={defaultValue} rows={props.rows ?? 4} className={cn("h-control h-textarea", className)} aria-invalid={error ? true : props["aria-invalid"]} aria-describedby={describedBy(inputId, hint, error, props["aria-describedby"])} onChange={(event) => { setLength(event.target.value.length); onChange?.(event); }} />
    {showCount && <output className="h-count" aria-live="off" htmlFor={inputId}>{value === undefined ? length : String(value).length}{props.maxLength !== undefined ? ` / ${props.maxLength}` : ""}</output>}
  </Field>;
});
Textarea.displayName = "Textarea";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type">, Descriptions { label?: ReactNode; indeterminate?: boolean }
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ label, hint, error, indeterminate = false, className, id, ...props }, ref) => {
  const autoId = useId();
  const inputId = id ?? autoId;
  const localRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => { if (localRef.current) localRef.current.indeterminate = indeterminate; }, [indeterminate]);
  return <div data-hulmio-ui="checkbox" className="h-choice-field">
    <label className="h-choice" htmlFor={inputId}><input {...props} ref={(node) => { localRef.current = node; if (typeof ref === "function") ref(node); else if (ref) ref.current = node; }} id={inputId} type="checkbox" className={cn("h-choice-input", className)} aria-invalid={error ? true : props["aria-invalid"]} aria-describedby={describedBy(inputId, hint, error, props["aria-describedby"])} /><span>{label}</span></label>
    {hint && <p className="h-hint" id={`${inputId}-hint`}>{hint}</p>}{error && <p className="h-error" id={`${inputId}-error`} role="alert">{error}</p>}
  </div>;
});
Checkbox.displayName = "Checkbox";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type">, Descriptions { label?: ReactNode }
export const Radio = forwardRef<HTMLInputElement, RadioProps>(({ label, hint, error, id, className, ...props }, ref) => {
  const autoId = useId();
  const inputId = id ?? autoId;
  return <div data-hulmio-ui="radio" className="h-choice-field"><label className="h-choice" htmlFor={inputId}><input {...props} ref={ref} id={inputId} type="radio" className={cn("h-choice-input", className)} aria-invalid={error ? true : props["aria-invalid"]} aria-describedby={describedBy(inputId, hint, error, props["aria-describedby"])} /><span>{label}</span></label>{hint && <p className="h-hint" id={`${inputId}-hint`}>{hint}</p>}{error && <p className="h-error" id={`${inputId}-error`} role="alert">{error}</p>}</div>;
});
Radio.displayName = "Radio";

export interface ControlOption { value: string; label: string; disabled?: boolean }
export interface RadioGroupProps extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, "defaultValue" | "onChange">, Descriptions {
  label: string;
  options: ControlOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  required?: boolean;
}
export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(({ label, options, value, defaultValue, onValueChange, name, disabled, required, hint, error, id, className, form, ...props }, ref) => {
  const autoId = useId();
  const groupId = id ?? autoId;
  return <fieldset {...props} id={groupId} ref={ref} disabled={disabled} form={form} data-hulmio-ui="radio-group" className={cn("h-fieldset", className)} aria-invalid={error ? true : props["aria-invalid"]} aria-describedby={describedBy(groupId, hint, error, props["aria-describedby"])}>
    <legend className="h-label">{label}{required && <span className="h-required" aria-hidden="true"> *</span>}</legend>
    <div className="h-options">{options.map((option, index) => <Radio key={option.value} id={`${groupId}-${index}`} form={form} name={name ?? `${groupId}-value`} label={option.label} value={option.value} required={required} disabled={disabled || option.disabled} checked={value === undefined ? undefined : value === option.value} defaultChecked={value === undefined ? defaultValue === option.value : undefined} onChange={(event) => { if (event.target.checked) onValueChange?.(option.value); }} />)}</div>
    {hint && <p className="h-hint" id={`${groupId}-hint`}>{hint}</p>}{error && <p className="h-error" id={`${groupId}-error`} role="alert">{error}</p>}
  </fieldset>;
});
RadioGroup.displayName = "RadioGroup";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type">, Descriptions { label?: ReactNode; onCheckedChange?: (checked: boolean) => void }
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(({ label, hint, error, id, className, onCheckedChange, onChange, ...props }, ref) => {
  const autoId = useId();
  const inputId = id ?? autoId;
  return <div data-hulmio-ui="switch" className="h-choice-field"><label htmlFor={inputId} className="h-choice h-switch"><input {...props} type="checkbox" role="switch" ref={ref} id={inputId} className={cn("h-switch-input", className)} aria-invalid={error ? true : props["aria-invalid"]} aria-describedby={describedBy(inputId, hint, error, props["aria-describedby"])} onChange={(event) => { onChange?.(event); onCheckedChange?.(event.target.checked); }} /><span className="h-switch-track" aria-hidden="true" /><span>{label}</span></label>{hint && <p className="h-hint" id={`${inputId}-hint`}>{hint}</p>}{error && <p className="h-error" id={`${inputId}-error`} role="alert">{error}</p>}</div>;
});
Switch.displayName = "Switch";

export interface NativeSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "value" | "defaultValue" | "multiple">, Descriptions {
  label?: string;
  options: ControlOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
}
export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(({ label, options, hint, error, onValueChange, onChange, placeholder, className, ...props }, ref) => (
  <Field label={label} htmlFor={props.id} hint={hint} error={error} required={props.required}><select {...props} ref={ref} className={cn("h-control h-select", className)} onChange={(event) => { onChange?.(event); onValueChange?.(event.target.value); }}>{placeholder !== undefined && <option value="" disabled>{placeholder}</option>}{options.map((option) => <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>)}</select></Field>
));
NativeSelect.displayName = "NativeSelect";

export interface ComboboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "list" | "type">, Descriptions {
  label?: string;
  options: ControlOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}
export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(({ label, options, hint, error, onValueChange, onChange, id, className, ...props }, ref) => {
  const autoId = useId();
  const inputId = id ?? autoId;
  return <Field label={label} htmlFor={inputId} hint={hint} error={error} required={props.required}><input {...props} id={inputId} type="text" list={`${inputId}-options`} ref={ref} className={cn("h-control", className)} aria-invalid={error ? true : props["aria-invalid"]} aria-describedby={describedBy(inputId, hint, error, props["aria-describedby"])} onChange={(event) => { onChange?.(event); onValueChange?.(event.target.value); }} /><datalist id={`${inputId}-options`}>{options.filter((option) => !option.disabled).map((option) => <option key={option.value} value={option.value} label={option.label} />)}</datalist></Field>;
});
Combobox.displayName = "Combobox";

export interface MultiSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "value" | "defaultValue" | "multiple">, Descriptions {
  label?: string;
  options: ControlOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}
export const MultiSelect = forwardRef<HTMLSelectElement, MultiSelectProps>(({ label, options, hint, error, onValueChange, onChange, className, ...props }, ref) => (
  <Field label={label} htmlFor={props.id} hint={hint} error={error} required={props.required}><select {...props} multiple ref={ref} className={cn("h-control h-multi-select", className)} onChange={(event) => { onChange?.(event); onValueChange?.(Array.from(event.target.selectedOptions, (option) => option.value)); }}>{options.map((option) => <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>)}</select></Field>
));
MultiSelect.displayName = "MultiSelect";

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "defaultValue">, Descriptions {
  label?: string;
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
}
export const Slider = forwardRef<HTMLInputElement, SliderProps>(({ label, hint, error, value, defaultValue, onValueChange, onChange, id, className, min = 0, max = 100, step = 1, ...props }, ref) => {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [current, setCurrent] = useValue(value, defaultValue ?? (Number(min) + Number(max)) / 2, onValueChange);
  const lower = Number.isFinite(Number(min)) ? Number(min) : 0;
  const upper = Math.max(lower, Number.isFinite(Number(max)) ? Number(max) : 100);
  const bounded = Math.min(upper, Math.max(lower, Number.isFinite(current) ? current : (lower + upper) / 2));
  const increment = Number(step) > 0 && Number.isFinite(Number(step)) ? Number(step) : 1;
  const steps = Math.min(Math.round((bounded - lower) / increment), Math.floor((upper - lower) / increment + 1e-10));
  const displayed = step === "any" ? bounded : Number((lower + steps * increment).toPrecision(12));
  return <Field label={label} htmlFor={inputId} hint={hint} error={error}><div className="h-slider-row"><input {...props} ref={ref} id={inputId} type="range" min={min} max={max} step={step} value={displayed} className={cn("h-slider", className)} aria-invalid={error ? true : props["aria-invalid"]} aria-describedby={describedBy(inputId, hint, error, props["aria-describedby"])} onChange={(event) => { onChange?.(event); setCurrent(event.target.valueAsNumber); }} /><output htmlFor={inputId} className="h-slider-value">{displayed}</output></div></Field>;
});
Slider.displayName = "Slider";

export interface RatingProps extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, "defaultValue" | "onChange">, Descriptions {
  label: string;
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  max?: number;
  readOnly?: boolean;
  required?: boolean;
}
export const Rating = forwardRef<HTMLFieldSetElement, RatingProps>(({ label, value, defaultValue = 0, onValueChange, max = 5, readOnly, disabled, required, name, form, hint, error, id, className, ...props }, ref) => {
  const autoId = useId();
  const groupId = id ?? autoId;
  const [current, setCurrent] = useValue(value, defaultValue, onValueChange);
  const count = Number.isFinite(max) ? Math.max(1, Math.floor(max)) : 5;
  return <fieldset {...props} ref={ref} id={groupId} disabled={disabled} data-hulmio-ui="rating" className={cn("h-fieldset", className)} aria-readonly={readOnly || undefined} aria-invalid={error ? true : props["aria-invalid"]} aria-describedby={describedBy(groupId, hint, error, props["aria-describedby"])}><legend className="h-label">{label}</legend><div className="h-rating">{Array.from({ length: count }, (_, index) => index + 1).map((number) => <label key={number} className="h-rating-option" data-filled={number <= current || undefined}><input type="radio" form={form} name={name ?? `${groupId}-value`} value={number} checked={current === number} required={required} disabled={disabled} aria-label={`${number} of ${count}`} aria-readonly={readOnly || undefined} onClick={(event) => { if (readOnly) event.preventDefault(); }} onKeyDown={(event) => { if (readOnly && [" ", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) event.preventDefault(); }} onChange={() => { if (!readOnly) setCurrent(number); }} /><span aria-hidden="true">★</span></label>)}</div>{hint && <p className="h-hint" id={`${groupId}-hint`}>{hint}</p>}{error && <p className="h-error" id={`${groupId}-error`} role="alert">{error}</p>}</fieldset>;
});
Rating.displayName = "Rating";

export interface OtpInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "defaultValue" | "maxLength">, Descriptions {
  label?: string;
  length?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  masked?: boolean;
}
export const OtpInput = forwardRef<HTMLInputElement, OtpInputProps>(({ label, length = 6, value, defaultValue = "", onValueChange, masked, hint, error, className, onChange, ...props }, ref) => {
  const limit = Number.isFinite(length) ? Math.max(1, Math.floor(length)) : 6;
  const [current, setCurrent] = useValue(value, defaultValue, onValueChange);
  return <Field label={label} htmlFor={props.id} hint={hint} error={error} required={props.required}><input {...props} ref={ref} type={masked ? "password" : "text"} autoComplete={props.autoComplete ?? "one-time-code"} inputMode={props.inputMode ?? "numeric"} maxLength={limit} value={current.slice(0, limit)} className={cn("h-control h-otp-input", className)} onChange={(event) => { onChange?.(event); setCurrent(event.target.value.replace(/\s/g, "").slice(0, limit)); }} /></Field>;
});
OtpInput.displayName = "OtpInput";

export interface TagInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "defaultValue">, Descriptions {
  label?: string;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}
export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(({ label, value, defaultValue = [], onValueChange, disabled, readOnly, required, name, hint, error, id, className, onKeyDown, onChange, ...props }, ref) => {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [tags, setTags] = useValue(value, defaultValue, onValueChange);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => { inputRef.current?.setCustomValidity(required && tags.length === 0 ? "Add at least one tag using Enter or comma." : ""); }, [required, tags.length]);
  const addTag = () => { const next = draft.trim(); if (next && !tags.includes(next)) setTags([...tags, next]); setDraft(""); };
  return <Field label={label} htmlFor={inputId} hint={hint} error={error} required={required}><div className={cn("h-tag-shell", disabled && "h-disabled")}>
    {tags.map((tag, index) => <span className="h-tag" key={`${tag}-${index}`}>{tag}<button type="button" disabled={disabled || readOnly} aria-label={`Remove ${tag}`} onClick={() => setTags(tags.filter((_, item) => item !== index))}>×</button></span>)}
    <input {...props} ref={(node) => { inputRef.current = node; if (typeof ref === "function") ref(node); else if (ref) ref.current = node; }} id={inputId} type="text" disabled={disabled} readOnly={readOnly} required={required && tags.length === 0} value={draft} className={cn("h-tag-entry", className)} aria-invalid={error ? true : props["aria-invalid"]} aria-describedby={describedBy(inputId, hint, error, props["aria-describedby"])} onChange={(event) => { setDraft(event.target.value); onChange?.(event); }} onKeyDown={(event) => { onKeyDown?.(event); if (event.defaultPrevented || event.nativeEvent.isComposing || readOnly) return; if (event.key === "Enter" || event.key === ",") { event.preventDefault(); addTag(); } else if (event.key === "Backspace" && !draft && tags.length) { setTags(tags.slice(0, -1)); } }} />
  </div>{name && tags.map((tag, index) => <input key={index} type="hidden" name={name} form={props.form} value={tag} disabled={disabled} />)}</Field>;
});
TagInput.displayName = "TagInput";

export interface ColorPickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "defaultValue">, Descriptions {
  label?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}
export const ColorPicker = forwardRef<HTMLInputElement, ColorPickerProps>(({ label, value, defaultValue = "#284c3f", onValueChange, onChange, hint, error, className, ...props }, ref) => <Field label={label} htmlFor={props.id} hint={hint} error={error} required={props.required}><input {...props} ref={ref} type="color" value={value} defaultValue={value === undefined ? defaultValue : undefined} className={cn("h-control h-color-picker", className)} onChange={(event) => { onChange?.(event); onValueChange?.(event.target.value); }} /></Field>);
ColorPicker.displayName = "ColorPicker";

export interface DatePickerProps extends Omit<InputProps, "type"> { type?: "date" | "time" | "datetime-local" | "month" | "week" }
export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(({ type = "date", ...props }, ref) => <Input {...props} type={type} ref={ref} />);
DatePicker.displayName = "DatePicker";

export interface DateRange { start: string; end: string }
export interface DateRangePickerProps extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, "defaultValue" | "onChange">, Descriptions {
  label: string;
  start?: string;
  end?: string;
  defaultStart?: string;
  defaultEnd?: string;
  onRangeChange?: (range: DateRange) => void;
  required?: boolean;
  min?: string;
  max?: string;
}
export const DateRangePicker = forwardRef<HTMLFieldSetElement, DateRangePickerProps>(({ label, start, end, defaultStart = "", defaultEnd = "", onRangeChange, disabled, required, name, form, min, max, hint, error, id, className, ...props }, ref) => {
  const autoId = useId();
  const groupId = id ?? autoId;
  const [startValue, setStart] = useValue(start, defaultStart);
  const [endValue, setEnd] = useValue(end, defaultEnd);
  return <fieldset {...props} id={groupId} ref={ref} form={form} disabled={disabled} data-hulmio-ui="date-range" className={cn("h-fieldset", className)} aria-invalid={error ? true : props["aria-invalid"]} aria-describedby={describedBy(groupId, hint, error, props["aria-describedby"])}><legend className="h-label">{label}</legend><div className="h-date-range">
    <DatePicker label="Start date" id={`${groupId}-start`} name={name ? `${name}-start` : undefined} form={form} value={startValue} min={min} max={endValue ? (max && max < endValue ? max : endValue) : max} disabled={disabled} required={required} onChange={(event) => { const next = event.target.value; setStart(next); onRangeChange?.({ start: next, end: endValue }); }} />
    <DatePicker label="End date" id={`${groupId}-end`} name={name ? `${name}-end` : undefined} form={form} value={endValue} min={startValue ? (min && min > startValue ? min : startValue) : min} max={max} disabled={disabled} required={required} onChange={(event) => { const next = event.target.value; setEnd(next); onRangeChange?.({ start: startValue, end: next }); }} />
  </div>{hint && <p className="h-hint" id={`${groupId}-hint`}>{hint}</p>}{error && <p className="h-error" id={`${groupId}-error`} role="alert">{error}</p>}</fieldset>;
});
DateRangePicker.displayName = "DateRangePicker";

export interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "defaultValue">, Descriptions {
  label?: string;
  maxSize?: number;
  onFilesChange?: (files: File[]) => void;
}
export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(({ label, maxSize, onFilesChange, onChange, hint, error, className, ...props }, ref) => {
  const [validationError, setValidationError] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    const input = inputRef.current;
    const form = input?.form;
    if (!input || !form) return;
    let active = true;
    const reset = (event: Event) => queueMicrotask(() => {
      if (active && !event.defaultPrevented) {
        input.setCustomValidity("");
        setValidationError("");
      }
    });
    form.addEventListener("reset", reset);
    return () => { active = false; form.removeEventListener("reset", reset); };
  }, [props.form]);
  return <Field label={label} htmlFor={props.id} hint={hint} error={error || validationError} required={props.required}><input {...props} ref={node => { inputRef.current = node; if (typeof ref === "function") ref(node); else if (ref) ref.current = node; }} type="file" className={cn("h-control h-file-upload", className)} onChange={(event) => {
    const files = Array.from(event.target.files ?? []);
    const oversized = maxSize === undefined ? undefined : files.find((file) => file.size > maxSize);
    const message = oversized ? `${oversized.name} exceeds the ${maxSize}-byte limit.` : "";
    event.target.setCustomValidity(message);
    setValidationError(message);
    onChange?.(event);
    onFilesChange?.(message ? [] : files);
  }} /></Field>;
});
FileUpload.displayName = "FileUpload";

export interface NumberInputProps extends Omit<InputProps, "type"> {}
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>((props, ref) => <Input {...props} type="number" ref={ref} />);
NumberInput.displayName = "NumberInput";

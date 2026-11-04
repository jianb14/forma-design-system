import { useRef } from "react";
import type { ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from "./Button";

export interface AlertDialogProps {
  title: string;
  description: string;
  trigger?: ReactNode;
  children?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  portalContainer?: HTMLElement | null;
}

/** Confirmation with a safe initial focus and no outside-click dismissal. */
export function AlertDialog({ title, description, trigger, children, confirmLabel = "Continue", cancelLabel = "Cancel", destructive, onConfirm, open, defaultOpen, onOpenChange, portalContainer }: AlertDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  return <DialogPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
    {trigger && <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>}
    <DialogPrimitive.Portal container={portalContainer}>
      <DialogPrimitive.Overlay data-hulmio-ui="overlay" className="dialog-overlay" />
      <DialogPrimitive.Content data-hulmio-ui="alert-dialog" className="dialog-content h-alert-dialog" role="alertdialog"
        onOpenAutoFocus={event => { event.preventDefault(); cancelRef.current?.focus(); }}
        onInteractOutside={event => event.preventDefault()}>
        <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
        <DialogPrimitive.Description className="dialog-description">{description}</DialogPrimitive.Description>
        {children}
        <div className="h-alert-dialog-actions">
          <DialogPrimitive.Close asChild><Button ref={cancelRef} variant="outline">{cancelLabel}</Button></DialogPrimitive.Close>
          <DialogPrimitive.Close asChild><Button variant={destructive ? "destructive" : "primary"} onClick={onConfirm}>{confirmLabel}</Button></DialogPrimitive.Close>
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>;
}

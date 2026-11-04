import type { ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "./utils";

export interface ModalProps {
  trigger?: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
  drawer?: boolean;
  side?: "right" | "left" | "bottom";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  nonModal?: boolean;
  fullscreen?: boolean;
  /** Mount inside a themed subtree instead of document.body. */
  portalContainer?: HTMLElement | null;
}

export function Modal({
  trigger,
  title,
  description,
  children,
  drawer = false,
  side = "right",
  open,
  onOpenChange,
  nonModal = false,
  fullscreen = false,
  portalContainer,
}: ModalProps) {
  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      modal={!nonModal}
    >
      {trigger && (
        <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      )}
      <DialogPrimitive.Portal container={portalContainer}>
        {!nonModal && <DialogPrimitive.Overlay data-hulmio-ui="overlay" className="dialog-overlay" />}
        <DialogPrimitive.Content
          data-hulmio-ui="modal"
          className={cn(
            "dialog-content",
            drawer && `drawer drawer-${side}`,
            nonModal && "popover-content",
            fullscreen && "dialog-fullscreen",
          )}
        >
          <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
          <DialogPrimitive.Description
            className={description ? "dialog-description" : "sr-only"}
          >
            {description || `Details for ${title}`}
          </DialogPrimitive.Description>
          {children}
          <DialogPrimitive.Close
            className="dialog-close"
            aria-label="Close dialog"
          >
            <X size={18} />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
export const DialogClose = DialogPrimitive.Close;

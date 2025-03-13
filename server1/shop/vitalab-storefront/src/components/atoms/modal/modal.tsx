"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "@utils/cn"
import { X } from "lucide-react"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = ({
  className,
  children,
  ...props
}: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal className={cn(className)} {...props}>
    <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
      {children}
    </div>
  </DialogPrimitive.Portal>
)
DialogPortal.displayName = DialogPrimitive.Portal.displayName

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-100", //data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out 
      className
    )}
    {...props}
    ref={ref}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const ModalRoot = React.forwardRef(
  ({ active, onClickOutside, className, children, ...props }, ref) => (
    <Dialog open={active} onOpenChange={onClickOutside}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            "fixed z-50 grid w-full rounded-b-lg bg-white sm:max-w-xl sm:rounded-lg", //data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 sm:zoom-in-90 data-[state=open]:sm:slide-in-from-bottom-0 animate-in
            className
          )}
          {...props}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
)
ModalRoot.displayName = DialogPrimitive.Content.displayName

const ModalBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("relative overflow-x-hidden px-8 py-4 text-sm md:p-8", className)}
    {...props}
  />
)
ModalBody.displayName = "ModalBody"

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const Actions = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <footer
    className={cn(
      "sticky bottom-0 flex shrink-0 justify-between p-4 ",
      "before:absolute before:bottom-full before:left-0 before:z-[-1] before:h-3 before:w-full before:translate-y-[275%] before:bg-[rgba(0,0,0,0.075)] before:blur-[3px] before:duration-200",
      "after:absolute after:inset-0 after:z-[-1] after:rounded-b-lg after:bg-gray-100 after:shadow-[0_0_0_1px_rgba(0,0,0,0.07)]",
      className
    )}
    {...props}
  />
)
Actions.displayName = "Actions"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "mb-6 text-2xl font-semibold leading-6 text-slate-900",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-slate-500", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

const Root = ModalRoot
const Trigger = DialogPrimitive.Trigger
const Portal = DialogPortal
const Overlay = DialogOverlay
const Body = ModalBody
const Header = DialogHeader
const Title = DialogTitle
const Description = DialogDescription
const Close = DialogPrimitive.Close

export {
  Dialog,
  DialogTrigger,
  // DialogContent,
  DialogHeader,
  // DialogFooter,
  DialogTitle,
  DialogDescription,
  //
  Root,
  Trigger,
  Portal,
  Overlay,
  Body,
  Header,
  Actions,
  Title,
  Description,
  Close,
}

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "~/utils/cn"

const buttonVariants = cva(
  "flex max-w-full items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-0 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:data-[state=open]:bg-slate-800",
  {
    variants: {
      variant: {
        default:
          "bg-emerald-900 border border-emerald-900 text-white hover:bg-transparent hover:text-black dark:bg-slate-50 dark:text-slate-900",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600",
        outline:
          //text-neutral-800 px-4 py-2 h-7.5 font-semibold inline-flex leading-none rounded-md text-sm items-center justify-center bg-white text-primary relative after:block after:absolute after:inset-0 after:rounded-md after:bg-gradient-to-t after:from-black/5 after:opacity-75 hover:after:opacity-100 after:transition-opacity [text-shadow:0px_1px_0px_rgb(255_255_255_/_0.8)] shadow-[inset_0px_1px_0px_0px_rgb(255_255_255),_0px_0px_0px_1px_rgba(0_0_0_/_0.06),_0px_1px_0px_0px_rgba(_0_0_0_/_0.08),_0px_2px_2px_0px_rgba(0_0_0_/_0.04),_0px_3px_3px_0px_rgba(0_0_0_/_0.02),_0px_4px_4px_0px_rgba(_0_0_0_/_0.01)]
          "text-neutral-800 px-4 py-2 font-semibold leading-none bg-white text-primary relative after:block after:absolute after:inset-0 after:rounded-md after:bg-gradient-to-t after:from-black/5 after:opacity-75 hover:after:opacity-100 after:transition-opacity [text-shadow:0px_1px_0px_rgb(255_255_255_/_0.8)] shadow-[inset_0px_1px_0px_0px_rgb(255_255_255),_0px_0px_0px_1px_rgba(0_0_0_/_0.06),_0px_1px_0px_0px_rgba(_0_0_0_/_0.08),_0px_2px_2px_0px_rgba(0_0_0_/_0.04),_0px_3px_3px_0px_rgba(0_0_0_/_0.02),_0px_4px_4px_0px_rgba(_0_0_0_/_0.01)]",
        subtle:
          "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100",
        ghost:
          "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-100 dark:hover:text-slate-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
        link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-8 px-2 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

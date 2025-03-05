import * as React from "react"
import { cn } from "@utils/cn"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex w-full items-center justify-center text-sm font-medium transition-colors focus:outline-none focus:ring-0 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-100",
  {
    variants: {
      variant: {
        default:
          // "bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-50 dark:text-slate-900",
          // "border border-emerald-900 bg-emerald-900 text-white hover:bg-white hover:text-emerald-900 dark:border-emerald-50 dark:bg-emerald-50 dark:text-emerald-900",
          "rounded-[5px] border",
        destructive:
          "bg-red-500 text-white hover:bg-red-600",
        outline:
          "border border-slate-200 bg-transparent hover:bg-slate-100",
        subtle:
          "bg-slate-100 text-slate-900 hover:bg-slate-200",
        ghost:
          "bg-transparent hover:bg-slate-100 data-[state=open]:bg-transparent",
        arrow:
          "group rounded-full bg-slate-900 px-4 py-1.5 font-semibold text-white transition hover:bg-slate-700",
        link: "bg-transparent text-slate-900 underline-offset-4 hover:bg-transparent hover:underline",
      },
      type: {
        primary:
          "border-emerald-900 bg-emerald-900 text-white hover:bg-white hover:text-emerald-900",
        secondary:
          "border-gray-200 bg-white text-gray-600 hover:border-black hover:bg-white hover:text-black",
      },
      size: {
        default: "h-10 px-3 py-2",
        sm: "h-8 rounded-md px-2",
        lg: "h-11 rounded-md px-8",
        dimensionless: "",
      },
    },
    defaultVariants: {
      variant: "default",
      type: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, type, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

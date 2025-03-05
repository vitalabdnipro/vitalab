import * as React from "react"
import { cn } from "~/utils/cn"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="flex w-full items-center text-sm">
        <input
          className={cn(
            "inline-flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-black transition-colors placeholder:text-opacity-40 focus:border-stone-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
